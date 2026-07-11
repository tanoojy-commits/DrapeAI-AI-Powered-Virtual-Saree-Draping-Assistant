# Phase 5: Authentication, Authorization, and User Access Control

## Goal

Implement secure user registration, login, current-user access, route protection, and admin authorization without adding AI generation, Cloudinary uploads, or catalogue features.

## Backend

Implemented:

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `GET /api/v1/admin/test`
- Argon2 password hashing
- JWT token creation and validation
- `get_current_user`
- `get_current_active_user`
- `require_admin`
- Safe auth responses without `password_hash`

## Frontend

Implemented:

- Auth context/provider
- Login API connection
- Register API connection
- Auth state restoration through `/auth/me`
- Logout
- Protected user routes
- Protected admin route
- User-friendly error display

## Token Storage Note

The current development setup stores JWT access tokens in `localStorage`.

Tradeoff:

- Good for local development and simple Vercel/FastAPI integration.
- Vulnerable if an XSS bug appears.

Production migration path:

- Move access/session token to secure HttpOnly cookies.
- Enable credentialed CORS.
- Use `SameSite=None; Secure` for cross-site Vercel/backend deployment.
- Keep refresh/session handling server-controlled.

## Test Commands

Backend:

```powershell
cd backend
.\.venv\Scripts\python.exe -m pytest
```

Frontend:

```powershell
cd frontend
npm.cmd run lint
npm.cmd run build
```

## Manual API Flow

1. Register a user with `/api/v1/auth/register`.
2. Login with `/api/v1/auth/login`.
3. Copy the returned token.
4. Call `/api/v1/auth/me` with `Authorization: Bearer <token>`.
5. Call `/api/v1/admin/test` with a normal user token and expect `403`.

## Security Checklist

- Plain-text passwords are never stored.
- Password hashes are never returned.
- Admin role cannot be selected during registration.
- JWT secret is environment-based.
- `.env` remains ignored.
- Frontend receives only safe user fields.
- Backend admin route enforces authorization.

## Git Commit Message

```text
feat: implement authentication and route protection
```
