import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { bookDemoInputSchema, saveBookDemoRequest } from "@/lib/server/backend";
import { sendBookDemoEmails } from "@/lib/server/mailer";
import { verifyRecaptcha } from "@/lib/server/recaptcha";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const input = bookDemoInputSchema.parse(await req.json());
    const recaptcha = await verifyRecaptcha(input.recaptchaToken, "book_demo");

    await saveBookDemoRequest(input, recaptcha);
    // await sendBookDemoEmails(input);

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof ZodError
      ? (err.issues[0]?.message ?? "Please check the form fields and try again.")
      : err instanceof Error
        ? err.message
        : "Could not submit your request.";
    const status = message.includes("configured") ? 500 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
