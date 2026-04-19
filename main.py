from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Optional
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import google.generativeai as genai
import os

# The Cryptography Tools
from passlib.context import CryptContext

# ==========================================
# 0. SECURITY SETUP (The Cipher)
# ==========================================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# ==========================================
# 1. THE VAULT (Database Setup)
# ==========================================
SQLALCHEMY_DATABASE_URL = "sqlite:///./alfaaz_data.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ==========================================
# 2. THE DATABASE BLUEPRINT
# ==========================================
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

Base.metadata.create_all(bind=engine)

# ==========================================
# 3. API SETUP & VALIDATION BLUEPRINTS
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

# [FIXED INDENTATION]: The blueprint for the AI
class PhantomQuery(BaseModel):
    question: str

# ==========================================
# 4. THE SECURE ENDPOINTS
# ==========================================
@app.post("/auth/register", status_code=status.HTTP_201_CREATED)
def register_user(user: UserRegister, db: Session = Depends(get_db)):
    
    existing_user = db.query(DBUser).filter(DBUser.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Sequence already registered in the collective.")
    
    hashed_password = get_password_hash(user.password)
    
    new_user = DBUser(
        email=user.email, 
        password=hashed_password,
        full_name=user.full_name,
        status="PARTICIPANT"
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {
        "message": "Registration successful", 
        "user": {"email": new_user.email, "status": new_user.status}
    }

@app.post("/auth/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    
    db_user = db.query(DBUser).filter(DBUser.email == user.email).first()
    
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return {
        "message": "Login successful", 
        "user": {
            "email": db_user.email, 
            "status": db_user.status,
            "exhibitions": db_user.exhibitions,
            "club": db_user.club_affiliation,
            "credits": db_user.credits
        }
    }

# ==========================================
# 4.5 THE PHANTOM (AI Integration)
# ==========================================
# This checks Render for a secure environment variable first. 
# If it doesn't find one, it falls back to your hardcoded key for testing.
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)
phantom_model = genai.GenerativeModel('gemini-1.5-flash')

@app.post("/phantom/ask")
def ask_phantom(query: PhantomQuery, db: Session = Depends(get_db)):
    
    personality = """
    You are The Phantom, the AI curator of the ALFAAZ collective. 
    ALFAAZ is dedicated strictly to art, culture, filmography, photography, philosophy, and literature.
    Speak eloquently, poetically, and with a touch of mystery. 
    Keep your answers concise, inspiring, and deeply artistic.
    """
    
    try:
        full_prompt = f"{personality}\n\nUser asks: {query.question}"
        response = phantom_model.generate_content(full_prompt)
        
        return {"answer": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail="The Phantom is currently silent. Try again later.")

# ==========================================
# 5. ADMIN PROTOCOLS
# ==========================================
@app.get("/admin/users")
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(DBUser).all()
    return [{
        "email": u.email, 
        "status": u.status,
        "exhibitions": u.exhibitions,
        "club": u.club_affiliation,
        "credits": u.credits
    } for u in users]

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
    return {"message": f"Data updated successfully for {target.email}"}

@app.get("/godmode/{target_email}")
def activate_god_mode(target_email: str, db: Session = Depends(get_db)):
    db_user = db.query(DBUser).filter(DBUser.email == target_email).first()
    if not db_user:
        return {"error": "User sequence not found in the vault."}
        
    db_user.status = "ADMIN"
    db.commit()
    return {"message": f"GOD MODE ACTIVATED: {target_email} is now an ADMIN."}