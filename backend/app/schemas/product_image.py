from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class ProductImageBase(BaseModel):
    image_url: str
    image_type: str = "gallery"
    display_order: int = 0


class ProductImageResponse(ProductImageBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    product_id: UUID
    created_at: datetime | None = None

