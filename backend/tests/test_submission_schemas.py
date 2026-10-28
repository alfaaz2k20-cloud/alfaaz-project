import pytest
from pydantic import ValidationError
from app.schemas.submission import VaultSubmission

def test_vault_submission_valid():
    sub = VaultSubmission(
        submission_type="Poetry",
        title="Ode to the Jhelum",
        file_url="https://res.cloudinary.com/dmqwjpmjk/raw/upload/poem.pdf",
        note="Written during winter in Srinagar."
    )
    assert sub.submission_type == "Poetry"
    assert sub.title == "Ode to the Jhelum"
    assert sub.file_url == "https://res.cloudinary.com/dmqwjpmjk/raw/upload/poem.pdf"

@pytest.mark.parametrize("hostile_url", [
    "javascript:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    "vbscript:msgbox(1)",
    "ftp://malicious.org/payload.exe",
    "http://",
    "https://",
    "/local/path/without/host",
    "not-a-url",
])
def test_vault_submission_hostile_url_rejected(hostile_url):
    with pytest.raises(ValidationError):
        VaultSubmission(
            submission_type="Manuscript",
            title="Untilted Document",
            file_url=hostile_url
        )

def test_vault_submission_length_bounds():
    with pytest.raises(ValidationError):
        VaultSubmission(
            submission_type="",
            title="Valid Title",
            file_url="https://example.com/doc.pdf"
        )
    with pytest.raises(ValidationError):
        VaultSubmission(
            submission_type="Manuscript",
            title="",
            file_url="https://example.com/doc.pdf"
        )
