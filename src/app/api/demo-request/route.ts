import { NextResponse, type NextRequest } from "next/server";

import { insertDemoRequest } from "@/lib/db/insert-leads";
import { demoRequestApiSchema } from "@/lib/schemas/forms";
import { postJsonWebhook } from "@/lib/server/webhook";
import { recaptchaGate } from "@/lib/server/recaptcha-gate";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = demoRequestApiSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const message =
      Object.values(first).flat()[0] ?? parsed.error.issues[0]?.message ?? "Invalid input";
    return NextResponse.json({ error: message, details: parsed.error.flatten() }, { status: 422 });
  }

  const { recaptchaToken, ...data } = parsed.data;
  const captchaResponse = await recaptchaGate(recaptchaToken, "demo_request");
  if (captchaResponse) {
    return captchaResponse;
  }

  const payload = {
    type: "demo_request" as const,
    receivedAt: new Date().toISOString(),
    ...data,
  };

  if (process.env.NODE_ENV === "development") {
    console.info("[api/demo-request]", payload);
  }

  try {
    await insertDemoRequest(data);
  } catch (e) {
    console.error("[api/demo-request] database error", e);
    return NextResponse.json({ error: "Could not save your request. Please try again later." }, { status: 503 });
  }

  await postJsonWebhook(process.env.LEADS_WEBHOOK_URL, payload);

  return NextResponse.json({ ok: true });
}
