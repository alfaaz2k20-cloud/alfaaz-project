from pydantic import BaseModel, Field, field_validator
from typing import Optional, Literal

class ExhibitionApplicationCreate(BaseModel):
    full_name: str = Field(..., min_length=1, max_length=100)
    age: int = Field(..., ge=16, le=120)
    address: str = Field(..., min_length=1, max_length=300)
    whatsapp: str = Field(..., min_length=5, max_length=30)
    genre: str = Field(..., min_length=1, max_length=100)
    medium: str = Field(..., min_length=1, max_length=100)
    portfolio_url: str = Field(..., min_length=5, max_length=1000)
    over_19: bool
    agreed_to_screening: bool
    applicant_note: Optional[str] = Field(None, max_length=1000)

class ExhibitionReview(BaseModel):
    application_id: int
    status: Literal["APPROVED", "REJECTED", "PENDING"]
    curator_note: Optional[str] = Field(None, max_length=1000)

class ExhibitionConfigSchema(BaseModel):
    title: str = Field(..., min_length=1, max_length=150)
    date_text: str = Field(..., min_length=1, max_length=100)
    venue: str = Field(..., min_length=1, max_length=200)
    about_text: str = Field(..., min_length=1, max_length=3000)
    tnc_pdf_url: Optional[str] = Field(None, max_length=1000)
    registration_fee: str = Field("", max_length=100)
    payment_instructions: str = Field("", max_length=2000)
    payment_qr_url: Optional[str] = Field(None, max_length=1000)

class ExhibitionRegistrationSubmit(BaseModel):
    agreed_to_tnc: bool
    payment_proof_url: str = Field(..., min_length=5, max_length=1000)
    participant_note_reg: Optional[str] = Field(None, max_length=1000)

class PaymentConfirm(BaseModel):
    application_id: int
