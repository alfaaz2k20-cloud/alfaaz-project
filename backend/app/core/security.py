import jwt
import datetime
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from passlib.context import CryptContext
from app.core.config import JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRY_HOURS

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
bearer_scheme = HTTPBearer()

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

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

def require_auth(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    return decode_token(credentials.credentials)

def require_admin(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    payload = decode_token(credentials.credentials)
    if payload.get("status") != "ADMIN":
        raise HTTPException(status_code=403, detail="Admin clearance required.")
    return payload