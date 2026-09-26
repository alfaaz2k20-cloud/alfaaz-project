from sqlmodel import Field, Column
from sqlalchemy import Text
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
    interests: Optional[str] = Field(default="", sa_column=Column(Text))
    empathy: int = Field(default=0)
    conscientiousness: int = Field(default=0)
    collaborative: int = Field(default=0)
    emotional: int = Field(default=0)
    curiosity: int = Field(default=0)
    creative: int = Field(default=0)
    dominant_trait: Optional[str] = Field(default="", max_length=100)
    responses: Optional[str] = Field(default="", sa_column=Column(Text))
    notes: Optional[str] = Field(default="", sa_column=Column(Text))
