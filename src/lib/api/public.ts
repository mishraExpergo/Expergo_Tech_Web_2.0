import type { DemoRequestInput, NewsletterInput } from "@/lib/schemas/forms";

type ApiErrorBody = { error?: string };

/**
 * Browser-only: same-origin `/api/...` by default.
 * Set `NEXT_PUBLIC_APP_URL` (no trailing slash) if you need an absolute origin for API calls.
 */
function apiUrl(path: `/api/${string}`): string {
  if (typeof window === "undefined") return path;
  const base = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "";
  return base ? `${base}${path}` : path;
}

async function postJson(path: `/api/${string}`, body: unknown, fallbackMessage: string): Promise<void> {
  const res = await fetch(apiUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "same-origin",
  });
  const data = (await res.json().catch(() => ({}))) as ApiErrorBody;
  if (!res.ok) {
    throw new Error(data.error ?? fallbackMessage);
  }
}

export async function submitDemoRequest(body: DemoRequestInput): Promise<void> {
  await postJson("/api/demo-request", body, "Could not submit demo request");
}

export async function subscribeNewsletter(body: NewsletterInput): Promise<void> {
  await postJson("/api/newsletter", body, "Could not subscribe");
}
