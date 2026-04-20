import { NextResponse } from "next/server";
import {
  newsletterInputSchema,
  saveNewsletterSubscription,
} from "@/lib/server/backend";
import { verifyRecaptcha } from "@/lib/server/recaptcha";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const input = newsletterInputSchema.parse(await req.json());
    const recaptcha = await verifyRecaptcha(input.recaptchaToken, "newsletter");

    await saveNewsletterSubscription(input, recaptcha);

    return NextResponse.json({ success: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not subscribe right now.";
    const status = message.includes("configured") ? 500 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
