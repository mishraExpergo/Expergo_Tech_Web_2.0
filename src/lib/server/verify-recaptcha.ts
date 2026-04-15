type SiteverifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export async function verifyRecaptchaV3(
  token: string,
  secret: string,
  expectedAction: string,
  minScore: number,
): Promise<{ ok: true } | { ok: false }> {
  const params = new URLSearchParams();
  params.set("secret", secret);
  params.set("response", token);

  let data: SiteverifyResponse;
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    data = (await res.json()) as SiteverifyResponse;
  } catch (e) {
    console.error("[verify-recaptcha] siteverify request failed", e);
    return { ok: false };
  }

  if (!data.success) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[verify-recaptcha]", data["error-codes"]);
    }
    return { ok: false };
  }

  if (expectedAction && data.action !== expectedAction) {
    return { ok: false };
  }

  if (typeof data.score === "number" && data.score < minScore) {
    return { ok: false };
  }

  return { ok: true };
}

export function recaptchaMinScore(): number {
  const raw = process.env.RECAPTCHA_MIN_SCORE?.trim();
  if (!raw) return 0.5;
  const n = Number(raw);
  return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0.5;
}
