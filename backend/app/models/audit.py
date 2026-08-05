from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, DateTime, func

class DBAuditLog(SQLModel, table=True):
    __tablename__ = "admin_audit_logs"
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    admin_email: str = Field(index=True)
    action: str = Field(index=True)
    target_type: str
    target_id: Optional[str] = None
    details: Optional[str] = None
    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )
