from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid

class Pooja(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    category_id: Optional[str] = None
    image: str
    price: float
    duration: str
    benefits: Optional[List[str]] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class PoojaCreate(BaseModel):
    title: str
    description: str
    category_id: Optional[str] = None
    image: str
    price: float
    duration: str
    benefits: Optional[List[str]] = []

class PoojaUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category_id: Optional[str] = None
    image: Optional[str] = None
    price: Optional[float] = None
    duration: Optional[str] = None
    benefits: Optional[List[str]] = None