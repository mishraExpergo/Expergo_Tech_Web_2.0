import { NextResponse, type NextRequest } from "next/server";

import { upsertNewsletterSignup } from "@/lib/db/insert-leads";
import { newsletterApiSchema } from "@/lib/schemas/forms";
import { postJsonWebhook } from "@/lib/server/webhook";
import { recaptchaGate } from "@/lib/server/recaptcha-gate";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = newsletterApiSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.flatten().fieldErrors.email?.[0] ?? "Invalid email";
    return NextResponse.json({ error: message, details: parsed.error.flatten() }, { status: 422 });
  }

  const { recaptchaToken, ...signup } = parsed.data;
  const captchaResponse = await recaptchaGate(recaptchaToken, "newsletter");
  if (captchaResponse) {
    return captchaResponse;
  }

  const payload = {
    type: "newsletter_signup" as const,
    receivedAt: new Date().toISOString(),
    email: signup.email,
    source: signup.source,
  };

  const hasDatabase = Boolean(process.env.DATABASE_URL?.trim());
  const hasWebhook = Boolean(process.env.NEWSLETTER_WEBHOOK_URL?.trim());

  if (process.env.NODE_ENV === "development") {
    console.info("[api/newsletter]", payload);
  }

  if (hasDatabase) {
    try {
      await upsertNewsletterSignup(signup);
    } catch (e) {
      console.error("[api/newsletter] database error", e);
      return NextResponse.json(
        { error: "Could not save your subscription. Please try again later." },
        { status: 503 },
      );
    }
  } else if (!hasWebhook) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[api/newsletter] Configure DATABASE_URL (and run schema.sql) or NEWSLETTER_WEBHOOK_URL — see .env.example",
      );
      return NextResponse.json(
        { error: "Subscription is temporarily unavailable. Please try again later or contact us by email." },
        { status: 503 },
      );
    }
    console.warn("[api/newsletter] DATABASE_URL and NEWSLETTER_WEBHOOK_URL unset — accepting signup for local dev only");
  }

  await postJsonWebhook(process.env.NEWSLETTER_WEBHOOK_URL, payload);

  return NextResponse.json({ ok: true });
}
