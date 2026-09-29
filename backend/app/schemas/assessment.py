from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class IdentityCapture(BaseModel):
    name: str = Field(..., max_length=150)
    email: str = Field(..., max_length=150)
    phone: str = Field(..., max_length=50)

class AssessmentStartRequest(BaseModel):
    assessment_id: str
    session_id: str
    identity: IdentityCapture

class AssessmentEventCreate(BaseModel):
    timestamp: str
    simulated_time: str
    scene_id: str
    decision_id: Optional[str] = None
    action: str
    action_duration: int
    timer_expired: bool
    state_before: Optional[str] = None
    state_after: Optional[str] = None
    consequence_id: Optional[str] = None
    behavior_tags: Optional[List[Dict[str, Any]]] = None

class AssessmentCompleteRequest(BaseModel):
    interests: Optional[str] = ""
    notes: Optional[str] = ""

class BehavioralInterpretationRequest(BaseModel):
    assessment_id: str
    construct_evidence: List[Dict[str, Any]]
    role_fits: List[Dict[str, Any]]
