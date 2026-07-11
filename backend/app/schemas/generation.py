from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.models.enums import GenerationStatus


class GenerationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    user_id: UUID
    product_id: UUID
    original_image_url: str
    generated_image_url: str | None = None
    prompt: str | None = None
    status: GenerationStatus
    error_message: str | None = None
    generation_time: float | None = None
    ai_provider: str | None = None
    created_at: datetime
    updated_at: datetime

