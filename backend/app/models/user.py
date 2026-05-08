from typing import Optional
from sqlmodel import SQLModel, Field

class DBUser(SQLModel, table=True):
    __tablename__ = "users"
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    email: str = Field(unique=True, index=True)
    password: str
    full_name: Optional[str] = None
    status: str = Field(default="PARTICIPANT")
