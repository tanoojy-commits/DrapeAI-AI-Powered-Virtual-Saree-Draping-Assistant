from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.models.enums import Gender
from app.schemas.product_image import ProductImageResponse


class ProductBase(BaseModel):
    name: str
    slug: str
    description: str | None = None
    gender: Gender
    category_id: UUID
    brand: str | None = None
    color: str | None = None
    fabric: str | None = None
    price: Decimal
    currency: str = "INR"
    primary_image_url: str | None = None
    is_featured: bool = False
    is_active: bool = True


class ProductCreate(ProductBase):
    pass


class ProductResponse(ProductBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime
    images: list[ProductImageResponse] = []

