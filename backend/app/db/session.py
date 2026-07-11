from collections.abc import Generator

from sqlalchemy import Engine, create_engine, text
from sqlalchemy.orm import Session, sessionmaker

from app.config.settings import get_settings


def normalize_database_url(database_url: str) -> str:
    if database_url.startswith("postgresql://"):
        return database_url.replace("postgresql://", "postgresql+psycopg://", 1)

    return database_url


def create_database_engine(database_url: str | None = None) -> Engine | None:
    resolved_database_url = database_url or get_settings().database_url
    if not resolved_database_url:
        return None

    normalized_url = normalize_database_url(resolved_database_url)
    if normalized_url.startswith("sqlite"):
        return create_engine(normalized_url, pool_pre_ping=True)

    return create_engine(
        normalized_url,
        pool_pre_ping=True,
        pool_size=5,
        max_overflow=10,
    )


engine = create_database_engine()

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


def get_db() -> Generator[Session, None, None]:
    if engine is None:
        raise RuntimeError("DATABASE_URL is not configured.")

    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def test_database_connection() -> bool:
    if engine is None:
        raise RuntimeError("DATABASE_URL is not configured.")

    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return True
