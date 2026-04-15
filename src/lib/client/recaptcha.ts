declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadRecaptchaScript(siteKey: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }
  if (window.grecaptcha?.execute) {
    return Promise.resolve();
  }
  if (scriptPromise) {
    return scriptPromise;
  }
  scriptPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Could not load reCAPTCHA"));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

/**
 * Returns a v3 token when `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set; otherwise `undefined`
 * (server skips verification when `RECAPTCHA_SECRET_KEY` is unset).
 */
export async function executeRecaptcha(action: string): Promise<string | undefined> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();
  if (!siteKey) {
    return undefined;
  }
  await loadRecaptchaScript(siteKey);
  const g = window.grecaptcha;
  if (!g?.execute) {
    throw new Error("reCAPTCHA is unavailable. Please refresh and try again.");
  }
  await new Promise<void>((resolve) => {
    g.ready(() => resolve());
  });
  return g.execute(siteKey, { action });
}
