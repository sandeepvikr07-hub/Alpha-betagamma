from fastapi import APIRouter, HTTPException, Depends
from models.admin import AdminLogin, AdminResponse
from utils.auth import authenticate_admin, create_access_token, verify_token

router = APIRouter(prefix="/api/admin", tags=["Admin Auth"])

@router.post("/login", response_model=AdminResponse)
async def admin_login(credentials: AdminLogin):
    if not authenticate_admin(credentials.email, credentials.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = create_access_token({"email": credentials.email, "role": "admin"})
    
    return AdminResponse(
        id="admin-1",
        email=credentials.email,
        token=token
    )

@router.get("/verify")
async def verify_admin_token(payload: dict = Depends(verify_token)):
    return {"valid": True, "email": payload.get("email")}