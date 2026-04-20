import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional
from sqlalchemy import create_engine, Column, Integer, String, DateTime, func
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

def require_admin(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    payload = decode_token(credentials.credentials)
    if payload.get("status") != "ADMIN":
        raise HTTPException(status_code=403, detail="Admin clearance required.")
    return payload

def require_user(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    payload = decode_token(credentials.credentials)
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

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ==========================================
# 2.5 SERVER STARTUP
# ==========================================
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "AlfaazAdmin2026!")

@app.on_event("startup")
def on_startup():
    try:
        Base.metadata.create_all(bind=engine)
        db = SessionLocal()
        master_email = "admin@alfaaz.com"
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
# 3.5 AUTOMATED RECOVERY PIPELINE
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
# 4. THE PHANTOM — AI Curator
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

--- PHANTOM RULES ---
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
- Keep responses concise: 3-5 sentences max.
"""

@app.post("/phantom/ask")
def ask_phantom(query: PhantomQuery):
    if not client:
        return {"answer": "[THE PHANTOM IS SILENT]"}
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
        return {"answer": "[SIGNAL DECAY] Inquire again."}

# ==========================================
# 5. SECURE VAULT SUBMISSION
# ==========================================
@app.post("/vault/submit")
def submit_to_vault(data: VaultSubmission, db: Session = Depends(get_db), current_user: dict = Depends(require_user)):
    # ANTI-SPOOFING PROTOCOL
    if data.author_email != current_user.get("email"):
        raise HTTPException(status_code=403, detail="Identity spoofing detected. Transmission rejected.")
        
    new_entry = DBSubmission(
        submission_type=data.submission_type,
        title=data.title,
        file_url=data.file_url,
        note=data.note,
        author_email=data.author_email
    )
    db.add(new_entry)
    db.commit()
    return {"status": "SUCCESS", "message": "Transmission received by the Vault."}

# ==========================================
# 6. ADMIN ENDPOINTS
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