import smtplib
import os
import sys
import jwt
import datetime
import time
import json
from collections import defaultdict
from typing import Optional

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from fastapi import FastAPI, HTTPException, Depends, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, field_validator
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from groq import Groq
from passlib.context import CryptContext

# ==========================================
# CLOUDINARY CONFIGURATION
# ==========================================
import cloudinary
import cloudinary.uploader

CLOUDINARY_CLOUD_NAME = os.environ.get("CLOUDINARY_CLOUD_NAME", "dmqwjpmjk")
CLOUDINARY_API_KEY = os.environ.get("CLOUDINARY_API_KEY")
CLOUDINARY_API_SECRET = os.environ.get("CLOUDINARY_API_SECRET")

if CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET:
    cloudinary.config(
        cloud_name=CLOUDINARY_CLOUD_NAME,
        api_key=CLOUDINARY_API_KEY,
        api_secret=CLOUDINARY_API_SECRET,
        secure=True
    )
    print("[CLOUDINARY] Configured successfully")
else:
    print("[CLOUDINARY] Not configured - set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET env vars")

# ==========================================
# CLOUDINARY SYNC FUNCTION
# ==========================================
def sync_notices_to_cloudinary(db: Session):
    """Upload current notices to Cloudinary CDN when admin saves changes."""
    if not CLOUDINARY_API_SECRET:
        print("[CLOUDINARY] Skipping sync - credentials not set")
        return

    try:
        events = db.query(DBEvent).filter(DBEvent.registration_open == True).all()
        events_data = []
        for e in events:
            count = db.query(DBEventRegistration).filter(DBEventRegistration.event_id == e.id).count()
            events_data.append({
                "name": e.name,
                "event_date": e.event_date,
                "description": e.description,
                "capacity": e.capacity,
                "spots_left": (e.capacity - count) if e.capacity > 0 else None,
                "full": (e.capacity > 0 and count >= e.capacity)
            })

        config = db.query(DBExhibitionConfig).first()
        exhibition_data = None
        if config:
            exhibition_data = {
                "is_open": config.is_open,
                "title": config.title,
                "date_text": config.date_text,
                "about_text": config.about_text
            }

        notices_json = {"events": events_data, "exhibition": exhibition_data}
        json_str = json.dumps(notices_json, indent=2)

        result = cloudinary.uploader.upload(
            json_str,
            resource_type="raw",
            public_id="notices.json",
            folder="alfaaz",
            overwrite=True
        )
        print(f"[CLOUDINARY] notices.json synced: {result.get('secure_url')}")

    except Exception as e:
        print(f"[CLOUDINARY] Sync failed: {e}")

# ==========================================
# 0. SECURITY & CONFIG
# ==========================================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

_jwt_secret_raw = os.environ.get("JWT_SECRET")
if not _jwt_secret_raw:
    _is_production = bool(os.environ.get("DATABASE_URL"))
    if _is_production:
        print("FATAL: JWT_SECRET environment variable is not set. Refusing to start in production.", file=sys.stderr)
        sys.exit(1)
    else:
        import secrets as _secrets
        _jwt_secret_raw = _secrets.token_hex(32)
        print("[DEV WARNING] JWT_SECRET not set. Using a random ephemeral secret.", file=sys.stderr)
JWT_SECRET = _jwt_secret_raw
JWT_ALGORITHM = "HS256"
JWT_EXPIRY_HOURS = 24

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_EMAIL = os.environ.get("SMTP_EMAIL")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD")

def send_system_email(to_email: str, subject: str, body: str, raise_on_error: bool = False):
    if not SMTP_EMAIL or not SMTP_PASSWORD:
        print(f"[EMAIL SKIPPED] To: {to_email} | Subject: {subject}")
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
        print(f"[SMTP ERROR] {e}")
        if raise_on_error:
            raise HTTPException(status_code=503, detail="Email transmission failed.")

