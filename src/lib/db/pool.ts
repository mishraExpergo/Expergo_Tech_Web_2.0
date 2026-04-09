import { Pool, type PoolConfig } from "pg";

let pool: Pool | undefined;

function sslOption(connectionString: string): PoolConfig["ssl"] | undefined {
  if (process.env.DATABASE_SSL === "false") return undefined;
  if (process.env.DATABASE_SSL === "true") {
    return { rejectUnauthorized: false };
  }
  if (/sslmode=require|sslmode=prefer|rds\.amazonaws\.com/i.test(connectionString)) {
    return { rejectUnauthorized: false };
  }
  return undefined;
}

export function getPool(): Pool {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString?.trim()) {
    throw new Error("DATABASE_URL is not configured");
  }

  pool = new Pool({
    connectionString,
    ssl: sslOption(connectionString),
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 15_000,
  });

  return pool;
}
