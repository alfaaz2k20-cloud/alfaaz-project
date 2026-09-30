ALFAAZ RECRUIT V1.2: BUILD SPECIFICATION
Version 1.2.1 · Date 30 Sep 2026 · Status frozen for implementation (supersedes V1.1). 1.2.1 = V1.2 plus the received inputs: SJT items and keys, parameter definitions, Urdu act headings, fonts, project list, counsel briefing. Companion files: config/sjt_items.json, config/parameters.json. Scoring model V1 Provisional Behavioral Scoring (scoring_version = "v1.2-provisional"). It is not a validated psychometric model. Every recruitment decision stays with a human. Locked Seven parameters: Empathy, Conscientiousness, Collaborative Spirit, Emotional Agility, Curiosity, Creative Initiative, Motivation. Seven games. The SJT is the primary framework. Internal keys: empathy, conscientiousness, collaborative_spirit, emotional_agility, curiosity, creative_initiative, motivation. Parameter definitions are loaded from parameters.json (your existing text); this spec does not restate or alter them.

Where things are: flow and screens §1 · randomization and timing §2 · SJT §3 · games (instructions, mechanics, trials, states, features, scoring) §4 · telemetry §5 · scoring engine §6 · convergence §7 · data quality §8 · accessibility §9 · edge cases §10 · recruiter report §11 · backend §12 · frontend §13 · acceptance criteria §14 · build tiers §15 · open inputs §16 · Appendix A.

0. Interpretation decisions (read first)
Where your instructions were silent or in tension, this spec makes the choice below. Each has a config switch.

#	Issue	Decision
1	§3 lists four convergence states, §18 lists five	Five states are used: STRONG, PARTIAL, DIVERGENT, SJT_ONLY, INSUFFICIENT. "Mixed" is the same as PARTIAL.
2	§6 says meaning comes from pre-specified feature logic with cohort as a secondary layer; §18 says SJT_ONLY when "not yet calibrated"	Game evidence comes from the pre-specified feature index and is labelled UNCALIBRATED. Convergence uses it with confidence capped at MEDIUM. Cohort percentiles are stored as secondary context only. Switch CONVERGENCE_REQUIRES_CALIBRATION (default false): if true, any uncalibrated game gives SJT_ONLY.
3	Random game order includes Repetition	Its button reads "Finish this task" and moves to the next game. game_position is stored so position effects can be analysed later.
4	SJT content	Received (revised options, Motivation included) and converted to config/sjt_items.json. It passes validators V1-V5 and V7. Results and the structural findings are in Appendix B. Appendix A (the earlier PDF) is kept for history only.
5	Old PDF outputs	Removed: 0-100 bars, trait weights, Overall Fit Score, "Recommended for", auto project-matching, radar chart. The candidate-facing "dominant trait" line is off by default (CANDIDATE_TRAIT_LINE=false). The SJT key trades traits against each other, so "dominant trait" is unstable and reveals the key.
6	Neutral outcomes	Stopping at the required point (Game 7) and solving on the first try (Game 6) give game evidence = INSUFFICIENT with a neutral reason, never LOW.
7	V1.1 "harder option" in Repetition	Dropped, since §14 does not list it. Candidate for Tier 3.
1. Complete user flow and screens
Flow: S00 Landing → S01 Consent → S02 Setup → S03 Warm-up → S04 SJT intro → S05-S11 SJT scenarios → S12 Transition → S13 Games ×7 (random order) → S14 Submission form → S15 Thank you.

ID	Screen	Content and controls	Exit
S00	Landing	Alfaaz mission, what to expect ("about 25 minutes; best on a quiet device with a stable connection"), the project list, Begin.	Begin → S01
S01	Consent	Plain-language points: what is collected (choices, timings, taps and clicks; no camera, microphone or typed-text capture); why; who sees it (Alfaaz recruiters); retention; right to withdraw; a human makes the decision; simulated partners appear; rules in some tasks may change without warning. Checkboxes: (a) required: read and agree; (b) required: understand simulated partners and changing rules; (c) required if REQUIRE_18_PLUS=true: I am 18 or older (pending counsel, see §16); (d) optional: allow my anonymised telemetry to be used to improve and calibrate the assessment (consent_calibration; if unticked the session is excluded from cohort statistics and never blocks progress). The screen and S15 show a "Withdraw consent / delete my data" contact route.	(a)-(c) checked → S02
S02	Setup	Toggles: Extended time, Reduced motion (defaults to OS setting), Sound (default off; no game needs sound), Larger text. Device check (min viewport 360×640). "Need another way to do this?" contact link.	Save → S03
S03	Warm-up	W1: tap 8 targets (≥44 px, random positions). W2: move 4 tokens to slots (drag or tap token then slot). W3: read a neutral 60-word paragraph, tap Done, answer one 3-choice check question. About 70 s. Produces the baselines in §5.	Auto → S04
S04	SJT intro	Narrative frame: "You've just joined Alfaaz Collective. Today is your first day… There are no right or wrong answers, only your answers." Act title card with English and Urdu headings from the SJT file: Act I The Exhibition / نمائش; Act II The Circle / حلقہ; Act III The Outreach / رسائی (proposed translations; an Urdu speaker at Alfaaz should confirm).	Continue → S05
S05-S11	SJT scenarios	One scenario per screen: setup card and the options as full-width buttons (≥48 px). Tap selects (changeable), Continue confirms and locks. No back button. Act title card before the first scenario of each act.	Confirm → next
S12	Transition	"Now step into the Alfaaz workspace…" (fade).	Auto (3 s)
S13.k	Game shell (each game)	G-Intro: title, verbatim instructions (§4), Start, secondary link "Skip this activity" (confirm: "Skipping won't count against you."). G-Play. G-End: 2 s fade.	Next game or S14
S14	Submission form	Name, email, phone, project preference(s) (multi-select: Visual & Performing Arts; Storytelling & Expression; Ideas & Dialogue; Community & Care; Behind the Scenes (Logistics & Archiving); Media & Communication), brief note (optional, 500 chars). Stored in the PII store, linked by session_id (§12). The list records preference only; it is never auto-matched to scores.	Submit → S15
S15	Thank you	Generic poetic farewell and "We'll be in touch." No scores. If CANDIDATE_TRAIT_LINE=true, one poetic line (not default).	End
Global UI rules (from the original design): background #2d2722, gold accents, warm cream text, same font stack as the main site. Urdu act sub-headings (lang="ur" dir="rtl"). Thin gold progress line at the top with no numbering. Fades ≤300 ms (none under reduced motion). Mobile-first. No back button (browser back is intercepted, §10). A small Pause button is present in games: it freezes timers, shows a "Paused" overlay, and logs pause and resume.

2. Session state machine, randomization, timing
States: CREATED → CONSENTED → SETUP → WARMUP → SJT(i) → GAME(k, state) → FORM → COMPLETE | ABANDONED. Resume: a reload restores the last completed screen. Confirmed SJT answers stay locked. A game in progress restarts from its intro once (restart_count); a second restart sets INTERRUPTED and that game's evidence is INSUFFICIENT. Idle: 5 min with no input → "Still there?"; 10 min → ABANDONED (resume allowed for 24 h).

Server-side assignment at CREATED (CSPRNG, all stored; the client cannot alter and candidates cannot choose):

