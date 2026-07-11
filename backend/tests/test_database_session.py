from sqlalchemy import text

from app.db.session import create_database_engine


def test_database_engine_can_be_created_for_sqlite() -> None:
    engine = create_database_engine("sqlite:///:memory:")

    assert engine is not None

    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1")).scalar_one()

    assert result == 1

