from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.models.submission import DBSubmission
from backend.app.schemas.submission import VaultSubmission
from backend.app.core.security import require_auth

router = APIRouter(prefix="/vault", tags=["Vault"])

@router.post("/submit")
def submit_to_vault(data: VaultSubmission, db: Session = Depends(get_db), user=Depends(require_auth)):
    new_entry = DBSubmission(submission_type=data.submission_type, title=data.title, file_url=data.file_url, note=data.note, author_email=user["email"])
    db.add(new_entry)
    db.commit()
    return {"status": "SUCCESS"}