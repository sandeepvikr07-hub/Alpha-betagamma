from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models.astrologer import Astrologer, AstrologerCreate, AstrologerUpdate
from utils.auth import verify_token
from database import db
from datetime import datetime

router = APIRouter(prefix="/api/astrologers", tags=["Astrologers"])

@router.get("/", response_model=List[Astrologer])
async def get_astrologers():
    astrologers = await db.astrologers.find().to_list(1000)
    return [Astrologer(**ast) for ast in astrologers]

@router.get("/{astrologer_id}", response_model=Astrologer)
async def get_astrologer(astrologer_id: str):
    astrologer = await db.astrologers.find_one({"id": astrologer_id})
    if not astrologer:
        raise HTTPException(status_code=404, detail="Astrologer not found")
    return Astrologer(**astrologer)

@router.post("/", response_model=Astrologer)
async def create_astrologer(astrologer: AstrologerCreate, payload: dict = Depends(verify_token)):
    astrologer_dict = astrologer.dict()
    astrologer_obj = Astrologer(**astrologer_dict)
    await db.astrologers.insert_one(astrologer_obj.dict())
    return astrologer_obj

@router.put("/{astrologer_id}", response_model=Astrologer)
async def update_astrologer(astrologer_id: str, astrologer: AstrologerUpdate, payload: dict = Depends(verify_token)):
    existing = await db.astrologers.find_one({"id": astrologer_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Astrologer not found")
    
    update_data = {k: v for k, v in astrologer.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db.astrologers.update_one({"id": astrologer_id}, {"$set": update_data})
    updated = await db.astrologers.find_one({"id": astrologer_id})
    return Astrologer(**updated)

@router.delete("/{astrologer_id}")
async def delete_astrologer(astrologer_id: str, payload: dict = Depends(verify_token)):
    result = await db.astrologers.delete_one({"id": astrologer_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Astrologer not found")
    return {"message": "Astrologer deleted successfully"}