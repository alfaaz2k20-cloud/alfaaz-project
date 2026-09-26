from sqlmodel import Field
from typing import Optional
from datetime import datetime
from app.db.base import Base

class DBVolunteerApplication(Base, table=True):
    __tablename__ = "volunteer_applications"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    name: str = Field(max_length=150)
    email: str = Field(max_length=150)
    phone: str = Field(max_length=50)
    interests: Optional[str] = Field(default="")
    empathy: int = Field(default=0)
    conscientiousness: int = Field(default=0)
    collaborative: int = Field(default=0)
    emotional: int = Field(default=0)
    curiosity: int = Field(default=0)
    creative: int = Field(default=0)
    dominant_trait: Optional[str] = Field(default="")
    responses: Optional[str] = Field(default="")
    notes: Optional[str] = Field(default="")
