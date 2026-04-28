"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Drawer, ConfigProvider } from "antd";
import { executeRecaptcha, submitBookDemo } from "@/lib/api/public";

export type BookDemoMode = "demo" | "brief";

export type BookDemoModalProps = {
  open: boolean;
  onClose: () => void;
  mode: BookDemoMode;
};

const COMPANY_SIZES = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
] as const;

const INDUSTRIES = [
  "Scheduled Bank",
  "Co-operative Bank",
  "NBFC",
  "HFC",
  "MFI",
  "Other",
] as const;

const USE_CASE_OPTIONS = [
  "Early risk detection & watchlist control",
  "Portfolio level visibility & stress tracking",
  "Execution discipline & SLA control",
  "Compliance & inspection readiness",
] as const;

type FormState = {
  fullName: string;
  workEmail: string;
  companyName: string;
  phone: string;
  companySize: string;
  industry: string;
  interest: string;
};

const initialForm: FormState = {
  fullName: "",
  workEmail: "",
  companyName: "",
  phone: "",
  companySize: "",
  industry: "",
  interest: "",
};

const modalCopy = {
  demo: {
    title: "Book a Demo",
    intro: "Tell us about yourself so we can tailor the demo to your needs.",
    source: "book-demo-modal",
    successTitle: "Demo request received",
    successBody:
      "Our team will contact you shortly to schedule a walkthrough around your portfolio priorities.",
  },
  brief: {
    title: "Access the Executive Brief",
    intro:
      "A leadership view on achieving portfolio control across signals, execution, external insights, and compliance.",
    source: "executive-brief-modal",
    successTitle: "Executive Brief request received",
    successBody:
      "We will send the brief and follow up with the right context for your portfolio control priorities.",
  },
} as const;

function ProgressBars({ step }: { step: 1 | 2 }) {
  return (
    <div className="mb-6 flex gap-3">
      {[1, 2].map((item) => (
        <div
          key={item}
          className={`h-[5px] flex-1 rounded-full transition-colors ${
            item <= step ? "bg-[#16B2C3]" : "bg-[#E0E0E0]"
          }`}
        />
      ))}
    </div>
  );
}

const inputClass =
  "min-h-[48px] w-full rounded-lg border border-[#E4E7EC] bg-[#F9FAFB] px-4 py-3 text-sm text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#16B2C3] focus:bg-white focus:ring-2 focus:ring-[#16B2C3]/20";

const labelClass = "mb-1.5 block text-sm font-medium text-[#111111]";

function SelectChevron() {
  return (
    <ChevronDown
      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
      aria-hidden
    />
  );
}

type FormErrors = Partial<Record<keyof FormState, string>>;

