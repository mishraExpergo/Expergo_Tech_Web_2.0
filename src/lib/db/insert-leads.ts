import type { DemoRequestInput, NewsletterInput } from "@/lib/schemas/forms";

import { getPool } from "./pool";

export async function insertDemoRequest(row: DemoRequestInput): Promise<void> {
  const pool = getPool();
  await pool.query(
    `INSERT INTO demo_requests (
      full_name, work_email, company_name, phone, company_size, industry, use_case
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      row.fullName,
      row.workEmail,
      row.companyName,
      row.phone,
      row.companySize,
      row.industry,
      row.useCase,
    ],
  );
}

export async function upsertNewsletterSignup(row: NewsletterInput): Promise<void> {
  const pool = getPool();
  await pool.query(
    `INSERT INTO newsletter_signups (email, source)
     VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET
       source = COALESCE(EXCLUDED.source, newsletter_signups.source),
       updated_at = NOW()`,
    [row.email, row.source ?? null],
  );
}
