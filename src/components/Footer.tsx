"use client";

import Link from "next/link";
import { useCallback, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Linkedin, Mail, Twitter } from "lucide-react";

import { subscribeNewsletter } from "@/lib/api/public";

type FooterVariant = "default" | "capabilities" | "useCases";

type FooterProps = {
  variant?: FooterVariant;
};

export function Footer({ variant = "default" }: FooterProps) {
  const reduce = useReducedMotion();
  const isCap = variant === "capabilities";
  const isUseCases = variant === "useCases";
  const isMarketing = isCap || isUseCases;

  const newsletterTitle = isMarketing ? "Never miss an Update" : "Subscribe to our signals";
  const emailFieldId = isUseCases ? "footer-email-uc" : isCap ? "footer-email-cap" : "email";
  const emailPlaceholder = isMarketing ? "Enter E-Mail" : "you@company.com";
  const newsletterSource = isUseCases ? "footer_use_cases" : isCap ? "footer_capabilities" : "footer";

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
        await subscribeNewsletter({ email, source: newsletterSource });
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
    [newsletterEmail, newsletterSource],
  );

  const briefingHref = isUseCases ? "/use-cases#briefing" : "/capabilities#briefing";

  return (
    <motion.footer
      className="bg-[#1F2229] text-white"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px", amount: 0.15 }}
      transition={{ duration: 0.555, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="-mx-4 px-4 py-12 sm:-mx-6 sm:px-6 sm:py-14 lg:-mx-8 lg:px-8">
          <div className="mx-auto flex w-full max-w-[min(100%,36rem)] flex-col items-center text-center">
            <p className="text-lg font-semibold tracking-tight text-[#D1D5DB]">{newsletterTitle}</p>
            <form
              className="mt-6 flex w-full  bg-white overflow-clip rounded-2xl shadow-sm"
              onSubmit={(e) => void onNewsletterSubmit(e)}
            >
              <label htmlFor={emailFieldId} className="sr-only">
                Email
              </label>
              <div className="flex min-h-[52px] min-w-0 flex-1 items-center bg-white pl-4 sm:pl-5">
                <Mail className="h-5 w-5 shrink-0 text-[#1F2229]" strokeWidth={2} aria-hidden />
                <input
                  id={emailFieldId}
                  type="email"
                  name="email"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterMessage) setNewsletterMessage(null);
                  }}
                  placeholder={emailPlaceholder}
                  autoComplete="email"
                  disabled={newsletterBusy}
                  className="min-h-[52px] min-w-0 flex-1 border-0 bg-transparent py-3 pl-3 pr-2 text-sm font-medium text-[#1F2229] placeholder:text-[#52525B] outline-none ring-0 focus:ring-0 focus-visible:outline-none disabled:opacity-60"
                />
              </div>
              <button
                type="submit"
                disabled={newsletterBusy || !newsletterEmail.trim()}
                className="flex min-h-[52px] shrink-0 rounded-l-xl items-center bg-[#1A6EF5] px-7 text-sm font-semibold text-[#E5E7EB] transition hover:bg-[#263E5F] disabled:cursor-not-allowed disabled:opacity-60 sm:px-9"
              >
                {newsletterBusy ? "Submitting..." : "Subscribe"}
              </button>
            </form>
            {newsletterMessage ? (
              <p
                className={`mt-3 text-sm ${newsletterMessage.kind === "ok" ? "text-[#86EFAC]" : "text-[#FCA5A5]"}`}
                role="status"
              >
                {newsletterMessage.text}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
          {isMarketing ? (
            <>
              <div>
                <p className="text-xl font-bold tracking-tight">
                  {isUseCases ? "EarlySafe" : "EXPERGO"}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {isUseCases
                    ? "Continuous Portfolio Risk Control."
                    : "Continuous portfolio intelligence for institutional risk teams."}
                </p>
                <a
                  href="mailto:info@earlysafe.com"
                  className="mt-4 inline-block text-sm font-medium text-[#16B2C3] hover:underline"
                >
                  info@earlysafe.com
                </a>
                <p className="mt-2 text-sm text-white/60">Gurgaon, India</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-white/90">Explore</p>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li>
                    <Link href="/#platform" className="hover:text-white">
                      Platform
                    </Link>
                  </li>
                  <li>
                    <Link href="/outcomes" className="hover:text-white">
                      Outcome
                    </Link>
                  </li>
                  <li>
                    <Link href="/use-cases" className="hover:text-white">
                      Use Cases
                    </Link>
                  </li>
                  <li>
                    <Link href="/#company" className="hover:text-white">
                      Company
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-white/90">Navigate</p>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li>
                    <Link href="/capabilities" className="hover:text-white">
                      Capabilities
                    </Link>
                  </li>
                  <li>
                    <Link href="/#company" className="hover:text-white">
                      Architecture
                    </Link>
                  </li>
                  <li>
                    <Link href="/#insights" className="hover:text-white">
                      Insights
                    </Link>
                  </li>
                  <li>
                    <Link href="/#company" className="hover:text-white">
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col items-start gap-4">
                <Link
                  href={briefingHref}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-[#1A6EF5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1557b8] sm:w-auto"
                >
                  Request Executive Briefing
                </Link>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-xl font-bold tracking-tight">EarlySafe</p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Continuous portfolio intelligence for risk teams who need timely,
                  defensible decisions.
                </p>
                <a
                  href="mailto:hello@earlysafe.com"
                  className="mt-4 inline-block text-sm font-medium  hover:underline"
                >
                  info@expergo.tech
                </a>
              </div>

              <div>
                <p className="text-sm font-semibold text-white/90">Platform</p>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li>
                    <Link href="/#platform" className="hover:text-white">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="/#solutions" className="hover:text-white">
                      Solutions
                    </Link>
                  </li>
                  <li>
                    <Link href="/#security" className="hover:text-white">
                      Security
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-white/90">Company</p>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li>
                    <Link href="/#company" className="hover:text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/#careers" className="hover:text-white">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/#contact" className="hover:text-white">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col items-start gap-4">
                <Link
                  href="/#demo"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-[#1D68D5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1557b8] sm:w-auto"
                >
                  Request a Demo
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/expergo-technologies"
              aria-label="LinkedIn"
              className="text-white/70 transition hover:text-white"
            >
              <Linkedin className="h-5 w-5" />
            </a>
           
          </div>
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} EarlySafe. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
