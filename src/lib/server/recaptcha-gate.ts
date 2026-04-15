import { NextResponse } from "next/server";

import { recaptchaMinScore, verifyRecaptchaV3 } from "./verify-recaptcha";

/**
 * When `RECAPTCHA_SECRET_KEY` is set, requires a valid v3 token and matching action.
 * Returns a JSON error response, or `null` when the request may proceed.
 */
export async function recaptchaGate(
  token: string | undefined,
  action: string,
): Promise<NextResponse | null> {
  const secret = process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (!secret) {
    return null;
  }
  if (!token) {
    return NextResponse.json(
      { error: "Security verification required. Please try again." },
      { status: 400 },
    );
  }
  const verified = await verifyRecaptchaV3(token, secret, action, recaptchaMinScore());
  if (!verified.ok) {
    return NextResponse.json(
      { error: "Security verification failed. Please try again." },
      { status: 400 },
    );
  }
  return null;
}
