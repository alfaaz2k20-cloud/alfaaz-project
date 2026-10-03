import sys
import os
from pathlib import Path
from fastapi.testclient import TestClient

sys.path.insert(0, str(Path(__file__).resolve().parents[0] / "backend"))

from app.main import app
from app.models.recruit import DBSession, DBEvidence
from sqlalchemy.pool import StaticPool
from sqlmodel import Session, SQLModel, create_engine
from app.db.session import get_db

engine = create_engine("sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool)
SQLModel.metadata.create_all(engine)

def override_get_db():
    with Session(engine) as session:
        yield session

def override_require_admin():
    return {"email": "admin@test.com", "status": "ADMIN"}

app.dependency_overrides[get_db] = override_get_db
from app.routers.research_view import require_admin as rv_require_admin
app.dependency_overrides[rv_require_admin] = override_require_admin
client = TestClient(app)

with Session(engine) as db:
    db.add(DBSession(session_id="test-session", status="COMPLETE"))
    db.add(DBEvidence(
        session_id="test-session",
        parameter="Empathy",
        sjt_band="SUPPORTIVE",
        game_band="UNCALIBRATED",
        consistency="NOT_COMPUTED",
        relationship="NOT_COMPUTED",
        confidence="LIMITED"
    ))
    db.commit()

res = client.get("/recruit/research/sessions/test-session")
print(res.text)
