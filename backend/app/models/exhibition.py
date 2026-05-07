from sqlalchemy import Column, Integer, String, DateTime, Boolean, func
from app.db.base import Base

class DBExhibitionApplication(Base):
    __tablename__ = "exhibition_applications"
    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True)
    exhibition_cycle = Column(String, nullable=True, index=True)
    full_name = Column(String)
    age = Column(Integer)
    address = Column(String)
    whatsapp = Column(String)
    genre = Column(String)
    medium = Column(String)
    portfolio_url = Column(String)
    over_19 = Column(Boolean, default=False)
    agreed_to_screening = Column(Boolean, default=False)
    applicant_note = Column(String, nullable=True)
    status = Column(String, default="PENDING")
    curator_note = Column(String, nullable=True)
    registration_status = Column(String, default="NONE")
    agreed_to_tnc = Column(Boolean, default=False)
    payment_proof_url = Column(String, nullable=True)
    participant_note_reg = Column(String, nullable=True)
    payment_confirmed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class DBExhibition(Base):
    __tablename__ = "exhibitions_list"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, index=True)
    date_text = Column(String, default="Dates TBD")
    venue = Column(String, default="Venue TBD")
    about_text = Column(String, default="Details regarding the exhibition...")
    is_active = Column(Boolean, default=False)
    tnc_pdf_url = Column(String, nullable=True)
    registration_fee = Column(String, default="")
    payment_instructions = Column(String, default="")
    payment_qr_url = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())