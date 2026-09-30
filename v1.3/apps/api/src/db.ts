import pg from 'pg';
const { Pool } = pg;

export let pool: pg.Pool;

export function initDb(mockPool?: pg.Pool) {
  if (mockPool) {
    pool = mockPool;
    return;
  }
  
  pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });
}

export async function closeDb() {
  if (pool) {
    await pool.end();
  }
}
