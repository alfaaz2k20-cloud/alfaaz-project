from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, DateTime, func

class ClubApplicationBase(SQLModel):
    club_name: str
    note: Optional[str] = None

class DBClubApplication(ClubApplicationBase, table=True):
    __tablename__ = "club_applications"
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    user_email: str = Field(index=True)
    status: str = Field(default="PENDING")
    admin_note: Optional[str] = None
    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )
