from pydantic import BaseModel

class PhantomQuery(BaseModel):
    question: str