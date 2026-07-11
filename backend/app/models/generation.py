from __future__ import annotations

import uuid

from sqlalchemy import CheckConstraint, Enum, Float, ForeignKey, Index, String, Text, Uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.enums import GenerationStatus
from app.models.mixins import TimestampMixin


class Generation(TimestampMixin, Base):
    __tablename__ = "generations"

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True),
        ForeignKey("users.id", ondelete="RESTRICT"),
        nullable=False,
    )
    product_id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True),
        ForeignKey("products.id", ondelete="RESTRICT"),
        nullable=False,
    )
    original_image_url: Mapped[str] = mapped_column(String(500), nullable=False)
    generated_image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    prompt: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[GenerationStatus] = mapped_column(
        Enum(
            GenerationStatus,
            native_enum=False,
            create_constraint=True,
            validate_strings=True,
            name="generation_status",
        ),
        default=GenerationStatus.PENDING,
        nullable=False,
    )
    error_message: Mapped[str | None] = mapped_column(Text, nullable=True)
    generation_time: Mapped[float | None] = mapped_column(Float, nullable=True)
    ai_provider: Mapped[str | None] = mapped_column(String(80), nullable=True)

    user: Mapped["User"] = relationship(back_populates="generations")
    product: Mapped["Product"] = relationship(back_populates="generations")

    __table_args__ = (
        CheckConstraint(
            "generation_time IS NULL OR generation_time >= 0",
            name="generation_time_non_negative",
        ),
        Index("ix_generations_user_id", "user_id"),
        Index("ix_generations_product_id", "product_id"),
        Index("ix_generations_status", "status"),
    )

