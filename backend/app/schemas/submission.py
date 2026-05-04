from pydantic import BaseModel
from typing import Optional

class VaultSubmission(BaseModel):
    submission_type: str
    title: str
    file_url: str
    note: Optional[str] = None
    author_email: str