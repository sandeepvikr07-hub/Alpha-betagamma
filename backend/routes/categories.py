from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models.category import Category, CategoryCreate, CategoryUpdate
from utils.auth import verify_token
from database import db
from datetime import datetime

router = APIRouter(prefix="/api/categories", tags=["Categories"])

@router.get("/", response_model=List[Category])
async def get_categories():
    categories = await db.categories.find().to_list(1000)
    return [Category(**cat) for cat in categories]

@router.get("/{category_id}", response_model=Category)
async def get_category(category_id: str):
    category = await db.categories.find_one({"id": category_id})
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return Category(**category)

@router.post("/", response_model=Category)
async def create_category(category: CategoryCreate, payload: dict = Depends(verify_token)):
    category_dict = category.dict()
    category_obj = Category(**category_dict)
    await db.categories.insert_one(category_obj.dict())
    return category_obj

@router.put("/{category_id}", response_model=Category)
async def update_category(category_id: str, category: CategoryUpdate, payload: dict = Depends(verify_token)):
    existing = await db.categories.find_one({"id": category_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Category not found")
    
    update_data = {k: v for k, v in category.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db.categories.update_one({"id": category_id}, {"$set": update_data})
    updated = await db.categories.find_one({"id": category_id})
    return Category(**updated)

@router.delete("/{category_id}")
async def delete_category(category_id: str, payload: dict = Depends(verify_token)):
    result = await db.categories.delete_one({"id": category_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"message": "Category deleted successfully"}