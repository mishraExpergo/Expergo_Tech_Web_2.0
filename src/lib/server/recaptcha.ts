import { z } from "zod";

const recaptchaResponseSchema = z.object({
  success: z.boolean(),
  score: z.number().optional(),
  action: z.string().optional(),
  hostname: z.string().optional(),
  "error-codes": z.array(z.string()).optional(),
});

export type RecaptchaResult = {
  enabled: boolean;
  score: number | null;
};

function formatRecaptchaFailure(errorCodes: string[] | undefined) {
  if (!errorCodes?.length) {
    return "reCAPTCHA verification failed. Please refresh and try again.";
  }

  if (errorCodes.includes("timeout-or-duplicate")) {
    return "reCAPTCHA expired. Please try submitting the form again.";
  }

  if (errorCodes.includes("invalid-input-secret") || errorCodes.includes("missing-input-secret")) {
    return "reCAPTCHA server configuration is invalid. Please contact support.";
  }

  if (
    errorCodes.includes("invalid-input-response") ||
    errorCodes.includes("missing-input-response")
  ) {
    return "reCAPTCHA token is invalid. Please refresh and try again.";
  }

  return "reCAPTCHA verification failed. Please refresh and try again.";
}

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
  const allowBypassInDev =
    process.env.NODE_ENV !== "production" &&
    process.env.RECAPTCHA_ALLOW_DEV_BYPASS === "true";

  if (!result.success) {
    if (allowBypassInDev) {
      console.warn("[recaptcha] verification bypassed in development", {
        errorCodes: result["error-codes"] ?? [],
        hostname: result.hostname,
      });
      return { enabled: false, score: null };
    }
    throw new Error(formatRecaptchaFailure(result["error-codes"]));
  }

  if (result.action && result.action !== expectedAction) {
    throw new Error("reCAPTCHA verification failed. Please refresh and try again.");
  }

  if (typeof result.score === "number" && result.score < minScore) {
    throw new Error("reCAPTCHA verification failed. Please try again.");
  }

  return {
    enabled: true,
    score: result.score ?? null,
  };
}
