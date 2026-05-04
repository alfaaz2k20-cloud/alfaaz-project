from pydantic import BaseModel
from typing import Optional

class ClubApplicationCreate(BaseModel):
    club_name: str
    note: Optional[str] = None

class ClubApplicationReview(BaseModel):
    application_id: int
    status: str
    admin_note: Optional[str] = None