from pydantic import BaseModel, Field
from typing import Optional

class EventCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=150)
    description: Optional[str] = Field(None, max_length=1000)
    event_date: Optional[str] = Field(None, max_length=100)
    capacity: int = Field(0, ge=0, le=10000)

class EventRegister(BaseModel):
    event_id: int
    whatsapp_number: Optional[str] = Field(None, max_length=30)