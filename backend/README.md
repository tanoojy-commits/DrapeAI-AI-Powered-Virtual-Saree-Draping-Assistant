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

