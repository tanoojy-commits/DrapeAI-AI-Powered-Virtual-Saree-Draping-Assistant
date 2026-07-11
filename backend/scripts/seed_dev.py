from decimal import Decimal
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.session import SessionLocal, engine
from app.models.category import Category
from app.models.enums import Gender
from app.models.product import Product


ROOT_CATEGORIES = [
    ("Women's Fashion", "womens-fashion", Gender.WOMEN),
    ("Men's Fashion", "mens-fashion", Gender.MEN),
    ("Unisex Fashion", "unisex-fashion", Gender.UNISEX),
]

CHILD_CATEGORIES = {
    "womens-fashion": [
        ("Sarees", "sarees"),
        ("Kurtis", "kurtis"),
        ("Dresses", "dresses"),
        ("Lehengas", "lehengas"),
        ("Salwar Suits", "salwar-suits"),
    ],
    "mens-fashion": [
        ("Shirts", "shirts"),
        ("T-Shirts", "t-shirts"),
        ("Hoodies", "hoodies"),
        ("Blazers", "blazers"),
        ("Suits", "suits"),
        ("Sherwanis", "sherwanis"),
        ("Kurtas", "kurtas"),
    ],
    "unisex-fashion": [
        ("Jackets", "jackets"),
        ("Hoodies", "unisex-hoodies"),
    ],
}

SAMPLE_PRODUCTS = [
    {
        "name": "Royal Pink Silk Saree",
        "slug": "royal-pink-silk-saree",
        "description": "Development sample saree for catalogue testing.",
        "gender": Gender.WOMEN,
        "category_slug": "sarees",
        "brand": "StyleAI Studio",
        "color": "Pink",
        "fabric": "Silk",
        "price": Decimal("2499.00"),
        "currency": "INR",
        "is_featured": True,
    },
    {
        "name": "Classic Navy Blazer",
        "slug": "classic-navy-blazer",
        "description": "Development sample blazer for catalogue testing.",
        "gender": Gender.MEN,
        "category_slug": "blazers",
        "brand": "StyleAI Studio",
        "color": "Navy",
        "fabric": "Cotton Blend",
        "price": Decimal("3999.00"),
        "currency": "INR",
        "is_featured": True,
    },
]


def get_or_create_category(
    db: Session,
    *,
    name: str,
    slug: str,
    gender: Gender,
    parent_id: UUID | None = None,
) -> Category:
    category = db.scalar(select(Category).where(Category.slug == slug))
    if category:
        return category

    category = Category(name=name, slug=slug, gender=gender, parent_id=parent_id)
    db.add(category)
    db.flush()
    return category


def seed_categories(db: Session) -> dict[str, Category]:
    categories_by_slug: dict[str, Category] = {}

    for name, slug, gender in ROOT_CATEGORIES:
        categories_by_slug[slug] = get_or_create_category(
            db,
            name=name,
            slug=slug,
            gender=gender,
        )

    for parent_slug, children in CHILD_CATEGORIES.items():
        parent = categories_by_slug[parent_slug]
        for name, slug in children:
            categories_by_slug[slug] = get_or_create_category(
                db,
                name=name,
                slug=slug,
                gender=parent.gender,
                parent_id=parent.id,
            )

    return categories_by_slug


def seed_products(db: Session, categories_by_slug: dict[str, Category]) -> None:
    for item in SAMPLE_PRODUCTS:
        existing_product = db.scalar(select(Product).where(Product.slug == item["slug"]))
        if existing_product:
            continue

        category = categories_by_slug[str(item["category_slug"])]
        db.add(
            Product(
                name=str(item["name"]),
                slug=str(item["slug"]),
                description=str(item["description"]),
                gender=item["gender"],
                category_id=category.id,
                brand=str(item["brand"]),
                color=str(item["color"]),
                fabric=str(item["fabric"]),
                price=item["price"],
                currency=str(item["currency"]),
                is_featured=bool(item["is_featured"]),
            ),
        )


def main() -> None:
    if engine is None:
        raise RuntimeError("DATABASE_URL is required before running seed data.")

    with SessionLocal() as db:
        categories_by_slug = seed_categories(db)
        seed_products(db, categories_by_slug)
        db.commit()

    print("Development seed data completed.")


if __name__ == "__main__":
    main()
