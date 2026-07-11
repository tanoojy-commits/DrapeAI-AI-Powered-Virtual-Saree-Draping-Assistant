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

## Authentication

Phase 5 adds FastAPI-managed authentication using:

- Argon2 password hashing
- JWT access tokens
- `Authorization: Bearer <token>` requests
- Role-based authorization with `USER` and `ADMIN`

Required local backend environment values:

```text
JWT_SECRET_KEY=replace-with-a-long-random-secret
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

Auth endpoints:

```text
POST /api/v1/auth/register
POST /api/v1/auth/login
GET /api/v1/auth/me
GET /api/v1/admin/test
```

The frontend stores the development access token in `localStorage`. This is easy
for local Vite and deployed Vercel previews, but it has XSS risk. Before
production launch, migrate session storage to secure HttpOnly cookies with
`SameSite`, `Secure`, and credentialed CORS settings.
