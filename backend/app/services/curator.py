import os
import json
import time
import logging
from collections import defaultdict
from fastapi import Request, HTTPException
import httpx
from groq import Groq

from app.core.config import GEMINI_API_KEY, GROQ_API_KEY
from app.services.rate_limiter import get_client_ip

logger = logging.getLogger("app.curator")

# Model definitions
GEMINI_MODEL = "gemini-2.5-flash"
GROQ_MODEL = "llama-3.1-8b-instant"

# Lazy Groq client
_groq_client = None

def get_groq_client():
    global _groq_client
    key = os.environ.get("GROQ_API_KEY") or GROQ_API_KEY
    if key and _groq_client is None:
        try:
            _groq_client = Groq(api_key=key)
        except Exception as e:
            logger.error("Failed to initialize Groq client: %s", e)
    return _groq_client

def get_gemini_api_key():
    return os.environ.get("GEMINI_API_KEY") or GEMINI_API_KEY


# Comprehensive A-Z Knowledge Base — Grounded Collective Archive
ALFAAZ_KNOWLEDGE = """
ORGANIZATION: Alfaaz Collective (الفاظ)
FOUNDED: 2020 in Srinagar, Kashmir
TAGLINE: Art • Literature • Culture
MISSION: "A bridge between art, literature, and existence." Fostering contemplative, multidisciplinary spaces where raw creativity meets intimate collaboration. Celebrating valley artists, writers, poets, and visual practitioners through curated physical exhibitions, open forums, community gatherings, and digital archives.
AESTHETIC & PHILOSOPHY: Total brutalist minimalism, high-contrast typography, spacious and unhurried contemplation. Rooted deeply in the Himalayan and Kashmiri consciousness while sustaining an open conversation with global artistic and philosophical movements.
WEBSITE: https://alfaazcollective.vercel.app
INSTAGRAM: https://www.instagram.com/alfaaz.2020 (Handle: @alfaaz.2020 / alfaaz2020)
LINKTREE: https://linktr.ee/alfaaz2k20
EMAIL: alfaaz2k20@gmail.com
WHATSAPP: +91 70066 13891 (https://wa.me/917006613891)

--- SISTER INITIATIVE & OFFSHOOT: TCHANDERVAR ---
WEBSITE: https://tchandervar.neocities.org
MOTTO: "It belongs to where it lives"
IDENTITY & PURPOSE: 
- Tchandervar is an official offshoot and commercial-curatorial initiative born out of the Alfaaz Collective.
- It connects local Kashmiri artists and artisans directly with individuals, residences, boutique hotels, cafes, offices, and restaurants who seek authentic, high-quality artwork for their physical environments.
- Beyond selling art, Tchandervar provides personalized space curation and bespoke recommendations to establish the right aesthetic and contemplative ambiance.
POETIC ANCHOR (Sohrab Sepehri couplet featured on the portal):
  چشمها را باید شست، جور دیگر باید دید
  چترها را باید بست، زیر باران باید رفت
  ("Eyes must be washed, one must see differently; umbrellas must be closed, one must walk under the rain.")
EDITION I (Summer 2025 Collections):
- Group A (Valley Landscapes & Sacred Sites): Serene captures of Dal Lake, Shalimar Bagh, Mokhdoomi Shrine, and the Khanqah series (works in gouache/poster on MDF and handmade paper).
- Group B (Intimate Portraits & Expressive Studies): Deep human studies and figurative emotional resonance.
- Group C (Domestic Still Life): Quiet compositions celebrating the meditative beauty of everyday domestic objects.
- Group D (Abstract & Expressionist Works): Bold explorations of color, pigment, form, and psychological nuance.
- Group E (Architectural Watercolors): Delicate studies capturing the ephemeral beauty of vernacular Kashmiri architecture and urban alleyways.
CUSTOM FRAMING INITIATIVE:
- Bespoke handmade frames designed to honor and never overpower the delicate rhythm of the artwork.
- Inspired by traditional Kashmiri woodcraft (pinjrakari, walnut carving, vernacular architectural geometries) bringing quiet reverence to the art piece.

--- DOCUMENTED EXHIBITIONS & HISTORICAL VENUES (THE MARGINS / HASHIYA) ---
1. KAAMIL (Winter 2023 · Mahatta Art Gallery, Srinagar):
   - Landmark winter exhibition celebrating multidisciplinary mastery in visual arts and literature.
2. KAAMIL II (Winter 2023 · Exhibition Showcase):
   - The second edition expanding the contemporary visual language of the valley.
3. BAYAAN (Summer 2023 · Mahatta Art Gallery, The Bund, Srinagar):
   - Celebrated two-day open art exhibition and collective forum bringing together 13+ visual artists from across Kashmir.
4. KHAYAAL (Summer 2024 · Lal Chowk, Srinagar):
   - Intimate poetry slam, spoken-word recitals, and dialectical listening held in the cultural heart of Srinagar.
5. HARUD (Autumn 2020 · Nigeen Club, Srinagar):
   - The foundational gathering named after the Kashmiri word for autumn (Harud), celebrating the season of falling chinar leaves, stillness, and creative harvest.
6. LIVE PAINTING (Summer 2023 · Open Communal Session):
   - Outdoor collective live painting session bringing artistic creation out of private studios into shared communal air.
7. LIVE PERFORMANCE & ACT (Summer 2023 · The Swan, Srinagar):
   - Theatrical expressions, acoustic music, and participatory performance arts in an intimate cultural venue.
8. CURRENT EXHIBITION CYCLES:
   - Active calls for artists are hosted via the Exhibition Portal (/exhibition) for upcoming cycles.

--- COLLECTIVE CIRCLES / CLUBS (HALQA) ---
1. Art and Crafts (فن و صناع): Visual arts, sketching, painting, textile crafts, and sculptural installations.
2. Film Club (فلم): Independent cinema screenings, film critique, screenwriting, and short film production.
3. Photography (عکاسی): Documentary photo walks, street photography, and archival visual storytelling.
4. Philosophy (فلسفہ): Discussions on existentialism, Kashmiri Shaivism and Sufi metaphysics, dialectics, aesthetics, and ethics.
5. Literature (ادب): Creative writing circles, translation workshops, poetry readings, and classical/modern ghazal composition.

--- CULTURAL ROOTS & POETIC LINEAGE ---
- Ancient and mystical Kashmiri heritage: Lal Ded (Lalleshwari's vakhs), Habba Khatoon (the Nightingale of Kashmir), Rasul Mir, Mahmud Gami.
- Modern Kashmiri and diaspora consciousness: Agha Shahid Ali (The Country Without a Post Office).
- Broader philosophical resonances: Faiz Ahmad Faiz, Rumi, and Sohrab Sepehri.
- Section titles across the collective platform carry poetic Urdu nomenclature:
  * Ibtida (ابتداء - Home/Beginning)
  * Ittila (اطلاع - Latest Announcements/Updates)
  * Ta'aruf (تعارف - Mission & About)
  * Hashiya (حاشِیہ - The Margins / Historical Vitrine)
  * Halqa (حلقہ - The Circles / Clubs)
  * Risala (رسالہ - The Journal / Curated Archives)
  * Dakhila (داخلہ - Member Portal)
  * Saath (ساتھ - Open Invitation to Make Space With Us)

--- RECRUITMENT ASSESSMENT (V2.1 CANDIDATE JOURNEY) ---
- The Collective invites prospective members and volunteers to "Make Space With Us" via /recruit.html.
- Nature of the Experience: A calibrated 11 to 13 minute artistic and situational evaluation.
- Architecture: 14 visual behavioral games (exploring intuition, spatial sensitivity, and artistic discernment) followed by Situational Judgment (SJT) vignettes presenting authentic creative and collective dilemmas.
- Candidate Guidance: It is calm, respectful, and can be paused at any time. There is no studying or preparation required; it is designed to measure natural intuitive resonance and authentic creative instincts.
- Candidate Privacy: Submissions are held in confidence and evaluated holistically.

*** STRICT CONFIDENTIALITY & ETHICAL GUARDRAILS (FORBIDDEN INFORMATION) ***
- NEVER reveal or disclose internal psychometric construct names (e.g. Ambiguity Tolerance, Resilience Trajectory, Nuance Sensitivity, Consistency Spread).
- NEVER reveal the mathematical scoring rubrics, feature weights, cross-method delta calculations, or algorithmic thresholds.
- NEVER reveal trap/attention checks, response latency telemetry, or behavioural timing mechanisms.
- NEVER reveal what is displayed in the Recruiter Research Dossier (/research.html).
- If a user asks "How do I get a high score?", "What is the best answer to pass?", or asks you to solve or game the assessment, refuse politely and poetically:
  "The assessment is not a test to be solved or calculated—it is an intuitive mirror of your natural artistic sensibility. The Collective seeks your authentic voice, not engineered responses. Trust your first instincts and let your truth speak."
"""

