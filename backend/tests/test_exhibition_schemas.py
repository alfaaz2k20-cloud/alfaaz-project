import pytest
from pydantic import ValidationError
from app.schemas.exhibition import (
    ExhibitionApplicationCreate,
    ExhibitionConfigSchema,
    ExhibitionRegistrationSubmit,
)

def test_exhibition_application_valid_url():
    data = {
        "full_name": "Test Artist",
        "age": 25,
        "address": "123 Art Lane",
        "whatsapp": "+919876543210",
        "genre": "Abstract",
        "medium": "Oil on Canvas",
        "portfolio_url": "https://drive.google.com/portfolio.pdf",
        "over_19": True,
        "agreed_to_screening": True,
        "applicant_note": "Excited to join"
    }
    app = ExhibitionApplicationCreate(**data)
    assert app.portfolio_url == "https://drive.google.com/portfolio.pdf"

@pytest.mark.parametrize("hostile_url", [
    "javascript:alert(document.cookie)",
    "data:text/html,<script>alert(1)</script>",
    "vbscript:msgbox(1)",
    "ftp://example.com/file",
    "http://",
    "https://",
    "not-a-url",
])
def test_exhibition_application_hostile_url_rejected(hostile_url):
    data = {
        "full_name": "Test Artist",
        "age": 25,
        "address": "123 Art Lane",
        "whatsapp": "+919876543210",
        "genre": "Abstract",
        "medium": "Oil on Canvas",
        "portfolio_url": hostile_url,
        "over_19": True,
        "agreed_to_screening": True,
    }
    with pytest.raises(ValidationError):
        ExhibitionApplicationCreate(**data)

def test_exhibition_registration_submit_validation():
    # Valid
    sub = ExhibitionRegistrationSubmit(
        agreed_to_tnc=True,
        payment_proof_url="https://res.cloudinary.com/demo/image/upload/sample.jpg"
    )
    assert sub.payment_proof_url == "https://res.cloudinary.com/demo/image/upload/sample.jpg"

    # Hostile
    with pytest.raises(ValidationError):
        ExhibitionRegistrationSubmit(
            agreed_to_tnc=True,
            payment_proof_url="javascript:stealToken()"
        )

def test_exhibition_config_schema_urls():
    # Valid with URLs
    cfg = ExhibitionConfigSchema(
        title="Spring Showcase",
        date_text="May 2026",
        venue="Alfaaz Pavilion",
        about_text="An exhibition of contemporary works.",
        tnc_pdf_url="https://example.com/terms.pdf",
        payment_qr_url="https://example.com/qr.png"
    )
    assert cfg.tnc_pdf_url == "https://example.com/terms.pdf"

    # Valid with None
    cfg_none = ExhibitionConfigSchema(
        title="Spring Showcase",
        date_text="May 2026",
        venue="Alfaaz Pavilion",
        about_text="An exhibition of contemporary works.",
        tnc_pdf_url=None,
        payment_qr_url=None
    )
    assert cfg_none.tnc_pdf_url is None

    # Hostile URLs
    with pytest.raises(ValidationError):
        ExhibitionConfigSchema(
            title="Spring Showcase",
            date_text="May 2026",
            venue="Alfaaz Pavilion",
            about_text="An exhibition of contemporary works.",
            tnc_pdf_url="javascript:alert(1)"
        )
