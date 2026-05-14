"use client";

import type { DragEvent, ReactNode } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Upload, X } from "lucide-react";
import { motion } from "framer-motion";
import { executeRecaptcha, submitCareerApplication } from "@/lib/api/public";

export type CareerOpeningRow = {
  title: string;
  team: string;
};

type JobDetailContent = {
  aboutRoleIntro: string;
  aboutRoleBullets: string[];
  responsibilities: string[];
};

const ABOUT_COMPANY = `Expergo is an AI-native Risk Operating System for lenders — helping institutions unify portfolio signals, orchestrate execution across teams, and stay inspection-ready as regulations and markets evolve.`;

const JOB_DETAILS: Record<string, JobDetailContent> = {
  "Key Account Manager": {
    aboutRoleIntro:
      "Own strategic relationships with lenders and partners. You will translate portfolio risk priorities into clear roadmaps, coordinate cross-functional delivery, and expand adoption of Expergo across the account lifecycle.",
    aboutRoleBullets: [
      "Enterprise discovery & executive alignment",
      "Renewals, expansion, and success planning",
      "Partnering with Product and Engineering on outcomes",
      "Pipeline hygiene, forecasting, and territory strategy",
    ],
    responsibilities: [
      "Build trusted relationships with economic buyers and operational champions.",
      "Lead structured discovery to map risk workflows, stakeholders, and success criteria.",
      "Coordinate demos, pilots, and business reviews with clear next steps.",
      "Partner with internal teams to scope statements of work and implementation plans.",
      "Track opportunity health, communicate risk early, and maintain CRM discipline.",
    ],
  },
  "AI/ML Developer": {
    aboutRoleIntro:
      "Design and ship models and data pipelines that power early risk detection, portfolio analytics, and explainable signals at scale — with strong attention to auditability and production reliability.",
    aboutRoleBullets: [
      "Feature engineering & model lifecycle",
      "Batch and streaming inference patterns",
      "Evaluation, monitoring, and drift checks",
      "Collaboration with backend and product on APIs",
    ],
    responsibilities: [
      "Develop, train, and validate ML models aligned with lending risk use cases.",
      "Implement reproducible pipelines and experiment tracking suitable for regulated environments.",
      "Work with engineers to deploy, monitor, and improve models in production.",
      "Translate business questions into measurable objectives and evaluation metrics.",
      "Document assumptions, data lineage, and model behaviour for internal review.",
    ],
  },
  "Content & SEO Marketing Manager": {
    aboutRoleIntro:
      "Lead organic growth for Expergo by owning SEO strategy and high-impact content across the funnel — from technical foundations to thought leadership that resonates with risk and lending leaders.",
    aboutRoleBullets: [
      "Inbound website & landing pages",
      "Outbound content & distribution",
      "ABM and segment-specific narratives",
      "Sales enablement decks & one-pagers",
      "Performance reporting & iteration",
    ],
    responsibilities: [
      "Own technical and content SEO: architecture, keyword strategy, and on-page quality.",
      "Create and edit high-trust content for risk, compliance, and lending audiences.",
      "Partner with Sales and Product on messaging, launches, and enablement assets.",
      "Measure traffic, engagement, and pipeline contribution; report monthly.",
      "Maintain editorial standards, tone of voice, and brand consistency.",
    ],
  },
  "MERN Full Stack Developer": {
    aboutRoleIntro:
      "Build polished product surfaces and APIs across MongoDB, Express, React, and Node — focusing on performance, security, and clarity for users managing portfolio risk every day.",
    aboutRoleBullets: [
      "React dashboards & workflows",
      "REST/GraphQL services & integrations",
      "Auth, observability, and testing",
      "Schema design and data access patterns",
    ],
    responsibilities: [
      "Implement features end-to-end with attention to UX detail and edge cases.",
      "Write maintainable services with tests, logging, and operational readiness.",
      "Collaborate on API contracts with designers, PMs, and ML engineers.",
      "Optimise bundle size, latency, and accessibility where users interact most.",
      "Participate in code review and help raise engineering standards.",
    ],
  },
};

