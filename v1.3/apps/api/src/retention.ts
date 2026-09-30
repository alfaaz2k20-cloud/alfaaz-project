import { pool } from './db.js';

export async function runRetentionJob(dryRun: boolean = false) {
  const piiRetentionDays = parseInt(process.env.PII_RETENTION_DAYS || '90', 10);
  const telemetryRetentionMonths = parseInt(process.env.TELEMETRY_RETENTION_MONTHS || '12', 10);

  const client = await pool.connect();
  try {
    // 1. PII Retention Cleanup
    const piiQuery = `
      SELECT session_id FROM pii_store
      JOIN sessions ON sessions.id = pii_store.session_id
      WHERE sessions.created_at < NOW() - INTERVAL '${piiRetentionDays} days'
        AND email_encrypted != 'WITHDRAWN_PLACEHOLDER' 
        -- assuming we set it to something or we just delete the row
    `;
    const { rows: piiRows } = await client.query(piiQuery);

    if (dryRun) {
      console.log(`[DRY RUN] Would scrub PII for ${piiRows.length} sessions older than ${piiRetentionDays} days.`);
    } else if (piiRows.length > 0) {
      await client.query('BEGIN');
      for (const row of piiRows) {
        // Scrub the row
        await client.query(
          `UPDATE pii_store 
           SET email_encrypted = 'SCRUBBED', name_encrypted = null, phone_encrypted = null 
           WHERE session_id = $1`,
          [row.session_id]
        );
      }
      await client.query('COMMIT');
      console.log(`Scrubbed PII for ${piiRows.length} sessions.`);
    }

    // 2. Telemetry Retention Cleanup
    const telQuery = `
      SELECT count(*) as count FROM telemetry_events
      WHERE created_at < NOW() - INTERVAL '${telemetryRetentionMonths} months'
    `;
    const { rows: telRows } = await client.query(telQuery);
    const count = parseInt(telRows[0].count, 10);

    if (dryRun) {
      console.log(`[DRY RUN] Would delete ${count} telemetry events older than ${telemetryRetentionMonths} months.`);
    } else if (count > 0) {
      await client.query(`DELETE FROM telemetry_events WHERE created_at < NOW() - INTERVAL '${telemetryRetentionMonths} months'`);
      console.log(`Deleted ${count} telemetry events.`);
    }

  } finally {
    client.release();
  }
}
