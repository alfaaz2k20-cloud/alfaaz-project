import { pool, initDb, closeDb } from './db.js';
import { decryptPII } from './crypto.js';

export async function getRecruiterDashboard() {
  const client = await pool.connect();
  try {
    const query = `
      SELECT 
        s.id as session_id,
        s.status,
        s.created_at,
        p.email_encrypted,
        p.name_encrypted,
        p.phone_encrypted,
        p.nonce,
        p.auth_tag
      FROM sessions s
      JOIN pii_store p ON s.id = p.session_id
      ORDER BY s.created_at DESC
    `;
    const { rows } = await client.query(query);

    const dashboardData = rows.map(row => {
      // Don't attempt decrypt if scrubbed/withdrawn
      const isWithdrawn = row.status === 'WITHDRAWN';
      
      let email = '[WITHDRAWN]';
      let name = '[WITHDRAWN]';
      let phone = '[WITHDRAWN]';

      if (!isWithdrawn) {
        try {
          const plaintext = decryptPII(row.email_encrypted, row.nonce, row.auth_tag);
          if (plaintext === 'WITHDRAWN') {
            email = '[WITHDRAWN]';
          } else {
            const pii = JSON.parse(plaintext);
            email = pii.email; 
            name = pii.name; 
            phone = pii.phone;
          }
        } catch (e) {
          email = '[DECRYPTION_ERROR]';
        }
      }

      return {
        sessionId: row.session_id,
        status: row.status,
        date: row.created_at,
        candidate: { name, email, phone }
      };
    });

    return dashboardData;
  } finally {
    client.release();
  }
}
