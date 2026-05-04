from pydantic import BaseModel

class BlogGenerateRequest(BaseModel):
    topic: str | None = None