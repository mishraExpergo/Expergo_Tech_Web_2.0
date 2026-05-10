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
  const isProd = process.env.NODE_ENV === "production";

  if (!secret) {
    return { enabled: false, score: null };
  }

  if (!token) {
    if (!isProd) {
      console.warn(
        "[recaptcha] missing token in non-production, bypassing",
        { expectedAction }
      );
      return { enabled: true, score: null };
    }
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

    if (!isProd) {
      console.warn(
        "[recaptcha] verification failed in non-production, bypassing",
        result["error-codes"] ?? []
      );
      return { enabled: true, score: result.score ?? null };
    }
    throw new Error("reCAPTCHA verification failed.");
  }

  if (result.action && result.action !== expectedAction) {
    if (!isProd) {
      console.warn(
        "[recaptcha] action mismatch in non-production, bypassing",
        { expectedAction, receivedAction: result.action }
      );
      return { enabled: true, score: result.score ?? null };
    }
    throw new Error("reCAPTCHA action did not match.");
  }

  if (typeof result.score === "number" && result.score < minScore) {
    if (!isProd) {
      console.warn(
        "[recaptcha] low score in non-production, bypassing",
        { score: result.score, minScore }
      );
      return { enabled: true, score: result.score };
    }
    throw new Error("reCAPTCHA score was too low.");
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
