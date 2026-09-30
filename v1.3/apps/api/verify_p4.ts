import { newDb } from 'pg-mem';
import { initDb, closeDb, pool } from './src/db.js';
import { buildServer } from './src/server.js';
import { runRetentionJob } from './src/retention.js';
import { getEncryptionKey, decryptPII } from './src/crypto.js';

process.env.ENCRYPTION_KEY = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

async function runVerification() {
  console.log('--- Phase 4 Verification ---');

  const db = newDb();
  
  db.public.registerFunction({
    name: 'uuid_generate_v4',
    type: db.public.getType('uuid'),
    returns: db.public.getType('uuid'),
    implementation: () => '123e4567-e89b-12d3-a456-426614174000',
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
    console.log('\\n[TEST] 1. Creating Session (POST /session)...');
    const res = await server.inject({
      method: 'POST',
      url: '/session',
      payload: {
        email: 'candidate@example.com',
        name: 'Jane Doe'
      }
    });
    
    console.log('Response Status:', res.statusCode);
    const { sessionId } = JSON.parse(res.payload);
    console.log('Session ID:', sessionId);

    console.log('\\n[TEST] 2. Verifying database state directly...');
    const piiRes = await pool.query('SELECT * FROM pii_store WHERE session_id = $1', [sessionId]);
    const piiRow = piiRes.rows[0];
    
    console.log('Database Row:');
    console.log('- email_encrypted (CIPHERTEXT):', piiRow.email_encrypted);
    console.log('- name_encrypted (CIPHERTEXT):', piiRow.name_encrypted);
    console.log('- nonce:', piiRow.nonce);
    console.log('- auth_tag:', piiRow.auth_tag);

    if (piiRow.email_encrypted === 'candidate@example.com') {
      throw new Error('PII WAS STORED IN PLAINTEXT!');
    }

    console.log('\\n[TEST] 3. Verifying Decryption...');
    const decryptedEmail = decryptPII(piiRow.email_encrypted, piiRow.nonce, piiRow.auth_tag);
    console.log('Decrypted Email:', decryptedEmail);
    if (decryptedEmail === 'candidate@example.com') {
      console.log('-> Decryption Success!');
    } else {
      throw new Error('Decryption failed!');
    }

    console.log('\\n[TEST] 4. Submitting Telemetry (POST /event)...');
    await server.inject({
      method: 'POST',
      url: '/event',
      payload: {
        sessionId,
        t_ms: 1024,
        action: 'option_select',
        payload: { item: 'S1A' }
      }
    });
    
    const events = await pool.query('SELECT * FROM telemetry_events');
    console.log('Telemetry events in DB:', events.rows.length);

    console.log('\\n[TEST] 5. Running Retention Job (Dry Run)...');
    await runRetentionJob(true);
    console.log('Retention script completed without errors.');

    console.log('\\n✅ ALL P4 GATE CHECKS PASSED.');

  } catch (err) {
    console.error('Verification failed:', err);
  } finally {
    await server.close();
    await closeDb();
  }
}

runVerification();
