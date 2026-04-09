"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";

import { submitDemoRequest } from "@/lib/api/public";
import type { DemoRequestInput } from "@/lib/schemas/forms";

const PRIMARY = "#2563EB";
const PRIMARY_HOVER = "#1d4ed8";

export type BookDemoModalProps = {
  open: boolean;
  onClose: () => void;
};

const COMPANY_SIZES = ["1–10", "11–50", "51–200", "201–500"] as const;

type FormState = {
  fullName: string;
  workEmail: string;
  companyName: string;
  phone: string;
  companySize: "" | (typeof COMPANY_SIZES)[number];
  industry: string;
  useCase: string;
};

const initialForm: FormState = {
  fullName: "",
  workEmail: "",
  companyName: "",
  phone: "",
  companySize: "",
  industry: "",
  useCase: "",
};
const INDUSTRIES = ["NBFC / Lending", "Fintech", "Banking", "Insurance", "E-commerce", "Other"];
const USE_CASES = [
  "Portfolio risk monitoring",
  "Early warning systems",
  "Regulatory compliance",
  "Lighthouse / analytics",
  "Regulus / governance",
  "General demo",
];

function ProgressBars({ step }: { step: 1 | 2 }) {
  const active = step;
  return (
    <div className="mb-8 flex gap-1.5">
      {[0, 1].map((i) => {
        const filled = i < active;
        return (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all ${
              filled ? "h-1.5" : "h-1"
            }`}
            style={{ backgroundColor: filled ? PRIMARY : "#E5E7EB" }}
          />
        );
      })}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg bg-[#F3F4F6] px-3 py-3 text-sm text-gray-900 outline-none ring-1 ring-transparent transition placeholder:text-gray-400 focus:ring-2 focus:ring-[#2563EB]/30";

const labelClass = "mb-1.5 block text-xs font-medium text-gray-600";

function SelectChevron() {
  return (
    <ChevronDown
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
      aria-hidden
    />
  );
}

export function BookDemoModal({ open, onClose }: BookDemoModalProps) {
  const titleId = useId();
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setStep(1);
      setForm(initialForm);
      setSubmitting(false);
      setSubmitError(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const canStep1 = useCallback(() => {
    return (
      form.fullName.trim() &&
      form.workEmail.trim() &&
      form.companyName.trim() &&
      form.phone.trim() &&
      Boolean(form.companySize) &&
      Boolean(form.industry) &&
      Boolean(form.useCase)
    );
  }, [form]);

  const update = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleConfirm = useCallback(async () => {
    if (!canStep1() || submitting) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      await submitDemoRequest(form as DemoRequestInput);
      setStep(2);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [canStep1, form, submitting]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-800 transition hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {step < 2 && <ProgressBars step={step} />}

        {/* Step 1 — Form */}
        {step === 1 && (
          <div>
            <h2 id={titleId} className="es-heading-section pr-10 font-bold text-gray-900">
              Book a Demo
            </h2>
            <p className="mt-2 text-sm text-gray-800">
              Tell us about yourself so we can tailor the demo to your needs.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Full Name</label>
                <input
                  className={inputClass}
                  placeholder="Jane Doe"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Work Email</label>
                <input
                  type="email"
                  className={inputClass}
                  placeholder="Jane@company.in"
                  value={form.workEmail}
                  onChange={(e) => update("workEmail", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Company Name</label>
                <input
                  className={inputClass}
                  placeholder="Acme Inc."
                  value={form.companyName}
                  onChange={(e) => update("companyName", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Phone No.</label>
                <input
                  className={inputClass}
                  placeholder="+1 555 000 000"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Company Size</label>
                <div className="relative">
                  <select
                    className={`${inputClass} appearance-none cursor-pointer`}
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
              </div>
              <div>
                <label className={labelClass}>Industry</label>
                <div className="relative">
                  <select
                    className={`${inputClass} appearance-none cursor-pointer`}
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
              </div>
            </div>

            <div className="mt-4">
              <label className={labelClass}>Use Case / Interest</label>
              <div className="relative">
                <select
                  className={`${inputClass} appearance-none cursor-pointer`}
                  value={form.useCase}
                  onChange={(e) => update("useCase", e.target.value)}
                >
                  <option value="">What are you most interested in?</option>
                  {USE_CASES.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                <SelectChevron />
              </div>
            </div>

            {submitError ? (
              <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
                {submitError}
              </p>
            ) : null}

            <button
              type="button"
              disabled={!canStep1() || submitting}
              onClick={() => void handleConfirm()}
              className="mt-8 w-full rounded-lg py-3.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: canStep1() && !submitting ? PRIMARY : "#93c5fd" }}
              onMouseEnter={(e) => {
                if (canStep1() && !submitting)
                  (e.target as HTMLButtonElement).style.backgroundColor = PRIMARY_HOVER;
              }}
              onMouseLeave={(e) => {
                if (canStep1() && !submitting)
                  (e.target as HTMLButtonElement).style.backgroundColor = PRIMARY;
              }}
            >
              {submitting ? "Sending…" : "Confirm Booking"}
            </button>
          </div>
        )}

        {/* Step 2 — Success */}
        {step === 2 && (
          <div className="text-center">
            <div
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: PRIMARY }}
            >
              <Check className="h-8 w-8" strokeWidth={2.5} />
            </div>
            <h2 id={titleId} className="es-heading-section font-bold text-gray-900">
              Thank you!
            </h2>
            <p className="mt-3 text-sm text-gray-800">
              We&apos;ve sent a confirmation to{" "}
              <span className="font-semibold">{form.workEmail || "your email"}</span>
            </p>

            <div className="mt-8 rounded-xl bg-[#F3F4F6] p-5 text-left text-sm text-gray-800">
              <p className="leading-relaxed">
                We&apos;ve received your request. Our team will contact you shortly to schedule your demo at a time
                that works for you.
              </p>
            </div>

            <p className="mt-6 text-xs text-gray-600">Watch your inbox for a reply from us.</p>

            <button
              type="button"
              onClick={onClose}
              className="mt-8 w-full max-w-xs rounded-lg py-3 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: PRIMARY }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
