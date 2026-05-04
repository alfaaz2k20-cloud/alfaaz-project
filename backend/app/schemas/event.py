from pydantic import BaseModel
from typing import Optional

class EventCreate(BaseModel):
    name: str
    description: Optional[str] = None
    event_date: Optional[str] = None
    capacity: int = 0

class EventRegister(BaseModel):
    event_id: int
    whatsapp_number: Optional[str] = None