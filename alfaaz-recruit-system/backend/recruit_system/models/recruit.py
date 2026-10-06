from typing import Optional, List, Dict, Any
from datetime import datetime, timezone
from sqlmodel import SQLModel, Field, Column
from sqlalchemy import DateTime, func, UniqueConstraint, Text

class DBApplicantIdentity(SQLModel, table=True):
    __tablename__ = "applicant_identities"
    session_id: str = Field(primary_key=True, index=True)
    full_name: str
    email: str = Field(index=True)
    phone_or_contact: Optional[str] = None
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )

class DBSession(SQLModel, table=True):
    __tablename__ = "recruit_sessions"
    session_id: str = Field(primary_key=True, index=True)
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )
    status: str = Field(default="CONSENTED", index=True)  # CONSENTED, SJT, ACTIVE, COMPLETE
    current_screen: Optional[str] = None
    order_id: Optional[int] = Field(default=None, index=True)
    spec_version: str = Field(default="2026-10-v2")
    sjt_version: str = Field(default="2026-09-rev")
    scoring_version: str = Field(default="1.0-exact-thirds")
    feature_version: str = Field(default="1.0")
    config_hash: Optional[str] = None
    device_class: Optional[str] = None
    input_modality: Optional[str] = None
    completed_at: Optional[datetime] = Field(default=None, sa_column=Column(DateTime(timezone=True)))

class DBConsentRecord(SQLModel, table=True):
    __tablename__ = "consent_records"
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    session_id: str = Field(unique=True, index=True)
    consent_text_version: str
    timestamp: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )
    choices_json: str = Field(default="{}")
    confirmed_18_plus: bool = Field(default=True)

class DBAccessibilityProfile(SQLModel, table=True):
    __tablename__ = "accessibility_profiles"
    session_id: str = Field(primary_key=True, index=True)
    modes_enabled_json: str = Field(default="[]")
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )

class DBWarmupBaseline(SQLModel, table=True):
    __tablename__ = "warmup_baselines"
    session_id: str = Field(primary_key=True, index=True)
    tap_latency_baseline_ms: Optional[float] = None
    movement_speed_baseline: Optional[float] = None
    reading_dwell_baseline_ms: Optional[float] = None
    pointer_type: Optional[str] = None
    viewport_class: Optional[str] = None
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )

class DBTaskAssignment(SQLModel, table=True):
    __tablename__ = "task_assignments"
    session_id: str = Field(primary_key=True, index=True)
    world_order_id: int
    world_sequence_json: str  # e.g. ["W2", "W7", "W4", "W5", "W6", "W1", "W3"]
    seeds_json: str  # Dict of per-minigame random seeds
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )

class DBSJTResponse(SQLModel, table=True):
    __tablename__ = "sjt_responses"
    __table_args__ = (UniqueConstraint("session_id", "scenario_id", name="uq_session_scenario"),)
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    session_id: str = Field(index=True)
    scenario_id: str = Field(index=True)
    option_id: str
    t_ms: Optional[float] = None
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )

class DBTelemetryEvent(SQLModel, table=True):
    __tablename__ = "telemetry_events"
    __table_args__ = (UniqueConstraint("session_id", "seq", name="uq_session_seq"),)
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    session_id: str = Field(index=True)
    seq: int = Field(index=True)
    segment_id: int
    t_ms: float
    server_received: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )
    screen: str
    game_world: Optional[str] = None
    mini_game: Optional[str] = None
    trial: Optional[int] = None
    action: str
    input_type: Optional[str] = None
    task_def_version: Optional[str] = Field(default=None)
    state_json: Optional[str] = None
    data_json: Optional[str] = None

class DBFeature(SQLModel, table=True):
    __tablename__ = "features"
    __table_args__ = (UniqueConstraint("session_id", "mini_game", "feature_name", name="uq_session_mg_feature"),)
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    session_id: str = Field(index=True)
    mini_game: str = Field(index=True)
    feature_name: str = Field(index=True)
    value_raw: Optional[float] = None
    value_adjusted: Optional[float] = None
    adjust_method: Optional[str] = None
    feature_version: str = Field(default="1.0")
    valid: bool = Field(default=True)
    flags_json: str = Field(default="[]")

