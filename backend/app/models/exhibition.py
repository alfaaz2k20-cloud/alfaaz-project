from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, DateTime, func

class DBExhibitionApplication(SQLModel, table=True):
    __tablename__ = "exhibition_applications"
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    user_email: str = Field(index=True)
    exhibition_cycle: Optional[str] = Field(default=None, index=True)
    full_name: str
    age: int
    address: str
    whatsapp: str
    genre: str
    medium: str
    portfolio_url: str
    over_19: bool = Field(default=False)
    agreed_to_screening: bool = Field(default=False)
    applicant_note: Optional[str] = None
    status: str = Field(default="PENDING")
    curator_note: Optional[str] = None
    registration_status: str = Field(default="NONE")
    agreed_to_tnc: bool = Field(default=False)
    payment_proof_url: Optional[str] = None
    participant_note_reg: Optional[str] = None
    payment_confirmed_at: Optional[datetime] = None
    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )

class DBExhibition(SQLModel, table=True):
    __tablename__ = "exhibitions_list"
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    title: str = Field(unique=True, index=True)
    date_text: str = Field(default="Dates TBD")
    venue: str = Field(default="Venue TBD")
    about_text: str = Field(default="Details regarding the exhibition...")
    is_active: bool = Field(default=False)
    tnc_pdf_url: Optional[str] = None
    registration_fee: str = Field(default="")
    payment_instructions: str = Field(default="")
    payment_qr_url: Optional[str] = None
    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )
