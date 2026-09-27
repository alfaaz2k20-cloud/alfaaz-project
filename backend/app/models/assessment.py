from sqlmodel import Field, Column
from sqlalchemy import Text
from typing import Optional
from datetime import datetime, timezone
from app.db.base import Base

class DBAssessment(Base, table=True):
    __tablename__ = "assessments"
    id: str = Field(primary_key=True)
    applicant_id: Optional[int] = Field(default=None) # Optional link to a registered user or DBVolunteerApplication
    session_id: str
    started_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    completed_at: Optional[datetime] = Field(default=None)
    status: str = Field(default="in_progress") # in_progress, completed, abandoned
    
    # Participant identity
    name: str = Field(max_length=150, default="")
    email: str = Field(max_length=150, default="")
    phone: str = Field(max_length=50, default="")
    interests: Optional[str] = Field(default="", sa_column=Column(Text))
    notes: Optional[str] = Field(default="", sa_column=Column(Text))

class DBAssessmentEvent(Base, table=True):
    __tablename__ = "assessment_events"
    id: Optional[int] = Field(default=None, primary_key=True)
    assessment_id: str = Field(index=True)
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    simulated_time: str
    scene_id: str
    decision_id: str
    action: str = Field(sa_column=Column(Text))
    action_duration: int # Real time taken (ms)
    timer_expired: bool = Field(default=False)
    state_before: str = Field(sa_column=Column(Text))
    state_after: str = Field(sa_column=Column(Text))
    consequence_id: Optional[str] = Field(default=None)

class DBBehavioralObservation(Base, table=True):
    __tablename__ = "behavioral_observations"
    id: Optional[int] = Field(default=None, primary_key=True)
    assessment_id: str = Field(index=True)
    event_id: Optional[int] = Field(default=None)
    behavior_tag: str
    direction: str # positive, negative, neutral
    strength: float = Field(default=1.0)
    context: str = Field(sa_column=Column(Text))

class DBConstructEvidence(Base, table=True):
    __tablename__ = "construct_evidence"
    id: Optional[int] = Field(default=None, primary_key=True)
    assessment_id: str = Field(index=True)
    construct: str
    supporting_count: int = Field(default=0)
    counter_count: int = Field(default=0)
    context_count: int = Field(default=0)
    confidence: str # low, moderate, high
    interpretation: str = Field(sa_column=Column(Text))

class DBRoleFit(Base, table=True):
    __tablename__ = "role_fit"
    id: Optional[int] = Field(default=None, primary_key=True)
    assessment_id: str = Field(index=True)
    role: str
    evidence_strength: str # low, moderate, strong
    confidence: str # low, moderate, high
    interpretation: str = Field(sa_column=Column(Text))
