from collections.abc import Generator
from datetime import UTC, datetime, timedelta

import jwt
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, event
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.config.settings import get_settings
from app.core.security import create_access_token, hash_password
from app.db.base import Base
from app.db.dependencies import get_db
from app.db.init_models import User
from app.main import app
from app.models.enums import UserRole


@pytest.fixture()
def db_session() -> Generator[Session, None, None]:
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )

    @event.listens_for(engine, "connect")
    def enable_foreign_keys(dbapi_connection, connection_record) -> None:  # noqa: ANN001
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()

    Base.metadata.create_all(bind=engine)
    TestingSessionLocal = sessionmaker(bind=engine)

    with TestingSessionLocal() as session:
        yield session

    Base.metadata.drop_all(bind=engine)


@pytest.fixture()
def client(db_session: Session) -> Generator[TestClient, None, None]:
    settings = get_settings()
    original_secret = settings.jwt_secret_key
    settings.jwt_secret_key = "test-secret-key-for-authentication-tests"

    def override_get_db() -> Generator[Session, None, None]:
        yield db_session

    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()
    settings.jwt_secret_key = original_secret


def create_test_user(
    db: Session,
    *,
    email: str = "user@example.com",
    password: str = "Password1",
    role: UserRole = UserRole.USER,
    is_active: bool = True,
) -> User:
    user = User(
        full_name="Test User",
        email=email,
        password_hash=hash_password(password),
        role=role,
        is_active=is_active,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def test_valid_registration_succeeds(client: TestClient) -> None:
    response = client.post(
        "/api/v1/auth/register",
        json={
            "full_name": "New User",
            "email": "NewUser@Example.com",
            "password": "Password1",
            "confirm_password": "Password1",
            "role": "ADMIN",
        },
    )

    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "newuser@example.com"
    assert data["role"] == "USER"
    assert "password_hash" not in data


def test_duplicate_email_fails(client: TestClient) -> None:
    payload = {
        "full_name": "New User",
        "email": "new@example.com",
        "password": "Password1",
        "confirm_password": "Password1",
    }

    assert client.post("/api/v1/auth/register", json=payload).status_code == 201
    assert client.post("/api/v1/auth/register", json=payload).status_code == 409


@pytest.mark.parametrize(
    "payload",
    [
        {
            "full_name": "New User",
            "email": "invalid-email",
            "password": "Password1",
            "confirm_password": "Password1",
        },
        {
            "full_name": "New User",
            "email": "new@example.com",
            "password": "weakpass",
            "confirm_password": "weakpass",
        },
        {
            "full_name": "New User",
            "email": "new@example.com",
            "password": "Password1",
            "confirm_password": "Password2",
        },
    ],
)
def test_invalid_registration_payloads_fail(
    client: TestClient,
    payload: dict[str, str],
) -> None:
    response = client.post("/api/v1/auth/register", json=payload)

    assert response.status_code == 422


def test_login_with_correct_credentials_succeeds(
    client: TestClient,
    db_session: Session,
) -> None:
    create_test_user(db_session)

    response = client.post(
        "/api/v1/auth/login",
        json={"email": "user@example.com", "password": "Password1"},
    )

    assert response.status_code == 200
    data = response.json()
    assert data["token_type"] == "bearer"
    assert data["access_token"]
    assert data["user"]["email"] == "user@example.com"


def test_login_wrong_or_unknown_credentials_fail(
    client: TestClient,
    db_session: Session,
) -> None:
    create_test_user(db_session)

    wrong_password = client.post(
        "/api/v1/auth/login",
        json={"email": "user@example.com", "password": "WrongPassword1"},
    )
    unknown_user = client.post(
        "/api/v1/auth/login",
        json={"email": "unknown@example.com", "password": "Password1"},
    )

    assert wrong_password.status_code == 401
    assert unknown_user.status_code == 401
    assert wrong_password.json()["message"] == unknown_user.json()["message"]


def test_disabled_user_cannot_login(client: TestClient, db_session: Session) -> None:
    create_test_user(db_session, is_active=False)

    response = client.post(
        "/api/v1/auth/login",
        json={"email": "user@example.com", "password": "Password1"},
    )

    assert response.status_code == 403


def test_me_requires_valid_authentication(
    client: TestClient,
    db_session: Session,
) -> None:
    user = create_test_user(db_session)
    token = create_access_token(user.id, user.role)

    missing = client.get("/api/v1/auth/me")
    invalid = client.get("/api/v1/auth/me", headers={"Authorization": "Bearer bad"})
    valid = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert missing.status_code == 401
    assert invalid.status_code == 401
    assert valid.status_code == 200
    assert valid.json()["email"] == "user@example.com"


def test_expired_token_fails(client: TestClient, db_session: Session) -> None:
    user = create_test_user(db_session)
    token = jwt.encode(
        {
            "sub": str(user.id),
            "role": user.role.value,
            "exp": datetime.now(UTC) - timedelta(minutes=1),
        },
        "test-secret-key-for-authentication-tests",
        algorithm="HS256",
    )

    response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 401


def test_admin_route_authorization(client: TestClient, db_session: Session) -> None:
    user = create_test_user(db_session, email="normal@example.com")
    admin = create_test_user(
        db_session,
        email="admin@example.com",
        role=UserRole.ADMIN,
    )

    user_token = create_access_token(user.id, user.role)
    admin_token = create_access_token(admin.id, admin.role)

    unauthenticated = client.get("/api/v1/admin/test")
    forbidden = client.get(
        "/api/v1/admin/test",
        headers={"Authorization": f"Bearer {user_token}"},
    )
    allowed = client.get(
        "/api/v1/admin/test",
        headers={"Authorization": f"Bearer {admin_token}"},
    )

    assert unauthenticated.status_code == 401
    assert forbidden.status_code == 403
    assert allowed.status_code == 200
