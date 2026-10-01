import hmac
import hashlib
import json
import secrets
import threading
from typing import Dict, List, Tuple, Any
from sqlmodel import Session, select, text
from app.models.recruit import DBSession, DBTaskAssignment

# Approved 14-row first-order balanced Latin square design
# Worlds: W1 (Frequency), W2 (Archive), W3 (Shared Canvas),
#         W4 (Shifting Grid), W5 (Hidden Gallery), W6 (Broken Tool), W7 (Repetition)
LATIN_SQUARE_14: List[List[str]] = [
    ["W1", "W2", "W7", "W3", "W6", "W4", "W5"],
    ["W2", "W3", "W1", "W4", "W7", "W5", "W6"],
    ["W3", "W4", "W2", "W5", "W1", "W6", "W7"],
    ["W4", "W5", "W3", "W6", "W2", "W7", "W1"],
    ["W5", "W6", "W4", "W7", "W3", "W1", "W2"],
    ["W6", "W7", "W5", "W1", "W4", "W2", "W3"],
    ["W7", "W1", "W6", "W2", "W5", "W3", "W4"],
    # Reverse rows for full first-order adjacent pair balance
    ["W5", "W4", "W6", "W3", "W7", "W2", "W1"],
    ["W6", "W5", "W7", "W4", "W1", "W3", "W2"],
    ["W7", "W6", "W1", "W5", "W2", "W4", "W3"],
    ["W1", "W7", "W2", "W6", "W3", "W5", "W4"],
    ["W2", "W1", "W3", "W7", "W4", "W6", "W5"],
    ["W3", "W2", "W4", "W1", "W5", "W7", "W6"],
    ["W4", "W3", "W5", "W2", "W6", "W1", "W7"]
]

STIMULUS_HMAC_KEY = b"alfaaz-recruit-stimulus-seed-key-2026"
ALL_MINIGAMES = [
    "F1", "F2", "F3", "A1", "A2", "A3", "C1", "C2", "C3",
    "E1", "E2", "E3", "Q1", "Q2", "Q3", "CR1", "CR2", "CR3", "M1", "M2", "M3"
]

assignment_lock = threading.RLock()
_assignment_lock = assignment_lock


def acquire_assignment_transaction_lock(db: Session):
    """
    Acquires an exclusive database-level transaction lock to prevent
    concurrent processes/replicas from selecting the same least-used row
    based on stale counts.
    
    - PostgreSQL: pg_advisory_xact_lock(714142) (transaction-scoped advisory lock).
    - SQLite: BEGIN IMMEDIATE (acquires RESERVED lock on database immediately).
    """
    bind = db.get_bind()
    dialect = bind.dialect.name if bind else ""
    if dialect == "postgresql":
        db.execute(text("SELECT pg_advisory_xact_lock(714142);"))
    elif dialect == "sqlite":
        try:
            db.execute(text("BEGIN IMMEDIATE;"))
        except Exception as e:
            # If already in an immediate transaction, ignore error
            if "cannot start a transaction within a transaction" not in str(e).lower():
                raise


def verify_latin_square_balance() -> Tuple[bool, str]:
    """
    Mathematically verifies that:
    1. Exactly 14 rows, each with 7 unique worlds.
    2. Every world (W1..W7) appears exactly twice in every column position (0..6).
    3. Every ordered adjacent pair (Wi, Wj) appears exactly twice across all 14 rows.
    """
    if len(LATIN_SQUARE_14) != 14:
        return False, f"Expected 14 rows, found {len(LATIN_SQUARE_14)}"

    worlds = [f"W{i}" for i in range(1, 8)]

    # 1. Row integrity
    for idx, row in enumerate(LATIN_SQUARE_14):
        if len(row) != 7 or len(set(row)) != 7:
            return False, f"Row {idx} does not contain exactly 7 unique worlds"

    # 2. Position frequency balance
    for col in range(7):
        col_worlds = [LATIN_SQUARE_14[r][col] for r in range(14)]
        counts = {w: col_worlds.count(w) for w in worlds}
        if any(cnt != 2 for cnt in counts.values()):
            return False, f"Column {col} position frequency is unbalanced: {counts}"

    # 3. Directed adjacent-pair balance
    pairs: Dict[Tuple[str, str], int] = {}
    for row in LATIN_SQUARE_14:
        for i in range(len(row) - 1):
            p = (row[i], row[i + 1])
            pairs[p] = pairs.get(p, 0) + 1

    if len(pairs) != 42:
        return False, f"Expected 42 unique directed adjacent pairs, found {len(pairs)}"

    if any(cnt != 2 for cnt in pairs.values()):
        return False, f"Adjacent pairs not balanced with frequency 2: {pairs}"

    return True, "14-row Latin design verified: position frequency=2, adjacent-pair frequency=2"


def generate_minigame_seeds(session_id: str) -> Dict[str, int]:
    """
    Generates deterministic, cryptographically sound integer seeds per mini-game
    using HMAC-SHA256 of session_id and mini-game id.
    Same session_id + same mini-game id = identical seed.
    """
    seeds = {}
    for mg in ALL_MINIGAMES:
        msg = f"{session_id}:{mg}".encode("utf-8")
        h = hmac.new(STIMULUS_HMAC_KEY, msg, hashlib.sha256).hexdigest()
        # 32-bit positive integer seed
        seed_int = int(h[:8], 16)
        seeds[mg] = seed_int
    return seeds


def assign_world_order(db: Session, session_id: str) -> Tuple[int, List[str], Dict[str, int]]:
    """
    Selects the least-used consented row, breaking ties with secrets-based randomness.
    Thread-safe via threading.Lock() and committed atomically.
    Returns (chosen_order_id, world_sequence, seeds).
    """
    with _assignment_lock:
        acquire_assignment_transaction_lock(db)
        order_counts = {i: 0 for i in range(len(LATIN_SQUARE_14))}
        assignments = db.exec(select(DBTaskAssignment.world_order_id)).all()
        for o_id in assignments:
            if o_id in order_counts:
                order_counts[o_id] += 1

        min_count = min(order_counts.values())
        least_used = [o_id for o_id, count in order_counts.items() if count == min_count]

        if len(least_used) == 1:
            chosen_order_id = least_used[0]
        else:
            chosen_order_id = secrets.choice(least_used)

        world_sequence = list(LATIN_SQUARE_14[chosen_order_id])
        seeds = generate_minigame_seeds(session_id)
        return chosen_order_id, world_sequence, seeds


def get_world_order_distribution(db: Session) -> Dict[str, Dict[int, int]]:
    """
    Separately tracks consented-session counts and completion counts per row.
    """
    consented_counts = {i: 0 for i in range(14)}
    completed_counts = {i: 0 for i in range(14)}

    assignments = db.exec(select(DBTaskAssignment.world_order_id)).all()
    for o_id in assignments:
        if o_id in consented_counts:
            consented_counts[o_id] += 1

    completed_sessions = db.exec(
        select(DBSession.order_id).where(
            DBSession.status == "COMPLETE",
            DBSession.order_id.is_not(None)
        )
    ).all()
    for o_id in completed_sessions:
        if o_id in completed_counts:
            completed_counts[o_id] += 1

    return {
        "consented": consented_counts,
        "completed": completed_counts
    }
