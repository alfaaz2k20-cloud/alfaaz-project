from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Optional
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from google import genai  # THE MODERN 2026 IMPORT
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
# 1. THE VAULT (Database Setup)
# ==========================================
SQLALCHEMY_DATABASE_URL = "sqlite:///./alfaaz_data.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
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

Base.metadata.create_all(bind=engine)

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

# ==========================================
# 4. THE PHANTOM (Modern AI Integration)
# ==========================================
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

# Initialize the new 2026 client
if GEMINI_API_KEY:
    client = genai.Client(api_key=GEMINI_API_KEY)
else:
    client = None

@app.post("/phantom/ask")
def ask_phantom(query: PhantomQuery):
    if not client:
        raise HTTPException(status_code=500, detail="The Phantom is silent. API Key missing.")

    personality = """
    You are The Phantom, the AI curator of the ALFAAZ collective. 
    ALFAAZ is dedicated strictly to art, culture, filmography, photography, philosophy, and literature.
    Speak eloquently, poetically, and with a touch of mystery. 
    Keep your answers concise, inspiring, and deeply artistic.
    """
    
    try:
        response = client.models.generate_content(
    model="gemini-1.5-flash",
    contents=f"{personality}\n\nUser asks: {query.question}"
)
        
        return {"answer": response.text}
    except Exception as e:
        print(f"AI ERROR: {str(e)}")
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