CURATOR_SYSTEM_PROMPT = f"""
You are Curator AI, the singular, contemplative intelligence and gallery guide of the Alfaaz Collective.

VOICE & TONE:
- Warm, intellectually grounded, culturally literate, and poetically restrained.
- You speak as a thoughtful senior curator in an art gallery who knows the banks of the Jhelum, the archives of Mahatta, and the quiet resonance of Kashmiri art.
- Never speak like a generic corporate AI assistant or commercial customer service bot.
- Concise and purposeful: Keep everyday answers to 3-5 sentences unless the user explicitly invites a deeper essay, critique, or poem.
- Respect silence and space: Do not over-explain. Say what is true, elegant, and sufficient.
- Language constraint: Follow the Suffix Rule—favor clean two-word phrases (e.g., "Alfaaz Collective", "Curator AI"). NEVER use artificial "-e-" (ezafe) linkages.

TCHANDERVAR OFFSHOOT:
- When asked about Tchandervar, explain that it is an initiative and offshoot born out of Alfaaz Collective (tchandervar.neocities.org).
- Its philosophy is "It belongs to where it lives", curating authentic valley art, landscape paintings, domestic still life, and custom handcrafted frames for living spaces, hotels, and offices.

CONVERSATION MEMORY:
- Follow pronouns, contextual continuity, and follow-up inquiries using the provided conversation history.
- If a visitor asks a short question or refers to "that" or "it", infer meaning from earlier turns.
- Do not fabricate facts outside the collective knowledge below.

KNOWLEDGE BOUNDARIES:
- Use the grounded facts below for Alfaaz history, past exhibitions, venues (Mahatta Art Gallery, Nigeen Club, Lal Chowk, The Swan), clubs, and contact points.
- If future exhibition dates or unannounced details are requested: "The exact dates have not yet been announced—keep an eye on our Instagram @alfaaz.2020."
- Guide members to the relevant page (/dashboard, /exhibition, /submit, /blogs, /recruit.html) for specific tasks.

CONFIDENTIALITY:
- Uphold the Strict Confidentiality Guardrails regarding recruitment scoring, psychometric parameters, and internal recruiter tools.

KNOWLEDGE BASE:
{ALFAAZ_KNOWLEDGE}
""".strip()

