import os
import requests
from fastapi import HTTPException
from app.core.config import EMAIL_FROM

def send_system_email(
    to_email: str,
    subject: str,
    body: str,
    raise_on_error: bool = False,
    expose_error: bool = False,
) -> bool:
    
    # We will put the Make.com URL in your Render environment variables
    WEBHOOK_URL = os.environ.get("MAKE_WEBHOOK_URL")
    
    if not WEBHOOK_URL:
        print("[EMAIL SKIPPED] MAKE_WEBHOOK_URL is not set.")
        return False

    payload = {
        "to": to_email,
        "subject": subject,
        "text": body
    }

    try:
        # This sends over HTTPS (Port 443), bypassing Render's SMTP block entirely
        response = requests.post(WEBHOOK_URL, json=payload, timeout=20)
        
        if response.status_code == 200:
            print(f"[WEBHOOK SENT] To: {to_email} | Subject: {subject}")
            return True
        else:
            print(f"[WEBHOOK ERROR] {response.status_code} {response.text}")
            if raise_on_error:
                raise HTTPException(status_code=503, detail="Webhook provider rejected the message.")
            return False
            
    except Exception as e:
        print(f"[WEBHOOK CRASH] {e}")
        if raise_on_error:
            raise HTTPException(status_code=503, detail="Email transmission failed.")
        return False