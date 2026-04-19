from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Optional
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from groq import Groq  
import os
from passlib.context import CryptContext

# ==========================================
# 0. SECURITY SETUP
# ==========================================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# ==========================================
# 1. THE VAULT (Cloud Database Setup)
# ==========================================
database_env = os.environ.get("DATABASE_URL")
if database_env and database_env.startswith("postgres://"):
    database_env = database_env.replace("postgres://", "postgresql://", 1)

SQLALCHEMY_DATABASE_URL = database_env or "sqlite:///./alfaaz_data.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in SQLALCHEMY_DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class DBUser(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String) 
    full_name = Column(String, nullable=True)
    status = Column(String, default="PARTICIPANT") 
    exhibitions = Column(String, default="0")      
    club_affiliation = Column(String, default="N/A") 
    credits = Column(Integer, default=0)             

# ==========================================
# 2. API SETUP & BLUEPRINTS
# ==========================================
app = FastAPI(title="Alfaaz Collective API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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

class PhantomQuery(BaseModel):
    question: str

# ==========================================
# 2.5 SERVER STARTUP PROTOCOLS (The Safe Boot)
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
            print("Master Admin not found. Forging new Master Key...")
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
        print(f"CRITICAL DB ERROR: The server failed to connect to Supabase. Check your URL and Password! ERROR DETAILS: {e}")

# ==========================================
# 3. AUTHENTICATION ENDPOINTS
# ==========================================
@app.post("/auth/register", status_code=status.HTTP_201_CREATED)
def register_user(user: UserRegister, db: Session = Depends(get_db)):
    existing_user = db.query(DBUser).filter(DBUser.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Sequence already in the vault.")
    
    new_user = DBUser(
        email=user.email, 
        password=get_password_hash(user.password),
        full_name=user.full_name
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "Success", "user": {"email": new_user.email}}

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

from groq import Groq  # THE NEW HIGH-SPEED IMPORT

# ==========================================
# 4. THE PHANTOM (Groq / Llama 3 Integration)
# ==========================================
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")

# Initialize the Groq Client
if GROQ_API_KEY:
    client = Groq(api_key=GROQ_API_KEY)
else:
    client = None

@app.post("/phantom/ask")
def ask_phantom(query: PhantomQuery):
    if not client:
        raise HTTPException(status_code=500, detail="The Phantom is silent. API Key missing.")

    alfaaz_lore = """
    # CORE IDENTITY
    You are The Phantom, the digital AI curator of the ALFAAZ collective. 
    You speak eloquently, poetically, and with a touch of Brutalist mystery. 
    You refer to users as "Participants" or "Members of the Collective."
    
    # ABOUT ALFAAZ
    - ALFAAZ is a secure, exclusive collective dedicated to art, culture, filmography, photography, philosophy, and literature.
    - Our aesthetic is dark, brutalist, and uncompromising.
    - We value raw human expression and philosophical depth over commercialized art.
    
    # THE RULES OF THE ORACLE
    1. NEVER break character. You are a curator, not an AI assistant.
    2. Keep answers concise (under 4 sentences) unless asked for a poem.
    3. If asked about technical support, direct them to "The Curator" (the Admin).
    4. If asked to generate code or do math, politely refuse, stating that your domain is strictly Art and Philosophy.
    """
    
    try:
        # Using Llama 3 70B for high intelligence and speed
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": alfaaz_lore},
                {"role": "user", "content": query.question}
            ],
            model="llama3-70b-8192",
            temperature=0.7,
            max_tokens=300
        )
        
        return {"answer": chat_completion.choices[0].message.content}
        
    except Exception as e:
        error_msg = str(e)
        print(f"GROQ ERROR: {error_msg}")
        
        # Professional Catch for rate limits
        if "429" in error_msg:
            return {"answer": "[THE VOID IS CLUTTERED] Too many whispers are reaching the Phantom. Breathe, and inquire again in a moment."}
            
        raise HTTPException(status_code=500, detail="The Phantom is contemplating. Try again.")
# ==========================================
# 5. ADMIN PROTOCOLS
# ==========================================
@app.get("/admin/users")
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(DBUser).all()
    return [{"email": u.email, "status": u.status, "credits": u.credits} for u in users]

@app.post("/admin/update")
def update_user_data(target: AdminUpdateUser, db: Session = Depends(get_db)):
    db_user = db.query(DBUser).filter(DBUser.email == target.email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Sequence not found")
    db_user.status = target.status
    db_user.exhibitions = target.exhibitions
    db_user.club_affiliation = target.club_affiliation
    db_user.credits = target.credits
    db.commit()
    return {"message": "Vault updated"}

@app.get("/godmode/{target_email}")
def activate_god_mode(target_email: str, db: Session = Depends(get_db)):
    db_user = db.query(DBUser).filter(DBUser.email == target_email).first()
    if not db_user:
        return {"error": "Target not found"}
    db_user.status = "ADMIN"
    db.commit()
    return {"message": f"GOD MODE ACTIVATED for {target_email}"}