import { query, getPool } from "../src/lib/db";

async function checkDb() {
  console.log("Checking database connection...");
  console.log("DATABASE_URL present:", !!process.env.DATABASE_URL);
  
  if (!process.env.DATABASE_URL) {
    console.error("ERROR: DATABASE_URL is not set in .env.local");
    process.exit(1);
  }

  try {
    // 1. Test connection
    const now = await query("SELECT NOW() as now, current_database() as db, current_schema() as schema");
    console.log("Connection successful!");
    console.log("Details:", now.rows[0]);

    // 2. Check if tables exist
    const tables = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('newsletter_subscriptions', 'demo_requests')
    `);

    if (tables.rows.length === 0) {
      console.log("Tables do NOT exist. Attempting to create them...");
      
      // Manually trigger the creation logic
      await query(`
        create table if not exists newsletter_subscriptions (
          id bigserial primary key,
          email text not null unique,
          source text not null default 'website',
          recaptcha_score numeric(4, 3),
          metadata jsonb not null default '{}'::jsonb,
          created_at timestamptz not null default now(),
          updated_at timestamptz not null default now()
        );

        create table if not exists demo_requests (
          id bigserial primary key,
          full_name text not null,
          work_email text not null,
          company_name text not null,
          phone text not null,
          company_size text not null,
          industry text not null,
          use_case text not null,
          source text not null default 'website',
          recaptcha_score numeric(4, 3),
          metadata jsonb not null default '{}'::jsonb,
          created_at timestamptz not null default now()
        );
      `);
      
      console.log("Table creation command executed.");
      
      // Verify again
      const verify = await query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('newsletter_subscriptions', 'demo_requests')
      `);
      console.log("Tables now present:", verify.rows.map(r => r.table_name));
    } else {
      console.log("Tables already exist:", tables.rows.map(r => r.table_name));
    }

  } catch (err) {
    console.error("DATABASE ERROR:", err);
  } finally {
    const pool = getPool();
    await pool.end();
  }
}

checkDb();
