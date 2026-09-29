# Alfaaz Collective (الفاظ)
*It belongs to where it lives.*

## ❖ What is Alfaaz?
Alfaaz Collective is a creative, cultural, and community-driven initiative based in Kashmir. We are a multidisciplinary space dedicated to nurturing expression across art, literature, film, photography, philosophy, and cultural heritage. Alfaaz operates as an editorial, immersive, and intellectual hub where ideas and dialogue take center stage.

## ❖ Why it Exists
Alfaaz exists to create a sanctuary for voices and visions that might otherwise be marginalized or lost. It is built on the belief that art and culture are not just performative—they are essential community infrastructure. We exist to foster deep intellectual engagement, preserve cultural heritage, and build a collaborative space where creativity is rooted deeply in the local context and community care.

## ❖ How We Work
We operate through collaborative events, grassroots workshops, and immersive projects. Our activities range from formal art exhibitions (like *Kaamil*) and philosophy/literature club gatherings, to children's art therapy workshops and public outreach. The organization relies on a passionate collective of volunteers, artists, and organizers who balance creative vision with rigorous execution.

---

## ❖ The Alfaaz Volunteer Experience (Recruitment Engine)

Because Alfaaz relies on community volunteers to operate, traditional "personality tests" or standard application forms were insufficient. They often measure a candidate's ability to pick the "socially desirable" answer rather than their actual competence under pressure. 

To solve this, we built the **Alfaaz Behavioral Simulation Engine**—an interactive, state-based scenario game where applicants navigate a simulated day volunteering at Alfaaz.

### The Philosophy
The goal of the recruitment assessment is **NOT** to diagnose a person's psychological profile or find the perfect, flawless volunteer. 
The goal is to place the applicant inside a believable Alfaaz environment and observe how they behave when faced with:
* Limited time
* Incomplete information
* Competing priorities
* Interpersonal tension
* Real consequences

### Scientific & Research Foundation
The recruitment engine is built upon several core principles from industrial-organizational psychology and behavioral science:

1. **Situational Judgment Tests (SJTs)**: Instead of self-reporting ("I am a good leader"), candidates are placed in high-fidelity scenarios (e.g., an artist is upset about their painting's placement) and must choose an action. SJTs have historically shown high predictive validity for job and volunteer performance.
2. **Behavioral Consistency Principle**: The engine records low-level behavioral telemetry (e.g., *information_seeking*, *escalation*, *conflict_navigation*) rather than treating choices as arbitrary points. Past behavior in a simulated context is used to predict future behavior in the real world.
3. **Mitigating Social Desirability Bias (Anti-Gaming)**: 
   * **Real-time constraints:** Actions must be chosen within 15-30 second decision windows, limiting the time candidates have to over-intellectualize or use AI to find the "perfect" answer.
   * **No single correct path:** Scenarios present multiple viable solutions (e.g., mediate a conflict vs. enforce a boundary). The system measures the *pattern* of choices, not a binary pass/fail.
   * **Delayed consequences:** A decision made at 9:17 AM might not show its consequence until 9:45 AM in the simulation, preventing candidates from "learning" the scoring system mid-game.
4. **Volunteer Functions Inventory (VFI)**: The scenarios are designed to touch upon the primary motivations for volunteering (Values, Understanding, Social, Career, Protective, Enhancement) as established by Clary et al.

### Measured Parameters (The Six Constructs)
The backend interpretation engine does not display scores to the user. Instead, it aggregates raw behavioral tags into six internal constructs, calculating **Evidence Strength** and **Confidence Levels** based on consistency:

1. **Empathy**: Perspective consideration, prioritizing emotional safety, and recognizing unspoken tensions.
2. **Conscientiousness**: Follow-through, honoring commitments, constraint handling, and task completion.
3. **Collaborative Spirit**: Delegation, coordination, and willingness to restructure group dialogue.
4. **Emotional Agility**: Adaptation, conflict navigation, and recovery after an error.
5. **Curiosity & Learning**: Information seeking, asking for clarification before acting, and checking assumptions.
6. **Creative Initiative**: Proposing alternative layouts, suggesting compromises, and generating independent solutions.

### Role-Fit Matrix
Rather than ranking candidates globally from "best" to "worst", the system maps the gathered behavioral evidence to specific roles Alfaaz needs:
* **Event Operations** (Requires: *initiative, follow-through*)
* **Community & Outreach** (Requires: *perspective consideration, communication*)
* **Creative / Art** (Requires: *creative adaptation, resource use*)
* **Media & Communication** 
* **Research & Documentation**
* **Coordination / Administration**

### Technical Architecture
* **Frontend**: A custom Vanilla JS State Machine (`GameEngine.js`, `GameState.js`) that manages the simulated world clock, UI transitions, action timers, and API telemetry logging.
* **Backend**: A FastAPI application with a PostgreSQL database (via SQLModel). The backend is authoritative—it receives raw behavioral logs from the frontend and uses a server-side Interpretation Engine to calculate role fit and construct evidence, ensuring the data cannot be manipulated in the browser.
* **Admin Dashboard**: Reviewers get a comprehensive profile detailing the applicant's Timeline/Event Log, Construct Confidence, Behavioral Contradictions, and Role-Fit Signals, providing actionable, evidence-based insights for interviews and placement.
