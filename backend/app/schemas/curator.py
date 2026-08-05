from typing import Literal

from pydantic import BaseModel, Field


class PhantomMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(..., min_length=1, max_length=1000)


class PhantomQuery(BaseModel):
    question: str = Field(..., min_length=1, max_length=1000)
    history: list[PhantomMessage] = Field(default_factory=list, max_length=12)