class DBGameScore(SQLModel, table=True):
    __tablename__ = "game_scores"
    __table_args__ = (UniqueConstraint("session_id", "game_id", name="uq_session_game"),)
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    session_id: str = Field(index=True)
    game_id: str = Field(index=True)
    parameter: str = Field(index=True)
    raw_score: Optional[float] = None
    min_score: Optional[float] = None
    max_score: Optional[float] = None
    span: Optional[float] = None
    num: Optional[float] = None
    relative_score: Optional[float] = None
    band: Optional[str] = None
    status: str = Field(default="INSUFFICIENT")  # USABLE, INSUFFICIENT, INVALID
    task_def_version: str = Field(default="1.0")
    scoring_version: str = Field(default="game_sjt_scoring_v1")
    observation_count: int = Field(default=0)
    flags_json: str = Field(default="[]")
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )

class DBEvidence(SQLModel, table=True):
    __tablename__ = "evidence"
    __table_args__ = (UniqueConstraint("session_id", "parameter", "version", name="uq_session_parameter_version"),)
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    session_id: str = Field(index=True)
    parameter: str = Field(index=True)
    version: int = Field(default=1, index=True)
    is_superseded: bool = Field(default=False, index=True)
    superseded_at: Optional[datetime] = Field(default=None, sa_column=Column(DateTime(timezone=True)))
    spec_version: str = Field(default="2026-10-v2")
    sjt_version: str = Field(default="2026-09-rev")
    scoring_version: str = Field(default="game_sjt_scoring_v1")
    feature_version: str = Field(default="1.0")
    config_hash: Optional[str] = None
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )
    sjt_raw: Optional[int] = None
    sjt_min: Optional[int] = None
    sjt_max: Optional[int] = None
    sjt_span: Optional[int] = None
    sjt_num: Optional[int] = None
    sjt_relative: Optional[float] = None
    sjt_band: Optional[str] = None  # HIGH, MODERATE, LOW
    predicted_sjt_relative: Optional[float] = None  # Historical/deactivated
    model_version: Optional[str] = None             # Historical/deactivated
    prediction_status: Optional[str] = None         # Historical/deactivated
    game_raw: Optional[float] = None
    game_min: Optional[float] = None
    game_max: Optional[float] = None
    game_span: Optional[float] = None
    game_num: Optional[float] = None
    game_relative: Optional[float] = None
    game_observation_count: Optional[int] = None
    game_consistency_spread: Optional[float] = None
    cross_method_delta: Optional[float] = None
    fused_relative: Optional[float] = None
    profile_relative_score: Optional[float] = None  # 0 to 100 within-person scale
    profile_relative_rank: Optional[int] = None     # 1 to 7 within-person rank
    profile_relative_level: Optional[str] = None    # RELATIVELY_STRONG, RELATIVELY_MIDDLE, RELATIVELY_LOWER, ABOUT_EQUAL
    profile_completeness: Optional[str] = None      # COMPLETE, SJT_ONLY, PARTIAL, INSUFFICIENT
    game_status: str = Field(default="INSUFFICIENT") # USABLE, INSUFFICIENT, INVALID
    game_band: Optional[str] = None # UNCALIBRATED or None
    consistency: str = Field(default="NOT_COMPUTED") # CONSISTENT, VARIED, INSUFFICIENT, NOT_COMPUTED
    relationship: str = Field(default="NOT_COMPUTED") # ALIGNED, PARTLY_ALIGNED, DIFFERENT, NOT_ENOUGH_EVIDENCE, NOT_AVAILABLE
    confidence: str = Field(default="LIMITED") # LIMITED, MODERATE, SUBSTANTIAL
    observed_behavior_summary: Optional[str] = None
    data_quality_flags_json: str = Field(default="[]")

class DBDataQualityFlag(SQLModel, table=True):
    __tablename__ = "data_quality_flags"
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    session_id: str = Field(index=True)
    scope: str = Field(index=True)  # session, SJT, W1..W7, F1..M3
    flag: str = Field(index=True)
    detail: Optional[str] = None
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )

class DBOutcome(SQLModel, table=True):
    __tablename__ = "volunteer_outcomes"
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    session_id: str = Field(index=True)
    outcome_type: str = Field(index=True)
    value: str
    recorded_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )
    recorded_by: Optional[str] = None

class DBRecruiterAccessLog(SQLModel, table=True):
    __tablename__ = "recruiter_access_logs"
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    admin_email: str = Field(index=True)
    session_id: str = Field(index=True)
    viewed_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )
    ip_address: Optional[str] = None
