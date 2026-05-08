from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, DateTime, func

class DBEvent(SQLModel, table=True):
    __tablename__ = "events"
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    name: str
    description: Optional[str] = None
    event_date: Optional[str] = None
    registration_open: bool = Field(default=False)
    capacity: int = Field(default=0)
    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )

class DBEventRegistration(SQLModel, table=True):
    __tablename__ = "event_registrations"
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    event_id: int = Field(index=True)
    user_email: str = Field(index=True)
    whatsapp_number: Optional[str] = None
    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )
