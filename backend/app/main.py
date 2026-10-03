from app.routers import admin, auth, blogs, clubs, curator, events, exhibitions, recruit, research_view
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

# Import Database Core
from app.db.session import engine, SessionLocal
from app.db.base import Base
from app.models.user import DBUser
from app.models.audit import DBAuditLog
import app.models.recruit
from app.core.config import ADMIN_PASSWORD, FRONTEND_ORIGINS
from app.core.security import get_password_hash

# Import Routers
from app.routers import vault

# Create Database Tables
Base.metadata.create_all(bind=engine)

# Ensure schema backward-compatibility for newly added columns
from sqlalchemy import inspect as sa_inspect, text as sa_text
try:
    with engine.begin() as _conn:
        _insp = sa_inspect(_conn)
        _tables = _insp.get_table_names()
        _conn_dialect = _conn.dialect.name

        def _add_column_if_missing(table_name: str, col_name: str, col_type: str):
            if table_name in _tables:
                existing = [c["name"] for c in _insp.get_columns(table_name)]
                if col_name not in existing:
                    try:
                        _conn.execute(sa_text(f"ALTER TABLE {table_name} ADD COLUMN {col_name} {col_type}"))
                    except Exception as _err:
                        print(f"[DB Migration] Notice: adding {table_name}.{col_name}: {_err}")

        # 1. telemetry_events
        _missing_te = [
            ("server_received", "DATETIME DEFAULT CURRENT_TIMESTAMP" if _conn_dialect == "sqlite" else "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"),
            ("game_world", "VARCHAR"),
            ("mini_game", "VARCHAR"),
            ("trial", "INTEGER"),
            ("input_type", "VARCHAR"),
            ("task_def_version", "VARCHAR DEFAULT '1.0'"),
            ("state_json", "TEXT"),
            ("data_json", "TEXT")
        ]
        for _cname, _ctype in _missing_te:
            _add_column_if_missing("telemetry_events", _cname, _ctype)

        # 2. evidence
        _missing_ev = [
            ("version", "INTEGER DEFAULT 1"),
            ("is_superseded", "BOOLEAN DEFAULT 0" if _conn_dialect == "sqlite" else "BOOLEAN DEFAULT FALSE"),
            ("superseded_at", "DATETIME" if _conn_dialect == "sqlite" else "TIMESTAMP"),
            ("spec_version", "VARCHAR DEFAULT '2026-10-v2'"),
            ("sjt_version", "VARCHAR DEFAULT '2026-09-rev'"),
            ("scoring_version", "VARCHAR DEFAULT '1.0-exact-thirds'"),
            ("feature_version", "VARCHAR DEFAULT '1.0'"),
            ("config_hash", "VARCHAR"),
            ("created_at", "DATETIME DEFAULT CURRENT_TIMESTAMP" if _conn_dialect == "sqlite" else "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"),
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
            ("fused_relative", "FLOAT"),
            ("profile_relative_score", "FLOAT"),
            ("profile_relative_rank", "INTEGER"),
            ("profile_relative_level", "VARCHAR"),
            ("profile_completeness", "VARCHAR"),
            ("game_status", "VARCHAR DEFAULT 'INSUFFICIENT'"),
            ("game_band", "VARCHAR"),
            ("consistency", "VARCHAR DEFAULT 'NOT_COMPUTED'"),
            ("relationship", "VARCHAR DEFAULT 'NOT_COMPUTED'"),
            ("confidence", "VARCHAR DEFAULT 'LIMITED'"),
            ("observed_behavior_summary", "TEXT"),
            ("data_quality_flags_json", "TEXT DEFAULT '[]'"),
            ("cross_method_delta", "FLOAT"),
            ("game_raw", "FLOAT"),
            ("game_min", "FLOAT"),
            ("game_max", "FLOAT"),
            ("game_span", "FLOAT"),
            ("game_num", "FLOAT"),
            ("game_relative", "FLOAT"),
            ("game_observation_count", "INTEGER"),
            ("game_consistency_spread", "FLOAT")
        ]
        for _cname, _ctype in _missing_ev:
            _add_column_if_missing("evidence", _cname, _ctype)

        # 3. applicant_identities
        _add_column_if_missing("applicant_identities", "phone_or_contact", "VARCHAR")
        _add_column_if_missing("applicant_identities", "created_at", "DATETIME DEFAULT CURRENT_TIMESTAMP" if _conn_dialect == "sqlite" else "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")

        # 4. recruit_sessions
        _missing_rs = [
            ("current_screen", "VARCHAR"),
            ("order_id", "INTEGER"),
            ("spec_version", "VARCHAR DEFAULT '2026-10-v2'"),
            ("sjt_version", "VARCHAR DEFAULT '2026-09-rev'"),
            ("scoring_version", "VARCHAR DEFAULT '1.0-exact-thirds'"),
            ("feature_version", "VARCHAR DEFAULT '1.0'"),
            ("config_hash", "VARCHAR"),
            ("device_class", "VARCHAR"),
            ("input_modality", "VARCHAR"),
            ("completed_at", "DATETIME" if _conn_dialect == "sqlite" else "TIMESTAMP")
        ]
        for _cname, _ctype in _missing_rs:
            _add_column_if_missing("recruit_sessions", _cname, _ctype)

        # 5. consent_records
        _add_column_if_missing("consent_records", "choices_json", "TEXT DEFAULT '{}'")
        _add_column_if_missing("consent_records", "confirmed_18_plus", "BOOLEAN DEFAULT 1" if _conn_dialect == "sqlite" else "BOOLEAN DEFAULT TRUE")
