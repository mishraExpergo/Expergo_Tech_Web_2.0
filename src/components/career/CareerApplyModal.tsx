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
  responsibilities: string[];
  requiredExperienceSkills : string[];
};

const ABOUT_COMPANY = `At ExperGo, we are building the first AI-native Risk Operating System for lenders. Our platform, EarlySafe, enables NBFCs, HFCs, and banks to move from static MIS reporting to predictive, AI-driven risk management. It helps financial institutions monitor risk parameters and regulatory indicators in real time, identify potential risks early, ensure compliance, and make informed decisions.
We use AI-native analytics, machine learning (ML), graph AI, and generative AI to power risk detection and prediction, fraud detection, stress testing, and compliance automation.
Our offerings span Risk Ops Outsourcing, Compliance-as-a-Service, Risk Analytics, Policy-as-Code, and Risk Intelligence giving CROs, CFOs, and CEOs what they want most: fewer surprises, lower NPAs, regulator comfort, and investor confidence.
 
Join us to solve cutting-edge problems at the intersection of finance, data, and AI.`;

const JOB_DETAILS: Record<string, JobDetailContent> = {
  "Key Account Manager": {
    aboutRoleIntro:
      "We are looking for a highly driven Key Account Manager to lead strategic BFSI sales for ExperGo’s AI-powered risk infrastructure platform, EarlySafe. This is a client-facing enterprise sales role focused on engaging CXOs and senior decision-makers across NBFCs, HFCs, SFBs, and banks.The role involves owning the complete enterprise sales lifecycle — from identifying opportunities and building executive relationships to driving PoCs, commercial negotiations, and long-term account growth. You will work closely with founders and leadership teams to position EarlySafe as a strategic risk and credit intelligence platform for modern lenders.This opportunity is ideal for professionals with strong BFSI enterprise sales experience, consultative selling capabilities, and a proven track record of closing high-value SaaS or fintech deals. Candidates should be comfortable handling complex sales cycles, solution-driven discussions, and multi-stakeholder enterprise engagements.The role offers significant exposure to AI, risk analytics, lending technology, and strategic account management within the BFSI ecosystem.",
    responsibilities: [
      "Build strong CXO-level relationships with CEOs, CROs, CIOs, Risk Heads, and Collections leaders",
      "Drive enterprise sales cycles from prospecting and consultative selling to PoC conversion and production deployment",
      "Conduct face-to-face executive meetings, product demos, and solution presentations for senior stakeholders",
      "Identify lending, collections, and risk management challenges and position EarlySafe as a strategic AI-driven risk infrastructure platform",
      "Develop ROI-focused business cases and commercial proposals aligned with client objectives",
      "Structure enterprise pricing models, multi-year contracts, and scalable commercial frameworks",
      "Own end-to-end deal closure including negotiation, contracting, renewals, and stakeholder alignment",
      "Coordinate with internal product, legal, compliance, and delivery teams to ensure successful onboarding and deployment",
      "Drive account expansion opportunities across portfolios, business units, and geographies to increase recurring revenue",
      "Maintain strong pipeline management, revenue forecasting, and sales reporting discipline",
      "Track BFSI market trends, regulatory developments, and competitor activities to strengthen market positioning",
      "Represent the company in strategic client discussions, networking events, and industry engagements",
      "Collaborate closely with founders and leadership teams on key enterprise opportunities and strategic growth initiatives",
    ],
    requiredExperienceSkills : [
      "Masters degree in Business Administration or Finance",
      "4-8 years BFSI / fintech / enterprise SaaS field sales experience",
      "Proven CXO closure track record",
      "Strong negotiation & deal structuring skills",
      "Comfortable selling complex infrastructure solutions",
      "Understanding of lending, risk, collections & compliance preferred",
      "Excellent executive communication skills ",
    ],
  },
  "AI/ML Developer": {
    aboutRoleIntro: "As an AI/ML Developer at ExperGo, you will contribute to the development of innovative AI-powered applications, intelligent automation systems, and real-time analytics solutions. You will work with advanced technologies including Large Language Models (LLMs), LangChain, Retrieval-Augmented Generation (RAG), Agentic AI, APIs, and PostgreSQL databases.This role offers an exciting opportunity to build practical AI solutions while working at the intersection of Artificial Intelligence, Machine Learning, Full-Stack Development, and Data Engineering",
  
    responsibilities: [
      "Develop and implement AI/ML solutions using Large Language Models (LLMs) for natural language processing, trend analysis, information retrieval, and predictive analytics.",
      "Build AI-driven applications using LangChain and related frameworks to process structured and unstructured data efficiently.",
      "Implement Retrieval-Augmented Generation (RAG) pipelines to enhance the accuracy, relevance, and contextual understanding of AI systems.",
      "Contribute to the development of Agentic AI solutions capable of autonomous reasoning, task execution, and decision support.",
      "Design, develop, and maintain RESTful APIs for seamless integration between AI models, databases, and front-end applications.",
      "Work with PostgreSQL databases for data modeling, storage, querying, optimization, and management.",
      "Collaborate with product, engineering, and business teams to integrate AI capabilities into scalable applications.",
      "Assist in deploying, monitoring, and optimizing AI models and APIs in development and production environments.",
      "Write clean, maintainable, and well-documented code following software engineering best practices.",
      "Participate in research, experimentation, and innovation initiatives focused on improving AI model performance and business outcomes.",
      "Stay updated with emerging AI technologies, frameworks, and industry best practices.",

    ],

    requiredExperienceSkills : [
      "Experience with cloud platforms such as AWS, GCP, or Azure.",
"Exposure to AI application deployment, MLOps, or containerization technologies.",
"Knowledge of vector databases, embeddings, and semantic search techniques.",
"Familiarity with financial services, risk analytics, fraud detection, or compliance-related applications.",
"Personal, academic, or open-source projects involving AI/ML, full-stack development, or API engineering.",
"Experience with Git, GitHub, and collaborative development workflows.",

    ],
  },
  "Content & SEO Marketing Manager": {
    aboutRoleIntro:
      "We are looking for a Content Marketing Analyst who will own end-to-end content strategy and execution across the B2B funnel, enabling ABM, strengthening engagement, and supporting enterprise sales cycles.You will build and manage a full-stack content engine, including:Inbound website and thought leadership content Outbound content such as emailers and newsletters ABM content for target accounts Sales enablement content such as case studies, decks, and collaterals Landing Pages and Blogs Social Media Posts and Campaign Content Strategies(TOFU, MOFU & BOFU) Video and Podcast content",
   
    responsibilities: [
      "Own end-to-end content and SEO strategy across the B2B marketing funnel.",
      "Create and manage high-impact content including blogs, landing pages, website pages, case studies, decks, emailers, newsletters, and social media campaigns.",
      "Drive SEO growth through keyword research, on-page optimization, technical SEO coordination, backlink/content strategies, and organic traffic improvement.",
      "Develop ABM and personalized content for enterprise accounts, buyer personas, and sales journeys.",
      "Support sales enablement with pitch decks, one-pagers, product collaterals, and thought leadership content.",
      "Plan and execute email nurture campaigns and lifecycle marketing journeys.",
      "Optimize website conversion journeys, landing page performance, and lead quality.",
      "Track content, SEO, and campaign performance using analytics dashboards and actionable insights.",
      "Collaborate with sales, product, design, and performance marketing teams to align messaging and growth objectives.",
      "Experiment with content formats, SEO strategies, and engagement campaigns to improve pipeline impact and brand visibility.",
    ],
  },
  "MERN Full Stack Developer": {
    aboutRoleIntro: "As an AI/ML Developer at ExperGo, you will contribute to the development of innovative AI-powered applications, intelligent automation systems, and real-time analytics solutions. You will work with advanced technologies including Large Language Models (LLMs), LangChain, Retrieval-Augmented Generation (RAG), Agentic AI, APIs, and PostgreSQL databases.This role offers an exciting opportunity to build practical AI solutions while working at the intersection of Artificial Intelligence, Machine Learning, Full-Stack Development, and Data Engineering.",

    responsibilities: [
      "Develop and implement AI/ML solutions using Large Language Models (LLMs) for natural language processing, trend analysis, information retrieval, and predictive analytics.",
"Build AI-driven applications using LangChain and related frameworks to process structured and unstructured data efficiently.",
"Implement Retrieval-Augmented Generation (RAG) pipelines to enhance the accuracy, relevance, and contextual understanding of AI systems.",
"Contribute to the development of Agentic AI solutions capable of autonomous reasoning, task execution, and decision support.",
"Design, develop, and maintain RESTful APIs for seamless integration between AI models, databases, and front-end applications.",
"Work with PostgreSQL databases for data modeling, storage, querying, optimization, and management.",
"Collaborate with product, engineering, and business teams to integrate AI capabilities into scalable applications.",
"Assist in deploying, monitoring, and optimizing AI models and APIs in development and production environments.",
"Write clean, maintainable, and well-documented code following software engineering best practices.",
"Participate in research, experimentation, and innovation initiatives focused on improving AI model performance and business outcomes.",
"Stay updated with emerging AI technologies, frameworks, and industry best practices",

    ],

    requiredExperienceSkills:[
      "Experience with cloud platforms such as AWS, GCP, or Azure.",
"Exposure to AI application deployment, MLOps, or containerization technologies.",
"Knowledge of vector databases, embeddings, and semantic search techniques.",
"Familiarity with financial services, risk analytics, fraud detection, or compliance-related applications.",
"Personal, academic, or open-source projects involving AI/ML, full-stack development, or API engineering.",
"Experience with Git, GitHub, and collaborative development workflows.",
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
