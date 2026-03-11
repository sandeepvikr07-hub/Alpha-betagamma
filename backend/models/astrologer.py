from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid

class Astrologer(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    image: str
    experience: int
    specialization: str
    rating: float = 5.0
    consultations: int = 0
    bio: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class AstrologerCreate(BaseModel):
    name: str
    image: str
    experience: int
    specialization: str
    rating: float = 5.0
    consultations: int = 0
    bio: Optional[str] = None

class AstrologerUpdate(BaseModel):
    name: Optional[str] = None
    image: Optional[str] = None
    experience: Optional[int] = None
    specialization: Optional[str] = None
    rating: Optional[float] = None
    consultations: Optional[int] = None
    bio: Optional[str] = None