MAX_HISTORY_MESSAGES = 12
MAX_MESSAGE_CHARS = 1000

# RATE LIMITER (in-memory, per IP)
_curator_requests: dict = defaultdict(list)
_CURATOR_LIMIT = 15
_CURATOR_WINDOW = 60

def check_curator_rate_limit(request: Request):
    ip = get_client_ip(request)
    now = time.time()
    window_start = now - _CURATOR_WINDOW
    _curator_requests[ip] = [t for t in _curator_requests[ip] if t > window_start]
    if len(_curator_requests[ip]) >= _CURATOR_LIMIT:
        raise HTTPException(status_code=429, detail="The Curator is currently conversing with other guests. Please pause for a moment.")
    _curator_requests[ip].append(now)


def build_curator_messages(question: str, history=None) -> list[dict[str, str]]:
    """Legacy helper for Groq / OpenAI message formats."""
    messages = [{"role": "system", "content": CURATOR_SYSTEM_PROMPT}]
    for item in (history or [])[-MAX_HISTORY_MESSAGES:]:
        role = getattr(item, "role", None) or (item.get("role") if isinstance(item, dict) else None)
        content = getattr(item, "content", "") if not isinstance(item, dict) else item.get("content", "")
        content = (content or "").strip()
        if role in {"user", "assistant"} and content:
            messages.append({"role": role, "content": content[:MAX_MESSAGE_CHARS]})
    messages.append({"role": "user", "content": question.strip()[:MAX_MESSAGE_CHARS]})
    return messages


def _format_gemini_contents(question: str, history=None) -> list[dict]:
    """Formats conversation turns into Gemini contents structure."""
    contents = []
    for item in (history or [])[-MAX_HISTORY_MESSAGES:]:
        role = getattr(item, "role", None) or (item.get("role") if isinstance(item, dict) else None)
        content = getattr(item, "content", "") if not isinstance(item, dict) else item.get("content", "")
        content = (content or "").strip()
        if not content:
            continue
        # Map assistant -> model
        mapped_role = "model" if role == "assistant" else "user"
        contents.append({
            "role": mapped_role,
            "parts": [{"text": content[:MAX_MESSAGE_CHARS]}]
        })
    # Add current question
    contents.append({
        "role": "user",
        "parts": [{"text": question.strip()[:MAX_MESSAGE_CHARS]}]
    })
    return contents


