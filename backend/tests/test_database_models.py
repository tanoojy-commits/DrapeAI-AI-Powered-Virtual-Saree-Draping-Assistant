from decimal import Decimal

import pytest
from sqlalchemy import create_engine, event
from sqlalchemy.exc import IntegrityError, StatementError
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.db.base import Base
from app.db.init_models import Category, Favorite, Generation, Product, ProductImage, User
from app.models.enums import Gender, GenerationStatus, UserRole


@pytest.fixture()
def db_session() -> Session:
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


def create_user(db: Session, email: str = "user@example.com") -> User:
    user = User(
        full_name="Test User",
        email=email,
        password_hash="not-plain-text",
        role=UserRole.USER,
    )
    db.add(user)
    db.flush()
    return user


def create_category(db: Session) -> Category:
    root = Category(
        name="Women's Fashion",
        slug="womens-fashion",
        gender=Gender.WOMEN,
    )
    child = Category(
        name="Sarees",
        slug="sarees",
        gender=Gender.WOMEN,
        parent=root,
    )
    db.add_all([root, child])
    db.flush()
    return child


def create_product(db: Session, category: Category) -> Product:
    product = Product(
        name="Royal Pink Silk Saree",
        slug="royal-pink-silk-saree",
        gender=Gender.WOMEN,
        category_id=category.id,
        price=Decimal("2499.00"),
        currency="INR",
    )
    db.add(product)
    db.flush()
    return product


def test_user_email_must_be_unique(db_session: Session) -> None:
    create_user(db_session, email="duplicate@example.com")

    with pytest.raises(IntegrityError):
        create_user(db_session, email="duplicate@example.com")


def test_category_hierarchy_and_product_relationship(db_session: Session) -> None:
    category = create_category(db_session)
    product = create_product(db_session, category)
    db_session.commit()

    assert category.parent is not None
    assert category.parent.slug == "womens-fashion"
    assert product.category.slug == "sarees"


def test_product_image_relationship(db_session: Session) -> None:
    category = create_category(db_session)
    product = create_product(db_session, category)
    image = ProductImage(
        product_id=product.id,
        image_url="https://example.com/front.jpg",
        image_type="front",
        display_order=0,
    )
    db_session.add(image)
    db_session.commit()

    assert product.images[0].image_type == "front"
    assert product.images[0].created_at is not None


def test_generation_relationships_and_status(db_session: Session) -> None:
    user = create_user(db_session)
    category = create_category(db_session)
    product = create_product(db_session, category)
    generation = Generation(
        user_id=user.id,
        product_id=product.id,
        original_image_url="https://example.com/original.jpg",
        status=GenerationStatus.PROCESSING,
        ai_provider="test-provider",
    )
    db_session.add(generation)
    db_session.commit()

    assert generation.user.email == "user@example.com"
    assert generation.product.slug == "royal-pink-silk-saree"
    assert generation.created_at is not None


def test_duplicate_favorite_is_prevented(db_session: Session) -> None:
    user = create_user(db_session)
    category = create_category(db_session)
    product = create_product(db_session, category)
    db_session.add_all(
        [
            Favorite(user_id=user.id, product_id=product.id),
            Favorite(user_id=user.id, product_id=product.id),
        ],
    )

    with pytest.raises(IntegrityError):
        db_session.commit()


def test_enum_validation_rejects_invalid_role(db_session: Session) -> None:
    user = User(
        full_name="Invalid User",
        email="invalid@example.com",
        password_hash="not-plain-text",
        role="SUPER_ADMIN",
    )
    db_session.add(user)

    with pytest.raises(StatementError):
        db_session.commit()