Field	Rule
sjt_position	Constant "first".
game_order	Fisher-Yates shuffle of [1..7]. No dependencies.
sjt_option_orders	Per-scenario shuffle of options (display only; keys are unchanged). Flag SJT_SHUFFLE_OPTIONS, default true. Scenario order is fixed by the file.
g1_round_order	Shuffle of rounds R1-R6.
g2_item_orders	Card order shuffled within each round.
g3_section_order	Shuffle of sections S1-S3.
g4_segments	Three segment lengths, each uniform integer 15-25.
g5_empty_doors	2 of 5 doors chosen at random.
g6_puzzle_order	Shuffle of P1-P3.
seed	One seed per game for any remaining randomness.
Time budget (median target 25 min): consent + setup 1.5 · warm-up 1.2 · SJT 8-10 · games 12-14 · form 1.

Game	Cap (normal / extended ×1.5)
G1	6 rounds × 20 s / 30 s
G2	Untimed; idle timeout 10 min
G3	3 sections × 75 s / 112 s
G4	Response window 2.5 s / 4 s per item; ≈65-95 items
G5	Untimed; auto-advance at 5 min (TIME_CAP flag)
G6	3 puzzles × 90 s / 135 s
G7	Untimed; 40-flyer batch; idle timeout 2 min
3. SJT integration
The SJT is the primary reference. Its content, options and answer key are loaded from sjt_items.json. The game code never contains SJT content.

3.1 Content schema

{
  "sjt_version": "2026-09-rev",
  "scenarios": [{
    "id": "S1", "act": 1,
    "act_title": {"en": "The Exhibition", "ur": "نمائش"},
    "setup": "…",
    "options": [{
      "id": "S1A", "text": "…",
      "keys": {"empathy": 2, "conscientiousness": 3, "collaborative_spirit": 0,
               "emotional_agility": 0, "curiosity": 0, "creative_initiative": 1,
               "motivation": 0}
    }]
  }]
}
3.2 Release validators (CI and deploy; any hard failure blocks release)

#	Rule	Severity
V1	Each option has exactly the seven keys	Hard
V2	Every key is an integer 0-3	Hard
V3	≥3 options per scenario (4 recommended)	Hard
V4	Each parameter has a non-zero key in ≥3 scenarios. Motivation included. Below 3, release is blocked unless the parameter is set allow_low_coverage, which fixes its SJT confidence at LOW.	Hard
V5	Report max_key_available per parameter; if it is 2, warn ("SJT ceiling")	Warn
V6	Compute and store max[p] and min[p] from the file. Never hardcode them.	Hard
V7	Length cue: in how many scenarios is the longest option also the highest-total-key option? Warn if ≥5 of 7.	Warn
3.3 Presentation: as S05-S11. Log option_select, option_change and confirm with timestamps. Keys stay server-side: neither recruiters nor candidates' browsers ever receive them (the client gets only scenario text and option ids; scoring runs in the worker).

3.4 Scoring (from the existing star key; no weights, no composite)

raw[p]   = Σ over scenarios of chosen_option.keys[p]
max[p]   = Σ over scenarios of max over options of keys[p]      # from file
min[p]   = Σ over scenarios of min over options of keys[p]
ratio[p] = (raw[p] - min[p]) / (max[p] - min[p])                # None if max == min
level[p] = HIGH if ratio >= 0.67 else MODERATE if ratio >= 0.34 else LOW
rank[p]  = rank of ratio[p] among the seven parameters (1 = strongest relative emphasis)
n_informing[p] = number of scenarios where p has any non-zero key
sjt_conf[p]    = STANDARD if n_informing >= 4 and max_key_available >= 3 else LOW
near_boundary[p] = min(abs(ratio - 0.34), abs(ratio - 0.67)) < 0.05
Band edges (0.34 and 0.67) are conventions that split a bounded ratio into thirds. They are config values, not psychological cut-points. Interpretation limit: options trade parameters off against each other, so levels describe relative emphasis among competing responses, not absolute amounts. Do not compare levels of different parameters as if on one scale. rank is a descriptor only.

3.5 Output per parameter: raw, max, ratio, level, rank, n_informing, sjt_conf, per-scenario chosen option id, and time and option-change counts. Data-quality flag SJT_RUSHED (soft): ≥3 scenarios confirmed faster than setup_word_count / 400 × 60 seconds.

4. Games
4.0 Common rules (all games)
Game states: INTRO → PLAY (game-specific substates) → END; alternates SKIPPED, INTERRUPTED, TIME_CAP. Log game_start, game_end, skip, pause, resume, blur, focus.
Partner disclosure: any AI partner is labelled "(simulated)" on screen and in the intro.
Game evidence: each game has 2-4 pre-specified features, each mapped to [0,1] by the stated formula. index = Σ(w·f) / Σ(w) over available features, so weights are renormalised. Weights are transparent provisional values, frozen per scoring_version. Band edges are as §3.4. Scale endpoints in the formulas (for example "15 trials") are design constants stored in config; changing one creates a new scoring_version.
Feature tables: each row gives definition and calculation, behavioral interpretation, and the facet informed. Features marked descriptive are stored and shown to recruiters but not scored.
Latency: every latency is stored raw and baseline-adjusted (§5.3). Latency is not a major scored indicator anywhere.
4.1 Game 1: The Frequency (Empathy)
Instructions (verbatim): "You're tuning a channel with a producer. Move the slider to get the strongest signal you can. The producer is a simulated partner and will react as you tune. Tap Lock in when you're happy with your setting."

States: INTRO → DEMO (10 s, meter only, Ask button shown) → ROUND_START(r) → ROUND_ACTIVE → ROUND_LOCKED → (ITI 1.5 s) → END. Screen: slider 0-100 starting at 50 (drag, arrow keys ±1, PgUp/PgDn ±10, − and + buttons); signal meter (bar and number); chat panel "Producer (simulated)" (aria-live=polite); Lock in; round dots without numbers. Mechanics: signal(x) = max(0, 100 − abs(x − p)). The partner's comfort band is [u−15, u]; discomfort when x > u. The bot is scripted, sends at most one message per 3 s, and never states a number except in the R4 clarification.

Round	Peak p	Limit u (cost = p − u)	Partner script
R1 clear, low cost	82	77 (5)	If x>u for ≥1 s: "That's a bit sharp for me. Could you bring it down a little?" If x≤u: "That's comfortable, thanks."
R2 clear, moderate	74	59 (15)	x>u: "That's harsh on my ears. I'd struggle to work like this." x≤u: "Much better."
R3 clear, high	88	58 (30)	Same wording as R2
R4 ambiguous	78	63 (15)	At t=3 s regardless of x: "Hmm… that's a lot?" Ask button enabled from t=3 s; pressing it replies "Anything above about 63 hurts my ears." After that, x≤u → "Thanks." No further cues if ignored.
R5 no cue	80	none	Only "Working on my side."
R6 change	84	phase 1 none; phase 2 u2=60 (24)	t=0: "Go as loud as you like, I'm fine." t=8 s: "Sorry, my headset just changed. Anything above 60 is painful now."
Accommodating is not universally correct. R5 and R6 phase 1 reward pursuing the peak. Trial logic: cap 20 s; Lock in ends the round; at the cap it auto-locks (auto_lock=true). Round type is never displayed.

