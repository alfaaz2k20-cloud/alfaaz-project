from app.models.club import ClubApplicationBase, SQLModel
from typing import Optional

class ClubApplicationCreate(ClubApplicationBase):
    pass

class ClubApplicationReview(SQLModel):
    application_id: int
    status: str
    admin_note: Optional[str] = None