except Exception as _e:
    print(f"[DB Migration] Startup migration notice: {_e}")

# Initialize Application
app = FastAPI(title="Alfaaz Collective API", version="2.0")

class RecruitBodyLimitMiddleware:
    """
    R2 Body Limit Middleware:
    - /recruit/telemetry: 256 KB (262,144 bytes)
    - All other /recruit/* requests: 16 KB (16,384 bytes)
    - Enforced on Content-Length and on the fly during streaming body read.
    - HTTP 413 on oversize without truncation.
    """
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        path = scope.get("path", "")
        if path.startswith("/recruit"):
            max_limit = 256 * 1024 if path.endswith("/telemetry") else 16 * 1024

            # 1. Header check
            headers = dict(scope.get("headers", []))
            cl_header = headers.get(b"content-length")
            if cl_header:
                try:
                    if int(cl_header.decode("latin1")) > max_limit:
                        response = JSONResponse(
                            status_code=413,
                            content={"detail": f"Request body exceeds limit of {max_limit} bytes"}
                        )
                        await response(scope, receive, send)
                        return
                except ValueError:
                    pass

            # 2. Enforce while reading body stream chunks
            body_chunks = []
            total_size = 0
            while True:
                message = await receive()
                if message["type"] == "http.request":
                    chunk = message.get("body", b"")
                    total_size += len(chunk)
                    if total_size > max_limit:
                        response = JSONResponse(
                            status_code=413,
                            content={"detail": f"Request body exceeds limit of {max_limit} bytes"}
                        )
                        await response(scope, receive, send)
                        return
                    body_chunks.append(chunk)
                    if not message.get("more_body", False):
                        break
                elif message["type"] == "http.disconnect":
                    return

            body_bytes = b"".join(body_chunks)
            sent = False

            async def custom_receive():
                nonlocal sent
                if not sent:
                    sent = True
                    return {"type": "http.request", "body": body_bytes, "more_body": False}
                return {"type": "http.request", "body": b"", "more_body": False}

            await self.app(scope, custom_receive, send)
            return

        await self.app(scope, receive, send)

app.add_middleware(RecruitBodyLimitMiddleware)

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
app.include_router(auth.router)
app.include_router(events.router)
app.include_router(curator.router)
app.include_router(clubs.router)
app.include_router(exhibitions.router)
app.include_router(admin.router)
app.include_router(blogs.router)
app.include_router(vault.router)
app.include_router(recruit.router)
app.include_router(research_view.router)

# Server Startup Script (Ensures Admin exists)
@app.on_event("startup")
def on_startup():
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
        db.close()
    except Exception as e:
        print(f"CRITICAL DB ERROR: {e}")

# Health Check Route
@app.get("/ping")
def ping():
    return {"status": "ALIVE", "message": "The monolith has been defeated."}

# The frontend owns browser routes; this is only the API root fallback.
@app.get("/")
def root():
    return {"status": "Alfaaz backend is live"}
