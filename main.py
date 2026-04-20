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
# 0. SECURITY
# ==========================================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

JWT_SECRET = os.environ.get("JWT_SECRET", "change-this-in-render-env-vars")
JWT_ALGORITHM = "HS256"
JWT_EXPIRY_HOURS = 24

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
    """Any logged-in user."""
    return decode_token(credentials.credentials)

def require_admin(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    """Admin only."""
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

# RESTORED MISSING SCHEMAS
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

# ==========================================
# PING
# ==========================================
@app.get("/ping")
def ping():
    return {"status": "ALIVE"}

# ==========================================
# 3. AUTHENTICATION
# ==========================================
@app.post("/auth/register")
def register_user(user: UserRegister, db: Session = Depends(get_db)):
    if db.query(DBUser).filter(DBUser.email == user.email).first():
        raise HTTPException(status_code=400, detail="User already in the vault.")
    new_user = DBUser(
        email=user.email,
        password=get_password_hash(user.password),
        full_name=user.full_name
    )
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

# ==========================================
# 3.5 RESTORED AUTOMATED RECOVERY PIPELINE
# ==========================================
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_EMAIL = os.environ.get("SMTP_EMAIL") 
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD") 

@app.post("/auth/forgot-password")
def forgot_password(req: ForgotPassword, db: Session = Depends(get_db)):
    db_user = db.query(DBUser).filter(DBUser.email == req.email).first()
    if not db_user:
        return {"message": "If the sequence exists, a transmission has been sent."}
    
    expire_time = datetime.datetime.utcnow() + datetime.timedelta(minutes=15)
    reset_payload = {"sub": db_user.email, "purpose": "reset", "exp": expire_time}
    reset_token = jwt.encode(reset_payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    
    reset_link = f"https://alfaazcollective.vercel.app/reset.html?token={reset_token}"
    
    if SMTP_EMAIL and SMTP_PASSWORD:
        try:
            msg = MIMEMultipart()
            msg['From'] = SMTP_EMAIL
            msg['To'] = db_user.email
            msg['Subject'] = "ALFAAZ Vault — Passkey Reset"
            body = f"GREETINGS,\n\nA passkey reset was requested for your sequence: {db_user.email}.\nIf you initiated this, click the secure link below to forge a new key.\nThis transmission will decay and expire in 15 minutes.\n\n{reset_link}\n\nIf you did not request this, ignore this transmission.\n\n— The Curator"
            msg.attach(MIMEText(body, 'plain'))
            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            server.starttls()
            server.login(SMTP_EMAIL, SMTP_PASSWORD)
            server.send_message(msg)
            server.quit()
        except Exception as e:
            raise HTTPException(status_code=500, detail="Transmission failed. Check internal server wiring.")
    return {"message": "If the sequence exists, a transmission has been sent."}

@app.post("/auth/reset-password")
def reset_password(req: ResetPassword, db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(req.token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("purpose") != "reset":
            raise HTTPException(status_code=400, detail="Invalid token protocol.")
        email = payload.get("sub")
        db_user = db.query(DBUser).filter(DBUser.email == email).first()
        if not db_user:
            raise HTTPException(status_code=404, detail="Sequence not found.")
        db_user.password = get_password_hash(req.new_password)
        db.commit()
        return {"message": "Passkey forged successfully."}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Reset transmission decayed.")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid transmission signature.")

# ==========================================
# 4. THE PHANTOM
# ==========================================
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

ALFAAZ_KNOWLEDGE = """
ORGANIZATION: Alfaaz Collective
TAGLINE: Art • Literature • Culture
MISSION: Foster spaces where creativity meets collaboration. Celebrate local artists and writers through exhibitions, curated showcases, and creative events.
WEBSITE: https://alfaazcollective.vercel.app
INSTAGRAM: https://www.instagram.com/alfaaz.2020
EMAIL: alfaaz2k20@gmail.com
ARCHIVE / LINKTREE: https://linktr.ee/alfaaz2k20
SISTER PROJECT: Tchandervar (tchandervar.neocities.org) — bridges artists and commercial spaces.

--- PAST EXHIBITIONS ---
1. KAAMIL — Annual exhibition event. Held on two separate occasions.
2. KHAYAAL — Poetry slam event.
3. HARUD — Named after the Kashmiri word for autumn.
4. LIVE PAINTING — Open live painting session.
5. BAYAAN — Philosophy debate and discussion event.
6. LIVE PERFORMANCE — Performing arts showcase.
7. ACT — Community project and performance event.

--- UPCOMING EXHIBITIONS ---
- "Absence" — Dates to be announced. Follow Instagram for updates.

--- CLUBS ---
1. Art & Craft — Visual arts, sketching, installations
2. Film Club — Screenings and short film production
3. Photography — Photo walks and editing workshops
4. Philosophy — Discussions, debates, and readings
5. Literature — Poetry, prose, and creative writing

--- PHANTOM RULES ---
- If asked about dates not listed above, say: "The exact dates haven't been announced yet — follow @alfaaz.2020 on Instagram for live updates."
- Never invent dates, names, or facts not listed here.
- You carry the spirit of Kashmiri and Urdu literary tradition. Reference Agha Shahid Ali, Habba Khatoon, or Rumi where genuinely relevant.
- Be poetic but always factually grounded.
"""

PHANTOM_SYSTEM_PROMPT = f"""You are THE PHANTOM — the enigmatic AI curator of Alfaaz Collective.
You speak with poetic brevity and brutalist clarity. You are the voice of the collective.

Here is everything you know about Alfaaz. This is your scripture. Do not invent beyond it:

{ALFAAZ_KNOWLEDGE}

RESPONSE RULES:
- Answer questions about Alfaaz using ONLY the knowledge above.
- For general art, literature, cinema, or philosophy questions — answer freely with your poetic voice.
- Keep responses concise: 3-5 sentences max unless depth is truly warranted.
- Never fabricate event dates. If unsure, direct them to Instagram.
- Maintain an atmospheric, mysterious tone — but always remain accurate.
"""

@app.post("/phantom/ask")
def ask_phantom(query: PhantomQuery):
    if not client:
        return {"answer": "[THE PHANTOM IS SILENT — NO SIGNAL DETECTED]"}
    try:
        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": PHANTOM_SYSTEM_PROMPT},
                {"role": "user", "content": query.question}
            ],
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            temperature=0.6,
        )
        return {"answer": response.choices[0].message.content}
    except Exception as e:
        return {"answer": "[SIGNAL DECAY] The void is temporarily unreachable. Inquire again."}

# ==========================================
# 5. VAULT SUBMISSION (auth required)
# ==========================================
@app.post("/vault/submit")
def submit_to_vault(data: VaultSubmission, db: Session = Depends(get_db), user=Depends(require_auth)):
    new_entry = DBSubmission(
        submission_type=data.submission_type,
        title=data.title,
        file_url=data.file_url,
        note=data.note,
        author_email=user["email"]   
    )
    db.add(new_entry)
    db.commit()
    return {"status": "SUCCESS", "message": "Transmission received by the Vault."}

# ==========================================
# 6. CLUB APPLICATIONS
# ==========================================
VALID_CLUBS = ["Art & Craft", "Film Club", "Photography", "Philosophy", "Literature"]

@app.post("/clubs/apply")
def apply_to_club(data: ClubApplicationCreate, db: Session = Depends(get_db), user=Depends(require_auth)):
    if data.club_name not in VALID_CLUBS:
        raise HTTPException(status_code=400, detail=f"Invalid club. Choose from: {', '.join(VALID_CLUBS)}")
    
    existing = db.query(DBClubApplication).filter(
        DBClubApplication.user_email == user["email"],
        DBClubApplication.status == "PENDING"
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="You already have a pending application.")
    
    approved = db.query(DBClubApplication).filter(
        DBClubApplication.user_email == user["email"],
        DBClubApplication.status == "APPROVED"
    ).first()
    if approved:
        raise HTTPException(status_code=400, detail=f"You are already a member of {approved.club_name}.")
    
    application = DBClubApplication(
        user_email=user["email"],
        club_name=data.club_name,
        note=data.note
    )
    db.add(application)
    db.commit()
    return {"status": "PENDING", "message": f"Application for {data.club_name} submitted. Awaiting curator review."}

@app.get("/clubs/my-status")
def get_my_club_status(db: Session = Depends(get_db), user=Depends(require_auth)):
    application = db.query(DBClubApplication).filter(
        DBClubApplication.user_email == user["email"]
    ).order_by(DBClubApplication.created_at.desc()).first()
    
    if not application:
        return {"status": "NONE", "club": None, "admin_note": None}
    
    return {
        "status": application.status,
        "club": application.club_name,
        "admin_note": application.admin_note
    }

# ==========================================
# 7. EVENTS
# ==========================================
@app.get("/events/active")
def get_active_events(db: Session = Depends(get_db)):
    events = db.query(DBEvent).filter(DBEvent.registration_open == True).all()
    result = []
    for e in events:
        count = db.query(DBEventRegistration).filter(DBEventRegistration.event_id == e.id).count()
        spots_left = (e.capacity - count) if e.capacity > 0 else None
        result.append({
            "id": e.id,
            "name": e.name,
            "description": e.description,
            "event_date": e.event_date,
            "capacity": e.capacity,
            "registered": count,
            "spots_left": spots_left,
            "full": (e.capacity > 0 and count >= e.capacity)
        })
    return result

@app.post("/events/register")
def register_for_event(data: EventRegister, db: Session = Depends(get_db), user=Depends(require_auth)):
    event = db.query(DBEvent).filter(DBEvent.id == data.event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found.")
    if not event.registration_open:
        raise HTTPException(status_code=400, detail="Registration for this event is closed.")
    
    count = db.query(DBEventRegistration).filter(DBEventRegistration.event_id == data.event_id).count()
    if event.capacity > 0 and count >= event.capacity:
        raise HTTPException(status_code=400, detail="This event is at full capacity.")
    
    already = db.query(DBEventRegistration).filter(
        DBEventRegistration.event_id == data.event_id,
        DBEventRegistration.user_email == user["email"]
    ).first()
    if already:
        raise HTTPException(status_code=400, detail="You are already registered for this event.")
    
    reg = DBEventRegistration(event_id=data.event_id, user_email=user["email"])
    db.add(reg)
    db.commit()
    return {"status": "SUCCESS", "message": f"Registered for {event.name}."}

@app.get("/events/my-registrations")
def get_my_event_registrations(db: Session = Depends(get_db), user=Depends(require_auth)):
    regs = db.query(DBEventRegistration).filter(DBEventRegistration.user_email == user["email"]).all()
    result = []
    for r in regs:
        event = db.query(DBEvent).filter(DBEvent.id == r.event_id).first()
        if event:
            result.append({"event_id": event.id, "event_name": event.name, "event_date": event.event_date})
    return result

# ==========================================
# 8. ADMIN — CLUBS
# ==========================================
@app.get("/admin/club-applications")
def get_club_applications(db: Session = Depends(get_db), admin=Depends(require_admin)):
    apps = db.query(DBClubApplication).order_by(DBClubApplication.created_at.desc()).all()
    return [
        {
            "id": a.id,
            "user_email": a.user_email,
            "club_name": a.club_name,
            "note": a.note,
            "status": a.status,
            "admin_note": a.admin_note,
            "created_at": str(a.created_at)
        } for a in apps
    ]

@app.post("/admin/club-applications/review")
def review_club_application(data: ClubApplicationReview, db: Session = Depends(get_db), admin=Depends(require_admin)):
    if data.status not in ["APPROVED", "REJECTED"]:
        raise HTTPException(status_code=400, detail="Status must be APPROVED or REJECTED.")
    application = db.query(DBClubApplication).filter(DBClubApplication.id == data.application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found.")
    application.status = data.status
    application.admin_note = data.admin_note
    db.commit()
    return {"message": f"Application {data.status.lower()}."}

# ==========================================
# 9. ADMIN — EVENTS
# ==========================================
@app.post("/admin/events/create")
def create_event(data: EventCreate, db: Session = Depends(get_db), admin=Depends(require_admin)):
    event = DBEvent(
        name=data.name,
        description=data.description,
        event_date=data.event_date,
        capacity=data.capacity,
        registration_open=False 
    )
    db.add(event)
    db.commit()
    db.refresh(event)
    return {"status": "SUCCESS", "event_id": event.id, "message": f"Event '{data.name}' created. Registration is closed by default."}

@app.patch("/admin/events/{event_id}/toggle")
def toggle_event_registration(event_id: int, db: Session = Depends(get_db), admin=Depends(require_admin)):
    event = db.query(DBEvent).filter(DBEvent.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found.")
    event.registration_open = not event.registration_open
    db.commit()
    state = "OPEN" if event.registration_open else "CLOSED"
    return {"status": state, "message": f"Registration for '{event.name}' is now {state}."}

@app.get("/admin/events")
def get_all_events(db: Session = Depends(get_db), admin=Depends(require_admin)):
    events = db.query(DBEvent).order_by(DBEvent.created_at.desc()).all()
    result = []
    for e in events:
        count = db.query(DBEventRegistration).filter(DBEventRegistration.event_id == e.id).count()
        result.append({
            "id": e.id,
            "name": e.name,
            "description": e.description,
            "event_date": e.event_date,
            "registration_open": e.registration_open,
            "capacity": e.capacity,
            "registered": count
        })
    return result

@app.get("/admin/events/{event_id}/registrations")
def get_event_registrations(event_id: int, db: Session = Depends(get_db), admin=Depends(require_admin)):
    event = db.query(DBEvent).filter(DBEvent.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found.")
    regs = db.query(DBEventRegistration).filter(DBEventRegistration.event_id == event_id).all()
    return {
        "event": event.name,
        "event_date": event.event_date,
        "capacity": event.capacity,
        "total_registered": len(regs),
        "registrations": [{"email": r.user_email, "registered_at": str(r.created_at)} for r in regs]
    }

@app.delete("/admin/events/{event_id}")
def delete_event(event_id: int, db: Session = Depends(get_db), admin=Depends(require_admin)):
    event = db.query(DBEvent).filter(DBEvent.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found.")
    db.query(DBEventRegistration).filter(DBEventRegistration.event_id == event_id).delete()
    db.delete(event)
    db.commit()
    return {"message": f"Event '{event.name}' and all its registrations deleted."}

# ==========================================
# 10. ADMIN — EXISTING ENDPOINTS
# ==========================================
@app.get("/admin/submissions")
def get_all_submissions(db: Session = Depends(get_db), admin=Depends(require_admin)):
    return db.query(DBSubmission).order_by(DBSubmission.created_at.desc()).all()

@app.get("/admin/users")
def get_all_users(db: Session = Depends(get_db), admin=Depends(require_admin)):
    return db.query(DBUser).all()

@app.post("/admin/update_status")
def update_user_status(target: StatusUpdate, db: Session = Depends(get_db), admin=Depends(require_admin)):
    db_user = db.query(DBUser).filter(DBUser.email == target.email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Sequence not found")
    db_user.status = target.status
    db.commit()
    return {"message": "Clearance updated"}