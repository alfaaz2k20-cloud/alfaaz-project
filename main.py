from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Optional, List
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
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

# Database Routing (Fixing the postgres protocol for SQLAlchemy)
database_env = os.environ.get("DATABASE_URL")
if database_env and database_env.startswith("postgres://"):
    database_env = database_env.replace("postgres://", "postgresql://", 1)

SQLALCHEMY_DATABASE_URL = database_env or "sqlite:///./alfaaz_data.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in SQLALCHEMY_DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ==========================================
# 1. THE REFINED VAULT (Database Models)
# ==========================================
class DBUser(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String) 
    full_name = Column(String, nullable=True)
    status = Column(String, default="PARTICIPANT") # PARTICIPANT, ADMIN
    exhibitions = Column(String, default="0")      
    club_affiliation = Column(String, default="N/A") 
    credits = Column(Integer, default=0)             
    
    # Relationship: One User can have many Art Pieces
    art_pieces = relationship("DBArtPiece", back_populates="author")

class DBArtPiece(Base):
    __tablename__ = "gallery"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    art_type = Column(String) # Photography, Poetry, Film, Philosophy
    media_url = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # The Foreign Key Bond: Links art to a specific User Email
    author_email = Column(String, ForeignKey("users.email"))
    author = relationship("DBUser", back_populates="art_pieces")

# ==========================================
# 2. API BLUEPRINTS (Pydantic Schemas)
# ==========================================
app = FastAPI(title="Alfaaz Collective API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
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

class AdminUpdateUser(BaseModel):
    email: str
    status: str
    exhibitions: str
    club_affiliation: str
    credits: int

class ArtSubmission(BaseModel):
    title: str
    description: str
    art_type: str
    media_url: str
    author_email: str

class PhantomQuery(BaseModel):
    question: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ==========================================
# 2.5 SERVER STARTUP (The Safe Boot)
# ==========================================
@app.on_event("startup")
def on_startup():
    print("Initializing Database Tables...")
    try:
        Base.metadata.create_all(bind=engine)
        db = SessionLocal()
        master_email = "admin@alfaaz.com"
        admin_exists = db.query(DBUser).filter(DBUser.email == master_email).first()
        
        if not admin_exists:
            print("Master Admin not found. Forging Master Key...")
            master = DBUser(
                email=master_email,
                password=get_password_hash("AlfaazAdmin2026!"), 
                status="ADMIN",
                full_name="The Curator"
            )
            db.add(master)
            db.commit()
        db.close()
        print("Vault Systems Online. Master Key verified.")
    except Exception as e:
        print(f"CRITICAL DB ERROR: {e}")

# ==========================================
# 3. AUTHENTICATION ENDPOINTS
# ==========================================
@app.post("/auth/register", status_code=status.HTTP_201_CREATED)
def register_user(user: UserRegister, db: Session = Depends(get_db)):
    if db.query(DBUser).filter(DBUser.email == user.email).first():
        raise HTTPException(status_code=400, detail="Sequence already in the vault.")
    
    new_user = DBUser(email=user.email, password=get_password_hash(user.password), full_name=user.full_name)
    db.add(new_user)
    db.commit()
    return {"message": "Success"}

@app.post("/auth/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(DBUser).filter(DBUser.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {
        "user": {
            "email": db_user.email, 
            "status": db_user.status,
            "exhibitions": db_user.exhibitions,
            "club": db_user.club_affiliation,
            "credits": db_user.credits
        }
    }

# ==========================================
# 4. THE PHANTOM (Llama 4 Scout Engine)
# ==========================================
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

@app.post("/phantom/ask")
def ask_phantom(query: PhantomQuery):
    if not client:
        raise HTTPException(status_code=500, detail="The Phantom is silent.")

    alfaaz_lore = """
    You are The Phantom, the poetic curator of the ALFAAZ collective. 
    ALFAAZ is dedicated to art, philosophy, and film. Speak with Brutalist mystery.
    Keep answers concise and atmospheric. If asked for tech help, refer them to 'The Curator'.
    """
    
    try:
        chat_completion = client.chat.completions.create(
            messages=[{"role": "system", "content": alfaaz_lore}, {"role": "user", "content": query.question}],
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            temperature=0.6,
        )
        return {"answer": chat_completion.choices[0].message.content}
    except Exception as e:
        if "429" in str(e):
            return {"answer": "[THE VOID IS CLUTTERED] Too many whispers. Breathe, and inquire again."}
        return {"answer": f"[SIGNAL DECAY] The Phantom is contemplating. Error: {str(e)}"}

# ==========================================
# 5. THE GALLERY RITUALS
# ==========================================
@app.get("/gallery/all")
def get_gallery(db: Session = Depends(get_db)):
    # Returns art pieces sorted by newest first
    return db.query(DBArtPiece).order_by(DBArtPiece.created_at.desc()).all()

@app.post("/gallery/submit")
def submit_art(piece: ArtSubmission, db: Session = Depends(get_db)):
    new_piece = DBArtPiece(
        title=piece.title,
        description=piece.description,
        art_type=piece.art_type,
        media_url=piece.media_url,
        author_email=piece.author_email
    )
    db.add(new_piece)
    db.commit()
    return {"message": "Art etched into the vault"}

# ==========================================
# 6. ADMIN PROTOCOLS
# ==========================================
@app.get("/admin/users")
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(DBUser).all()
    return [{"email": u.email, "status": u.status, "credits": u.credits} for u in users]

@app.post("/admin/update")
def update_user_data(target: AdminUpdateUser, db: Session = Depends(get_db)):
    db_user = db.query(DBUser).filter(DBUser.email == target.email).first()
    if not db_user: raise HTTPException(status_code=404, detail="Sequence not found")
    db_user.status, db_user.exhibitions, db_user.club_affiliation, db_user.credits = \
        target.status, target.exhibitions, target.club_affiliation, target.credits
    db.commit()
    return {"message": "Vault updated"}

@app.get("/godmode/{target_email}")
def activate_god_mode(target_email: str, db: Session = Depends(get_db)):
    db_user = db.query(DBUser).filter(DBUser.email == target_email).first()
    if not db_user: return {"error": "Target not found"}
    db_user.status = "ADMIN"
    db.commit()
    return {"message": f"GOD MODE ACTIVATED for {target_email}"}