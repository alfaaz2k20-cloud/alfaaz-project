import Fastify from 'fastify';
import cors from '@fastify/cors';
import { randomUUID } from 'crypto';
import { pool } from './db.js';
import { encryptPII } from './crypto.js';

export function buildServer() {
  const fastify = Fastify({ logger: false });

  fastify.register(cors, { origin: true });

  fastify.post('/session', async (request, reply) => {
    const { email, name, phone } = request.body as any;
    if (!email) return reply.status(400).send({ error: 'Email required' });

    const sessionId = randomUUID();
    
    // Encrypt PII
    const piiJson = JSON.stringify({ email, name, phone });
    const encPayload = encryptPII(piiJson);

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      await client.query('INSERT INTO sessions (id) VALUES ($1)', [sessionId]);
      
      await client.query(
        `INSERT INTO pii_store (session_id, email_encrypted, name_encrypted, phone_encrypted, nonce, auth_tag) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          sessionId, 
          encPayload.ciphertext, null, null, encPayload.nonce, encPayload.authTag
        ]
      );
      
      await client.query('COMMIT');
      return { sessionId };
    } catch (err) {
      await client.query('ROLLBACK');
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Internal Server Error' });
    } finally {
      client.release();
    }
  });

  fastify.post('/event', async (request, reply) => {
    const { sessionId, t_ms, action, payload } = request.body as any;
    
    await pool.query(
      'INSERT INTO telemetry_events (session_id, t_ms, action, payload) VALUES ($1, $2, $3, $4)',
      [sessionId, t_ms, action, payload]
    );
    
    return { success: true };
  });

  fastify.post('/sjt', async (request, reply) => {
    const { sessionId, payload } = request.body as any;
    
    await pool.query(
      'INSERT INTO sjt_responses (session_id, payload) VALUES ($1, $2)',
      [sessionId, payload]
    );
    
    return { success: true };
  });

  fastify.post('/candidate/withdraw', async (request, reply) => {
    const { email, sessionId } = request.body as any;
    if (!sessionId) return reply.status(400).send({ error: 'sessionId required' });

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Scrub PII completely
      const dummyEnc = encryptPII('WITHDRAWN');
      await client.query(
        `UPDATE pii_store 
         SET email_encrypted = $1, name_encrypted = null, phone_encrypted = null, 
             nonce = $2, auth_tag = $3, withdrew_at = NOW() 
         WHERE session_id = $4`,
        [dummyEnc.ciphertext, dummyEnc.nonce, dummyEnc.authTag, sessionId]
      );

      await client.query('DELETE FROM telemetry_events WHERE session_id = $1', [sessionId]);
      await client.query('DELETE FROM sjt_responses WHERE session_id = $1', [sessionId]);
      await client.query('UPDATE sessions SET status = $1 WHERE id = $2', ['WITHDRAWN', sessionId]);
      
      await client.query('COMMIT');
      return { success: true };
    } catch (err) {
      await client.query('ROLLBACK');
      return reply.status(500).send({ error: 'Failed to withdraw' });
    } finally {
      client.release();
    }
  });

  return fastify;
}
