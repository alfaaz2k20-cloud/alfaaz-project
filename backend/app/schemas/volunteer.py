from pydantic import BaseModel, Field
from typing import Optional

class VolunteerApplicationCreate(BaseModel):
    Name: str = Field(..., max_length=150)
    Email: str = Field(..., max_length=150)
    Phone: str = Field(..., max_length=50)
    Interests: Optional[str] = ""
    empathy: int = 0
    conscientiousness: int = 0
    collaborative: int = 0
    emotional: int = 0
    curiosity: int = 0
    creative: int = 0
    DominantTrait: Optional[str] = ""
    Responses: Optional[str] = ""
    Notes: Optional[str] = ""