def create_token(email: str, user_status: str) -> str:
    payload = {
        "email": email,
        "status": user_status,
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=JWT_EXPIRY_HOURS)
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
    connect_args={"check_same_thread": False} if "sqlite" in SQLALCHEMY_DATABASE_URL else {},
    pool_pre_ping=True,
    pool_recycle=300
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
    whatsapp_number = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class DBExhibitionApplication(Base):
    __tablename__ = "exhibition_applications"
    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True)
    full_name = Column(String)
    age = Column(Integer)
    address = Column(String)
    whatsapp = Column(String)
    genre = Column(String)
    medium = Column(String)
    portfolio_url = Column(String)
    over_19 = Column(Boolean, default=False)
    agreed_to_screening = Column(Boolean, default=False)
    applicant_note = Column(String, nullable=True)
    status = Column(String, default="PENDING")          # PENDING, APPROVED, REJECTED
    curator_note = Column(String, nullable=True)
    
    # Stage-2 registration fields (filled after approval)
    registration_status = Column(String, default="NONE") # NONE, SUBMITTED, CONFIRMED
    agreed_to_tnc = Column(Boolean, default=False)
    payment_proof_url = Column(String, nullable=True)    # Cloudinary URL of payment screenshot
    participant_note_reg = Column(String, nullable=True) # Any note at registration stage
    payment_confirmed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class DBExhibitionConfig(Base):
    __tablename__ = "exhibition_config"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, default="Annual Art Exhibition")
    date_text = Column(String, default="Dates TBD")
    venue = Column(String, default="Venue TBD")
    about_text = Column(String, default="Details regarding the exhibition...")
    is_open = Column(Boolean, default=False)
    
    # T&C and payment settings
    tnc_pdf_url = Column(String, nullable=True)          # Cloudinary URL of T&C PDF
    registration_fee = Column(String, default="")        # e.g. "₹500"
    payment_instructions = Column(String, default="")    # UPI ID / bank details
    payment_qr_url = Column(String, nullable=True)       # Optional QR code image URL

class DBBlog(Base):
    __tablename__ = "blogs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    excerpt = Column(String)
    content = Column(String, nullable=False)
    cover_image = Column(String, nullable=True)
    is_published = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

# ==========================================
# 2. APP & SCHEMAS
# ==========================================
app = FastAPI(title="Alfaaz Collective API")

# RATE LIMITER (in-memory, per IP)
_curator_requests: dict = defaultdict(list)
_CURATOR_LIMIT = 10
_CURATOR_WINDOW = 60

