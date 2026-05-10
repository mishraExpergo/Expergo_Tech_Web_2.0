import { NextResponse } from "next/server";
import {
  careerApplicationInputSchema,
  saveCareerApplication,
} from "@/lib/server/backend";
import { verifyRecaptcha } from "@/lib/server/recaptcha";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const input = careerApplicationInputSchema.parse(await req.json());
    const recaptcha = await verifyRecaptcha(
      input.recaptchaToken,
      "career_application"
    );

    await saveCareerApplication(input, recaptcha);

    return NextResponse.json({ success: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not submit your application.";
    const status = message.includes("configured") ? 500 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
