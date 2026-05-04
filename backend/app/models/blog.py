from sqlalchemy import Column, Integer, String, DateTime, Boolean, func
from backend.app.db.base import Base

class DBBlog(Base):
    __tablename__ = "blogs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    excerpt = Column(String)
    content = Column(String, nullable=False)
    cover_image = Column(String, nullable=True)
    is_published = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())