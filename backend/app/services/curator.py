import time
from collections import defaultdict
from fastapi import Request, HTTPException
from groq import Groq
from app.core.config import GROQ_API_KEY

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

def get_groq_client():
    return client