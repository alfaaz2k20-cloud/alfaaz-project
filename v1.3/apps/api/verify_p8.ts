import { newDb } from 'pg-mem';
import { initDb, closeDb, pool } from './src/db.js';
import { buildServer } from './src/server.js';
import { getRecruiterDashboard } from './src/dashboard.js';

// Setup environment
process.env.ENCRYPTION_KEY = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

async function verifyP8() {
  console.log('--- Phase 8 Verification: E2E Telemetry & Dashboard ---');

  const db = newDb();
  
  db.public.registerFunction({
    name: 'uuid_generate_v4',
    type: db.public.getType('uuid'),
    returns: db.public.getType('uuid'),
    implementation: () => '11112222-3333-4444-5555-666677778888',
  });

  db.public.none(`
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
  `);

  const mockPool = db.adapters.createPg().Pool;
  initDb(new mockPool());
  
  const server = buildServer();

  try {
    console.log('\\n[TEST] 1. Candidate Submits Form (S13 -> POST /session)');
    const sessionRes = await server.inject({
      method: 'POST',
      url: '/session',
      payload: {
        email: 'volunteer@alfaaz.org',
        name: 'Sara Khan',
        phone: '1234567890'
      }
    });
    const { sessionId } = JSON.parse(sessionRes.payload);
    console.log('-> Session Created:', sessionId);

    console.log('\\n[TEST] 2. Candidate Submits SJT (S14 -> POST /sjt)');
    const sjtRes = await server.inject({
      method: 'POST',
      url: '/sjt',
      payload: {
        sessionId,
        payload: { S1: 'S1A', S2: 'S2C' }
      }
    });
    console.log('-> SJT Saved:', sjtRes.statusCode === 200 ? 'SUCCESS' : 'FAIL');

    console.log('\\n[TEST] 3. Recruiter Dashboard Loads');
    const dashboardData = await getRecruiterDashboard();
    console.log('-> Dashboard Candidate Row:');
    console.log(JSON.stringify(dashboardData[0], null, 2));

    if (dashboardData[0].candidate.email !== 'volunteer@alfaaz.org') {
      throw new Error('Dashboard Decryption Failed to render actual PII');
    }
    
    console.log('\\n✅ PHASE 8: FORM AND OUTPUT INTEGRATION PASSED.');
  } finally {
    await server.close();
    await closeDb();
  }
}

verifyP8();