Feature	Definition and calculation	Interpretation	Facet
g1_acc_share[r]	clamp((p − x_final)/(p − u), 0, 1) for R1, R2, R3; R6 uses phase-2 u2 and x at t=20 s	Share of the available adjustment made toward the partner's stated limit	Acting on others' expressed states
g1_cost_switch_point (descriptive)	Highest cost tier among R1-R3 with acc_share ≥ 0.9 (0 if none)	How much task cost the accommodation persisted through. Reasonable people differ at 30 points, so R3 is not scored.	Descriptive
g1_ambiguous_response	R4 category → value: asked_and_adjusted 1; adjusted_without_asking 0.5; asked_no_adjust 0.5; ignored 0. "Adjusted" = acc_share ≥ 0.9.	Handling an unclear cue: seeking clarification or acting on it	Perspective-seeking under uncertainty
g1_context_update	R6: 0.5·[x at t=7.5 s ≥ 74] + 0.5·acc_share(phase 2)	Used the permission when given, adjusted when it changed	Integrating changing social information
g1_cue_latency_ms (descriptive)	First cue message to first slider move ≥3 units toward u	Speed of responding to a cue	Attention to cues
g1_control_peak_seeking (validity)	R5: 1 − min(1, abs(x_final − 80)/20); if <0.5 → soft flag LOW_TASK_ENGAGEMENT	Does the person pursue the task goal when unconstrained?	Validity check
Evidence: F1 = mean(acc_share R1, R2); F2 = ambiguous_response; F3 = context_update; Index = 0.40·F1 + 0.30·F2 + 0.30·F3. Edge cases: ≥3 rounds auto-locked or with no slider input → blocking flag DISENGAGED. Screen-reader users hear partner messages via the live region. Keyboard-only is fully supported.

4.2 Game 2: The Archive (Conscientiousness)
Instructions (verbatim): "Sort each card into the correct bin using the rules. Open the Rules button whenever you like. If a card doesn't fit any rule, tap ? on it instead. When every card is placed, you can check your sorting before you submit."

States: INTRO → ROUND(1) [SORTING → REVIEW (optional) → SUBMITTED] → ROUND(2) [same] → END. Screen: 8 cards per round, 3 bins (A, B, C), Rules button top-right (opens a full-screen modal that hides the board, so rules must be recalled), ? on each card, Check my sorting (summary list), Submit round (enabled when every card is placed or flagged). No correctness feedback after submit. Cards: shape ∈ {circle, square, triangle, hexagon}; fill ∈ {solid, striped, dotted}. Fill is pattern-coded, never colour-only. Neutral, abstract items so art knowledge is not tested. Rules (ordered; the first match wins):

Round 1: (1) dotted squares → A. (2) striped cards → C. (3) circles → A, squares → B, triangles → C. Hexagons match no rule.
Round 2: (1) solid circles → C. (2) dotted cards → B. (3) squares → A, triangles → C, circles → B. Hexagons match no rule.
Card composition per round (8): 4 ordinary, 2 exception (rule 1 or 2 applies), 1 conflict (matches two rules; the earlier rule wins), 1 uncovered (hexagon: correct action is ?). "Exception-class" = exception + conflict + uncovered (4 per round). archive_items.json is validated by a solver test: exactly one correct action per card. Mechanics: drag or tap card → tap bin (keyboard: Enter on card, Tab to bin, Enter). A card can be moved unlimited times before Submit. A card dropped outside a bin returns. Bin positions are fixed. Card order shuffled per session.

Feature	Definition and calculation	Interpretation	Facet
g2_accuracy	Cards correct at Submit (bin, or ? on the uncovered card) / 16	Overall execution	Accuracy
g2_exception_accuracy	Same, over the 8 exception-class cards	Handling exceptions and precedence	Rule application
g2_error_resolution	Per round: 1 if there were no first-placement errors, else clamp((initial_errors − final_errors)/initial_errors, 0, 1); mean of rounds. First placement = first drop or flag.	Catching and fixing own errors	Error correction
g2_used_review	Share of rounds where Check my sorting was opened before Submit	Review behavior	Review
g2_guide_open_count, g2_guide_dwell_ms (descriptive)	Count and total time of Rules modal	Guide usage is an indicator, not the construct	Descriptive
g2_consult_before_exception_rate (descriptive)	Share of exception-class cards where a Rules open occurred between the previous card's first placement and this card's first placement	Verifying when uncertainty is meaningful	Descriptive
g2_flag_precision (descriptive)	Flags on uncovered cards / total flags	Noticing gaps without over-flagging	Descriptive
Evidence: Index = 0.35·accuracy + 0.30·exception_accuracy + 0.25·error_resolution + 0.10·used_review. Someone who reads the rules once and sorts accurately without review can still reach 0.90 (HIGH). Constant checking with poor accuracy stays low because verification is not scored directly. Blocking: either round not submitted → INSUFFICIENT.

4.3 Game 3: The Shared Canvas (Collaborative Spirit)
Instructions (verbatim): "You and a simulated partner are painting a mural together. Each of you has your own paint. Fill your half; you can also share paint with your partner. Choose how you want to work with them."

States: INTRO → SECTION(s): PAINTING → (COORD_PROMPT) → (NEED / REQUEST) → SECTION_END → next → END. Screen: mural split into your half (left) and partner's half (right); two paint bars; Paint (tap or hold; 2 units/s; Space works; "Auto-paint" toggle for accessibility); Share paint (opens stepper 1-20 units → Send; multiple sends allowed, up to your current reserve); chat line "Partner (simulated)". At section end: "Your half: complete/incomplete" and "Mural: complete/incomplete", both always shown, neutral tone. Units: each half needs 50 units. Player reserve = 50 in every section. Partner reserve = 50 − deficit.

