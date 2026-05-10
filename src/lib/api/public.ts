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

export type CareerApplicationPayload = {
  roleTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedIn: string;
  phone: string;
  location: string;
  resumeFileName: string;
  resumeFileSize: number;
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

function isLocalhostHost() {
  if (typeof window === "undefined") return false;
  return (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  );
}

function cleanupRecaptchaArtifacts() {
  if (typeof window === "undefined") return;
  document.querySelectorAll(".grecaptcha-badge").forEach((el) => el.remove());
  document
    .querySelectorAll('script[src*="google.com/recaptcha/api.js"]')
    .forEach((el) => el.remove());
}

function getApiUrl(path: string) {
  if (typeof window !== "undefined") {
    // In the browser, prefer same-origin API routes to avoid CORS/network issues
    // when NEXT_PUBLIC_APP_URL points to a different host than the current app.
    return path;
  }
  const origin = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return path;
    }
  }

  return origin ? `${origin}${path}` : path;
}

async function postJson(path: string, payload: unknown) {
  const requestInit: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  const configuredUrl = getApiUrl(path);
  let response: Response;

  try {
    response = await fetch(configuredUrl, requestInit);
  } catch {
    if (configuredUrl === path) {
      throw new Error(
        "Unable to submit the form right now. Please check your connection and try again."
      );
    }

    // If configured absolute origin is unreachable from this environment, fallback to same-origin API path.
    try {
      response = await fetch(path, requestInit);
    } catch {
      throw new Error(
        "Unable to submit the form right now. Please check your connection and try again."
      );
    }
  }

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
  const isLocalhost = isLocalhostHost();

  if (!siteKey || isLocalhost) {
    if (isLocalhost) {
      cleanupRecaptchaArtifacts();
    }
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

if (typeof window !== "undefined" && isLocalhostHost()) {
  // If reCAPTCHA was previously loaded, remove its badge in local development.
  queueMicrotask(() => cleanupRecaptchaArtifacts());
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

export async function submitCareerApplication(payload: CareerApplicationPayload) {
  await postJson("/api/career-application", {
    ...payload,
    source: payload.source ?? "career-apply-modal",
  });
}
