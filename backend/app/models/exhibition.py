from sqlalchemy import Column, Integer, String, DateTime, Boolean, func
from app.db.base import Base

class DBExhibitionApplication(Base):
    __tablename__ = "exhibition_applications"
    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True)
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
    status = Column(String, default="PENDING")          # PENDING, APPROVED, REJECTED
    curator_note = Column(String, nullable=True)
    
    # Stage-2 registration fields (filled after approval)
    registration_status = Column(String, default="NONE") # NONE, SUBMITTED, CONFIRMED
    agreed_to_tnc = Column(Boolean, default=False)
    payment_proof_url = Column(String, nullable=True)    # Cloudinary URL of payment screenshot
    participant_note_reg = Column(String, nullable=True) # Any note at registration stage
    payment_confirmed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class DBExhibitionConfig(Base):
    __tablename__ = "exhibition_config"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, default="Annual Art Exhibition")
    date_text = Column(String, default="Dates TBD")
    venue = Column(String, default="Venue TBD")
    about_text = Column(String, default="Details regarding the exhibition...")
    is_open = Column(Boolean, default=False)
    
    # T&C and payment settings
    tnc_pdf_url = Column(String, nullable=True)          # Cloudinary URL of T&C PDF
    registration_fee = Column(String, default="")        # e.g. "₹500"
    payment_instructions = Column(String, default="")    # UPI ID / bank details
    payment_qr_url = Column(String, nullable=True)       # Optional QR code image URL