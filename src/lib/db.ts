import type { QueryResult, QueryResultRow } from "pg";
import pkg from "pg";
const { Pool } = pkg;

type GlobalWithPg = typeof globalThis & {
  __expergoPgPool?: Pool;
};

/**
 * Determines if the connection should use SSL.
 * Automatically enables SSL for AWS RDS connections unless explicitly disabled.
 */
function shouldUseSsl(connectionString: string) {
  const explicit = process.env.DATABASE_SSL?.trim().toLowerCase();

  if (explicit === "false" || explicit === "0") return false;
  if (explicit === "true" || explicit === "1") return true;

  return (
    connectionString.includes("sslmode=require") ||
    connectionString.includes("sslmode=prefer") ||
    connectionString.includes(".rds.amazonaws.com")
  );
}

/**
 * Checks if the database is configured via environment variables.
 */
export function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL?.trim());
}

/**
 * Gets or creates the global database pool (singleton pattern for Dev/Prod).
 */
export function getPool() {
  const connectionString = process.env.DATABASE_URL?.trim();

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured in environment variables.");
  }

  const globalForPg = globalThis as GlobalWithPg;

  if (!globalForPg.__expergoPgPool) {
    const useSsl = shouldUseSsl(connectionString);
    
    // If we're forcing SSL via our config, strip sslmode from the URL to prevent conflicts
    const cleanUrl = useSsl 
      ? connectionString.replace(/([?&])sslmode=[^&]+(&?)/, "$1$2").replace(/[?&]$/, "")
      : connectionString;

    globalForPg.__expergoPgPool = new Pool({
      connectionString: cleanUrl,
      max: Number(process.env.DATABASE_POOL_MAX ?? 10),
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
      ssl: useSsl
        ? {
            rejectUnauthorized: false,
          }
        : false,
    });

    // Add error handling to the pool
    globalForPg.__expergoPgPool.on("error", (err) => {
      console.error("Unexpected error on idle database client:", err.message);
    });
  }

  return globalForPg.__expergoPgPool;
}

/**
 * Execute a query against the database using a pooled connection.
 */
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[]
): Promise<QueryResult<T>> {
  const pool = getPool();
  const client = await pool.connect();
  try {
    return await client.query<T>(text, params);
  } finally {
    client.release();
  }
}

/**
 * Gets a raw client from the pool.
 * Caller MUST call client.release() when finished.
 */
export async function getClient() {
  return getPool().connect();
}
