import sys
import logging

try:
    sys.stdout.reconfigure(line_buffering=True)
except Exception:
    pass

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    stream=sys.stdout
)
logger = logging.getLogger("app.main")

from app.routers import admin, auth, blogs, clubs, curator, events, exhibitions
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

# Import Database Core
from app.db.session import engine, SessionLocal
from app.db.base import Base
from app.models.user import DBUser
from app.models.audit import DBAuditLog
from app.core.config import ADMIN_PASSWORD, FRONTEND_ORIGINS
from app.core.security import get_password_hash

# Import Routers
from app.routers import vault

# Create Database Tables
logger.info("Starting Base.metadata.create_all...")
Base.metadata.create_all(bind=engine)
logger.info("Base.metadata.create_all completed successfully.")

# Ensure schema backward-compatibility for newly added columns
logger.info("Starting schema migration check...")
from sqlalchemy import inspect as sa_inspect, text as sa_text
try:
    with engine.begin() as _conn:
        _insp = sa_inspect(_conn)
        _tables = _insp.get_table_names()
        _conn_dialect = _conn.dialect.name
        logger.info("Database connection established (dialect: %s). Found %d existing table(s).", _conn_dialect, len(_tables))

        def _add_missing_columns(table_name: str, cols: list):
            if table_name not in _tables:
                return
            existing_cols = {c["name"] for c in _insp.get_columns(table_name)}
            added = 0
            for col_name, col_type in cols:
                if col_name not in existing_cols:
                    try:
                        with _conn.begin_nested():
                            _conn.execute(sa_text(f"ALTER TABLE {table_name} ADD COLUMN {col_name} {col_type}"))
                        existing_cols.add(col_name)
                        added += 1
                    except Exception as _err:
                        logger.warning("[DB Migration] Notice adding %s.%s: %s", table_name, col_name, _err)
            if added > 0:
                logger.info("[DB Migration] Added %d missing column(s) to %s.", added, table_name)

        # 1. Evidence schema synchronization (All DBEvidence fields)
        _add_missing_columns("evidence", [
            ("version", "INTEGER DEFAULT 1"),
            ("is_superseded", "BOOLEAN DEFAULT FALSE"),
            ("superseded_at", "TIMESTAMP WITH TIME ZONE"),
            ("spec_version", "VARCHAR DEFAULT '2026-10-v2'"),
            ("sjt_version", "VARCHAR DEFAULT '2026-09-rev'"),
            ("scoring_version", "VARCHAR DEFAULT 'game_sjt_scoring_v1'"),
            ("feature_version", "VARCHAR DEFAULT '1.0'"),
            ("config_hash", "VARCHAR"),
            ("sjt_raw", "INTEGER"),
            ("sjt_min", "INTEGER"),
            ("sjt_max", "INTEGER"),
            ("sjt_span", "INTEGER"),
            ("sjt_num", "INTEGER"),
            ("sjt_relative", "FLOAT"),
            ("sjt_band", "VARCHAR"),
            ("predicted_sjt_relative", "FLOAT"),
            ("model_version", "VARCHAR"),
            ("prediction_status", "VARCHAR"),
            ("game_raw", "FLOAT"),
            ("game_min", "FLOAT"),
            ("game_max", "FLOAT"),
            ("game_span", "FLOAT"),
            ("game_num", "FLOAT"),
            ("game_relative", "FLOAT"),
            ("game_observation_count", "INTEGER DEFAULT 0"),
            ("game_consistency_spread", "FLOAT"),
            ("cross_method_delta", "FLOAT"),
            ("profile_completeness", "VARCHAR DEFAULT 'INSUFFICIENT'"),
            ("game_status", "VARCHAR DEFAULT 'INSUFFICIENT'"),
            ("game_band", "VARCHAR"),
            ("consistency", "VARCHAR DEFAULT 'NOT_COMPUTED'"),
            ("relationship", "VARCHAR DEFAULT 'NOT_COMPUTED'"),
            ("confidence", "VARCHAR DEFAULT 'LIMITED'"),
            ("observed_behavior_summary", "TEXT"),
            ("data_quality_flags_json", "TEXT DEFAULT '[]'")
        ])

        # Drop legacy unique constraint that prevented multi-version evidence persistence
        for _drop_sql in [
            "ALTER TABLE evidence DROP CONSTRAINT IF EXISTS uq_session_parameter",
            "ALTER TABLE evidence DROP CONSTRAINT IF EXISTS evidence_session_id_parameter_key",
            "DROP INDEX IF EXISTS uq_session_parameter",
            "DROP INDEX IF EXISTS ix_evidence_session_id_parameter"
        ]:
            try:
                with _conn.begin_nested():
                    _conn.execute(sa_text(_drop_sql))
            except Exception as _c_err:
                logger.debug("[DB Migration] Drop legacy constraint notice: %s", _c_err)

        try:
            with _conn.begin_nested():
                _conn.execute(sa_text("CREATE UNIQUE INDEX IF NOT EXISTS uq_session_parameter_version ON evidence (session_id, parameter, version)"))
        except Exception as _idx_err:
            logger.debug("[DB Migration] Unique index notice: %s", _idx_err)

        # 2. Recruit Sessions
        _add_missing_columns("recruit_sessions", [
            ("completed_at", "TIMESTAMP WITH TIME ZONE"),
            ("order_id", "INTEGER"),
            ("device_class", "VARCHAR"),
            ("input_modality", "VARCHAR")
        ])

        # 3. Telemetry events & Features
        _add_missing_columns("telemetry_events", [
            ("task_def_version", "VARCHAR DEFAULT '1.0'")
        ])
        _add_missing_columns("features", [
            ("adjust_method", "VARCHAR")
        ])

        # 4. Explicit game_scores table creation
        try:
            with _conn.begin_nested():
                if _conn_dialect == "postgresql":
                    _conn.execute(sa_text("""
                        CREATE TABLE IF NOT EXISTS game_scores (
                            id SERIAL PRIMARY KEY,
                            session_id VARCHAR NOT NULL,
                            game_id VARCHAR NOT NULL,
                            parameter VARCHAR NOT NULL,
                            raw_score FLOAT,
                            min_score FLOAT,
                            max_score FLOAT,
                            span FLOAT,
                            num FLOAT,
                            relative_score FLOAT,
                            band VARCHAR,
                            status VARCHAR DEFAULT 'INSUFFICIENT',
                            task_def_version VARCHAR DEFAULT '1.0',
                            scoring_version VARCHAR DEFAULT 'game_sjt_scoring_v1',
                            observation_count INTEGER DEFAULT 0,
                            flags_json TEXT DEFAULT '[]',
                            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                            CONSTRAINT uq_session_game UNIQUE (session_id, game_id)
                        )
                    """))
                else:
                    _conn.execute(sa_text("""
                        CREATE TABLE IF NOT EXISTS game_scores (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            session_id VARCHAR NOT NULL,
                            game_id VARCHAR NOT NULL,
                            parameter VARCHAR NOT NULL,
                            raw_score FLOAT,
                            min_score FLOAT,
                            max_score FLOAT,
                            span FLOAT,
                            num FLOAT,
                            relative_score FLOAT,
                            band VARCHAR,
                            status VARCHAR DEFAULT 'INSUFFICIENT',
                            task_def_version VARCHAR DEFAULT '1.0',
                            scoring_version VARCHAR DEFAULT 'game_sjt_scoring_v1',
                            observation_count INTEGER DEFAULT 0,
                            flags_json TEXT DEFAULT '[]',
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            CONSTRAINT uq_session_game UNIQUE (session_id, game_id)
                        )
                    """))
        except Exception as _gs_tbl_err:
            logger.warning("[DB Migration] Notice ensuring game_scores table: %s", _gs_tbl_err)

    logger.info("Schema migration check completed successfully.")
