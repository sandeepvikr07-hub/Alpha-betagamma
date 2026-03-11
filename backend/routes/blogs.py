from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models.blog import Blog, BlogCreate, BlogUpdate
from utils.auth import verify_token
from database import db
from datetime import datetime

router = APIRouter(prefix="/api/blogs", tags=["Blogs"])

@router.get("/", response_model=List[Blog])
async def get_blogs():
    blogs = await db.blogs.find().to_list(1000)
    return [Blog(**blog) for blog in blogs]

@router.get("/{blog_id}", response_model=Blog)
async def get_blog(blog_id: str):
    blog = await db.blogs.find_one({"id": blog_id})
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return Blog(**blog)

@router.post("/", response_model=Blog)
async def create_blog(blog: BlogCreate, payload: dict = Depends(verify_token)):
    blog_dict = blog.dict()
    blog_obj = Blog(**blog_dict)
    await db.blogs.insert_one(blog_obj.dict())
    return blog_obj

@router.put("/{blog_id}", response_model=Blog)
async def update_blog(blog_id: str, blog: BlogUpdate, payload: dict = Depends(verify_token)):
    existing = await db.blogs.find_one({"id": blog_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    update_data = {k: v for k, v in blog.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db.blogs.update_one({"id": blog_id}, {"$set": update_data})
    updated = await db.blogs.find_one({"id": blog_id})
    return Blog(**updated)

@router.delete("/{blog_id}")
async def delete_blog(blog_id: str, payload: dict = Depends(verify_token)):
    result = await db.blogs.delete_one({"id": blog_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")
    return {"message": "Blog deleted successfully"}