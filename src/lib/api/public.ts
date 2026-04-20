type ApiResponse = {
  success?: boolean;
  error?: string;
};

type NewsletterPayload = {
  email: string;
  source: string;
  recaptchaToken?: string;
};

export type BookDemoPayload = {
  fullName: string;
  workEmail: string;
  companyName: string;
  phone: string;
  companySize?: string;
  country?: string;
  industry: string;
  projectDetails?: string;
  useCase: string;
  source?: string;
  recaptchaToken?: string;
};

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

let recaptchaScriptPromise: Promise<void> | null = null;

function getApiUrl(path: string) {
  const origin = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  return origin ? `${origin}${path}` : path;
}

async function postJson(path: string, payload: unknown) {
  const response = await fetch(getApiUrl(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => ({}))) as ApiResponse;

  if (!response.ok || !data.success) {
    throw new Error(data.error ?? "Request failed. Please try again.");
  }
}

function loadRecaptcha(siteKey: string) {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.grecaptcha) {
    return Promise.resolve();
  }

  if (!recaptchaScriptPromise) {
    recaptchaScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(
        siteKey
      )}`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Could not load reCAPTCHA."));
      document.head.appendChild(script);
    });
  }

  return recaptchaScriptPromise;
}

export async function executeRecaptcha(action: string) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    return "";
  }

  await loadRecaptcha(siteKey);

  return new Promise<string>((resolve, reject) => {
    window.grecaptcha?.ready(() => {
      window.grecaptcha
        ?.execute(siteKey, { action })
        .then(resolve)
        .catch(reject);
    });
  });
}

export async function subscribeNewsletter(payload: NewsletterPayload) {
  await postJson("/api/newsletter", payload);
}

export async function submitBookDemo(payload: BookDemoPayload) {
  await postJson("/api/book-demo", {
    ...payload,
    source: payload.source ?? "book-demo-modal",
  });
}
