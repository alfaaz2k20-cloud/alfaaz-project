from sqlalchemy.orm import Session
from app.models.audit import DBAuditLog

def log_admin_action(
    db: Session,
    admin_email: str,
    action: str,
    target_type: str,
    target_id: str = None,
    details: str = None
):
    try:
        log = DBAuditLog(
            admin_email=admin_email,
            action=action,
            target_type=target_type,
            target_id=str(target_id) if target_id is not None else None,
            details=details
        )
        db.add(log)
        db.commit()
    except Exception as e:
        print(f"[AUDIT LOG ERROR] Failed to log action: {e}")
