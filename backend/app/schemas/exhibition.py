from pydantic import BaseModel
from typing import Optional

class ExhibitionApplicationCreate(BaseModel):
    full_name: str
    age: int
    address: str
    whatsapp: str
    genre: str
    medium: str
    portfolio_url: str
    over_19: bool
    agreed_to_screening: bool
    applicant_note: Optional[str] = None

class ExhibitionReview(BaseModel):
    application_id: int
    status: str
    curator_note: Optional[str] = None

class ExhibitionConfigSchema(BaseModel):
    title: str
    date_text: str
    venue: str
    about_text: str
    is_open: bool
    tnc_pdf_url: Optional[str] = None
    registration_fee: str = ""
    payment_instructions: str = ""
    payment_qr_url: Optional[str] = None

class ExhibitionRegistrationSubmit(BaseModel):
    agreed_to_tnc: bool
    payment_proof_url: str
    participant_note_reg: Optional[str] = None

class PaymentConfirm(BaseModel):
    application_id: int