const GENERAL_DETAILS: JobDetailContent = {
  aboutRoleIntro:
    "We review speculative applications for upcoming roles across Revenue, Engineering, Marketing, and Operations. Tell us how you would raise the standard at Expergo — we read every note and follow up when there is a strong match.",
  aboutRoleBullets: [
    "Pipeline for unlisted or future openings",
    "Cross-functional collaboration",
    "Portfolio risk & regulated environments",
    "Clear communication and ownership",
  ],
  responsibilities: [
    "Share your background, strengths, and the impact you want to drive.",
    "Highlight relevant domain experience in lending, risk, or B2B SaaS.",
    "Attach a resume and, if helpful, links to work or writing.",
    "We may reach out when a role aligns — typically within a few weeks.",
  ],
};

const inputShell =
  "w-full rounded-lg border border-[#E4E7EC] bg-white px-3 py-1.5 text-sm text-brand-footer outline-none transition placeholder:text-[#9CA3AF] focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 sm:px-3.5 sm:py-2 lg:px-3 lg:py-1.5";

const labelClass = "mb-0.5 block text-xs font-semibold text-[#374151]";
const NAME_REGEX = /^[A-Za-z][A-Za-z' -]*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LINKEDIN_REGEX = /^https?:\/\/(www\.)?linkedin\.com\/.+/i;
const PHONE_REGEX = /^\+?[0-9()\-\s]{7,20}$/;
const LOCATION_REGEX = /^[a-zA-Z0-9.,' -]{2,80}$/;
const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024;
const easeOut = [0.22, 1, 0.36, 1] as const;

function validateResumeFile(file: File): string | null {
  const isSupportedType =
    file.type === "application/pdf" ||
    file.type === "application/msword" ||
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    /\.(pdf|doc|docx)$/i.test(file.name);
  if (!isSupportedType) return "Resume must be a PDF or Word document (.pdf, .doc, .docx).";
  if (file.size > MAX_RESUME_SIZE_BYTES) return "Resume file size must be 5MB or less.";
  return null;
}

function sanitizeNameInput(value: string): string {
  return value
    .replace(/[^A-Za-z' -]/g, "")
    .replace(/\s{2,}/g, " ")
    .slice(0, 60);
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className={labelClass}>
      {children}
    </label>
  );
}

export type CareerApplyModalProps = {
  open: boolean;
  onClose: () => void;
  opening: CareerOpeningRow | null;
  /** When true, left column uses general-application copy (Apply Anyway). */
  generalApplication?: boolean;
};

export function CareerApplyModal({
  open,
  onClose,
  opening,
  generalApplication = false,
}: CareerApplyModalProps) {
  const titleId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeDragActive, setResumeDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resetForm = useCallback(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setLinkedIn("");
    setPhone("");
    setLocation("");
    setResumeFile(null);
    setResumeDragActive(false);
    setSubmitting(false);
    setSubmitSuccess(null);
    setSubmitError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  useEffect(() => {
    if (!open) {
      resetForm();
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, resetForm]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const displayTitle =
    generalApplication || !opening ? "General Application" : opening.title;

  const detail =
    generalApplication || !opening
      ? GENERAL_DETAILS
      : JOB_DETAILS[opening.title] ?? GENERAL_DETAILS;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitSuccess(null);
    setSubmitError(null);
    const first = firstName.trim();
    const last = lastName.trim();
    const emailTrimmed = email.trim();
    const linkedInTrimmed = linkedIn.trim();
    const phoneTrimmed = phone.trim();
    const locationTrimmed = location.trim();

    if (!first || !last) {
      setSubmitError("Please enter your first and last name.");
      return;
    }
    if (first.length < 2 || last.length < 2) {
      setSubmitError("First and last name should be at least 2 characters each.");
      return;
    }
    if (!NAME_REGEX.test(first) || !NAME_REGEX.test(last)) {
      setSubmitError("Names can contain letters, spaces, apostrophes, and hyphens only.");
      return;
    }
    if (!emailTrimmed || !EMAIL_REGEX.test(emailTrimmed)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }
    if (!linkedInTrimmed) {
      setSubmitError("Please enter your LinkedIn profile URL.");
      return;
    }
    if (!LINKEDIN_REGEX.test(linkedInTrimmed)) {
      setSubmitError("Please enter a valid LinkedIn profile URL.");
      return;
    }
    if (!phoneTrimmed) {
      setSubmitError("Please enter your phone number.");
      return;
    }
    if (!PHONE_REGEX.test(phoneTrimmed)) {
      setSubmitError("Please enter a valid phone number.");
      return;
    }
    const phoneDigits = phoneTrimmed.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      setSubmitError("Phone number must contain 10 to 15 digits.");
      return;
    }
    if (!locationTrimmed) {
      setSubmitError("Please enter your current location.");
      return;
    }
    if (!LOCATION_REGEX.test(locationTrimmed)) {
      setSubmitError("Please enter a valid current location.");
      return;
    }
    if (!resumeFile) {
      setSubmitError("Please upload your resume before applying.");
      return;
    }
    const resumeError = validateResumeFile(resumeFile);
    if (resumeError) {
      setSubmitError(resumeError);
      return;
    }

    try {
      setSubmitting(true);
      const recaptchaToken = await executeRecaptcha("career_application");
      await submitCareerApplication({
        roleTitle: displayTitle,
        firstName: first,
        lastName: last,
        email: emailTrimmed,
        linkedIn: linkedInTrimmed,
        phone: phoneTrimmed,
        location: locationTrimmed,
        resumeFileName: resumeFile.name,
        resumeFileSize: resumeFile.size,
        source: generalApplication
          ? "career-apply-anyway-modal"
          : "career-apply-modal",
        recaptchaToken,
      });
      setSubmitSuccess("Application submitted successfully.");
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Could not submit your application. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const onResumeDrop = (e: DragEvent) => {
    e.preventDefault();
    setResumeDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    const error = validateResumeFile(f);
    if (error) {
      setSubmitError(error);
      return;
    }
    setSubmitError(null);
    setResumeFile(f);
  };

  if (!mounted || !open) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.24, ease: easeOut }}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.34, ease: easeOut }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[95vh] w-full max-w-[1080px] flex-col overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_24px_80px_-24px_rgba(15,23,42,0.35)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="shrink-0 border-b border-brand-border px-4 pb-3 pt-3 sm:px-6 sm:pb-4 sm:pt-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <img src="/logo 2.svg" alt="" width={28} height={28} className="shrink-0" />
                <span className="text-lg font-bold tracking-tight text-brand-ink sm:text-xl">EXPERGO</span>
              </div>
              <h2 id={titleId} className="mt-2 text-lg font-bold leading-tight text-brand-footer sm:text-xl">
                {displayTitle}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-lg p-2 text-brand-muted transition-all duration-200 hover:scale-[1.03] hover:bg-brand-surface hover:text-brand-footer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain lg:overflow-hidden lg:flex-row">
          <div
            className="min-w-0 shrink-0 px-4 py-5 sm:px-6 sm:py-6 lg:min-h-0 lg:flex-1 lg:shrink lg:overflow-y-auto lg:border-r lg:border-brand-border lg:py-8 lg:[scrollbar-width:none] lg:[-ms-overflow-style:none] lg:[&::-webkit-scrollbar]:hidden"
          >
            <div className="space-y-6 text-sm leading-relaxed text-brand-muted lg:pr-4">
              <section>
                <h3 className="text-sm font-bold text-brand-blue">About the company</h3>
                <p className="mt-2 text-[13px] leading-[1.65] sm:text-sm">{ABOUT_COMPANY}</p>
              </section>
              <section>
                <h3 className="text-sm font-bold text-brand-blue">About the Role</h3>
                <p className="mt-2 text-[13px] leading-[1.65] sm:text-sm">{detail.aboutRoleIntro}</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[13px] sm:text-sm">
                  {detail.aboutRoleBullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h3 className="text-sm font-bold text-brand-blue">Key Responsibilities</h3>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[13px] sm:text-sm">
                  {detail.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <div className="flex min-w-0 w-full shrink-0 flex-col px-4 pb-6 pt-2 sm:px-6 sm:pb-8 lg:min-h-0 lg:w-[min(100%,404px)] lg:shrink-0 lg:px-4 lg:pb-4 lg:pt-3 lg:pl-5 xl:w-[420px]">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col rounded-2xl border border-brand-border bg-[#FAFBFC] p-4 transition-shadow duration-300 hover:shadow-[0_12px_32px_-20px_rgba(15,23,42,0.35)] sm:p-5 lg:p-3"
              >
                <div className="grid gap-2.5 sm:gap-3 lg:gap-2">
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:gap-2">
                    <div>
                      <FieldLabel htmlFor="career-first-name">First Name</FieldLabel>
                      <input
                        id="career-first-name"
                        name="firstName"
                        autoComplete="given-name"
                        value={firstName}
                        onChange={(e) => setFirstName(sanitizeNameInput(e.target.value))}
                        className={inputShell}
                        required
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor="career-last-name">Last Name</FieldLabel>
                      <input
                        id="career-last-name"
                        name="lastName"
                        autoComplete="family-name"
                        value={lastName}
                        onChange={(e) => setLastName(sanitizeNameInput(e.target.value))}
                        className={inputShell}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <FieldLabel htmlFor="career-email">Email</FieldLabel>
                    <input
                      id="career-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputShell}
                      required
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="career-linkedin">LinkedIn Profile URL</FieldLabel>
                    <input
                      id="career-linkedin"
                      name="linkedIn"
                      type="url"
                      placeholder="https://"
                      value={linkedIn}
                      onChange={(e) => setLinkedIn(e.target.value)}
                      className={inputShell}
                      required
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="career-phone">Phone Number</FieldLabel>
                    <input
                      id="career-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputShell}
                      required
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="career-location">Current Location</FieldLabel>
                    <input
                      id="career-location"
                      name="location"
                      autoComplete="address-level2"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className={inputShell}
                      required
                    />
                  </div>

                  <div>
                    <span className={labelClass}>Resume</span>
                    <div className="mt-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="sr-only"
                        id="career-resume"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          if (!file) {
                            setResumeFile(null);
                            return;
                          }
                          const error = validateResumeFile(file);
                          if (error) {
                            setResumeFile(null);
                            setSubmitError(error);
                            return;
                          }
                          setSubmitError(null);
                          setResumeFile(file);
                        }}
                      />
                      <label
                        htmlFor="career-resume"
                        onDragEnter={(e) => {
                          e.preventDefault();
                          setResumeDragActive(true);
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          if (!e.currentTarget.contains(e.relatedTarget as Node)) setResumeDragActive(false);
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.dataTransfer.dropEffect = "copy";
                        }}
                        onDrop={onResumeDrop}
                        className={`flex h-[92px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-white px-3 py-2 text-center transition hover:border-brand-blue/55 hover:bg-brand-surface/80 lg:h-[78px] lg:py-1.5 ${
                          resumeDragActive
                            ? "border-brand-blue bg-brand-surface ring-2 ring-brand-blue/25"
                            : "border-brand-blue/35"
                        }`}
                      >
                        <Upload className="mb-1 h-5 w-5 text-brand-blue" aria-hidden />
                        <span className="text-xs font-medium text-brand-footer lg:text-[11px]">
                          Click to upload or drag and drop
                        </span>
                        <span className="mt-0.5 text-[11px] text-brand-muted lg:text-[10px]">
                          PDF or Word ·{" "}
                          <span className="font-semibold text-brand-blue">Browse files</span>
                        </span>
                        {resumeFile ? (
                          <span className="mt-2 truncate text-xs font-medium text-brand-ink">{resumeFile.name}</span>
                        ) : null}
                      </label>
                    </div>
                  </div>

                  {submitError ? (
                    <p className="text-sm font-medium text-red-600" role="alert">
                      {submitError}
                    </p>
                  ) : null}
                  {submitSuccess ? (
                    <p className="text-sm font-medium text-green-700" role="status">
                      {submitSuccess}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-1 w-full rounded-lg bg-brand-blue py-2 text-sm font-semibold text-white shadow-[0_4px_14px_-4px_rgba(13,162,231,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-blue/95 hover:shadow-[0_10px_24px_-10px_rgba(13,162,231,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 focus-visible:ring-offset-2 active:translate-y-0"
                  >
                    {submitting ? "Submitting..." : "Apply"}
                  </button>
                  <p className="text-center text-[10px] leading-snug text-brand-muted lg:hidden">
                    Your details are saved securely after successful submission.
                  </p>
                </div>
              </form>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(modal, document.body);
}
