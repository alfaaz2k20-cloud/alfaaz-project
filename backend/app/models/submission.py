from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, DateTime, func

class DBSubmission(SQLModel, table=True):
    __tablename__ = "submissions"
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    submission_type: str
    title: str
    file_url: str
    note: Optional[str] = None
    author_email: str
    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )
