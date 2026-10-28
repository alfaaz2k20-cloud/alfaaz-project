from pydantic import BaseModel, Field, field_validator
from typing import Optional
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

class VaultSubmission(BaseModel):
    submission_type: str = Field(..., min_length=1, max_length=50)
    title: str = Field(..., min_length=1, max_length=200)
    file_url: str = Field(..., min_length=5, max_length=1000)
    note: Optional[str] = Field(None, max_length=1500)
    author_email: Optional[str] = Field(None, max_length=150)

    @field_validator("file_url")
    @classmethod
    def validate_file_url(cls, v: str) -> str:
        res = _validate_safe_http_url(v)
        if not res:
            raise ValueError("file_url cannot be empty and must be a valid http(s) URL")
        return res
