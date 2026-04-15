"use client";

import Link from "next/link";
import { useCallback, useState, type FormEvent } from "react";
import { Linkedin, Mail } from "lucide-react";
import { BookDemoButton } from "../book-demo/BookDemoProvider";


import { subscribeNewsletter } from "@/lib/api/public";
import { executeRecaptcha } from "@/lib/client/recaptcha";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterBusy, setNewsletterBusy] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(
    null,
  );

  const onNewsletterSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setNewsletterMessage(null);
      const email = newsletterEmail.trim();
      if (!email) return;
      setNewsletterBusy(true);
      try {
        const recaptchaToken = await executeRecaptcha("newsletter");
        await subscribeNewsletter({ email, source: "footer", recaptchaToken });
        setNewsletterEmail("");
        setNewsletterMessage({ kind: "ok", text: "Thanks — you’re subscribed." });
      } catch (err) {
        setNewsletterMessage({
          kind: "err",
          text: err instanceof Error ? err.message : "Could not subscribe. Try again.",
        });
      } finally {
        setNewsletterBusy(false);
      }
    },
    [newsletterEmail],
  );

  const linkClass = "text-[15px] font-normal text-white/90 transition hover:text-white";

  return (
    <footer className="bg-[#121826] text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl pt-14 pb-16 text-center sm:max-w-2xl lg:max-w-3xl lg:pt-16 lg:pb-20">
          <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">Never miss an Update</h2>
          <form
            className="mt-6 flex w-full overflow-hidden rounded-full border border-white/10 bg-white shadow-sm"
            onSubmit={(e) => void onNewsletterSubmit(e)}
          >
            <label htmlFor="footer-email" className="sr-only">
              Email
            </label>
            <div className="flex min-h-[52px] min-w-0 flex-1 items-center bg-white pl-4 sm:pl-5">
              <Mail className="h-5 w-5 shrink-0 text-neutral-500" strokeWidth={1.75} aria-hidden />
              <input
                id="footer-email"
                type="email"
                name="email"
                value={newsletterEmail}
                onChange={(e) => {
                  setNewsletterEmail(e.target.value);
                  if (newsletterMessage) setNewsletterMessage(null);
                }}
                placeholder="Enter E-Mail"
                autoComplete="email"
                disabled={newsletterBusy}
                className="min-h-[52px] min-w-0 flex-1 border-0 bg-transparent outline-none py-3 pl-3 pr-2 text-sm font-medium text-neutral-900 placeholder:text-neutral-400  disabled:opacity-60"
              />
            </div>
            <button
              type="submit"
              disabled={newsletterBusy || !newsletterEmail.trim()}
              className="min-h-[52px] shrink-0 bg-[#2b5a9e] px-6 text-sm font-bold text-white transition hover:bg-[#244a87] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-[#2b5a9e] sm:px-10"
            >
              {newsletterBusy ? "Submitting..." : "Subscribe"}
            </button>
          </form>
          {newsletterMessage ? (
            <p
              className={`mt-3 text-sm ${newsletterMessage.kind === "ok" ? "text-emerald-300" : "text-red-300"}`}
              role="status"
            >
              {newsletterMessage.text}
            </p>
          ) : null}
          {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
            <p className="mt-4 text-center text-[11px] leading-relaxed text-white/45">
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="https://policies.google.com/privacy" className="underline decoration-white/30 hover:text-white/70">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="https://policies.google.com/terms" className="underline decoration-white/30 hover:text-white/70">
                Terms of Service
              </a>{" "}
              apply.
            </p>
          ) : null}
        </div>

        <div className="grid gap-12 pb-14 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-12 lg:pb-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-2xl font-bold tracking-tight text-white sm:text-[26px]">EarlySafe</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/90">
              Continuous Portfolio Risk Control.
            </p>
            <a href="mailto:info@earlysafe.com" className="mt-5 block text-sm font-medium text-white/90 hover:text-white">
              info@expergo.texh
            </a>
            <p className="mt-1 text-sm text-white/75">Gurgaon, India</p>
          </div>

          <nav aria-label="Site sections" className="sm:col-span-1">
            <ul className="space-y-3">
              <li>
                <Link href="/#platform" className={linkClass}>
                  Platform
                </Link>
              </li>
              <li>
                <Link href="/outcomes" className={linkClass}>
                  Outcome
                </Link>
              </li>
              <li>
                <Link href="/use-cases" className={linkClass}>
                  Use Cases
                </Link>
              </li>
              {/* <li>
                <Link href="/#company" className={linkClass}>
                  Company
                </Link>
              </li> */}
            </ul>
          </nav>

          <nav aria-label="Product" className="sm:col-span-1">
            <ul className="space-y-3">
              <li>
                <Link href="/capabilities" className={linkClass}>
                  Capabilities
                </Link>
              </li>
              <li>
                <Link href="/#company" className={linkClass}>
                 Blog
                </Link>
              </li>
             
            </ul>
          </nav>

          <div className="flex sm:col-span-2 lg:col-span-1 lg:justify-end">
            <BookDemoButton
              className="inline-flex h-11 w-full max-w-[220px] items-center justify-center rounded-lg bg-[#2b5a9e] text-sm font-bold text-white shadow-sm transition hover:bg-[#244a87] sm:h-12 lg:w-auto lg:min-w-[200px] lg:max-w-none"
            >
              Request Executive Breif
            </BookDemoButton>
          </div>
        </div>

        <div className="h-px w-full bg-[#1e3a5f]" aria-hidden />

        <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row sm:py-7">
          <a
            href="https://www.linkedin.com/company/expergo-technologies"
            aria-label="LinkedIn"
            className="text-white/60 transition hover:text-white"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <p className="text-center text-xs text-white/45 sm:text-left">
            © {new Date().getFullYear()} EarlySafe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
