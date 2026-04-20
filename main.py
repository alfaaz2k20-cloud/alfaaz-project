from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends, Header, status
from pydantic import BaseModel
from typing import Optional, List
from sqlalchemy import create_engine, Column, Integer, String, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from groq import Groq
import os
from passlib.context import CryptContext

# ==========================================
# 0. SECURITY & INFRASTRUCTURE SETUP
# ==========================================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

database_env = os.environ.get("DATABASE_URL")
if database_env and database_env.startswith("postgres://"):
    database_env = database_env.replace("postgres://", "postgresql://", 1)

SQLALCHEMY_DATABASE_URL = database_env or "sqlite:///./alfaaz_data.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in SQLALCHEMY_DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ==========================================
# 1. THE SIMPLE VAULT (Database Models)
# ==========================================
class DBUser(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    full_name = Column(String, nullable=True)
    status = Column(String, default="PARTICIPANT")  # PARTICIPANT, ADMIN

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
# 2. API BLUEPRINTS (Pydantic Schemas)
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

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ==========================================
# ADMIN GUARD — set ADMIN_SECRET as env var on Render
# ==========================================
ADMIN_SECRET = os.environ.get("ADMIN_SECRET", "alfaaz-admin-secret-change-me")

def verify_admin(x_admin_secret: str = Header(...)):
    if x_admin_secret != ADMIN_SECRET:
        raise HTTPException(status_code=403, detail="Access denied. Invalid clearance key.")

# ==========================================
# 2.5 SERVER STARTUP (The Safe Boot)
# ==========================================
@app.on_event("startup")
def on_startup():
    try:
        Base.metadata.create_all(bind=engine)
        db = SessionLocal()
        master_email = "admin@alfaaz.com"
        if not db.query(DBUser).filter(DBUser.email == master_email).first():
            master = DBUser(
                email=master_email,
                password=get_password_hash("AlfaazAdmin2026!"),
                status="ADMIN",
                full_name="The Curator"
            )
            db.add(master)
            db.commit()
        db.close()
    except Exception as e:
        print(f"CRITICAL DB ERROR: {e}")

# ==========================================
# PING — Keep Render warm via UptimeRobot
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
    # FIX: now returns user object so register.html localStorage works correctly
    return {"user": {"email": new_user.email, "status": new_user.status}}

@app.post("/auth/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(DBUser).filter(DBUser.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"user": {"email": db_user.email, "status": db_user.status}}

# ==========================================
# 4. THE PHANTOM — AI Curator with full Alfaaz knowledge
# ==========================================
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

# ---- ALFAAZ KNOWLEDGE BLOCK ----
# UPDATE THIS SECTION whenever exhibitions, clubs, or events change.
# This is Phantom's scripture — keep it accurate and current.
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
- "Absence" — Dates to be announced soon. (Status as of January 2026)

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
# 5. PRIVATE SUBMISSION PIPELINE
# ==========================================
@app.post("/vault/submit")
def submit_to_vault(data: VaultSubmission, db: Session = Depends(get_db)):
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
# 6. ADMIN DASHBOARD — Protected by secret header
# ==========================================
@app.get("/admin/submissions")
def get_all_submissions(db: Session = Depends(get_db), _: None = Depends(verify_admin)):
    return db.query(DBSubmission).order_by(DBSubmission.created_at.desc()).all()

@app.get("/admin/users")
def get_all_users(db: Session = Depends(get_db), _: None = Depends(verify_admin)):
    return db.query(DBUser).all()

@app.post("/admin/update_status")
def update_user_status(target: StatusUpdate, db: Session = Depends(get_db), _: None = Depends(verify_admin)):
    db_user = db.query(DBUser).filter(DBUser.email == target.email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Sequence not found")
    db_user.status = target.status
    db.commit()
    return {"message": "Clearance updated"}