export function BookDemoModal({ open, onClose, mode }: BookDemoModalProps) {
  const titleId = useId();
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const copy = modalCopy[mode];

  useEffect(() => {
    if (open) {
      setStep(1);
      setForm(initialForm);
      setSubmitting(false);
      setSubmitError(null);
      setErrors({});
    }
  }, [open]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const canSubmit = useCallback(
    () =>
      Boolean(
        form.fullName.trim() &&
           emailRegex.test(form.workEmail) &&
          form.companyName.trim() &&
          form.phone.trim() &&
          form.companySize &&
          form.industry &&
          form.interest
      ),
    [form]
  );

  const update = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
    if (submitError) setSubmitError(null);
  };

  const handleConfirm = useCallback(async () => {
    if (!validate() || submitting) return;
    setSubmitError(null);
    setSubmitting(true);

    try {
      const recaptchaToken = await executeRecaptcha("book_demo");
      await submitBookDemo({
        fullName: form.fullName,
        workEmail: form.workEmail,
        companyName: form.companyName,
        phone: form.phone,
        companySize: form.companySize,
        country: "",
        industry: form.industry,
        projectDetails: "",
        useCase: form.interest,
        source: copy.source,
        recaptchaToken,
      });
      setStep(2);
    } catch (e) {
      setSubmitError(
        e instanceof Error ? e.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }, [copy.source, form, submitting]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#16B2C3",
          fontFamily: "inherit",
        },
      }}
    >
      <Drawer
        title={null}
        placement="right"
        onClose={onClose}
        open={open}
        size={480}
        closable={true}
        closeIcon={
          <span className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-[#F3F6FA] hover:text-[#111]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </span>
        }
        styles={{
          header: { display: "none" },
          body: { padding: "28px 28px 32px" },
          wrapper: { boxShadow: "-8px 0 30px rgba(0,0,0,0.12)" },
        }}
        rootClassName="book-demo-drawer"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-[#F3F6FA] hover:text-[#111]"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>

        {/* Progress bars */}
        <ProgressBars step={step} />

        {/* Step 1 – Form */}
        {step === 1 && (
          <div className="pt-2">
            <h2
              id={titleId}
              className="text-[20px] font-bold leading-[1.15] text-[#16B2C3] sm:text-[24px]"
            >
              {copy.title}
            </h2>
            <p className="mt-2 text-[12px] leading-[1.4] text-[#6B7280]">
              {copy.intro}
            </p>

            <div className="mt-7 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              {/* Full Name */}
              <div>
                <label className={labelClass}>Full Name</label>
                <input
                  className={`${inputClass} ${errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  placeholder="Jane Doe"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                />
                {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
              </div>

              {/* Work Email */}
              <div>
                <label className={labelClass}>Work Email</label>
                <input
                  type="email"
                  className={`${inputClass} ${errors.workEmail ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  placeholder="Jane@company.in"
                  value={form.workEmail}
                  onChange={(e) => update("workEmail", e.target.value)}
                />
                {errors.workEmail && <p className="mt-1 text-xs text-red-500">{errors.workEmail}</p>}
              </div>

              {/* Company Name */}
              <div>
                <label className={labelClass}>Company Name</label>
                <input
                  className={`${inputClass} ${errors.companyName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  placeholder="Acme Inc."
                  value={form.companyName}
                  onChange={(e) => update("companyName", e.target.value)}
                />
                {errors.companyName && <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>}
              </div>

              {/* Phone No. */}
              <div>
                <label className={labelClass}>Phone No.</label>
                <input
                  className={`${inputClass} ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  placeholder="+1 555 000 000"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
              </div>

              {/* Company Size */}
              <div>
                <label className={labelClass}>Company Size</label>
                <div className="relative">
                  <select
                    className={`${inputClass} cursor-pointer appearance-none pr-10 ${errors.companySize ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    value={form.companySize}
                    onChange={(e) => update("companySize", e.target.value)}
                  >
                    <option value="">Select Size</option>
                    {COMPANY_SIZES.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <SelectChevron />
                </div>
                {errors.companySize && <p className="mt-1 text-xs text-red-500">{errors.companySize}</p>}
              </div>

              {/* Industry */}
              <div>
                <label className={labelClass}>Industry</label>
                <div className="relative">
                  <select
                    className={`${inputClass} cursor-pointer appearance-none pr-10 ${errors.industry ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    value={form.industry}
                    onChange={(e) => update("industry", e.target.value)}
                  >
                    <option value="">Select Industry</option>
                    {INDUSTRIES.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <SelectChevron />
                </div>
                {errors.industry && <p className="mt-1 text-xs text-red-500">{errors.industry}</p>}
              </div>

              {/* Use Case / Interest – full width */}
              <div className="sm:col-span-2">
                <label className={labelClass}>Use Case / Interest</label>
                <div className="relative">
                  <select
                    className={`${inputClass} cursor-pointer appearance-none pr-10 ${errors.interest ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    value={form.interest}
                    onChange={(e) => update("interest", e.target.value)}
                  >
                    <option value="">What are you most interested in?</option>
                    {USE_CASE_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <SelectChevron />
                </div>
                {errors.interest && <p className="mt-1 text-xs text-red-500">{errors.interest}</p>}
              </div>
            </div>

            {submitError ? (
              <p
                className="mt-5 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800"
                role="alert"
              >
                {submitError}
              </p>
            ) : null}

            <p className="mt-4 text-[11px] text-[#9CA3AF] leading-tight text-center">
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline hover:text-[#16B2C3]">Privacy Policy</a> and{" "}
              <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline hover:text-[#16B2C3]">Terms of Service</a> apply.
            </p>

            <button
              type="button"
              disabled={submitting}
              onClick={() => void handleConfirm()}
              className="mt-8 w-full rounded-xl bg-[#E8F4FD] py-3.5 text-[15px] font-semibold text-[#16B2C3] transition hover:bg-[#d6edfa] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Confirm Booking"}
            </button>
          </div>
        )}

        {/* Step 2 – Success */}
        {step === 2 && (
          <div className="py-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#16B2C3] text-white">
              <Check className="h-8 w-8" strokeWidth={2.5} />
            </div>
            <h2
              id={titleId}
              className="text-[28px] font-bold leading-tight text-[#111111] sm:text-[32px]"
            >
              {copy.successTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6B7280]">
              {copy.successBody}
            </p>

            <div className="mt-8 rounded-lg border border-[#E4E7EC] bg-[#F9FAFB] p-5 text-left text-sm text-[#202124]">
              <p className="leading-relaxed">
                We&apos;ve sent a confirmation to{" "}
                <span className="font-semibold">
                  {form.workEmail || "your email"}
                </span>
                .
              </p>
            </div>

            <p className="mt-6 text-xs text-[#9CA3AF]">
              Watch your inbox for a reply from us.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-8 w-full max-w-xs rounded-xl bg-[#16B2C3] py-3 text-sm font-semibold text-white transition hover:bg-[#139BA8]"
            >
              Done
            </button>
          </div>
        )}
      </Drawer>
    </ConfigProvider>
  );
}
