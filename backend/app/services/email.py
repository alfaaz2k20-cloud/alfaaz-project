import requests
from fastapi import HTTPException
from app.core.config import MAKE_WEBHOOK_URL

def send_system_email(
    to_email: str,
    subject: str,
    body: str,
    raise_on_error: bool = False,
    expose_error: bool = False,
) -> bool:
    if not MAKE_WEBHOOK_URL:
        print("[EMAIL SKIPPED] MAKE_WEBHOOK_URL is not set.")
        if raise_on_error:
            raise HTTPException(status_code=503, detail="Email automation is not configured. Missing: MAKE_WEBHOOK_URL")
        return False

    payload = {
        "to": to_email,
        "subject": subject,
        "text": body
    }

    try:
        # HTTPS webhook keeps email delivery outside the app host.
        response = requests.post(MAKE_WEBHOOK_URL, json=payload, timeout=20)
        
        if response.status_code == 200:
            print(f"[WEBHOOK SENT] To: {to_email} | Subject: {subject}")
            return True
        else:
            print(f"[WEBHOOK ERROR] {response.status_code} {response.text}")
            if raise_on_error:
                detail = response.text[:500] if expose_error else "Webhook provider rejected the message."
                raise HTTPException(status_code=503, detail=detail)
            return False
            
    except Exception as e:
        print(f"[WEBHOOK CRASH] {e}")
        if raise_on_error:
            detail = f"Email transmission failed: {e}" if expose_error else "Email transmission failed."
            raise HTTPException(status_code=503, detail=detail)
        return False