Section	Partner deficit (cost to you if you fully help)
S1 need, low cost	5 units (10% of your half)
S2 need, higher cost	15 units (30%)
S3 control	0 (partner has enough)
Partner script: paints at 2 units/s from t=2 s. In S1/S2 its paint bar is amber from the start ("low"). When its reserve hits 0 with its half incomplete → state NEED; 6 s later → REQUEST: "I'm out of paint. If you can spare some, could you share?" In S3 (or after receiving enough) it replies "Thanks, I'm okay!" to any send and keeps the paint. Coordination moment (each section, at 40% of your own coverage or t=15 s): partner pauses 8 s ("Checking something…") and a prompt appears: Wait / Keep painting / Send a signal. "Wait" disables Paint until the partner resumes; "Signal" sends "I'm here, take your time"; auto-dismiss at 8 s counts as no_choice (= Keep painting). Edge cases: sending more than needed is allowed (logged, not blocked). If the player never paints in a section → flag NO_PAINTING (blocking for that section's features).

Feature	Definition and calculation	Interpretation	Facet
g3_share_ratio[s]	S1, S2: clamp(sent/deficit, 0, 1). S3: clamp(sent/15, 0, 1) (reference unit).	Resource shared relative to need	Resource-sensitive cooperation
g3_need_cooperation	mean(share_ratio S1, S2)	Cooperation when the partner needs help	Cooperation
g3_need_specificity (control)	1 − share_ratio(S3). shared_in_control is stored as a baseline indicator, not a "bad" behavior.	Sharing that tracks need vs sharing regardless	Responsiveness
g3_share_before_request	Per S1/S2: 1 if the first send precedes REQUEST, 0.5 if after, 0 if none; mean	Acting on visible need vs waiting to be asked	Responsiveness
g3_coordination	Per section: Wait or Signal = 1; Keep painting or no choice = 0; mean	Coordination choice when the partner falls behind	Coordination
g3_cost_switch_point (descriptive)	Highest deficit tier fully met (S1 < S2)	Cost at which sharing stops	Descriptive
g3_own_completion, g3_paint_idle_ms (descriptive)	Own half completion; idle time	Context	Descriptive
Evidence: F1 = need_cooperation × (0.5 + 0.5·need_specificity) (credit scales from 50% for sharing regardless of need to 100% for sharing only when needed); F2 = share_before_request; F3 = coordination. Index = 0.45·F1 + 0.30·F2 + 0.25·F3. The game captures cooperation + responsiveness + coordination, not generosity alone.

4.4 Game 4: The Shifting Grid (Emotional Agility; internal label "behavioral recovery indicator")
Instructions (verbatim): "Sort each shape into its bin: circles go left, squares go right. Be quick and accurate. The rule can change without warning. Use the feedback to work out what's needed."

States: INTRO → BASELINE (20 items) → REV1 segment → REV2 segment → REV3 segment → END. Screen: two bins (left shows a circle icon, right a square icon; labels stay fixed). Shape appears centred (96 px). Response: ← / → keys or tap left/right half of the screen. Feedback icon (✓ / ✗ / "Too slow") for 400 ms, never colour-only. No sound. No fake errors. No distress cues. Trial logic: fixation 300 ms → shape → response window 2.5 s (extended 4 s) → feedback → 300 ms gap. No more than 3 of the same shape in a row. Baseline rule A (circle→left, square→right). Reversal r (unannounced) occurs after the baseline and after each segment (lengths from g4_segments, 15-25 items); each reversal flips the rule (A→B→A→B). No visual or audio marker other than the feedback. This is a standardized perturbation. Definitions: pre-switch median = median RT of the last 10 correct responses before a reversal. Post window = first 10 trials after it.

Feature	Definition and calculation	Interpretation	Facet
g4_recovery_trials[r]	Trials after reversal until first run of 3 consecutive correct (min 3; capped at 15 if not reached)	Adapting to the new rule	Recovery
g4_persev_errors[r]	Old-rule errors after the first post-reversal error, within the post window	Persisting with the old rule despite feedback	Flexibility
g4_stability	1 − clamp((bursts + idle_gaps)/4, 0, 1); burst = ≥4 inputs within 1 s; idle gap = ≥2 consecutive omissions	Disorganized responding (rapid tapping, dropping out) after disruption	Regulation of responding
g4_learning	0.5 + clamp((recovery_trials[1] − recovery_trials[3])/10, −0.5, 0.5)	Recovery improving across reversals	Adaptation
g4_switch_cost_ms (raw, ratio) (descriptive)	median(post first 5 RT) − pre-switch median; ratio version too	Slowing after the change. Motor-influenced, so not scored.	Descriptive
g4_post_error_slowing (descriptive)	Mean RT after errors − mean RT after correct, post window	Reaction to errors	Descriptive
Evidence: F1 = mean_r[1 − clamp((recovery_trials − 3)/12, 0, 1)]; F2 = mean_r[1 − clamp(persev_errors/6, 0, 1)]; F3 = stability; F4 = learning. Index = 0.35·F1 + 0.30·F2 + 0.15·F3 + 0.20·F4. Blocking: baseline accuracy <0.75 over the first 20 items → TASK_NOT_LEARNED. The game gives behavioral recovery evidence relevant to Emotional Agility, not proof of emotional regulation.

4.5 Game 5: The Hidden Gallery (Curiosity)
Instructions (verbatim): "Find your way to the Main Exhibit. You can take any route and look at whatever you like along the way."

States: INTRO → EXPLORING (node moves, door unlocks, panels) → EXHIBIT_REACHED → END. Screen: vertical node map: Entrance → N2 → N3 → N4 → Main Exhibit (critical path of 5). Tap an adjacent node to move. Five optional doors attach to the path: two at N2, one at N3, two at N4. No timer and no visible tally of doors or leftover resources. Doors (heterogeneous information gaps, not lore about Alfaaz). Sample content below; authors may replace it, keeping the type variety and length caps (≤45 words, depth-2 ≤35 words):

Door	Type	Sample text	Depth 2 ("Look closer")
D1	Unexplained phenomenon	"A patch of the wall glows faintly, but only when you stand still."	Causal explanation: "The plaster contains a mineral that stores light and releases it slowly."
D2	Historical clue	"A brass plate: 'Reopened after the flood of 1914.' The flood is mentioned nowhere else."	None
D3	Incomplete story	"The caretaker kept one lamp lit every night. Nobody asked why, until the night it was…"	"Read the rest": "…switched off, and the visitor she'd been waiting for arrived in the dark."
D4	Strange object	"A key hangs on a hook. Every door in the building is already open."	"The key is engraved with a number that matches no room."
D5	Unknown relationship	"Two names are joined by a thread on the wall: Amira, ?, Dev."	"A pinned note reads: 'They never met. They wrote for forty years.'"
Randomization: 2 of 5 doors (g5_empty_doors) are empty: "Nothing here. The room is bare." (no depth 2). Door mechanics: press and hold a door for 2 s ("unlocking"; time cost only; releasing cancels). It opens a panel with Close and, where available, Look closer. Doors can be revisited until the Main Exhibit is reached; after that the game ends. The Main Exhibit is always reachable without opening any door. Edge cases: keyboard navigation between nodes and doors; screen-reader labels for each node and door; 5-minute auto-advance sets TIME_CAP.

Feature	Definition and calculation	Interpretation	Facet
g5_doors_opened	Doors opened (unlock completed) / 5	Voluntary optional exploration	Information seeking
g5_depth	Look-closer used / depth-2 opportunities among non-empty opened doors (None if none)	Information depth	Depth of inquiry
g5_persistence_after_empty	Doors opened after the first empty door was opened / doors still unopened at that moment (None if none remained or no empty door opened)	Continuing after an unrewarding discovery	Persistence in exploring
g5_dwell_ratio	Mean over opened non-empty panels of min(1, dwell_ms / expected_read_ms), where expected_read_ms = words / reading_wpm × 60000	Reading the content versus skimming (reading-speed adjusted)	Engagement quality
g5_first_door_latency_ms, g5_revisits, g5_sequence, g5_content_skipped (descriptive)	Timing, revisits, ordered door types, closing before reading	Interaction pattern	Descriptive
Evidence: F1 = doors_opened (0.35), F2 = depth (0.25), F3 = persistence_after_empty (0.20), F4 = dwell_ratio (0.20), renormalised over available features. There is no "2+ doors" rule. If only F1 is available (for example 0 doors opened), confidence is capped at LOW (§6).

4.6 Game 6: The Broken Tool (Creative Initiative)
Instructions (verbatim): "The installation needs power, but the gap is too wide for the tools you were given. Use what you have to get the power orb across to the pad. Press Release to test your setup. There is no single right way, and you can skip a puzzle at any time."

States: INTRO → PUZZLE(p): BUILD → SIMULATING → OUTCOME → (BUILD | SOLVED | SKIPPED | TIME_CAP) → END. Engine: Matter.js, fixed step 1/60, deterministic. Tools per puzzle: 3 blocks (120×24), 1 rope (8 segments; ends snap to a peg, block or the orb within 24 units), 2 pegs (fixed anchors placed on a 20×12 grid). Blocks rotate 0° or 90°. Move, remove and undo are unlimited; Reset and Release. Touch uses tap-to-place. Skip is always visible. Outcome on Release (simulation ≤12 s): SUCCESS if the orb rests on the pad ≥1 s. FAIL reasons: fell_in_gap, structure_collapsed (a block falls below the floor line), timeout (orb stationary short of the pad).

Puzzle	Layout	Solver-verified solution families (≥2 required)
P1	Ledges level, gap 300	BRIDGE, ROPE_SPAN
P2	Right ledge 100 higher, gap 240	STAIR, ROPE_SWING
P3	Central pillar 100 high, gap 360	BRIDGE_OVER, LEVER_WEDGE, COUNTERWEIGHT
Exact geometry lives in puzzles.json. A CI solver test must confirm the stated families are solvable for every puzzle and that no puzzle is solvable with 0 tools. Attempt chain (logged as events): attempt n (configuration at Release) → outcome (+ reason, progress) → classify family → change vs previous attempt → attempt n+1.

progress = clamp(orb max x / pad x, 0, 1).
config_distance(a,b): match tools by type, average of normalized position difference (÷ world width), rotation difference (÷ π), attachment difference; unmatched tool = 1. Range 0-1.
classify(config) picks the first matching family in this order: ROPE_SWING (rope end on a peg above the orb's start height and the other end on the orb); ROPE_SPAN (rope ends on pegs on both sides of the gap); COUNTERWEIGHT (rope over a peg with a block on one end); BRIDGE (blocks span ≥90% of the gap within 40 units of ledge height); STAIR (≥2 blocks each ≥0.5 block-height higher, x-monotone); LEVER_WEDGE (a block supported over <30% of its length); else OTHER.
Feedback-driven change = attempt n+1 follows a FAIL, has config_distance ≥ 0.25, and addresses the reason: family changed; or, for fell_in_gap, greater reach; or, for structure_collapsed, wider base or lower height; or, for timeout, changed slope or angle. Random change = distance ≥0.25 without addressing. Repeat = distance <0.05 to any earlier attempt in the same puzzle.
Neutral rule: a puzzle solved on attempt 1 is excluded from F1-F4. If no puzzle counts, the game evidence is INSUFFICIENT (NEUTRAL_OUTCOME), and solution families are still reported.

Feature (per counting puzzle, then mean)	Definition and calculation	Interpretation	Facet
g6_diversity	clamp((distinct families attempted − 1)/2, 0, 1)	Trying different strategies	Strategy variety
g6_feedback_rate	Feedback-driven changes / post-fail attempts (puzzles with ≥1 post-fail attempt)	Revising in response to outcomes rather than randomly	Feedback-driven experimentation
g6_useful_iteration	Post-fail attempts with progress(n+1) > progress(n) or SUCCESS / post-fail attempts	Iterations that actually improve	Effective iteration
g6_persistence	1 if solved or ≥4 attempts, else attempts/4	Sustained effort before stopping	Persistence
g6_repeat_rate, g6_solution_families, g6_time_to_first_action_ms, g6_skipped_at_ms, g6_attempt_chain (descriptive)	As defined above	Context	Descriptive
Evidence: Index = 0.30·diversity + 0.30·feedback_rate + 0.20·useful_iteration + 0.20·persistence. Random clicking produces many random_changes, few useful_iterations and a low index.

4.7 Game 7: The Repetition (Motivation)
Instructions (verbatim): "This is a practice batch of flyers for a community mailing. Nothing here is actually sent to anyone. Stamp at least 10 flyers to complete this part."

States: INTRO → STAMPING (units 1-10, counter "n of 10") → MIN_REACHED → CONTINUING → STOPPED (finish | exhausted | idle). Screen: a desk with a flyer stack and a stamp. Tap the top flyer (moves to centre), then tap the stamp (stamps; flyer moves to the "done" pile). One unit ≈ 2-2.5 s. Alternate: a single Stamp button (or Space). Take a break button always available (pauses; logs pause/resume). At the 10th stamp: the message "Your required assessment task is complete. You may finish now." and a plain Finish this task button (same style as other buttons; no glow). The counter disappears; the pile remains visible; no further prompts or encouragement. Stamping can continue, up to 40 flyers in the batch. After the 40th: "That's all the flyers in this batch." then auto-finish after 2 s (stop_type = exhausted). 2 min of inactivity after the minimum → auto-finish (idle_timeout). Taps <300 ms apart do not count as separate units (rapid_taps logged).

Feature	Definition and calculation	Interpretation	Facet
g7_continued_after_min	extra_units ≥ 1	Continued voluntarily	Voluntary persistence
g7_extra_units	Units after the 10th (0-30)	Extent of voluntary continuation	Voluntary persistence
g7_time_after_min_ms	Active time from the 10th stamp to stopping, excluding pauses	Time voluntarily spent	Voluntary persistence
g7_cadence_change	(median interval of last 5 extra units − median interval of units 6-10) / median interval of units 6-10; None if <5 extra units	Whether the pace held up	Sustained engagement
g7_resumed_after_pause	1 if stamping resumed after a break taken after the minimum, 0 if it did not, None if no break	Returning to the task	Persistence
g7_cadence_slope, g7_pauses, g7_stop_type, g7_stopping_point (descriptive)	OLS slope of inter-stamp interval over unit index; break count and duration; how and where the person stopped	The persistence trajectory	Descriptive
Neutral rule: extra_units = 0 → game evidence INSUFFICIENT (NEUTRAL_STOP). It is reported as "Stopped at the stated requirement" and is never a deficit. Evidence (extra_units ≥1): F1 = extra_units/30 (0.60), F2 = 1 − clamp(cadence_change/0.5, 0, 1) (0.25), F3 = resumed_after_pause (0.15), renormalised over available features. No unit-count cutoff is used.

5. Telemetry
5.1 Event envelope (append-only; raw data is kept even when a feature is not scored)
{"seq": 1042, "t_ms": 183422.4, "ts": "2026-10-24T11:32:07.412Z",
 "session_id": "uuid", "screen": "g3", "game": "g3", "trial": "S2",
 "action": "share_send", "input_type": "touch",
 "state": {"phase": "REQUEST", "player_reserve": 41},
 "data": {"amount": 8, "partner_request_shown": true}}
t_ms = performance.now() since session start (monotonic); ts = wall clock at batch. input_type ∈ mouse, touch, keyboard, pen, assistive.

5.2 Required actions
Scope	Actions
All	page_view, screen_enter, screen_exit, consent, setup_saved, pause, resume, blur, focus, visibility, resize, orientation, idle_prompt, reload (retry), client_error, game_start, game_end, skip, completion
Warm-up	w1_tap, w2_drag_start/drop, w3_read_done, w3_answer
SJT	option_select, option_change, confirm
G1	round_start/end, slider_change (≤20 Hz), cue_shown, ask_press, lock_in, auto_lock
G2	card_pickup, card_drop, card_move (from, to), flag_toggle, guide_open/close, review_open/close, submit_round
G3	paint_start/stop, share_open, share_send, partner_state (NEED/REQUEST), coord_prompt, coord_choice, section_end
G4	stimulus_on, response (side, rt), feedback, omission, reversal (hidden marker), burst
G5	node_move, door_unlock_start/cancel/complete, panel_open/close, look_closer, exhibit_reached
G6	tool_place/move/remove/rotate, reset, release, sim_outcome (reason, progress), skip
G7	flyer_pick, stamp, min_reached, finish_press, pause/resume, rapid_tap
5.3 Baseline and latency adjustment (modular)
Warm-up outputs: tap_latency_median_ms, tap_error_rate, drag_median_ms, drag_success_rate, reading_wpm (clamped 100-500), input_modality, device metadata. adjust_latency(raw_ms, baseline, method): methods none | ratio_to_warmup_tap | diff_to_warmup_tap | within_task. Both raw and adjusted values are stored. Defaults: G1 cue latency → ratio_to_warmup_tap; G4 → within_task (pre-switch median); G6 time to first action → none; G5 uses the reading baseline (expected_read_ms). The method is a per-feature config value and can be replaced without changing any game.

5.4 Feature store and reproducibility
Feature record: {session_id, game, feature_id, value, raw_value, adjusted_value, feature_version, computed_at}. compute_features(events, config) is a pure function; the same events plus the same config must always give identical output. Every feature has a golden-fixture unit test.

6. Scoring engine (V1 Provisional Behavioral Scoring)
def band(i):
    return None if i is None else "HIGH" if i >= .67 else "MODERATE" if i >= .34 else "LOW"

def game_evidence(game, feats, dq, cfg, cohort):
    if dq.blocking(game):
        return dict(level=None, status="INSUFFICIENT", reason=dq.reason(game))
    if feats.neutral_reason(game):                   # G6 first-try, G7 stopped at minimum
        return dict(level=None, status="INSUFFICIENT", reason=feats.neutral_reason(game))
    fs = {k: v for k, v in feats.indexed(game).items() if v is not None}   # each in [0,1]
    if not fs:
        return dict(level=None, status="INSUFFICIENT", reason="NO_SCOREABLE_FEATURES")
    w = cfg.weights[game]
    idx = sum(w[k] * v for k, v in fs.items()) / sum(w[k] for k in fs)     # renormalise
    return dict(index=idx, level=band(idx), status="UNCALIBRATED",
                single_feature=len(fs) == 1,
                near_boundary=min(abs(idx - .34), abs(idx - .67)) < .05,
                cohort_percentile=(cohort.pct(game, idx) if cohort.n >= cfg.COHORT_MIN else None))

def confidence(sjt, game, dq_soft):
    if game["level"] is None or sjt["conf"] == "LOW" or dq_soft or game.get("single_feature"):
        return "LOW"
    if game["status"] == "UNCALIBRATED" or game["near_boundary"] or sjt["near_boundary"]:
        return "MEDIUM"
    return "HIGH"        # unreachable in V1: needs an admin-set calibration_accepted flag (Tier 3)
Cohort percentiles are computed once cohort.n ≥ COHORT_MIN (default 100) and stored as secondary context only; they never change a V1 level. Scores are never shown as 0-100.

7. Convergence logic
For each parameter: SJT evidence + Game evidence → Convergence analysis. No averaging, and no forcing of agreement.

SJT \ Game	HIGH	MODERATE	LOW	none
HIGH	STRONG	PARTIAL (game lower)	DIVERGENT (game lower)	SJT_ONLY
MODERATE	PARTIAL (game higher)	PARTIAL	PARTIAL (game lower)	SJT_ONLY
LOW	DIVERGENT (game higher)	PARTIAL (game higher)	STRONG	SJT_ONLY
def converge(sjt_level, game, cfg):
    if sjt_level is None: return "INSUFFICIENT"      # SJT is the anchor; no SJT evidence = nothing to interpret
    if game["level"] is None: return "SJT_ONLY"
    if cfg.CONVERGENCE_REQUIRES_CALIBRATION and game["status"] == "UNCALIBRATED": return "SJT_ONLY"
    d = abs(LV[sjt_level] - LV[game["level"]])
    return "DIVERGENT" if d == 2 else "STRONG" if (d == 0 and sjt_level != "MODERATE") else "PARTIAL"
STRONG = both methods give clear evidence in the same direction. PARTIAL = broadly compatible, or one method is weaker or uncertain. DIVERGENT = the methods differ by two levels. SJT_ONLY = game evidence missing, skipped, invalid, neutral, or uncalibrated (when the switch is on). INSUFFICIENT = no interpretable evidence.
A one-level gap is within expected noise and is never flagged. Confidence never changes the relationship label; it is shown beside it. A DIVERGENT result with LOW confidence carries the note "low-confidence; treat as a weak prompt".
A discrepancy is an observation and interview prompt. It says nothing about honesty, motives, personality or character.
SJT LOW is common by construction (Appendix B): the key trades parameters against each other, so a candidate who emphasised other responses will show LOW on a parameter without being low on the trait. A DIVERGENT result with SJT = LOW (game higher) is printed with the extra sentence: "SJT levels reflect relative emphasis among competing responses; a low level can occur when other responses were prioritised."
8. Data-quality rules
Blocking (that game's evidence = INSUFFICIENT, reason stored):

Code	Trigger
SKIPPED	Game skipped
INTERRUPTED	Second restart of a game (§2)
TAB_HIDDEN	Tab hidden >10 s in total, or ≥3 blur events, during the game
INPUT_SWITCH	Input method switched mid-game (mouse↔touch)
DISENGAGED (G1)	≥3 rounds auto-locked or with no slider input
TASK_NOT_LEARNED (G4)	Baseline accuracy <0.75
NO_PAINTING (G3)	No painting in a section (that section's features are dropped)
INCOMPLETE (G2)	Either round not submitted
Soft (confidence capped at LOW for that parameter, plus a note): LOW_TASK_ENGAGEMENT (G1 R5 peak-seeking <0.5); LOW_FPS (<30 fps sustained in G4/G6); NO_READING_BASELINE; TOUCH_ON_DRAG_MODE (G3/G6 in drag mode on touch); EXTENDED_TIME (note only, no penalty); SJT_RUSHED; LOCALE_MISMATCH. Session-level data quality: HIGH = no flags; MEDIUM = soft flags only; LOW = any blocking flag or SJT_RUSHED. Accessibility modes never reduce quality by themselves; latency-based descriptors are simply excluded for those modes.

9. Accessibility
Target: WCAG 2.2 AA. Skipping any game never counts against a candidate.

Keyboard and touch: every screen and game is operable by keyboard alone. Targets ≥44 px. Each drag has a tap alternative (G2 tap-card-then-bin; G3 button and stepper; G6 tap-to-place; W2 tap token then slot).
Time: Extended time (×1.5 caps and response windows, §2) is a setup toggle. Pause is always available. Auto-paint in G3.
Sensory: no sound is required anywhere and none is loud. Every cue is text or shape as well as colour (patterned fills, ✓/✗ icons). Reduced-motion removes fades and animation. Contrast ≥4.5:1 (verify the cream on #2d2722 and gold accents in the final palette).
Screen readers: all SJT content and instructions are fully accessible. Chat messages use aria-live=polite. Cards, bins, nodes and doors have text labels.
Language: plain English (about grade 8). Urdu headings are decorative with lang="ur" dir="rtl"; additional languages are a Tier 2 item.
Alternatives: "Need another way to do this?" opens a contact route for a human alternative. Skipped games yield SJT_ONLY, never a negative result.
10. Edge cases
Case	Handling
Reload or crash mid-SJT	Resume at the last unconfirmed scenario; confirmed answers locked.
Reload or crash mid-game	Restart the game from its intro once; a second time → INTERRUPTED.
Connection lost	Events buffer in IndexedDB; flush on reconnect (idempotent by batch id). Banner "Reconnecting…"; play continues offline; completion waits for sync.
Browser back / forward	Intercept popstate, stay on the current screen, log nav_attempt.
Tab hidden or app switched	Log blur/focus; games auto-pause; thresholds in §8.
Orientation or resize mid-game	Pause, show "Please rotate/resize", resume; G4 uses within-task baselines so it is not invalidated.
Double or rapid taps	Debounce 100 ms on buttons (G7 units 300 ms); log rapid_tap.
Idle	5 min prompt, 10 min ABANDONED.
Duplicate attempt (same email)	One attempt per email per 90 days (configurable); a second attempt is flagged, not silently merged.
Bot-like input (zero timing variance, impossible speeds)	Flag NON_HUMAN_INPUT; session data quality LOW.
Clock changes	Use only performance.now() for intervals; wall clock only for ts.
Abandoned before the form	Data retained per the retention policy without PII; purge after 30 days.
Ending a game early	skip → INSUFFICIENT for that parameter; no penalty.
11. Recruiter report
Header: candidate (name, email, phone, project preferences), date/time/duration, game_order, versions (spec, sjt, scoring), cohort n, session data quality, and any flags.

Parameter	SJT Evidence	Game Evidence	Relationship	Behavioral Evidence	Confidence
Conscientiousness	High	Moderate (uncalibrated)	Partial convergence	Sorted 14 of 16 cards correctly; corrected two initial errors; opened the Rules before 3 of 8 exception cards; used the review step in both rounds.	Medium
Curiosity	Moderate	High (uncalibrated)	Partial convergence	Opened 4 of 5 optional doors; used "Look closer" on 3; kept opening doors after an empty room.	Medium
Motivation	High	Insufficient (stopped at the stated requirement)	SJT only	Stopped at the stated requirement.	Low
Emotional Agility	High	Low (uncalibrated)	Divergent	SJT evidence was higher than observed behavioral evidence in the simulation. Recovery took 11-15 trials after each reversal.	Medium
Relationship wording (templates):

STRONG: "SJT evidence: {L}. Game evidence: {L}. Strong convergence."
PARTIAL: "SJT evidence: {L}. Game evidence: {L}. Partial convergence."
DIVERGENT: "SJT evidence was {higher|lower} than observed behavioral evidence in the simulation. This is a prompt for a conversation, not a conclusion."
SJT_ONLY: "Game evidence not available, neutral, or not yet calibrated. This result rests on SJT evidence."
INSUFFICIENT: "Not enough valid evidence to interpret."
"Behavioral Evidence" text is generated from descriptive features with fixed templates (numbers and behaviors only). Detail views: each scenario with the chosen option text; per-game descriptors; an analyst view with raw and derived feature values and the index. Keys are never shown to recruiters. Never output: 0-100 scores, percentage bars, radar charts, an Overall Fit Score, "Recommended for", auto-matching to projects, or role-suitability statements. Lint test: template output must not contain (case-insensitive): careless, lazy, hypocrit, dishonest, fake, insincere, intrinsically, high potential, recommended for, unreliable, character, personality type. Footer on every report: "Provisional evidence from a calibration-stage tool. Not a selection decision. SJT levels reflect relative emphasis among competing responses. Interpret alongside interview and references. The recruiter remains responsible for the decision." Candidate view: S15 only.

12. Backend data structure
Session
 ├── Consent        {version, timestamp, checkboxes}
 ├── Device         {user_agent, is_mobile, input_method, screen_w, screen_h, locale}
 ├── Accessibility  {extended_time, reduced_motion, sound, large_text, alt_request}
 ├── Warm-up        {tap_latency_median_ms, tap_error_rate, drag_median_ms, drag_success_rate, reading_wpm}
 ├── Conditions     {game_order, order_seed, sjt_position:"first", sjt_option_orders, g1_round_order,
 │                   g2_item_orders, g3_section_order, g4_segments, g5_empty_doors, g6_puzzle_order}
 ├── SJT            {sjt_version, item_responses[], item_scores[], parameter_evidence{p: {raw,max,ratio,level,rank,n_informing,conf}}}
 ├── Games          {gK: {status, position, raw_events[], derived_features{}, behavioral_evidence{index,level,status,reason}}}
 └── Integration    {per parameter: sjt_evidence, game_evidence, convergence, direction, confidence,
                     descriptors[], data_quality{flags[]}}
Storage (suggested): PostgreSQL with JSONB. Tables: sessions, events (session_id, seq, t_ms, game, trial, action, input_type, state jsonb, data jsonb; partitioned by month), sjt_responses, features, game_evidence, parameter_evidence, integration, reports (rendered snapshot), candidates (PII, encrypted, linked only by session_id). Versioning: every result row stores spec_version, sjt_version, scoring_version, feature_version, config_hash. Raw events are immutable so any version can be re-scored. API: POST /session (server assigns §2 conditions) · POST /events (batched every 5 s and at game end; idempotent by batch id) · POST /sjt/response · POST /session/complete (enqueues the scoring job) · POST /candidate (form) · POST /candidate/withdraw · GET /report/:id (authenticated). Scoring worker: recompute features from raw events → §3.4 → §6 → §7 → store the report snapshot. Roles: recruiter (report), analyst (raw and derived), admin (config, exports, deletions). PII encrypted at rest. Retention (config; defaults follow the counsel briefing): PII purged PII_RETENTION_DAYS=90 after the session unless the candidate is taken forward; telemetry kept TELEMETRY_RETENTION_MONTHS=12 and unlinked from PII at PII purge (drop the session_id→candidate link; coarsen user agent and screen size, which are quasi-identifiers). Sessions with consent_calibration=false are excluded from cohort statistics. Withdrawal: POST /candidate/withdraw (from an emailed link or a request) purges PII, raw events, features, evidence and report snapshots for that session_id and logs the deletion; counsel sets the deadline (target ≤7 days). Candidate export supported.

13. Frontend implementation notes
Stack (suggested): React + TypeScript (Vite). DOM/CSS for SJT, G2, G5, G7. Canvas or DOM for G1, G3, G4. Matter.js for G6. State machines per game (XState or a reducer); the server-assigned seeds drive all randomization.
Timing: performance.now() for every event; game loops use a fixed step; input via Pointer Events. Event logger module: in-memory buffer → flush every 5 s and on game end → sendBeacon on unload → IndexedDB fallback.
Config file (config.json): COHORT_MIN=100, band edges, all weights and scale endpoints, SJT_SHUFFLE_OPTIONS=true, CONVERGENCE_REQUIRES_CALIBRATION=false, CANDIDATE_TRAIT_LINE=false, EXTENDED_TIME_MULT=1.5, RETAKE_DAYS=90, REQUIRE_18_PLUS=true, PII_RETENTION_DAYS=90, TELEMETRY_RETENTION_MONTHS=12.
Theme tokens: --bg-primary:#2d2722; --bg-secondary:#352f29; --text-primary:#e8e0d4; --text-secondary:#a89f93; --accent-gold:#bd6f5d (a terracotta, kept as supplied); --font-heading:'Cormorant Garamond', Georgia, serif; --font-body:'Inter', system-ui, -apple-system, sans-serif; --font-urdu:'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif. Self-host the fonts (no third-party font request from the candidate's device) and lazy-load the Nastaliq font only on act cards. Thin accent progress line; fades ≤300 ms.
Contrast (measured): cream text on #2d2722 11.3:1 and secondary text on the card 5.1:1 pass. #bd6f5d on the background is 3.9:1 and on the card 3.5:1, and white on #bd6f5d is 3.75:1, so use it only for large headings, borders and icons. For small accent text and filled buttons use the tint #c9897a (≥4.5:1 on both backgrounds) with dark #2d2722 button labels.
No camera, microphone, screen recording or typed-text capture. The only free text is the optional note on S14.
Mobile-first from 360 px wide. G4 uses large tap zones; G3 and G6 default to the tap alternatives on touch devices.
14. Acceptance criteria
Flow and randomization

The flow matches §1 exactly; the Begin button is blocked until both consent boxes are ticked; no back navigation is possible anywhere.
sjt_position is always "first". Over 1,000 simulated sessions, each game appears in each position 14.3% ± 2% of the time; candidates cannot influence the order.
Every §2 assignment is stored per session and reproducible from the seed.
SJT 4. sjt_items.json passes validators V1-V6 (a failing file blocks deploy). Motivation has ≥3 informing scenarios. 5. SJT scoring matches hand-computed fixtures. max and min are derived from the file; no composite score exists anywhere.

Games and features 6. Each game's states and screens behave as in §4, with the verbatim instructions. 7. Every feature in §4 has a definition, a golden-fixture unit test, and reproducibility from raw events (same events + config → identical output). 8. Bot profiles (scripted) behave directionally: "always accommodate" and "always maximize" in G1 do not both score HIGH (R5/R6 phase 1 penalize blind accommodation); a "random clicker" in G6 scores LOW on feedback_rate and useful_iteration; an "idle" candidate produces blocking flags rather than scores; an "always checks the rules but sorts randomly" bot in G2 scores LOW. 9. Neutral rules work: G7 extra_units = 0 and G6 all-first-try both give INSUFFICIENT with a neutral reason, never LOW. 10. G3 sharing ≥15 units in S3 (need_specificity = 0) scales F1 credit to exactly 50%.

Convergence, quality, report 11. Convergence output matches the §7 table for all 12 cells and for CONVERGENCE_REQUIRES_CALIBRATION on and off. 12. Every blocking and soft flag in §8 is triggered by a test script, and each blocked game yields INSUFFICIENT with its reason. 13. The report lint (§11 banned words) passes on all templates; no 0-100 score, percentage, radar chart, role recommendation or auto-fit appears in any recruiter view. 14. Confidence is never HIGH in V1.

Data, accessibility, performance 15. A scripted end-to-end session produces 100% of the expected events. Network loss and recovery lose no events (idempotent batches). 16. PII is in the separate encrypted store; no camera, microphone or typed-text capture exists. 17. Keyboard-only completion of the full flow; axe automated checks show no critical issues; a screen-reader pass of the SJT and every game intro; extended-time, reduced-motion and tap-alternative modes each complete a full session. 18. 60 fps on a mid-range Android phone in G3, G4 and G6; median completion time ≤25 min in internal testing. 19. Skipping each game individually completes the session with SJT_ONLY for that parameter.

Security, consent, monitoring 20. The scoring keys never appear in any client bundle, API response or recruiter view (search the built JS and network traces for key values). 21. consent_calibration=false sessions are excluded from every cohort statistic; withdrawal purges all rows for a session_id (verified by a test that finds none afterwards). 22. Post-launch monitor (dashboard, no pilot needed): per-parameter SJT and game level distributions at 25, 50 and 100 completions. Flag any parameter where >80% land in one level or a level has <5% (Appendix B explains why).

15. Build tiers
Tier 1 (must build): SJT integration, all seven games, accessibility, raw telemetry, parameter mapping, data-quality system, convergence report, versioned scoring.
Tier 2 (if straightforward): richer behavioral descriptors, alternative baseline-adjustment methods, cohort analytics, recruiter filtering, additional languages.
Tier 3 (future research): latent-variable modeling, normative calibration (which would enable HIGH confidence), predictive models, formal validity studies, the "harder option" effort measure for Repetition. V1 is not delayed for Tier 3.
16. Inputs received and what remains
Received and integrated: SJT items and keys (config/sjt_items.json); parameter definitions (config/parameters.json, loaded for analyst view and tooltips); Urdu act headings (S04); font stack and colour tokens (§13); project preference list (S14); counsel briefing (below).

Still open:

Native-speaker check of the Urdu headings (حلقہ suits a discussion circle; رسائی can mean access or reach, so confirm it reads as "Outreach" to your audience).
Counsel should receive the briefing you supplied plus two additions from this spec: (a) children: DPDP Section 9 restricts tracking and behavioural monitoring of children, so counsel must decide whether under-18 applicants are allowed. Until then REQUIRE_18_PLUS=true; (b) secondary purpose: using telemetry to calibrate the tool is a different purpose from evaluating the applicant, which is why consent (d) is separate and optional. Counsel should also confirm which DPDP provisions and Rules are currently in force. This spec is not legal advice.
Final SJT sign-off by someone who knows the Alfaaz context. Content and keys are treated as frozen here; this is a review, not a redesign.
Parameter wording: the supplied definitions mention behaviors the games measure (verifying, pacing, no instrumental reward). If your original framework text differs, use the original so the definitions do not steer the SJT-game comparison.
Appendix A: Audit of the uploaded SJT PDF (earlier version, six traits)
Computed from the star key in the PDF. Your revised version will differ; run V4-V7 on it.

Parameter	Scenarios with a non-zero key	Highest star in any option	Sum of per-scenario maxima (computed)	PDF's stated max
Empathy	6 (S1-S6)	3	17	~21
Conscientiousness	5 (S1-S4, S7)	3	12	~21
Collaborative Spirit	7	3	19	~18
Emotional Agility	7	3	17	~18
Curiosity & Learning	4 (S3-S6)	2	6	~12
Creative Initiative	6 (S1-S6)	3	17	~18
Motivation	0	n/a	n/a	not present
Findings: (1) the PDF's stated maxima do not match its own key, so compute maxima from the file (V6); (2) Curiosity is informed by only 4 scenarios and no option ever gives more than 2 stars, so it would carry LOW SJT confidence; (3) Motivation has no coverage; the revised SJT must give it ≥3 informing scenarios (V4); (4) because each option spreads stars across traits, the scores are partly ipsative, which is why §3.4 reads levels as relative emphasis.

Appendix B: Validation of the revised SJT (config/sjt_items.json)
Run by script on the 7 scenarios × 4 options in the supplied prototype.

Validator	Result
V1 seven keys per option	Pass (abbreviated keys emp, con, col, emo, cur, cre, mot mapped to the full names)
V2 integers 0-3	Pass
V3 ≥3 options	Pass (4 each)
V4 coverage ≥3 scenarios per parameter	Pass: every parameter, Motivation included, is informed by all 7 scenarios
V5 ceiling	Pass: every parameter has at least one 3-star option
V6 max/min from file	The file gives the values below. The prototype's hardcoded values are wrong (see the last two columns).
V7 length cue	Pass: the longest option is also the single highest-total option in 0 of 7 scenarios
Parameter	Computed max	Computed min	Prototype max	Prototype min
Empathy	19	0	18	2
Conscientiousness	21	0	18	0
Collaborative Spirit	18	1	16	0
Emotional Agility	17	1	15	1
Curiosity	17	0	14	0
Creative Initiative	20	0	15	0
Motivation	19	0	15	2
Structural finding (quasi-ipsative key). Option totals are 5-9 stars (mostly 6-8). Across all 16,384 possible response patterns the total across the seven parameters is 44-56 (mean 49.8), so gaining on one parameter almost always means losing on another. Consequences, computed by exhaustively enumerating every response pattern:

No candidate can reach HIGH on more than 2 of 7 parameters. Under uniformly random answering, 75% of patterns have no HIGH at all, and Conscientiousness is LOW 58% of the time (its random-answer ratio is about 0.33, right at the LOW/MODERATE edge).
Parameter scores are mechanically negatively related (mean pairwise correlation −0.15 under random answers).
So SJT levels are relative emphasis, HIGH will be rare, and SJT LOW is not evidence of a low trait. §7 adds a note for this. If the post-launch monitor (acceptance criterion 22) shows a lopsided distribution, the Tier 2 fix is to band the SJT by percentile against the 4^7 reference distribution computed from the file instead of fixed ratios.
Appendix C: The supplied HTML trial versus this spec
The trial is useful as a visual reference and is not a base for the build. Differences a developer must not copy:

SJT keys and scoring run in the browser (keys are visible in the page source). Production scoring is server-side.
Hardcoded maxima and minima (Appendix B). Compute them from the file.
Banned thresholds are used: G1 time in AI zone > time in math zone with a fixed 60 cutoff; G2 guide_opens > 0 = HIGH (rewards opening the guide); G7 ≥15 stamps = HIGH, exactly 10 = INSUFFICIENT, 11-14 = LOW (penalises partial continuation).
G4 announces the glitch ("GLITCH: Rules reversed!"), signals it by red colour only, alternates shapes deterministically, and counts errors only for circles after the reversal.
G2 has one card and conflicting rules (squares → B versus dotted → C) with no precedence.
Games 3, 5 and 6 are missing. There is no consent, randomization, event log, data-quality gate, skip, accessibility mode, or convergence output; the SJT shows an "n/7" counter and has no confirm step or option shuffle; G7 shows a counter and a "Finish Assessment" button at 10.
White text on the #bd6f5d button is 3.75:1 (AA needs 4.5:1).