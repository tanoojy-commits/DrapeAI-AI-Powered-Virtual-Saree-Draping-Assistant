# StyleAI Backend

FastAPI backend foundation for the AI powered virtual fashion try-on platform.

## Setup

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

## Environment

Copy `.env.example` to `.env` and fill real values locally. Never commit `.env`.

## Run Development Server

```powershell
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Test

```powershell
.\.venv\Scripts\python.exe -m pytest
```

## Health Check

```text
GET http://localhost:8000/api/v1/health
```

## Database Migrations

StyleAI uses SQLAlchemy models and Alembic migrations.

Before running migrations, set a real backend-only `DATABASE_URL` in `.env`.
Do not put the database URL in frontend environment variables.

Recommended Supabase pooler format:

```text
DATABASE_URL=postgresql+psycopg://postgres.your-project-ref:your-password@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

Run migrations:

```powershell
.\.venv\Scripts\python.exe -m alembic upgrade head
```

Check current migration:

```powershell
.\.venv\Scripts\python.exe -m alembic current
```

## Development Seed Data

After migrations are applied, optional development seed data can be loaded:

```powershell
.\.venv\Scripts\python.exe -m scripts.seed_dev
```

The seed script is idempotent. It checks slugs before inserting records, so it
can be run more than once without creating duplicate categories or sample
products.

