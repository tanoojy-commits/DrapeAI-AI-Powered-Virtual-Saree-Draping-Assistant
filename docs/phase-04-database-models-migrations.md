# Phase 4: Database, Models, Relationships, and Migrations

## Goal

Create a secure, scalable PostgreSQL database architecture for StyleAI using SQLAlchemy and Alembic, prepared for Supabase PostgreSQL.

## What Was Built

- SQLAlchemy declarative base with naming conventions
- Database session architecture
- User, Category, Product, ProductImage, Generation, and Favorite models
- Relationships and constraints
- Application-level string enums with database check constraints
- Pydantic response/create schemas for Phase 4 entities
- Alembic configuration
- Reviewed initial migration
- Idempotent development seed script
- Database tests for constraints and relationships

## Enum Strategy

Phase 4 uses Python string enums stored as constrained strings in the database, not PostgreSQL native enum types.

Why:

- Easier to evolve early in the project
- Alembic migrations are simpler when roles/statuses grow
- Python, Pydantic, SQLAlchemy, and PostgreSQL remain compatible
- Database-level check constraints still reject invalid values

## Delete Behavior

- `users -> favorites`: cascade delete, because favorites are user-owned lightweight records.
- `products -> product_images`: cascade delete, because images belong to one product.
- `products/users -> generations`: restrict delete, because AI generation history should be protected.
- `categories -> products`: restrict delete, because deleting categories with products would orphan catalogue data.
- `parent categories -> child categories`: set child `parent_id` to null, preserving child categories.

## Supabase Setup Steps

1. Open Supabase.
2. Select your StyleAI project.
3. Go to Project Settings.
4. Open Database.
5. Copy the pooled PostgreSQL connection string.
6. Use the SQLAlchemy/psycopg format:

```text
postgresql+psycopg://postgres.project-ref:password@host:6543/postgres?pgbouncer=true
```

7. Put it in `backend/.env` as `DATABASE_URL`.
8. Never add `DATABASE_URL` to frontend `.env`.
9. Never commit `backend/.env`.

## Migration Commands

Run from `backend`:

```powershell
.\.venv\Scripts\python.exe -m alembic upgrade head
```

Check current migration:

```powershell
.\.venv\Scripts\python.exe -m alembic current
```

## Seed Command

Run from `backend` after migrations:

```powershell
.\.venv\Scripts\python.exe -m scripts.seed_dev
```

## Testing

Run from `backend`:

```powershell
.\.venv\Scripts\python.exe -m pytest
```

Verified locally:

- Health endpoint still works
- SQLAlchemy engine creation works
- User email uniqueness works
- Category hierarchy works
- Product-category relationship works
- Product-image relationship works
- Generation relationships work
- Duplicate favorites are blocked
- Invalid enum values are rejected
- Alembic migration creates all expected tables locally

## Supabase Verification Checklist

After adding the real database password and running Alembic against Supabase, verify in Supabase Table Editor that these tables exist:

- `users`
- `categories`
- `products`
- `product_images`
- `generations`
- `favorites`
- `alembic_version`

Also verify:

- `users.email` is unique
- `favorites` has a unique user/product pair constraint
- product price cannot be negative
- category hierarchy supports `parent_id`
- generation status accepts only valid status values

## Current Limitation

The code is ready for Supabase, but applying migrations to Supabase requires replacing `[YOUR-PASSWORD]` in `backend/.env` with the real Supabase database password.

## Git Commit Message

```text
feat: add database models and Alembic migrations
```

