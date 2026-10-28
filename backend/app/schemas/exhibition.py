from pydantic import BaseModel, Field, field_validator
from typing import Optional, Literal
from urllib.parse import urlparse

def _validate_safe_http_url(v: Optional[str]) -> Optional[str]:
    if v is None:
        return v
    v = v.strip()
    if not v:
        return None
    parsed = urlparse(v)
    if parsed.scheme.lower() not in ("http", "https") or not parsed.netloc:
        raise ValueError("URL must start with http:// or https:// and include a valid domain")
    return v

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

    @field_validator("portfolio_url")
    @classmethod
    def validate_portfolio_url(cls, v: str) -> str:
        res = _validate_safe_http_url(v)
        if not res:
            raise ValueError("portfolio_url cannot be empty and must be a valid http(s) URL")
        return res

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

    @field_validator("tnc_pdf_url", "payment_qr_url")
    @classmethod
    def validate_config_urls(cls, v: Optional[str]) -> Optional[str]:
        return _validate_safe_http_url(v)

class ExhibitionRegistrationSubmit(BaseModel):
    agreed_to_tnc: bool
    payment_proof_url: str = Field(..., min_length=5, max_length=1000)
    participant_note_reg: Optional[str] = Field(None, max_length=1000)

    @field_validator("payment_proof_url")
    @classmethod
    def validate_payment_proof_url(cls, v: str) -> str:
        res = _validate_safe_http_url(v)
        if not res:
            raise ValueError("payment_proof_url cannot be empty and must be a valid http(s) URL")
        return res

class PaymentConfirm(BaseModel):
    application_id: int