def check_curator_rate_limit(request: Request):
    ip = request.client.host
    now = time.time()
    window_start = now - _CURATOR_WINDOW
    _curator_requests[ip] = [t for t in _curator_requests[ip] if t > window_start]
    if len(_curator_requests[ip]) >= _CURATOR_LIMIT:
        raise HTTPException(status_code=429, detail="The Curator is currently occupied with other guests. Please wait a moment.")
    _curator_requests[ip].append(now)

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

    @field_validator("password")
    @classmethod
    def password_strength(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters.")
        if v.isdigit():
            raise ValueError("Password cannot be all numbers.")
        return v

    @field_validator("email")
    @classmethod
    def normalise_email(cls, v: str) -> str:
        return v.strip().lower()

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
    whatsapp_number: Optional[str] = None

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
    status: str
    curator_note: Optional[str] = None

class ExhibitionConfigSchema(BaseModel):
    title: str
    date_text: str
    venue: str
    about_text: str
    is_open: bool
    tnc_pdf_url: Optional[str] = None
    registration_fee: str = ""
    payment_instructions: str = ""
    payment_qr_url: Optional[str] = None

class ExhibitionRegistrationSubmit(BaseModel):
    """Participant submits stage-2 registration after approval."""
    agreed_to_tnc: bool
    payment_proof_url: str          # Cloudinary URL of payment screenshot
    participant_note_reg: Optional[str] = None

class PaymentConfirm(BaseModel):
    application_id: int

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class BlogGenerateRequest(BaseModel):
    topic: str | None = None
    
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
        raise HTTPException(status_code=400, detail="User already registered.")
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

@app.post("/auth/reset-password")
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

@app.get("/auth/me")
def get_me(db: Session = Depends(get_db), user=Depends(require_auth)):
    db_user = db.query(DBUser).filter(DBUser.email == user["email"]).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found.")
    return {"email": db_user.email, "full_name": db_user.full_name, "status": db_user.status}

@app.patch("/auth/me")
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

# ==========================================
# 4. THE CURATOR
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
SISTER PROJECT: Tchandervar (tchandervar.neocities.org) — bridges artists and commercial spaces.

--- PAST EXHIBITIONS ---
1. KAAMIL — Annual exhibition event. Held on two separate occasions.
2. KHAYAAL — Poetry slam event.
3. HARUD — Named after the Kashmiri word for autumn.
4. LIVE PAINTING — Open live painting session.
5. BAYAAN — Philosophy debate and discussion event.
6. LIVE PERFORMANCE — Performing arts showcase.
7. ACT — Community project and performance event.

--- CLUBS ---
1. Art & Craft — Visual arts, sketching, installations
2. Film Club — Screenings and short film production
3. Photography — Photo walks and editing workshops
4. Philosophy — Discussions, debates, and readings
5. Literature — Poetry, prose, and creative writing

--- CURATOR RULES ---
- If asked about dates not listed above: "The exact dates haven't been announced yet — follow @alfaaz.2020 on Instagram."
- Never invent dates, names, or facts not listed here.
- Reference Agha Shahid Ali, Habba Khatoon, or Rumi where genuinely relevant.
- Be poetic but always factually grounded.
"""

@app.post("/phantom/ask")
def ask_phantom(query: PhantomQuery, request: Request, _=Depends(check_curator_rate_limit)):
    if not client:
        return {"answer": "The Curator is currently unavailable."}
    try:
        response = client.chat.completions.create(
            messages=[
                {
                    "role": "system", 
                    "content": f"You are The Curator of the Alfaaz Collective. You act as a seasoned gallery curator and literary guide. Speak with clarity, elegance, and approachability. Do not be overly poetic or dramatic; convey simple messages directly to make the participant's life easier. Your knowledge:\n{ALFAAZ_KNOWLEDGE}\nKeep responses 3-5 sentences max. Never fabricate facts."
                },
                {"role": "user", "content": query.question}
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.6,
        )
        return {"answer": response.choices[0].message.content}
    except Exception:
        return {"answer": "Our archives are temporarily unreachable. Please inquire again later."}
    
@app.post("/admin/blogs/generate")
def generate_blog_article(data: BlogGenerateRequest, db: Session = Depends(get_db), admin=Depends(require_admin)):
    if not client:
        raise HTTPException(status_code=500, detail="Curator AI not configured.")

    # THE FIX: If no topic is provided, the Curator picks its own!
    active_topic = data.topic if data.topic else "Choose a fascinating, highly specific, and slightly obscure topic related to art, cultural history, clinical psychology, or literature (especially involving Urdu, Persian, or Kashmiri aesthetics) and write about it."

    system_prompt = """You are the Curator for the Alfaaz Collective.
    Write a scholarly, engaging, and deeply insightful blog article about the requested topic.
    
    CRITICAL INSTRUCTION: You MUST return a strictly valid JSON object. 
    1. All keys and values must be wrapped in double quotes.
    2. The "content" value is HTML. Use single quotes for HTML attributes to protect the outer JSON quotes.
    3. Do NOT include newlines (\n) inside the JSON strings.
    
    Use this exact JSON structure:
    {
      "title": "Your captivating title here",
      "excerpt": "A brief 2-sentence summary here.",
      "content": "<h2>Introduction</h2><p>Your full article here...</p>"
    }
    """

    try:
        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Topic: {active_topic}"}
            ],
            model="llama-3.3-70b-versatile",
            response_format={"type": "json_object"},
            temperature=0.8, # Slightly higher temperature makes it more creative
        )
        
        result = json.loads(response.choices[0].message.content)

        # Removed cover_image from the database save
        new_blog = DBBlog(
            title=result["title"],
            excerpt=result["excerpt"],
            content=result["content"],
            is_published=True
        )
        db.add(new_blog)
        db.commit()
        return {"status": "SUCCESS", "message": "Autonomous research published."}
        
    except Exception as e:
        print(f"Curator Error: {e}")
        raise HTTPException(status_code=500, detail="The Curator failed to generate the article.")

# ==========================================
# 5. STORAGE SUBMISSION
# ==========================================
@app.post("/vault/submit")
def submit_to_vault(data: VaultSubmission, db: Session = Depends(get_db), user=Depends(require_auth)):
    new_entry = DBSubmission(
        submission_type=data.submission_type, title=data.title,
        file_url=data.file_url, note=data.note, author_email=user["email"]
    )
    db.add(new_entry)
    db.commit()
    return {"status": "SUCCESS"}

# ==========================================
# 6. CLUBS
# ==========================================
VALID_CLUBS = ["Art & Craft", "Film Club", "Photography", "Philosophy", "Literature"]

@app.post("/clubs/apply")
def apply_to_club(data: ClubApplicationCreate, db: Session = Depends(get_db), user=Depends(require_auth)):
    if data.club_name not in VALID_CLUBS:
        raise HTTPException(status_code=400, detail="Invalid club.")
    existing = db.query(DBClubApplication).filter(
        DBClubApplication.user_email == user["email"],
        DBClubApplication.status == "PENDING"
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Pending application exists.")
    approved = db.query(DBClubApplication).filter(
        DBClubApplication.user_email == user["email"],
        DBClubApplication.status == "APPROVED"
    ).first()
    if approved:
        raise HTTPException(status_code=400, detail=f"Already a member of {approved.club_name}.")
    application = DBClubApplication(user_email=user["email"], club_name=data.club_name, note=data.note)
    db.add(application)
    db.commit()
    return {"status": "PENDING"}

@app.get("/clubs/my-status")
def get_my_club_status(db: Session = Depends(get_db), user=Depends(require_auth)):
    application = db.query(DBClubApplication).filter(
        DBClubApplication.user_email == user["email"]
    ).order_by(DBClubApplication.created_at.desc()).first()
    if not application:
        return {"status": "NONE"}
    return {"status": application.status, "club": application.club_name, "admin_note": application.admin_note}

# ==========================================
# 7. EVENTS
# ==========================================
@app.get("/events/active")
def get_active_events(db: Session = Depends(get_db)):
    events = db.query(DBEvent).filter(DBEvent.registration_open == True).all()
    result = []
    for e in events:
        count = db.query(DBEventRegistration).filter(DBEventRegistration.event_id == e.id).count()
        result.append({
            "id": e.id, "name": e.name, "description": e.description,
            "event_date": e.event_date, "capacity": e.capacity,
            "registered": count,
            "spots_left": (e.capacity - count) if e.capacity > 0 else None,
            "full": (e.capacity > 0 and count >= e.capacity)
        })
    return result

@app.post("/events/register")
def register_for_event(data: EventRegister, db: Session = Depends(get_db), user=Depends(require_auth)):
    event = db.query(DBEvent).filter(DBEvent.id == data.event_id).first()
    if not event or not event.registration_open:
        raise HTTPException(status_code=400, detail="Registration closed.")
    count = db.query(DBEventRegistration).filter(DBEventRegistration.event_id == data.event_id).count()
    if event.capacity > 0 and count >= event.capacity:
        raise HTTPException(status_code=400, detail="Event full.")
    already = db.query(DBEventRegistration).filter(
        DBEventRegistration.event_id == data.event_id,
        DBEventRegistration.user_email == user["email"]
    ).first()
    if already:
        raise HTTPException(status_code=400, detail="Already registered.")
    reg = DBEventRegistration(
        event_id=data.event_id, user_email=user["email"],
        whatsapp_number=data.whatsapp_number
    )
    db.add(reg)
    db.commit()
    return {"status": "SUCCESS"}

@app.get("/events/my-registrations")
def get_my_event_registrations(db: Session = Depends(get_db), user=Depends(require_auth)):
    regs = db.query(DBEventRegistration).filter(DBEventRegistration.user_email == user["email"]).all()
    result = []
    for r in regs:
        event = db.query(DBEvent).filter(DBEvent.id == r.event_id).first()
        if event:
            result.append({"event_id": r.event_id, "event_name": event.name, "event_date": event.event_date})
    return result

# ==========================================
# 8. MAJOR EXHIBITION PIPELINE
# ==========================================
@app.post("/exhibitions/apply")
def apply_for_exhibition(data: ExhibitionApplicationCreate, db: Session = Depends(get_db), user=Depends(require_auth)):
    if not data.over_19 or not data.agreed_to_screening:
        raise HTTPException(status_code=400, detail="You must agree to the terms to proceed.")
    existing = db.query(DBExhibitionApplication).filter(
        DBExhibitionApplication.user_email == user["email"],
        DBExhibitionApplication.status == "PENDING"
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="You already have an application under review.")
    application = DBExhibitionApplication(
        user_email=user["email"], full_name=data.full_name, age=data.age,
        address=data.address, whatsapp=data.whatsapp, genre=data.genre,
        medium=data.medium, portfolio_url=data.portfolio_url,
        over_19=data.over_19, agreed_to_screening=data.agreed_to_screening,
        applicant_note=data.applicant_note
    )
    db.add(application)
    db.commit()
    send_system_email(
        user["email"],
        "ALFAAZ — Application Received",
        f"Greetings {data.full_name},\n\nYour portfolio has successfully entered our Storage. This secure space is used to safely hold your work and protect your assets while they are under review by the Curator for the upcoming exhibition.\n\nYou will receive an update regarding your status soon.\n\n— The Alfaaz Collective"
    )
    return {"status": "SUCCESS", "message": "Application submitted successfully."}

@app.get("/exhibitions/my-status")
def get_my_exhibition_status(db: Session = Depends(get_db), user=Depends(require_auth)):
    application = db.query(DBExhibitionApplication).filter(
        DBExhibitionApplication.user_email == user["email"]
    ).order_by(DBExhibitionApplication.created_at.desc()).first()
    if not application:
        return {"status": "NONE"}
    base = {
        "status": application.status,
        "curator_note": application.curator_note,
        "application_id": application.id,
    }
    if application.status == "APPROVED":
        base.update({
            "full_name": application.full_name,
            "age": application.age,
            "address": application.address,
            "whatsapp": application.whatsapp,
            "genre": application.genre,
            "medium": application.medium,
            "portfolio_url": application.portfolio_url,
            "registration_status": application.registration_status or "NONE",
            "payment_confirmed_at": str(application.payment_confirmed_at) if application.payment_confirmed_at else None,
        })
    return base

# ==========================================
# EXHIBITION STAGE-2: REGISTRATION AFTER APPROVAL
# ==========================================
@app.post("/exhibitions/complete-registration")
def complete_exhibition_registration(
    data: ExhibitionRegistrationSubmit,
    db: Session = Depends(get_db),
    user=Depends(require_auth)
):
    application = db.query(DBExhibitionApplication).filter(
        DBExhibitionApplication.user_email == user["email"],
        DBExhibitionApplication.status == "APPROVED"
    ).order_by(DBExhibitionApplication.created_at.desc()).first()
    
    if not application:
        raise HTTPException(status_code=404, detail="No approved application found.")
    if application.registration_status == "CONFIRMED":
        raise HTTPException(status_code=400, detail="Registration already confirmed.")
    if not data.agreed_to_tnc:
        raise HTTPException(status_code=400, detail="You must agree to the Terms & Conditions.")
    if not data.payment_proof_url:
        raise HTTPException(status_code=400, detail="Payment proof is required.")

    application.agreed_to_tnc = True
    application.payment_proof_url = data.payment_proof_url
    application.participant_note_reg = data.participant_note_reg
    application.registration_status = "SUBMITTED"
    db.commit()

    send_system_email(
        user["email"],
        "ALFAAZ — Registration Submitted",
        f"Greetings {application.full_name},\n\nYour registration form and payment proof have been received. The Curator will verify your payment and confirm your spot shortly.\n\n— The Alfaaz Collective"
    )
    return {"status": "SUBMITTED", "message": "Registration submitted. Awaiting payment confirmation."}

@app.patch("/admin/exhibitions/{application_id}/confirm-payment")
def confirm_exhibition_payment(
    application_id: int,
    db: Session = Depends(get_db),
    admin=Depends(require_admin)
):
    application = db.query(DBExhibitionApplication).filter(
        DBExhibitionApplication.id == application_id
    ).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found.")
    if application.registration_status != "SUBMITTED":
        raise HTTPException(status_code=400, detail="No payment submission found to confirm.")

    application.registration_status = "CONFIRMED"
    application.payment_confirmed_at = datetime.datetime.now(datetime.timezone.utc)
    db.commit()

    send_system_email(
        application.user_email,
        "ALFAAZ — Your Spot is Confirmed!",
        f"Greetings {application.full_name},\n\nYour payment has been verified and your exhibition spot is officially confirmed.\n\nWelcome to the collective.\n\n— The Curator"
    )
    return {"status": "CONFIRMED"}

@app.get("/admin/exhibitions/{application_id}/registration")
def get_exhibition_registration_detail(
    application_id: int,
    db: Session = Depends(get_db),
    admin=Depends(require_admin)
):
    application = db.query(DBExhibitionApplication).filter(
        DBExhibitionApplication.id == application_id
    ).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found.")
    return {
        "id": application.id,
        "user_email": application.user_email,
        "full_name": application.full_name,
        "status": application.status,
        "registration_status": application.registration_status or "NONE",
        "agreed_to_tnc": application.agreed_to_tnc,
        "payment_proof_url": application.payment_proof_url,
        "participant_note_reg": application.participant_note_reg,
        "payment_confirmed_at": str(application.payment_confirmed_at) if application.payment_confirmed_at else None,
    }

# ==========================================
# 9. EXHIBITION CONFIGURATION ENGINE (GLOBAL)
# ==========================================
@app.get("/exhibitions/config")
def get_exhibition_config(db: Session = Depends(get_db)):
    config = db.query(DBExhibitionConfig).first()
    if not config:
        config = DBExhibitionConfig()
        db.add(config)
        db.commit()
    return {
        "title": config.title, "date_text": config.date_text,
        "venue": config.venue, "about_text": config.about_text,
        "is_open": config.is_open,
        "tnc_pdf_url": config.tnc_pdf_url,
        "registration_fee": config.registration_fee or "",
        "payment_instructions": config.payment_instructions or "",
        "payment_qr_url": config.payment_qr_url,
    }

@app.post("/admin/exhibitions/config")
def update_exhibition_config(data: ExhibitionConfigSchema, db: Session = Depends(get_db), admin=Depends(require_admin)):
    config = db.query(DBExhibitionConfig).first()
    if not config:
        config = DBExhibitionConfig()
        db.add(config)
    config.title = data.title
    config.date_text = data.date_text
    config.venue = data.venue
    config.about_text = data.about_text
    config.is_open = data.is_open
    config.tnc_pdf_url = data.tnc_pdf_url
    config.registration_fee = data.registration_fee
    config.payment_instructions = data.payment_instructions
    config.payment_qr_url = data.payment_qr_url
    db.commit()
    sync_notices_to_cloudinary(db)  
    return {"status": "SUCCESS"}

# ==========================================
# 10. ADMIN — EVENTS
# ==========================================
@app.post("/admin/events/create")
def create_event(data: EventCreate, db: Session = Depends(get_db), admin=Depends(require_admin)):
    event = DBEvent(
        name=data.name, description=data.description,
        event_date=data.event_date, capacity=data.capacity, registration_open=False
    )
    db.add(event)
    db.commit()
    sync_notices_to_cloudinary(db)  
    return {"status": "SUCCESS"}

@app.patch("/admin/events/{event_id}/toggle")
def toggle_event_registration(event_id: int, db: Session = Depends(get_db), admin=Depends(require_admin)):
    event = db.query(DBEvent).filter(DBEvent.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found.")
    event.registration_open = not event.registration_open
    db.commit()
    sync_notices_to_cloudinary(db)  
    state = "OPEN" if event.registration_open else "CLOSED"
    return {"status": state}

@app.get("/admin/events")
def get_all_events(db: Session = Depends(get_db), admin=Depends(require_admin)):
    events = db.query(DBEvent).order_by(DBEvent.created_at.desc()).all()
    return [{
        "id": e.id, "name": e.name, "description": e.description,
        "event_date": e.event_date, "registration_open": e.registration_open,
        "capacity": e.capacity,
        "registered": db.query(DBEventRegistration).filter(DBEventRegistration.event_id == e.id).count()
    } for e in events]

@app.get("/admin/events/{event_id}/registrations")
def get_event_registrations(event_id: int, db: Session = Depends(get_db), admin=Depends(require_admin)):
    regs = db.query(DBEventRegistration).filter(DBEventRegistration.event_id == event_id).all()
    return {
        "registrations": [{
            "email": r.user_email,
            "whatsapp": r.whatsapp_number or "—",
            "registered_at": str(r.created_at)
        } for r in regs]
    }

@app.delete("/admin/events/{event_id}")
def delete_event(event_id: int, db: Session = Depends(get_db), admin=Depends(require_admin)):
    event = db.query(DBEvent).filter(DBEvent.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found.")
    db.query(DBEventRegistration).filter(DBEventRegistration.event_id == event_id).delete()
    db.delete(event)
    db.commit()
    sync_notices_to_cloudinary(db)  
    return {"status": "SUCCESS"}

# ==========================================
# 11. ADMIN — CLUBS & EXHIBITIONS & USERS
# ==========================================
@app.get("/admin/club-applications")
def get_club_applications(db: Session = Depends(get_db), admin=Depends(require_admin)):
    apps = db.query(DBClubApplication).order_by(DBClubApplication.created_at.desc()).all()
    return [{"id": a.id, "user_email": a.user_email, "club_name": a.club_name,
             "note": a.note, "status": a.status, "admin_note": a.admin_note,
             "created_at": str(a.created_at)} for a in apps]

@app.post("/admin/club-applications/review")
def review_club_application(data: ClubApplicationReview, db: Session = Depends(get_db), admin=Depends(require_admin)):
    application = db.query(DBClubApplication).filter(DBClubApplication.id == data.application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found.")
    application.status = data.status
    application.admin_note = data.admin_note
    db.commit()
    return {"status": "SUCCESS"}

@app.patch("/admin/exhibitions/{application_id}/revert")
def revert_exhibition_status(application_id: int, db: Session = Depends(get_db), admin=Depends(require_admin)):
    """Allows Admin to undo a rejection and put the application back in PENDING."""
    application = db.query(DBExhibitionApplication).filter(DBExhibitionApplication.id == application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found.")
    application.status = "PENDING"
    application.curator_note = None  # Clear the rejection note
    db.commit()
    return {"status": "SUCCESS"}

@app.patch("/admin/club-applications/{application_id}/revert")
def revert_club_status(application_id: int, db: Session = Depends(get_db), admin=Depends(require_admin)):
    """Allows Admin to undo a club rejection."""
    application = db.query(DBClubApplication).filter(DBClubApplication.id == application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found.")
    application.status = "PENDING"
    application.admin_note = None
    db.commit()
    return {"status": "SUCCESS"}

@app.get("/admin/exhibitions")
def get_all_exhibitions(db: Session = Depends(get_db), admin=Depends(require_admin)):
    return db.query(DBExhibitionApplication).order_by(DBExhibitionApplication.created_at.desc()).all()

@app.post("/admin/exhibitions/review")
def review_exhibition(data: ExhibitionReview, db: Session = Depends(get_db), admin=Depends(require_admin)):
    application = db.query(DBExhibitionApplication).filter(DBExhibitionApplication.id == data.application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found.")
    application.status = data.status
    application.curator_note = data.curator_note
    db.commit()
    
    if data.status == "APPROVED":
        send_system_email(
            application.user_email,
            "ALFAAZ — Exhibition Clearance Granted",
            f"Greetings {application.full_name},\n\nYour artwork has cleared the screening process.\n\nPlease log into your Alfaaz dashboard to review the Terms & Conditions and finalize your spot.\n\n— The Curator"
        )
    elif data.status == "REJECTED":
        send_system_email(
            application.user_email,
            "ALFAAZ — Exhibition Update",
            f"Greetings {application.full_name},\n\nWe appreciate you sharing your portfolio with us. Unfortunately, we cannot accommodate your submission for this specific cycle.\n\n— The Curator"
        )
    return {"status": "SUCCESS", "message": f"Applicant {data.status.lower()} and notified."}

@app.get("/admin/submissions")
def get_all_submissions(db: Session = Depends(get_db), admin=Depends(require_admin)):
    return db.query(DBSubmission).order_by(DBSubmission.created_at.desc()).all()

@app.get("/admin/users")
def get_all_users(db: Session = Depends(get_db), admin=Depends(require_admin)):
    return db.query(DBUser).all()

@app.delete("/admin/users/{user_email}")
def delete_user(user_email: str, db: Session = Depends(get_db), admin=Depends(require_admin)):
    user = db.query(DBUser).filter(DBUser.email == user_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    if user.status == "ADMIN":
        raise HTTPException(status_code=403, detail="Cannot delete an admin account.")
    
    db.query(DBSubmission).filter(DBSubmission.author_email == user_email).delete()
    db.query(DBClubApplication).filter(DBClubApplication.user_email == user_email).delete()
    db.query(DBEventRegistration).filter(DBEventRegistration.user_email == user_email).delete()
    db.query(DBExhibitionApplication).filter(DBExhibitionApplication.user_email == user_email).delete()
    db.delete(user)
    db.commit()
    return {"status": "SUCCESS", "message": f"User {user_email} purged."}

@app.post("/admin/update_status")
def update_user_status(target: StatusUpdate, db: Session = Depends(get_db), admin=Depends(require_admin)):
    db_user = db.query(DBUser).filter(DBUser.email == target.email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found.")
    db_user.status = target.status
    db.commit()
    return {"status": "SUCCESS"}