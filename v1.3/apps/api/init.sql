CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'ACTIVE'
);

CREATE TABLE pii_store (
    session_id UUID PRIMARY KEY REFERENCES sessions(id) ON DELETE CASCADE,
    email_encrypted TEXT NOT NULL,
    name_encrypted TEXT,
    phone_encrypted TEXT,
    nonce TEXT NOT NULL,
    auth_tag TEXT NOT NULL,
    withdrew_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE TABLE telemetry_events (
    id SERIAL PRIMARY KEY,
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    t_ms INTEGER NOT NULL,
    action VARCHAR(100) NOT NULL,
    payload JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sjt_responses (
    session_id UUID PRIMARY KEY REFERENCES sessions(id) ON DELETE CASCADE,
    payload JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
