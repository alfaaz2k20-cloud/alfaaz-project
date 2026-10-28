from pydantic import BaseModel, field_validator
from typing import Optional

class UserRegister(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None

    @field_validator("password")
    @classmethod
    def password_strength(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters.")
        if v.isdigit():
            raise ValueError("Password cannot be all numbers.")
        return v

    @field_validator("email")
    @classmethod
    def normalise_email(cls, v: str) -> str:
        return v.strip().lower()

class UserLogin(BaseModel):
    email: str
    password: str

    @field_validator("email")
    @classmethod
    def normalise_email(cls, v: str) -> str:
        return v.strip().lower()

class ForgotPassword(BaseModel):
    email: str

    @field_validator("email")
    @classmethod
    def normalise_email(cls, v: str) -> str:
        return v.strip().lower()

class ResetPassword(BaseModel):
    token: str
    new_password: str

    @field_validator("new_password")
    @classmethod
    def password_strength(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters.")
        if v.isdigit():
            raise ValueError("Password cannot be all numbers.")
        return v

class StatusUpdate(BaseModel):
    email: str
    status: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None