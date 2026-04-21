import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from groq import Groq
import os
import jwt
import datetime
from passlib.context import CryptContext

# ==========================================
# 0. SECURITY & CONFIG
# ==========================================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

JWT_SECRET = os.environ.get("JWT_SECRET", "change-this-in-render-env-vars")
JWT_ALGORITHM = "HS256"
JWT_EXPIRY_HOURS = 24

# SMTP Configuration for Automated Emails
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_EMAIL = os.environ.get("SMTP_EMAIL") 
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD") 

def send_system_email(to_email: str, subject: str, body: str):
    """Universal function to handle outbound transmissions."""
    if not SMTP_EMAIL or not SMTP_PASSWORD:
        print("SMTP credentials missing. Email transmission aborted.")
        return
    try:
        msg = MIMEMultipart()
        msg['From'] = SMTP_EMAIL
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_EMAIL, SMTP_PASSWORD)
        server.send_message(msg)
        server.quit()
    except Exception as e:
        print(f"SMTP Transmission Error: {e}")

def create_token(email: str, user_status: str) -> str:
    payload = {
        "email": email,
        "status": user_status,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=JWT_EXPIRY_HOURS)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Session expired. Please log in again.")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token.")

bearer_scheme = HTTPBearer()

def require_auth(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    return decode_token(credentials.credentials)

def require_admin(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    payload = decode_token(credentials.credentials)
    if payload.get("status") != "ADMIN":
        raise HTTPException(status_code=403, detail="Admin clearance required.")
    return payload

# ==========================================
# DATABASE SETUP
# ==========================================
database_env = os.environ.get("DATABASE_URL")
if database_env and database_env.startswith("postgres://"):
    database_env = database_env.replace("postgres://", "postgresql://", 1)

SQLALCHEMY_DATABASE_URL = database_env or "sqlite:///./alfaaz_data.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in SQLALCHEMY_DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ==========================================
# 1. DATABASE MODELS
# ==========================================
class DBUser(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    full_name = Column(String, nullable=True)
    status = Column(String, default="PARTICIPANT")

class DBSubmission(Base):
    __tablename__ = "submissions"
    id = Column(Integer, primary_key=True, index=True)
    submission_type = Column(String)
    title = Column(String)
    file_url = Column(String)
    note = Column(String, nullable=True)
    author_email = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class DBClubApplication(Base):
    __tablename__ = "club_applications"
    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True)
    club_name = Column(String)
    note = Column(String, nullable=True)         
    status = Column(String, default="PENDING")    
    admin_note = Column(String, nullable=True)    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class DBEvent(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String, nullable=True)
    event_date = Column(String, nullable=True)     
    registration_open = Column(Boolean, default=False)
    capacity = Column(Integer, default=0)          
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class DBEventRegistration(Base):
    __tablename__ = "event_registrations"
    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, index=True)
    user_email = Column(String, index=True)
    whatsapp_number = Column(String, nullable=True) # UPGRADED FOR SMALL GATHERINGS
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class DBExhibitionApplication(Base):
    __tablename__ = "exhibition_applications"
    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True)
    # Section 2: Demographics
    full_name = Column(String)
    age = Column(Integer)
    address = Column(String)
    whatsapp = Column(String)
    # Section 3: Art & Artist
    genre = Column(String)
    medium = Column(String)
    portfolio_url = Column(String) 
    over_19 = Column(Boolean, default=False)
    agreed_to_screening = Column(Boolean, default=False)
    applicant_note = Column(String, nullable=True)
    # Administrative
    status = Column(String, default="PENDING") 
    curator_note = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

