-- Run once against your target database (e.g. EWSProd2 / EwsProdDB), e.g.:
-- psql "$DATABASE_URL" -f src/lib/db/schema.sql

CREATE TABLE IF NOT EXISTS demo_requests (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  work_email TEXT NOT NULL,
  company_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_size TEXT NOT NULL,
  industry TEXT NOT NULL,
  use_case TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS demo_requests_created_at_idx ON demo_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS demo_requests_work_email_idx ON demo_requests (work_email);

CREATE TABLE IF NOT EXISTS newsletter_signups (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT newsletter_signups_email_unique UNIQUE (email)
);

CREATE INDEX IF NOT EXISTS newsletter_signups_created_at_idx ON newsletter_signups (created_at DESC);
