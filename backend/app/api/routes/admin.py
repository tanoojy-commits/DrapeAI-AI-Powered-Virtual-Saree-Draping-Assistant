from fastapi import APIRouter, Depends

from app.dependencies.auth import require_admin
from app.models.user import User

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/test")
async def admin_test(current_user: User = Depends(require_admin)) -> dict[str, str]:
    return {
        "status": "ok",
        "message": "Admin access granted.",
        "user_id": str(current_user.id),
    }

