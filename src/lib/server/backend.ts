import { z } from "zod";
import { hasDatabaseUrl, query } from "@/lib/db";
import type { RecaptchaResult } from "@/lib/server/recaptcha";

const sourceSchema = z
  .string()
  .trim()
  .min(1)
  .max(80)
  .regex(/^[a-zA-Z0-9 _./:-]+$/)
  .default("website");

export const newsletterInputSchema = z.object({
  email: z.string().trim().email().max(254).toLowerCase(),
  source: sourceSchema,
  recaptchaToken: z.string().optional(),
});

export const bookDemoInputSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  workEmail: z.string().trim().email().max(254).toLowerCase(),
  companyName: z.string().trim().min(2).max(160),
  phone: z.string().trim().min(6).max(40),
  companySize: z.string().trim().max(80).optional(),
  country: z.string().trim().max(80).optional(),
  industry: z.string().trim().min(1).max(80),
  projectDetails: z.string().trim().max(2000).optional(),
  useCase: z.string().trim().min(1).max(120),
  source: sourceSchema,
  recaptchaToken: z.string().optional(),
}).superRefine((input, ctx) => {
  if (!input.country && !input.companySize) {
    ctx.addIssue({
      code: "custom",
      path: ["country"],
      message: "Country is required.",
    });
  }
}).transform((input) => {
  const country = input.country || input.companySize || "Not specified";

  return {
    ...input,
    companySize: input.companySize || country,
    country,
    projectDetails: input.projectDetails || "",
  };
});

export type NewsletterInput = z.infer<typeof newsletterInputSchema>;
export type BookDemoInput = z.infer<typeof bookDemoInputSchema>;

let ensuredTables = false;

async function ensureBackendTables() {
  if (ensuredTables || !hasDatabaseUrl()) {
    return;
  }

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

  ensuredTables = true;
}

async function postWebhook(url: string, payload: unknown) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Webhook failed with status ${response.status}.`);
  }
}

function assertBackendConfigured(webhookUrl?: string) {
  if (hasDatabaseUrl() || webhookUrl) {
    return;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("No backend storage is configured.");
  }
}

export async function saveNewsletterSubscription(
  input: NewsletterInput,
  recaptcha: RecaptchaResult
) {
  const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL?.trim();
  const webhookRequired = !hasDatabaseUrl();
  assertBackendConfigured(webhookUrl);

  if (hasDatabaseUrl()) {
    await ensureBackendTables();
    await query(
      `
        insert into newsletter_subscriptions (
          email,
          source,
          recaptcha_score,
          metadata
        )
        values ($1, $2, $3, $4::jsonb)
        on conflict (email) do update set
          source = excluded.source,
          recaptcha_score = excluded.recaptcha_score,
          metadata = newsletter_subscriptions.metadata || excluded.metadata,
          updated_at = now()
      `,
      [
        input.email,
        input.source,
        recaptcha.score,
        JSON.stringify({
          recaptchaEnabled: recaptcha.enabled,
        }),
      ]
    );
  }

  if (webhookUrl) {
    try {
      await postWebhook(webhookUrl, {
        type: "newsletter_subscription",
        email: input.email,
        source: input.source,
        recaptcha,
        submittedAt: new Date().toISOString(),
      });
    } catch (err) {
      if (webhookRequired) {
        throw err;
      }
      console.warn("[newsletter] webhook failed", err);
    }
  }
}

export async function saveBookDemoRequest(
  input: BookDemoInput,
  recaptcha: RecaptchaResult
) {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL?.trim();
  const webhookRequired = !hasDatabaseUrl();
  assertBackendConfigured(webhookUrl);

  if (hasDatabaseUrl()) {
    await ensureBackendTables();
    await query(
      `
        insert into demo_requests (
          full_name,
          work_email,
          company_name,
          phone,
          company_size,
          industry,
          use_case,
          source,
          recaptcha_score,
          metadata
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::jsonb)
      `,
      [
        input.fullName,
        input.workEmail,
        input.companyName,
        input.phone,
        input.companySize,
        input.industry,
        input.useCase,
        input.source,
        recaptcha.score,
        JSON.stringify({
          recaptchaEnabled: recaptcha.enabled,
          country: input.country,
          projectDetails: input.projectDetails,
        }),
      ]
    );
  }

  if (webhookUrl) {
    try {
      await postWebhook(webhookUrl, {
        type: "book_demo_request",
        ...input,
        recaptcha,
        submittedAt: new Date().toISOString(),
      });
    } catch (err) {
      if (webhookRequired) {
        throw err;
      }
      console.warn("[book-demo] webhook failed", err);
    }
  }
}
