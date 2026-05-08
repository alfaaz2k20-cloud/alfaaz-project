from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, DateTime, func, String, Boolean

class DBBlog(SQLModel, table=True):
    __tablename__ = "blogs"
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    title: str = Field(nullable=False)
    excerpt: Optional[str] = None
    content: str = Field(nullable=False)
    cover_image: Optional[str] = None
    is_published: bool = Field(default=True)
    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )
