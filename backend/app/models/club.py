from sqlalchemy import Column, Integer, String, DateTime, func
from app.db.base import Base

class DBClubApplication(Base):
    __tablename__ = "club_applications"
    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True)
    club_name = Column(String)
    note = Column(String, nullable=True)
    status = Column(String, default="PENDING")
    admin_note = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())