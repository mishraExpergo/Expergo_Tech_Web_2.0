import { z } from "zod";

const recaptchaResponseSchema = z.object({
  success: z.boolean(),
  score: z.number().optional(),
  action: z.string().optional(),
  "error-codes": z.array(z.string()).optional(),
});

export type RecaptchaResult = {
  enabled: boolean;
  score: number | null;
};

export async function verifyRecaptcha(
  token: string | undefined,
  expectedAction: string
): Promise<RecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    return { enabled: false, score: null };
  }

  if (!token) {
    throw new Error("reCAPTCHA verification is required.");
  }

  const params = new URLSearchParams({
    secret,
    response: token,
  });

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error("Could not verify reCAPTCHA.");
  }

  const result = recaptchaResponseSchema.parse(await response.json());
  const minScore = Number(process.env.RECAPTCHA_MIN_SCORE ?? 0.5);

  if (!result.success) {
    throw new Error("reCAPTCHA verification failed.");
  }

  if (result.action && result.action !== expectedAction) {
    throw new Error("reCAPTCHA action did not match.");
  }

  if (typeof result.score === "number" && result.score < minScore) {
    throw new Error("reCAPTCHA score was too low.");
  }

  return {
    enabled: true,
    score: result.score ?? null,
  };
}