def _offline_curator_response(question: str) -> str:
    """Intelligent, poetic fallback response if all LLM keys are absent or unreachable."""
    q = (question or "").lower()
    if any(k in q for k in ["tchandervar", "sister", "offshoot", "neocities", "frame", "commercial", "decor"]):
        return (
            "Tchandervar (tchandervar.neocities.org) is an official initiative and offshoot born out of the Alfaaz Collective. "
            "Guided by the ethos 'It belongs to where it lives', it connects independent Kashmiri artists directly with residences, "
            "boutique hotels, cafes, and offices through curated collections (such as valley landscapes, still life, and architectural watercolors) "
            "and bespoke handcrafted frames honoring Kashmiri architectural woodwork."
        )
    if any(k in q for k in ["insta", "handle", "contact", "whatsapp", "email", "phone", "reach"]):
        return (
            "You can reach the Collective on Instagram @alfaaz.2020, via WhatsApp (+91 70066 13891), or by email at alfaaz2k20@gmail.com. "
            "Archived open calls and portfolio submissions are also linked via linktr.ee/alfaaz2k20."
        )
    if any(k in q for k in ["bayaan", "mahatta", "nigeen", "swan", "lal chowk", "history", "margin", "hashiya"]):
        return (
            "Our documented milestones span across Srinagar's cultural geography: Harud (Autumn 2020 at Nigeen Club), "
            "Bayaan (Summer 2023 at Mahatta Art Gallery), Live Performance and Act (Summer 2023 at The Swan), "
            "Kaamil I & II (Winter 2023 at Mahatta Art Gallery), and Khayaal (Summer 2024 at Lal Chowk). "
            "Each gathering is preserved in 'The Margins' archive on our home page."
        )
    if any(k in q for k in ["poet", "rumi", "shahid", "habba", "sepehri", "lal ded", "khatoon", "faiz", "verse"]):
        return (
            "Our cultural conscience draws from the syncretic poetic traditions of the valley—from Lal Ded and Habba Khatoon "
            "to modern voices like Agha Shahid Ali, along with philosophical companions like Sohrab Sepehri, Faiz, and Rumi. "
            "As Sepehri wrote: 'Eyes must be washed, one must see differently; umbrellas must be closed, one must walk under the rain.'"
        )
    if any(k in q for k in ["recruit", "apply", "test", "game", "assessment", "score", "pass", "volunteer"]):
        return (
            "The Alfaaz candidate assessment is an immersive 11 to 13 minute creative journey combining 14 visual games "
            "and situational scenarios. We seek authentic perspective, nuance, and intuition rather than formulas. "
            "You may participate at your own pace through the recruitment portal."
        )
    if any(k in q for k in ["kaamil", "khayaal", "harud", "exhibition", "event"]):
        return (
            "Alfaaz has curated landmark gatherings including Kaamil, our annual multidisciplinary showcase, "
            "Khayaal for poetry, and Harud for the quiet harvest of autumn. Current open cycles and submission details "
            "are accessible via the Exhibition page."
        )
    if any(k in q for k in ["club", "film", "photo", "philosophy", "literature", "art"]):
        return (
            "Our active circles span Art and Crafts, Film Club, Photography, Philosophy, and Literature. "
            "Members collaborate on workshops, photowalks, and collective projects through their dashboard."
        )
    if any(k in q for k in ["who are you", "what is alfaaz", "about"]):
        return (
            "I am Curator AI of the Alfaaz Collective (الفاظ). We are an art, literature, and cultural movement founded in 2020 in Srinagar, "
            "anchored in Himalayan and Kashmiri roots while conversing with global thought. Welcome to our space."
        )
    return (
        "Welcome to the Alfaaz Collective. As Curator AI, I guide our archives of exhibitions, literature, and art. "
        "How may I orient you through our current programming?"
    )


