from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.security import create_access_token, hash_password, verify_password
from app.models.enums import UserRole
from app.models.user import User
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse


class AuthService:
    def __init__(self, db: Session) -> None:
        self.db = db

    def register_user(self, payload: RegisterRequest) -> User:
        user = User(
            full_name=payload.full_name.strip(),
            email=payload.email,
            password_hash=hash_password(payload.password),
            role=UserRole.USER,
            is_active=True,
        )
        self.db.add(user)

        try:
            self.db.commit()
        except IntegrityError as exc:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="An account with this email already exists.",
            ) from exc

        self.db.refresh(user)
        return user

    def authenticate_user(self, payload: LoginRequest) -> TokenResponse:
        user = self.db.scalar(select(User).where(User.email == payload.email))
        if not user or not verify_password(payload.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password.",
                headers={"WWW-Authenticate": "Bearer"},
            )

        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="This account is disabled.",
            )

        access_token = create_access_token(user.id, user.role)
        return TokenResponse(access_token=access_token, user=user)

    def get_user_by_id(self, user_id: UUID) -> User | None:
        return self.db.get(User, user_id)