except Exception as _e:
    logger.warning("Schema migration notice: %s", _e)

# Initialize Application
logger.info("Initializing FastAPI application...")
app = FastAPI(title="Alfaaz Collective API", version="2.0")
logger.info("FastAPI application initialized.")



# Setup CORS Middleware (Restricted origins, methods, headers per R2 Section 5.3)
app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS + [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ],
    allow_origin_regex=r"^https://alfaaz-project-[a-zA-Z0-9_-]+\.vercel\.app$",
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
)

# Connect Routers
logger.info("Registering API routers...")
app.include_router(auth.router)
app.include_router(events.router)
app.include_router(curator.router)
app.include_router(clubs.router)
app.include_router(exhibitions.router)
app.include_router(admin.router)
app.include_router(blogs.router)
app.include_router(vault.router)

# ==============================================================================
# ALFAAZ RECRUITMENT SYSTEM (Side-Loaded Plugin)
# ==============================================================================
try:
    import os
    import sys
    recruit_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../alfaaz-recruit-system/backend"))
    if recruit_path not in sys.path:
        sys.path.insert(0, recruit_path)
    
    # Import recruit models to register them with SQLModel/Base
    from recruit_system.models import recruit as recruit_models
    from sqlmodel import SQLModel
    try:
        SQLModel.metadata.create_all(bind=engine)
        logger.info("Recruit System SQLModel tables verified/created.")
    except Exception as _table_err:
        logger.warning(f"Notice creating SQLModel tables: {_table_err}")
    
    # Import recruit routers
    from recruit_system.routers import recruit, research_view
    
    # Apply recruit body limit middleware for /recruit endpoints
    from starlette.middleware.base import BaseHTTPMiddleware
    
    class RecruitBodyLimitMiddleware(BaseHTTPMiddleware):
        async def dispatch(self, request: Request, call_next):
            path = request.url.path
            if path.startswith("/recruit"):
                max_limit = 256 * 1024 if path.endswith("/telemetry") else 16 * 1024
                cl = request.headers.get("content-length")
                if cl and int(cl) > max_limit:
                    return JSONResponse(status_code=413, content={"detail": f"Request body exceeds {max_limit} bytes"})
            return await call_next(request)
            
    app.add_middleware(RecruitBodyLimitMiddleware)
    
    # Mount routers
    app.include_router(recruit.router)
    app.include_router(research_view.router)
    logger.info("Recruitment System Plugin successfully mounted.")
except Exception as e:
    logger.error(f"Failed to mount Recruitment System Plugin: {e}")
# ==============================================================================

logger.info("All API routers registered successfully.")

# Server Startup Script (Ensures Admin exists)
@app.on_event("startup")
def on_startup():
    logger.info("Executing on_startup lifecycle handler...")
    try:
        db = SessionLocal()
        master_email = "admin@alfaaz.com"
        
        # Check if master admin exists, if not, create it
        if not db.query(DBUser).filter(DBUser.email == master_email).first():
            master = DBUser(
                email=master_email,
                password=get_password_hash(ADMIN_PASSWORD),
                status="ADMIN",
                full_name="The Curator"
            )
            db.add(master)
            db.commit()
            logger.info("Default master admin created.")
        else:
            logger.info("Master admin verified.")
        db.close()
        logger.info("Database startup checks passed.")
    except Exception as e:
        logger.error("Database on_startup notice: %s", e)
    logger.info("Application startup lifecycle complete. Port binding ready.")

# Health Check Route
@app.get("/ping")
def ping():
    return {"status": "ALIVE", "message": "The monolith has been defeated."}

# The frontend owns browser routes; this is only the API root fallback.
@app.get("/")
def root():
    return {"status": "Alfaaz backend is live"}