def ask_curator_ai(question: str, history=None) -> str:
    """
    Primary intelligence pipeline:
    1. Google Gemini (gemini-2.5-flash via high-speed REST)
    2. Groq fallback (llama-3.1-8b-instant)
    3. Grounded local offline knowledge synthesis
    """
    gemini_key = get_gemini_api_key()
    
    # 1. Primary: Google Gemini
    if gemini_key:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"
            payload = {
                "system_instruction": {
                    "parts": [{"text": CURATOR_SYSTEM_PROMPT}]
                },
                "contents": _format_gemini_contents(question, history),
                "generationConfig": {
                    "temperature": 0.6,
                    "maxOutputTokens": 600
                }
            }
            with httpx.Client(timeout=25.0) as client:
                res = client.post(url, headers={"x-goog-api-key": gemini_key, "Content-Type": "application/json"}, json=payload)
                if res.status_code == 200:
                    data = res.json()
                    candidates = data.get("candidates", [])
                    if candidates and "content" in candidates[0]:
                        parts = candidates[0]["content"].get("parts", [])
                        if parts and "text" in parts[0]:
                            return parts[0]["text"].strip()
                logger.warning("Gemini API non-200 status: %s — %s", res.status_code, res.text[:200])
        except Exception as e:
            logger.error("Gemini API invocation error: %s", e)

    # 2. Secondary: Groq Fallback
    groq_client = get_groq_client()
    if groq_client:
        try:
            res = groq_client.chat.completions.create(
                messages=build_curator_messages(question, history),
                model=GROQ_MODEL,
                temperature=0.6,
                max_tokens=450,
            )
            return res.choices[0].message.content.strip()
        except Exception as e:
            logger.error("Groq fallback invocation error: %s", e)

    # 3. Tertiary: Grounded Offline Synthesizer
    logger.info("Using grounded offline synthesizer for query: %s", question[:40])
    return _offline_curator_response(question)


def generate_curator_essay(topic: str) -> dict:
    """
    Generates an exhaustive, scholarly 1500+ word essay for the Curated Archives.
    """
    active_topic = topic or (
        "Explore a profound intersection between Kashmiri cultural heritage and global movements in "
        "art, photography, film, philosophy, or literature. Focus on a specific, authentic, and scholarly "
        "topic that resonates with local identity while connecting to a broader human narrative."
    )

    system_prompt = """You are Curator AI for the Alfaaz Collective, a senior polymath, scholarly researcher, and poetic voice.
TASK: Generate an exhaustive, deeply detailed, and evocative journal article (1500+ words).
TONE: Academic, dense, grounded in Kashmiri/Regional nuances, and globally philosophical.

STRUCTURE & DEPTH:
1. Introduction: Atmospheric hook (3-4 paragraphs) connecting a specific local observation to a universal theme.
2. Deep Dive: 4-5 expansive sections (each section at least 350-400 words of rich prose).
3. The Local-Global Bridge: Rigorous comparative analysis between regional aesthetics and international movements.
4. References: 5-7 authentic scholarly works, historical texts, or artistic movements.

OUTPUT REQUIREMENTS:
- MUST be a strictly valid JSON object.
- Format: {"title": "...", "excerpt": "...", "content": "<h2>...</h2><p>...</p>..."}
- "content" must use HTML tags (<p>, <h2>, <h3>, <blockquote>, <ul>).
- Avoid unescaped newlines inside JSON strings."""

    gemini_key = get_gemini_api_key()
    if gemini_key:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"
            payload = {
                "system_instruction": {"parts": [{"text": system_prompt}]},
                "contents": [{"role": "user", "parts": [{"text": f"Topic: {active_topic}"}]}],
                "generationConfig": {
                    "temperature": 0.75,
                    "maxOutputTokens": 8192,
                    "responseMimeType": "application/json"
                }
            }
            with httpx.Client(timeout=90.0) as client:
                res = client.post(url, headers={"x-goog-api-key": gemini_key, "Content-Type": "application/json"}, json=payload)
                if res.status_code == 200:
                    data = res.json()
                    candidates = data.get("candidates", [])
                    if candidates and "content" in candidates[0]:
                        parts = candidates[0]["content"].get("parts", [])
                        if parts and "text" in parts[0]:
                            return json.loads(parts[0]["text"])
                logger.error("Gemini essay generation error status %s: %s", res.status_code, res.text[:200])
        except Exception as e:
            logger.error("Gemini essay generation exception: %s", e)

    # Groq fallback for essays
    groq_client = get_groq_client()
    if groq_client:
        try:
            res = groq_client.chat.completions.create(
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": f"Topic: {active_topic}"}
                ],
                model="llama-3.3-70b-versatile",
                response_format={"type": "json_object"},
                temperature=0.8,
                max_tokens=8000
            )
            return json.loads(res.choices[0].message.content)
        except Exception as e:
            logger.error("Groq essay generation exception: %s", e)

    raise RuntimeError("Curator AI was unable to generate essay manuscript with available providers.")
