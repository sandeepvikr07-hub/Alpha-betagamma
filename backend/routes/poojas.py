from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models.pooja import Pooja, PoojaCreate, PoojaUpdate
from utils.auth import verify_token
from database import db
from datetime import datetime

router = APIRouter(prefix="/api/poojas", tags=["Poojas"])

@router.get("/", response_model=List[Pooja])
async def get_poojas():
    poojas = await db.poojas.find().to_list(1000)
    return [Pooja(**pooja) for pooja in poojas]

@router.get("/{pooja_id}", response_model=Pooja)
async def get_pooja(pooja_id: str):
    pooja = await db.poojas.find_one({"id": pooja_id})
    if not pooja:
        raise HTTPException(status_code=404, detail="Pooja not found")
    return Pooja(**pooja)

@router.post("/", response_model=Pooja)
async def create_pooja(pooja: PoojaCreate, payload: dict = Depends(verify_token)):
    pooja_dict = pooja.dict()
    pooja_obj = Pooja(**pooja_dict)
    await db.poojas.insert_one(pooja_obj.dict())
    return pooja_obj

@router.put("/{pooja_id}", response_model=Pooja)
async def update_pooja(pooja_id: str, pooja: PoojaUpdate, payload: dict = Depends(verify_token)):
    existing = await db.poojas.find_one({"id": pooja_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Pooja not found")
    
    update_data = {k: v for k, v in pooja.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db.poojas.update_one({"id": pooja_id}, {"$set": update_data})
    updated = await db.poojas.find_one({"id": pooja_id})
    return Pooja(**updated)

@router.delete("/{pooja_id}")
async def delete_pooja(pooja_id: str, payload: dict = Depends(verify_token)):
    result = await db.poojas.delete_one({"id": pooja_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Pooja not found")
    return {"message": "Pooja deleted successfully"}