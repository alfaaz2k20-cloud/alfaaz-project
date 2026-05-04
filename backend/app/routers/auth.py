import datetime
import jwt
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.models.user import DBUser
from backend.app.schemas.auth import UserRegister, UserLogin, ForgotPassword, ResetPassword
from backend.app.core.security import get_password_hash, verify_password, create_token, require_auth
from backend.app.core.config import JWT_SECRET, JWT_ALGORITHM
from backend.app.services.email import send_system_email

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register")
def register_user(user: UserRegister, db: Session = Depends(get_db)):
    if db.query(DBUser).filter(DBUser.email == user.email).first():
        raise HTTPException(status_code=400, detail="User already registered.")
    new_user = DBUser(email=user.email, password=get_password_hash(user.password), full_name=user.full_name)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    token = create_token(new_user.email, new_user.status)
    return {"user": {"email": new_user.email, "status": new_user.status}, "token": token}

@router.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(DBUser).filter(DBUser.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token(db_user.email, db_user.status)
    return {"user": {"email": db_user.email, "status": db_user.status}, "token": token}

@router.post("/forgot-password")
def forgot_password(req: ForgotPassword, db: Session = Depends(get_db)):
    db_user = db.query(DBUser).filter(DBUser.email == req.email).first()
    if not db_user:
        return {"message": "If the email is registered, your reset link has been dispatched to your email."}
    expire_time = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=15)
    reset_token = jwt.encode({"sub": db_user.email, "purpose": "reset", "exp": expire_time}, JWT_SECRET, algorithm=JWT_ALGORITHM)
    reset_link = f"https://alfaazcollective.vercel.app/reset.html?token={reset_token}"
    send_system_email(
        db_user.email,
        "ALFAAZ — Password Reset",
        f"Greetings,\n\nA password reset was requested for your account: {db_user.email}.\nThis link expires in 15 minutes.\n\n{reset_link}\n\nIf you did not request this, please ignore this message.\n\n— The Curator",
        raise_on_error=True
    )
    return {"message": "If the email is registered, your reset link has been dispatched to your email."}

@router.post("/reset-password")
def reset_password(req: ResetPassword, db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(req.token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("purpose") != "reset":
            raise HTTPException(status_code=400, detail="Invalid token protocol.")
        db_user = db.query(DBUser).filter(DBUser.email == payload.get("sub")).first()
        if not db_user:
            raise HTTPException(status_code=404, detail="Account not found.")
        db_user.password = get_password_hash(req.new_password)
        db.commit()
        return {"message": "Password reset successfully."}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Reset link expired.")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid reset link.")

@router.get("/me")
def get_me(db: Session = Depends(get_db), user=Depends(require_auth)):
    db_user = db.query(DBUser).filter(DBUser.email == user["email"]).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found.")
    return {"email": db_user.email, "full_name": db_user.full_name, "status": db_user.status}

@router.patch("/me")
def update_me(data: dict, db: Session = Depends(get_db), user=Depends(require_auth)):
    db_user = db.query(DBUser).filter(DBUser.email == user["email"]).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found.")
    if "full_name" in data:
        full_name = str(data["full_name"]).strip()
        if len(full_name) > 80:
            raise HTTPException(status_code=400, detail="Name too long.")
        db_user.full_name = full_name
    db.commit()
    return {"status": "SUCCESS", "full_name": db_user.full_name}