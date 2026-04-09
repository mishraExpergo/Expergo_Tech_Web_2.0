import { NextResponse, type NextRequest } from "next/server";

import { upsertNewsletterSignup } from "@/lib/db/insert-leads";
import { newsletterSchema } from "@/lib/schemas/forms";
import { postJsonWebhook } from "@/lib/server/webhook";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.flatten().fieldErrors.email?.[0] ?? "Invalid email";
    return NextResponse.json({ error: message, details: parsed.error.flatten() }, { status: 422 });
  }

  const payload = {
    type: "newsletter_signup" as const,
    receivedAt: new Date().toISOString(),
    email: parsed.data.email,
    source: parsed.data.source,
  };

  if (process.env.NODE_ENV === "development") {
    console.info("[api/newsletter]", payload);
  }

  try {
    await upsertNewsletterSignup(parsed.data);
  } catch (e) {
    console.error("[api/newsletter] database error", e);
    return NextResponse.json({ error: "Could not save your subscription. Please try again later." }, { status: 503 });
  }

  await postJsonWebhook(process.env.NEWSLETTER_WEBHOOK_URL, payload);

  return NextResponse.json({ ok: true });
}