# ==========================================
# 2. APP & SCHEMAS
# ==========================================
app = FastAPI(title="Alfaaz Collective API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://alfaazcollective.vercel.app"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserRegister(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

class VaultSubmission(BaseModel):
    submission_type: str
    title: str
    file_url: str
    note: Optional[str] = None
    author_email: str

class PhantomQuery(BaseModel):
    question: str

class StatusUpdate(BaseModel):
    email: str
    status: str

class ForgotPassword(BaseModel):
    email: str

class ResetPassword(BaseModel):
    token: str
    new_password: str

class ClubApplicationCreate(BaseModel):
    club_name: str
    note: Optional[str] = None

class ClubApplicationReview(BaseModel):
    application_id: int
    status: str          
    admin_note: Optional[str] = None

class EventCreate(BaseModel):
    name: str
    description: Optional[str] = None
    event_date: Optional[str] = None
    capacity: int = 0

class EventRegister(BaseModel):
    event_id: int
    whatsapp_number: Optional[str] = None # UPGRADED

class ExhibitionApplicationCreate(BaseModel):
    full_name: str
    age: int
    address: str
    whatsapp: str
    genre: str
    medium: str
    portfolio_url: str
    over_19: bool
    agreed_to_screening: bool
    applicant_note: Optional[str] = None

class ExhibitionReview(BaseModel):
    application_id: int
    status: str # APPROVED or REJECTED
    curator_note: Optional[str] = None
    payment_link: Optional[str] = None # Link sent on approval

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ==========================================
# 2.5 SERVER STARTUP
# ==========================================
@app.on_event("startup")
def on_startup():
    try:
        Base.metadata.create_all(bind=engine)
        db = SessionLocal()
        master_email = "admin@alfaaz.com"
        admin_password = os.environ.get("ADMIN_PASSWORD", "AlfaazAdmin2026!")
        if not db.query(DBUser).filter(DBUser.email == master_email).first():
            master = DBUser(
                email=master_email,
                password=get_password_hash(admin_password),
                status="ADMIN",
                full_name="The Curator"
            )
            db.add(master)
            db.commit()
        db.close()
    except Exception as e:
        print(f"CRITICAL DB ERROR: {e}")

@app.get("/ping")
def ping():
    return {"status": "ALIVE"}

# ==========================================
# 3. AUTHENTICATION & RECOVERY
# ==========================================
@app.post("/auth/register")
def register_user(user: UserRegister, db: Session = Depends(get_db)):
    if db.query(DBUser).filter(DBUser.email == user.email).first():
        raise HTTPException(status_code=400, detail="User already in the vault.")
    new_user = DBUser(email=user.email, password=get_password_hash(user.password), full_name=user.full_name)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    token = create_token(new_user.email, new_user.status)
    return {"user": {"email": new_user.email, "status": new_user.status}, "token": token}

@app.post("/auth/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(DBUser).filter(DBUser.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token(db_user.email, db_user.status)
    return {"user": {"email": db_user.email, "status": db_user.status}, "token": token}

@app.post("/auth/forgot-password")
def forgot_password(req: ForgotPassword, db: Session = Depends(get_db)):
    db_user = db.query(DBUser).filter(DBUser.email == req.email).first()
    if not db_user: return {"message": "If the sequence exists, a transmission has been sent."}
    expire_time = datetime.datetime.utcnow() + datetime.timedelta(minutes=15)
    reset_token = jwt.encode({"sub": db_user.email, "purpose": "reset", "exp": expire_time}, JWT_SECRET, algorithm=JWT_ALGORITHM)
    reset_link = f"https://alfaazcollective.vercel.app/reset.html?token={reset_token}"
    body = f"GREETINGS,\n\nA passkey reset was requested for your sequence: {db_user.email}.\nClick below to forge a new key:\n\n{reset_link}\n\n— The Curator"
    send_system_email(db_user.email, "ALFAAZ Vault — Passkey Reset", body)
    return {"message": "If the sequence exists, a transmission has been sent."}

@app.post("/auth/reset-password")
def reset_password(req: ResetPassword, db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(req.token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        db_user = db.query(DBUser).filter(DBUser.email == payload.get("sub")).first()
        if not db_user: raise HTTPException(status_code=404, detail="Sequence not found.")
        db_user.password = get_password_hash(req.new_password)
        db.commit()
        return {"message": "Passkey forged successfully."}
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired transmission.")

# ==========================================
# 4. THE PHANTOM
# ==========================================
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

ALFAAZ_KNOWLEDGE = """
ORGANIZATION: Alfaaz Collective
TAGLINE: Art • Literature • Culture
MISSION: Foster spaces where creativity meets collaboration. 
WEBSITE: https://alfaazcollective.vercel.app
INSTAGRAM: https://www.instagram.com/alfaaz.2020
EMAIL: alfaaz2k20@gmail.com
SISTER PROJECT: Tchandervar (tchandervar.neocities.org)
"""

@app.post("/phantom/ask")
def ask_phantom(query: PhantomQuery):
    if not client: return {"answer": "[THE PHANTOM IS SILENT]"}
    try:
        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": f"You are THE PHANTOM. Knowledge: {ALFAAZ_KNOWLEDGE}. Keep responses brief, poetic, and accurate."},
                {"role": "user", "content": query.question}
            ],
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            temperature=0.6,
        )
        return {"answer": response.choices[0].message.content}
    except Exception:
        return {"answer": "[SIGNAL DECAY] Inquire again."}

# ==========================================
# 5. VAULT SUBMISSION & CLUBS
# ==========================================
@app.post("/vault/submit")
def submit_to_vault(data: VaultSubmission, db: Session = Depends(get_db), user=Depends(require_auth)):
    new_entry = DBSubmission(submission_type=data.submission_type, title=data.title, file_url=data.file_url, note=data.note, author_email=user["email"])
    db.add(new_entry)
    db.commit()
    return {"status": "SUCCESS"}

VALID_CLUBS = ["Art & Craft", "Film Club", "Photography", "Philosophy", "Literature"]
@app.post("/clubs/apply")
def apply_to_club(data: ClubApplicationCreate, db: Session = Depends(get_db), user=Depends(require_auth)):
    if data.club_name not in VALID_CLUBS: raise HTTPException(status_code=400, detail="Invalid club.")
    existing = db.query(DBClubApplication).filter(DBClubApplication.user_email == user["email"], DBClubApplication.status == "PENDING").first()
    if existing: raise HTTPException(status_code=400, detail="Pending application exists.")
    application = DBClubApplication(user_email=user["email"], club_name=data.club_name, note=data.note)
    db.add(application)
    db.commit()
    return {"status": "PENDING"}

@app.get("/clubs/my-status")
def get_my_club_status(db: Session = Depends(get_db), user=Depends(require_auth)):
    app = db.query(DBClubApplication).filter(DBClubApplication.user_email == user["email"]).order_by(DBClubApplication.created_at.desc()).first()
    if not app: return {"status": "NONE"}
    return {"status": app.status, "club": app.club_name, "admin_note": app.admin_note}

# ==========================================
# 6. EVENTS (UPGRADED FOR WHATSAPP)
# ==========================================
@app.get("/events/active")
def get_active_events(db: Session = Depends(get_db)):
    events = db.query(DBEvent).filter(DBEvent.registration_open == True).all()
    result = []
    for e in events:
        count = db.query(DBEventRegistration).filter(DBEventRegistration.event_id == e.id).count()
        result.append({
            "id": e.id, "name": e.name, "description": e.description, "event_date": e.event_date,
            "capacity": e.capacity, "registered": count, "spots_left": (e.capacity - count) if e.capacity > 0 else None,
            "full": (e.capacity > 0 and count >= e.capacity)
        })
    return result

@app.post("/events/register")
def register_for_event(data: EventRegister, db: Session = Depends(get_db), user=Depends(require_auth)):
    event = db.query(DBEvent).filter(DBEvent.id == data.event_id).first()
    if not event or not event.registration_open: raise HTTPException(status_code=400, detail="Registration closed.")
    count = db.query(DBEventRegistration).filter(DBEventRegistration.event_id == data.event_id).count()
    if event.capacity > 0 and count >= event.capacity: raise HTTPException(status_code=400, detail="Event full.")
    already = db.query(DBEventRegistration).filter(DBEventRegistration.event_id == data.event_id, DBEventRegistration.user_email == user["email"]).first()
    if already: raise HTTPException(status_code=400, detail="Already registered.")
    
    # Store the whatsapp number
    reg = DBEventRegistration(event_id=data.event_id, user_email=user["email"], whatsapp_number=data.whatsapp_number)
    db.add(reg)
    db.commit()
    return {"status": "SUCCESS"}

@app.get("/events/my-registrations")
def get_my_event_registrations(db: Session = Depends(get_db), user=Depends(require_auth)):
    regs = db.query(DBEventRegistration).filter(DBEventRegistration.user_email == user["email"]).all()
    return [{"event_id": r.event_id, "event_name": db.query(DBEvent).filter(DBEvent.id == r.event_id).first().name} for r in regs]

# ==========================================
# 7. MAJOR EXHIBITION PIPELINE (NEW)
# ==========================================
@app.post("/exhibitions/apply")
def apply_for_exhibition(data: ExhibitionApplicationCreate, db: Session = Depends(get_db), user=Depends(require_auth)):
    if not data.over_19 or not data.agreed_to_screening:
        raise HTTPException(status_code=400, detail="You must agree to the terms to proceed.")
        
    existing = db.query(DBExhibitionApplication).filter(DBExhibitionApplication.user_email == user["email"]).first()
    if existing and existing.status == "PENDING":
        raise HTTPException(status_code=400, detail="You already have an application under review.")
        
    app = DBExhibitionApplication(
        user_email=user["email"], full_name=data.full_name, age=data.age, address=data.address, whatsapp=data.whatsapp,
        genre=data.genre, medium=data.medium, portfolio_url=data.portfolio_url,
        over_19=data.over_19, agreed_to_screening=data.agreed_to_screening, applicant_note=data.applicant_note
    )
    db.add(app)
    db.commit()
    
    # FIRE PHASE 1 EMAIL
    subject = "ALFAAZ — Application Received"
    body = f"Greetings {data.full_name},\n\nYour portfolio has successfully entered the Vault. It is currently under review by the Curator for the upcoming exhibition.\n\nYou will receive a transmission regarding your clearance status soon.\n\n— The Alfaaz Collective"
    send_system_email(user["email"], subject, body)
    
    return {"status": "SUCCESS", "message": "Application secured."}

@app.get("/exhibitions/my-status")
def get_my_exhibition_status(db: Session = Depends(get_db), user=Depends(require_auth)):
    app = db.query(DBExhibitionApplication).filter(DBExhibitionApplication.user_email == user["email"]).order_by(DBExhibitionApplication.created_at.desc()).first()
    if not app: return {"status": "NONE"}
    return {"status": app.status, "curator_note": app.curator_note}

# ==========================================
# 8. ADMIN DASHBOARD ENDPOINTS
# ==========================================
@app.post("/admin/events/create")
def create_event(data: EventCreate, db: Session = Depends(get_db), admin=Depends(require_admin)):
    event = DBEvent(name=data.name, description=data.description, event_date=data.event_date, capacity=data.capacity, registration_open=False)
    db.add(event)
    db.commit()
    return {"status": "SUCCESS"}

@app.patch("/admin/events/{event_id}/toggle")
def toggle_event_registration(event_id: int, db: Session = Depends(get_db), admin=Depends(require_admin)):
    event = db.query(DBEvent).filter(DBEvent.id == event_id).first()
    event.registration_open = not event.registration_open
    db.commit()
    return {"status": "SUCCESS"}

@app.get("/admin/events")
def get_all_events(db: Session = Depends(get_db), admin=Depends(require_admin)):
    events = db.query(DBEvent).order_by(DBEvent.created_at.desc()).all()
    return [{"id": e.id, "name": e.name, "event_date": e.event_date, "registration_open": e.registration_open, "capacity": e.capacity, "registered": db.query(DBEventRegistration).filter(DBEventRegistration.event_id == e.id).count()} for e in events]

@app.get("/admin/events/{event_id}/registrations")
def get_event_registrations(event_id: int, db: Session = Depends(get_db), admin=Depends(require_admin)):
    regs = db.query(DBEventRegistration).filter(DBEventRegistration.event_id == event_id).all()
    return {"registrations": [{"email": r.user_email, "whatsapp": r.whatsapp_number, "registered_at": str(r.created_at)} for r in regs]}

@app.delete("/admin/events/{event_id}")
def delete_event(event_id: int, db: Session = Depends(get_db), admin=Depends(require_admin)):
    event = db.query(DBEvent).filter(DBEvent.id == event_id).first()
    db.query(DBEventRegistration).filter(DBEventRegistration.event_id == event_id).delete()
    db.delete(event)
    db.commit()
    return {"status": "SUCCESS"}

@app.get("/admin/club-applications")
def get_club_applications(db: Session = Depends(get_db), admin=Depends(require_admin)):
    return db.query(DBClubApplication).order_by(DBClubApplication.created_at.desc()).all()

@app.post("/admin/club-applications/review")
def review_club_application(data: ClubApplicationReview, db: Session = Depends(get_db), admin=Depends(require_admin)):
    app = db.query(DBClubApplication).filter(DBClubApplication.id == data.application_id).first()
    app.status = data.status
    app.admin_note = data.admin_note
    db.commit()
    return {"status": "SUCCESS"}

# NEW: Admin Exhibition Review
@app.get("/admin/exhibitions")
def get_all_exhibitions(db: Session = Depends(get_db), admin=Depends(require_admin)):
    return db.query(DBExhibitionApplication).order_by(DBExhibitionApplication.created_at.desc()).all()

@app.post("/admin/exhibitions/review")
def review_exhibition(data: ExhibitionReview, db: Session = Depends(get_db), admin=Depends(require_admin)):
    app = db.query(DBExhibitionApplication).filter(DBExhibitionApplication.id == data.application_id).first()
    if not app: raise HTTPException(status_code=404, detail="Application not found.")
    
    app.status = data.status
    app.curator_note = data.curator_note
    db.commit()
    
    # FIRE PHASE 3 EMAIL
    subject = "ALFAAZ — Exhibition Status Update"
    if data.status == "APPROVED":
        body = f"Greetings {app.full_name},\n\nYour artwork has successfully cleared the screening process.\n\nPlease log into the Alfaaz Collective dashboard to view the final terms and complete your registration via the secure payment link:\n{data.payment_link if data.payment_link else 'See Dashboard'}\n\n— The Curator"
    else:
        body = f"Greetings {app.full_name},\n\nThank you for transmitting your portfolio. At this time, we are unable to clear your artwork for the upcoming exhibition. \n\nWe encourage you to continue refining your craft and submit again in future cycles.\n\n— The Curator"
        
    send_system_email(app.user_email, subject, body)
    return {"status": "SUCCESS", "message": f"Applicant {data.status} and notified."}

@app.get("/admin/submissions")
def get_all_submissions(db: Session = Depends(get_db), admin=Depends(require_admin)):
    return db.query(DBSubmission).order_by(DBSubmission.created_at.desc()).all()

@app.get("/admin/users")
def get_all_users(db: Session = Depends(get_db), admin=Depends(require_admin)):
    return db.query(DBUser).all()

@app.post("/admin/update_status")
def update_user_status(target: StatusUpdate, db: Session = Depends(get_db), admin=Depends(require_admin)):
    db_user = db.query(DBUser).filter(DBUser.email == target.email).first()
    db_user.status = target.status
    db.commit()
    return {"status": "SUCCESS"}