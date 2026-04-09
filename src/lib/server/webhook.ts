/**
 * Fire-and-forget POST of JSON to an optional webhook (Slack, Zapier, internal gateway, etc.).
 * Failures are logged only; they do not reject the caller.
 */
export async function postJsonWebhook(url: string | undefined, payload: unknown): Promise<void> {
  if (!url?.trim()) return;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(12_000),
    });
    if (!res.ok) {
      console.warn("[webhook] non-OK response", res.status, url.slice(0, 48));
    }
  } catch (e) {
    console.warn("[webhook] request failed", e);
  }
}
