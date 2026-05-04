from sqlalchemy import Column, Integer, String, DateTime, Boolean, func
from backend.app.db.base import Base

class DBEvent(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String, nullable=True)
    event_date = Column(String, nullable=True)
    registration_open = Column(Boolean, default=False)
    capacity = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class DBEventRegistration(Base):
    __tablename__ = "event_registrations"
    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, index=True)
    user_email = Column(String, index=True)
    whatsapp_number = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())