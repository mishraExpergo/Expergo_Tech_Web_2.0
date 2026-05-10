"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BookDemoButton } from "@/components/book-demo/BookDemoProvider";

const signalCards = [
  { title: "Signals", text: "Interpreted, not displayed" },
  { title: "Trajectories", text: "Direction over status" },
  { title: "Actions", text: "Linked to outcomes" },
] as const;

const problemPoints = [
  { id: 1, title: "Signals", desc: "Signals are not interpreted" },
  { id: 2, title: "Priorities", desc: "Priorities are wrong" },
  { id: 3, title: "Actions", desc: "Actions don't move outcomes" },
] as const;

const outcomesDelivered = [
  {
    index: "01",
    metric: "20-40%", 
    metricLabel: "increase in pre-bounce recoveries",
    title: "Increase Pre-Bounce Recovery",
    problem:
      "Collections teams act after bounce — when recovery probability is already lower.",
    whatAegisDoes: [
      "Detects payment friction buildup before failure",
      "Identifies accounts likely to bounce 7-15 days in advance",
      "Prioritizes them for early intervention",
    ],
    whyItWorks:
      "Aegis interprets timing drift, mandate failures and behavior patterns — not just missed payments.",
  },
  {
    index: "02",
    metric: "10-25%",
    metricLabel: "reduction in early delinquency (0→30)",
    title: "Reduce 0 → 30 DPD Flow",
    problem: "Most risk becomes visible only after slippage begins.",
    whatAegisDoes: [
      "Identifies accounts deteriorating before DPD movement",
      "Tracks risk momentum, not just status",
      "Enables early intervention before slippage",
    ],
    whyItWorks: "Aegis focuses on direction of risk, not just current bucket.",
  },
  {
    index: "03",
    metric: "15-30%",
    metricLabel: "of future delinquency identified early",
    title: "Detect Hidden Risk Before It Surfaces",
    problem: "A large portion of future NPAs are in 'current' accounts today.",
    whatAegisDoes: [  
      "Bureau stress (utilization, inquiries)",
      "Payment behavior shifts",
      "Engagement signals (intent deterioration)",
    ],
    whyItWorks:
      "Aegis fuses bureau, behavior and engagement into one interpreted picture — not isolated alerts.",
  },
  {
    index: "04",
    metric: "15-25%",
    metricLabel: "improvement in collections efficiency",
    title: "Improve Collections Efficiency",
    problem:
      "Collections teams work on static queues (DPD, overdue) -> low efficiency.",
    whatAegisDoes: [
      "Replaces static queues with dynamic prioritisation",
      "Focuses effort on accounts with highest outcome impact",
    ],
    whyItWorks:
      "Aegis ensures effort is spent where risk is actively building, not where it is already visible.",
  },
  {
    index: "05",
    metric: "30-50%",
    metricLabel: "improvement in agent productivity",
    title: "Increase Agent Productivity & Effectiveness",
    problem:
      "Agents act without context: Call this customer. No clarity on why risk exists",
    whatAegisDoes: [
      "Provides root-cause of risk per account",
      "Combines signals into clear narratives:",
    ],
    whyItWorks: "Agents move from blind outreach -> informed intervention.",
  },
  {
    index: "06",
    metric: "view across cohorts and segments",
    metricLabel: "",
    title: "Enable Better Capital Allocation",
    problem: "Capital allocation is based on historical performance, not forward risk.",
    whatAegisDoes: [
      "Trajectory view across segments",
      "Identifies deteriorating cohorts and hidden stress pockets — geo, builder, segment",
    ],
    whyItWorks: "Aegis shows where risk is going, not where it has been.",
  },
  {
    index: "07",
    metric: "ready, explainable, regulator-aligned",
    metricLabel: "",
    title: "Ensure Audit-Ready, Explainable Decisions",
    problem:
      "Early warning systems often lack explainability, audit trails and regulatory alignment.",
    whatAegisDoes: [
      "Every risk signal is traceable",
      "Every signal is explainable",
      "Consistently interpreted across the portfolio",
    ],
    whyItWorks:
      "Aegis is built as a structured interpretation system, not a black box.",
  },
] as const;

const architecturalChoices = [
  {
    step: "01",
    title: "Multi-Signal Interpretation",
    description:
      "Payment, bureau, engagement and structural signals — interpreted together, never in isolation.",
    icon: "layers",
  },
  {
    step: "02",
    title: "Risk Trajectories",
    description:
      "Tracks how risk evolves over time. Enables intervention before outcomes deteriorate.",
    icon: "branch",
  },
  {
    step: "03",
    title: "Cross-Signal Confidence",
    description:
      "Validates signals across sources so teams act with conviction, not doubt.",
    icon: "check",
  },
  {
    step: "04",
    title: "Direct Link to Action",
    description:
      "Every insight resolves to who, why and what action will measurably change the outcome.",
    icon: "target",
  },
] as const;

const shiftComparison = {
  without: {
    label: "WITHOUT AEGIS",
    items: [
      "Data → dashboards → delayed action",
      "Effort → activity → limited impact",
      "Risk visible only after slippage",
      "Static queues, blind outreach",
    ],
  },
  with: {
    label: "WITH AEGIS",
    items: [
      "Signals → interpretation → trajectories",
      "Actions → prioritised → outcomes shift",
      "Risk surfaced before it surfaces",
      "Dynamic priorities, informed intervention",
    ],
  },
} as const;

function OutcomeSectionChevron({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={13.5}
      height={15.59}
      viewBox="0 0 13.5 15.59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <polygon points="13.5,7.795 0,0 0,15.59" fill="#0B64F4" />
    </svg>
  );
}

function ArchitecturalChoiceIcon({ name }: { name: (typeof architecturalChoices)[number]["icon"] }) {
  const stroke = "stroke-[#007AFF]";
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
      {name === "layers" ? (
        <>
          <path
            className={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4 20 9 12 14 4 9 12 4Z"
          />
          <path className={stroke} strokeWidth="1.5" strokeLinecap="round" d="M4 11 12 16 20 11" />
          <path className={stroke} strokeWidth="1.5" strokeLinecap="round" d="M4 14 12 19 20 14" />
        </>
      ) : name === "branch" ? (
        <path
          className={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 5v7M12 12 8 19M12 12 16 19"
        />
      ) : name === "check" ? (
        <>
          <path
            className={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          />
          <path
            className={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9 12 2 2 4-4"
          />
        </>
      ) : (
        <>
          <circle cx="12" cy="12" r="9" className={stroke} strokeWidth="1.5" />
          <circle cx="12" cy="12" r="5.5" className={stroke} strokeWidth="1.5" />
          <circle cx="12" cy="12" r="2" className={stroke} strokeWidth="1.5" />
        </>
      )}
    </svg>
  );
}

const motionEase = [0.22, 1, 0.36, 1] as const;

const architecturalOlVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.44 },
  },
} as const;

const architecturalStepLiVariants = {
  hidden: (colIndex: number) => ({
    opacity: 0,
    y: 28,
    x: colIndex % 2 === 0 ? -18 : 18,
  }),
  visible: () => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      mass: 0.88,
      staggerChildren: 0.11,
      delayChildren: 0.03,
    },
  }),
};

const architecturalStepIconVariants = {
  hidden: { opacity: 0, scale: 0.58, rotate: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 430, damping: 19 },
  },
} as const;

const architecturalStepIconGlyphVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: motionEase, delay: 0.05 },
  },
} as const;

const architecturalStepLabelVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.46, ease: motionEase },
  },
} as const;

const architecturalStepTitleVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.52, ease: motionEase },
  },
} as const;

const architecturalStepDescVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.58, ease: motionEase },
  },
} as const;

const shiftListParent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const shiftListItem = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: motionEase },
  },
};

const whatAegisListParent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.08 },
  },
};

const whatAegisListItemVariants = {
  hidden: { opacity: 0, y: 22, x: -12, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: motionEase },
  },
  hover: {
    x: 5,
    y: -2,
    transition: { type: "spring", stiffness: 420, damping: 28 },
  },
} as const;

const whatAegisListIndexVariants = {
  hidden: { scale: 0.88, x: -8 },
  visible: {
    scale: 1,
    x: 0,
    transition: { duration: 0.48, ease: motionEase },
  },
  hover: {
    scale: 1.08,
    x: 2,
    transition: { type: "spring", stiffness: 500, damping: 22 },
  },
} as const;

const GRID_TILE = 32;
const GRID_BASE =
  "linear-gradient(to right, rgb(226 232 240) 1px, transparent 1px), linear-gradient(to bottom, rgb(226 232 240) 1px, transparent 1px)";
const GRID_ACCENT =
  "linear-gradient(to right, rgb(148 163 184) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184) 1px, transparent 1px)";

export function AegisPageContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const outcomeArticleRefs = useRef<(HTMLElement | null)[]>([]);
  const [pointer, setPointer] = useState({ xPct: 50, yPct: 45 });
  const [activeSignal, setActiveSignal] = useState<(typeof signalCards)[number]["title"]>("Signals");
  const [activePoint, setActivePoint] = useState<(typeof problemPoints)[number]["id"]>(1);
  const [activeOutcomeIndex, setActiveOutcomeIndex] = useState<(typeof outcomesDelivered)[number]["index"]>(
    outcomesDelivered[0]!.index,
  );
  const outcomeScrollRaf = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const shouldReduce = Boolean(reduceMotion);

  const onPointerMove = useCallback((e: ReactPointerEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const xPct = ((e.clientX - r.left) / Math.max(r.width, 1)) * 100;
    const yPct = ((e.clientY - r.top) / Math.max(r.height, 1)) * 100;
    setPointer({ xPct, yPct });
  }, []);

  const onPointerLeave = useCallback(() => {
    setPointer({ xPct: 50, yPct: 45 });
  }, []);

  const updateActiveOutcomeBlock = useCallback(() => {
    const vh = window.innerHeight;
    const markerY = vh * 0.36;
    let bestIdx = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    outcomesDelivered.forEach((_, i) => {
      const el = outcomeArticleRefs.current[i];
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 72 || r.top > vh - 48) return;
      const center = r.top + r.height / 2;
      const dist = Math.abs(center - markerY);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });
    const next = outcomesDelivered[bestIdx]?.index;
    if (next) setActiveOutcomeIndex((prev) => (prev === next ? prev : next));
  }, []);

  useLayoutEffect(() => {
    const onScroll = () => {
      if (outcomeScrollRaf.current != null) return;
      outcomeScrollRaf.current = window.requestAnimationFrame(() => {
        outcomeScrollRaf.current = null;
        updateActiveOutcomeBlock();
      });
    };
    updateActiveOutcomeBlock();
    const rafBoot = window.requestAnimationFrame(() => {
      updateActiveOutcomeBlock();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(rafBoot);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (outcomeScrollRaf.current != null) {
        window.cancelAnimationFrame(outcomeScrollRaf.current);
        outcomeScrollRaf.current = null;
      }
    };
  }, [updateActiveOutcomeBlock]);

  return (
    <main className="bg-white text-[#101828]">
      <section
        ref={sectionRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative overflow-hidden px-4 pb-12 pt-14 sm:px-6 lg:px-8"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 select-none">
          <div className="absolute inset-0 bg-white" />
          <div
            className="absolute inset-0 opacity-[0.65]"
            style={{
              backgroundImage: GRID_BASE,
              backgroundSize: `${GRID_TILE}px ${GRID_TILE}px`,
            }}
          />
          <div
            className="absolute inset-0 will-change-[mask-image]"
            style={{
              backgroundImage: GRID_ACCENT,
              backgroundSize: `${GRID_TILE}px ${GRID_TILE}px`,
              opacity: 0.3,
              maskImage: `radial-gradient(ellipse min(520px, 55vw) min(420px, 48vh) at ${pointer.xPct}% ${pointer.yPct}%, #000 0%, transparent 72%)`,
              WebkitMaskImage: `radial-gradient(ellipse min(520px, 55vw) min(420px, 48vh) at ${pointer.xPct}% ${pointer.yPct}%, #000 0%, transparent 72%)`,
            }}
          />
          <div
            className="absolute inset-0 transition-[background] duration-200 ease-out"
            style={{
              background: `radial-gradient(ellipse min(480px, 50vw) min(380px, 45vh) at ${pointer.xPct}% ${pointer.yPct}%, rgba(21, 181, 193, 0.11) 0%, transparent 68%)`,
            }}
          />
        </div>

        <div className="mx-auto max-w-6xl">
          <motion.div
            className="relative z-10 max-w-3xl"
            initial={shouldReduce ? undefined : { opacity: 0, y: 14 }}
            whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="md:text-[52px] text-[32px] font-semibold leading-[1.1] text-[#101828]">
              Risk doesn't need better visibility.
              <br />
              It needs{" "}
              <motion.span
                className="inline-block text-[#17B2C3]"
                initial={shouldReduce ? undefined : { opacity: 0, y: 10 }}
                whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.9 }}
                transition={{ duration: 0.55, ease: motionEase, delay: 0.08 }}
              >
                better outcomes.
              </motion.span>
            </h1>
            <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-[#667085] sm:text-[20px]">
              Most portfolios don't fail from lack of data. They fail because signals are misread,
              priorities are wrong, and actions don't move outcomes. Aegis fixes this at the source.
            </p>
            <BookDemoButton
              mode="brief"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-linear-to-l from-[#0B64F4] to-[#0BABCB] px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:opacity-95 active:translate-y-0 active:scale-[0.99]"
            >
              Book a Demo
            </BookDemoButton>
          </motion.div>

          <motion.div
            className="relative z-10 mt-10 grid gap-2 rounded-xl border border-[#E4E7EC] bg-[#F8FAFC] p-2 md:grid-cols-3"
            initial={shouldReduce ? undefined : { opacity: 0, y: 10 }}
            whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
          >
            {signalCards.map((card, index) => (
              <motion.div
                key={card.title}
                className={`group relative cursor-pointer overflow-hidden rounded-lg border px-4 py-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-300 ${
                  activeSignal === card.title
                    ? "border-[#1AAFC0] bg-[#F4FCFD] shadow-[0_14px_28px_-14px_rgba(26,175,192,0.55)]"
                    : "border-[#EAECF0] bg-white hover:border-[#A3DEE5] hover:shadow-[0_10px_24px_-16px_rgba(16,24,40,0.35)]"
                }`}
                initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
                whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                whileHover={shouldReduce ? undefined : { y: -3, scale: 1.01 }}
                animate={
                  shouldReduce || activeSignal !== card.title
                    ? undefined
                    : {
                        boxShadow: [
                          "0 14px 28px -14px rgba(26,175,192,0.45)",
                          "0 18px 32px -14px rgba(26,175,192,0.58)",
                          "0 14px 28px -14px rgba(26,175,192,0.45)",
                        ],
                      }
                }
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  opacity: { duration: 0.35, delay: shouldReduce ? 0 : index * 0.06 },
                  y: { duration: 0.35, delay: index * 0.06 },
                  boxShadow: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                }}
                onMouseEnter={() => setActiveSignal(card.title)}
                onFocusCapture={() => setActiveSignal(card.title)}
                onClick={() => setActiveSignal(card.title)}
                role="button"
                tabIndex={0}
              >
                <div
                  className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ${
                    activeSignal === card.title ? "opacity-100" : "group-hover:opacity-100"
                  }`}
                  style={{
                    background:
                      "radial-gradient(ellipse 75% 95% at 50% 0%, rgba(26,175,192,0.16) 0%, rgba(26,175,192,0.03) 55%, transparent 100%)",
                  }}
                />
                <div className="relative z-10 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1D68D5]">
                      {card.title}
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#101828]">{card.text}</p>
                  </div>
                  <motion.span
                    className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                      activeSignal === card.title ? "bg-[#18B4C5]" : "bg-[#D0D5DD]"
                    }`}
                    animate={
                      shouldReduce || activeSignal !== card.title
                        ? undefined
                        : { scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }
                    }
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-linear-to-r from-[#0B64F4] to-[#0BABCB]"
                  initial={false}
                  animate={{ width: activeSignal === card.title ? "100%" : "0%" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.p
            className="text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1D68D5]"
            initial={shouldReduce ? undefined : { opacity: 0 }}
            whileInView={shouldReduce ? undefined : { opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.35 }}
          >
            The Problem
          </motion.p>
          <motion.h2
            className="mx-auto mt-4 max-w-4xl text-center md:text-[52px] text-[32px] font-semibold leading-[1.1] text-[#101828]"
            initial={shouldReduce ? undefined : { opacity: 0, y: 12 }}
            whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Early signals exist. Teams act. Yet{" "}
            <span className="text-[#16B2C3]">outcomes don't move.</span>
          </motion.h2>

          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1.05fr_1fr]">
            <motion.div
              className="rounded-2xl border border-[#E4E7EC] bg-white p-6 md:p-7"
              initial={shouldReduce ? undefined : { opacity: 0, x: -18 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
            >
              <p className="max-w-[420px] text-sm leading-relaxed text-[#98A2B3] sm:text-base">
                Delinquency persists. Roll-forward continues. Losses recur. Not because data is
                missing - but because the chain from signal to outcome is broken.
              </p>

              <div className="mt-6 space-y-4">
                {problemPoints.map((point, index) => (
                  <motion.div
                    key={point.id}
                    initial={shouldReduce ? undefined : { opacity: 0, x: 50 }}
                    whileInView={shouldReduce ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.45,
                      delay: shouldReduce ? 0 : index * 0.12,
                      type: "spring",
                      stiffness: 60,
                    }}
                    className={`relative rounded-xl border-2  p-4 shadow-[0_2px_14px_rgba(15,23,42,0.06)] transition-[border-color,box-shadow,background-color] duration-200 md:border-none md:bg-transparent md:p-4 md:shadow-none md:hover:bg-transparent md:hover:shadow-none ${
                      activePoint === point.id
                        ? "border-[#01AEE4] bg-[#F6FBFF] shadow-[0_14px_40px_-12px_rgba(1,174,228,0.28)]"
                        : "border-[#01AEE4]/35 bg-white hover:border-[#01AEE4] hover:bg-[#F6FBFF] hover:shadow-[0_14px_40px_-12px_rgba(1,174,228,0.28)]"
                    }`}
                    onMouseEnter={() => setActivePoint(point.id)}
                    onFocusCapture={() => setActivePoint(point.id)}
                    onClick={() => setActivePoint(point.id)}
                    role="button"
                    tabIndex={0}
                  >
                    <img
                src="/line.svg"
                alt=""
                aria-hidden="true"
                className=" hidden md:block pointer-events-none absolute left-[75px]   w-[450px] opacity-100 z-0"
              />

                    <div className="relative z-10 flex items-start gap-3 sm:gap-4 md:gap-5">
                      <span
                        className="select-none text-4xl font-bold leading-none tabular-nums text-gray-300 sm:text-5xl md:text-6xl"
                        aria-hidden
                      >
                        {point.id}
                      </span>
                      <div className="min-w-0 flex-1 flex flex-col pt-0.5">
                        <h3 className="mb-1 inline-block w-fit text-[18px] font-semibold tracking-wide text-[#01AEE4]">
                          {point.title}
                        </h3>
                        <p className="text-sm font-medium leading-relaxed text-[#667085]">
                          {point.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="relative flex items-center justify-center">
              {!shouldReduce && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="pointer-events-none absolute rounded-full border border-cyan-300/30"
                      style={{ width: `${70 + i * 18}%`, height: `${70 + i * 18}%` }}
                      animate={{ scale: [1, 1.07, 1], opacity: [0.12, 0.26, 0.12] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </>
              )}

              <motion.div
                className="relative z-10 flex items-center rounded-[10px] bg-[#173F63] p-7 shadow-[0_12px_32px_rgba(15,23,42,0.22)] md:p-9"
                style={{
                  background:
                    "linear-gradient(152deg, #193F62 0%, #173A59 52%, #183A58 100%)",
                }}
                initial={shouldReduce ? undefined : { opacity: 0, x: 18, scale: 0.98 }}
                whileInView={
                  shouldReduce
                    ? undefined
                    : { opacity: 1, x: 0, scale: [1, 1.012, 1] }
                }
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  opacity: { duration: 0.5 },
                  x: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  scale: shouldReduce
                    ? { duration: 0.5 }
                    : { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
                }}
                whileHover={shouldReduce ? undefined : { y: -3, scale: 1.02 }}
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[10px]">
                  <motion.div
                    className="absolute inset-y-0 -left-1/2 w-1/2 bg-linear-to-r from-transparent via-white/10 to-transparent"
                    animate={
                      shouldReduce
                        ? undefined
                        : {
                            x: ["-30%", "210%"],
                            opacity: [0, 0.55, 0],
                          }
                    }
                    transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  />
                  <motion.div
                    className="absolute -top-24 -right-20 h-52 w-52 rounded-full bg-[#25B8C8]/15 blur-3xl"
                    animate={
                      shouldReduce
                        ? undefined
                        : { x: [0, -10, 0], y: [0, 8, 0], opacity: [0.45, 0.7, 0.45] }
                    }
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute -bottom-16 -left-20 h-44 w-44 rounded-full bg-[#0B64F4]/12 blur-3xl"
                    animate={
                      shouldReduce
                        ? undefined
                        : { x: [0, 12, 0], y: [0, -6, 0], opacity: [0.35, 0.55, 0.35] }
                    }
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  />
                </div>
                <p className="relative z-10 pt-8 text-[20px] font-semibold leading-[1.22] text-white md:pt-9 md:text-[42px]">
                  Aegis is the interpretation layer that converts signals into clear risk states,
                  forward{" "}
                  <motion.span
                    className={activePoint === 2 ? "text-[#2FC6D4]" : "text-[#B9CEDF]"}
                    animate={
                      shouldReduce || activePoint !== 2
                        ? undefined
                        : { opacity: [0.75, 1, 0.75] }
                    }
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    trajectories
                  </motion.span>{" "}
                  and actionable{" "}
                  <motion.span
                    className={activePoint === 3 ? "text-[#2FC6D4]" : "text-[#B9CEDF]"}
                    animate={
                      shouldReduce || activePoint !== 3
                        ? undefined
                        : { opacity: [0.75, 1, 0.75] }
                    }
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    priorities.
                  </motion.span>
                </p>
                <motion.span
                  className={`absolute left-6 top-5 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] ${
                    activePoint === 1
                      ? "border-[#2FC6D4]/70 bg-[#2FC6D4]/15 text-[#A5EFF7]"
                      : "border-white/20 bg-white/5 text-white/70"
                  }`}
                  animate={
                    shouldReduce || activePoint !== 1
                      ? undefined
                      : { boxShadow: ["0 0 0 rgba(47,198,212,0)", "0 0 18px rgba(47,198,212,0.4)", "0 0 0 rgba(47,198,212,0)"] }
                  }
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  RISK STATES
                </motion.span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-t border-[#E4E7EC] bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
        aria-labelledby="outcomes-delivered-heading"
      >
        <div className="mx-auto max-w-6xl">
          <motion.p
            className="text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-[#98A2B3]"
            initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
            whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4 }}
          >
            Outcomes delivered
          </motion.p>
          <motion.h2
            id="outcomes-delivered-heading"
            className="mx-auto mt-4 max-w-3xl text-center text-[32px] font-semibold leading-[1.12] text-[#101828] md:text-[44px] md:leading-[1.1]"
            initial={shouldReduce ? undefined : { opacity: 0, y: 12 }}
            whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Seven shifts.{" "}
            <motion.span
              className="inline-block text-[#0066FF]"
              initial={shouldReduce ? undefined : { opacity: 0, scale: 0.92 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              animate={
                shouldReduce
                  ? undefined
                  : {
                      scale: [1, 1.04, 1],
                    }
              }
              transition={{
                opacity: { duration: 0.5, ease: motionEase },
                scale: { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.45 },
              }}
            >
              Measurable.
            </motion.span>
          </motion.h2>
          <motion.p
            className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-[#667085] sm:text-base"
            initial={shouldReduce ? undefined : { opacity: 0 }}
            whileInView={shouldReduce ? undefined : { opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            Each outcome traces back to the same architectural choice: interpretation over display.
          </motion.p>

          <div className="mt-12 space-y-16 md:mt-14 md:space-y-20 lg:mt-16 lg:space-y-24">
            {outcomesDelivered.map((row, rowIndex) => {
              const figmaOrangeBand = row.index === "04" || row.index === "05";
              const figmaAltBand = row.index === "06" || row.index === "07";
              const plainWhyRow = figmaOrangeBand;
              const italicWhyRow = figmaAltBand;

              const outcomeSectionLabel = (label: string) => (
                <p className="group/label flex cursor-default flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#101828]">
                  <OutcomeSectionChevron className="shrink-0 transition-transform duration-200 ease-out group-hover/label:translate-x-0.5" />
                  <span>{label}</span>
                </p>
              );

              const isActiveOutcome = activeOutcomeIndex === row.index;

              return (
                <article
                  key={row.index}
                  ref={(el) => {
                    outcomeArticleRefs.current[rowIndex] = el;
                  }}
                  data-outcome-index={row.index}
                  className="relative scroll-mt-28 lg:scroll-mt-32"
                >
                  <motion.div
                    className="grid gap-10 pb-2 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0 xl:gap-x-14 lg:pb-4"
                    initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
                    whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.5,
                      delay: shouldReduce ? 0 : Math.min(rowIndex * 0.06, 0.35),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <motion.div
                      className={[
                        "lg:col-span-4 lg:sticky lg:top-24 lg:z-10 lg:self-start",
                        shouldReduce
                          ? ""
                          : "lg:transition-opacity lg:duration-500 lg:ease-[cubic-bezier(0.33,1,0.32,1)]",
                        shouldReduce || isActiveOutcome
                          ? "opacity-100 lg:translate-y-0"
                          : "opacity-100 lg:translate-y-0 lg:opacity-[0.45]",
                      ].join(" ")}
                    >
                      <motion.div
                        className="relative isolate overflow-hidden rounded-2xl bg-[#F4F6F9] px-5 pb-5 pt-5 pr-8 shadow-[0_1px_2px_rgba(16,24,40,0.05),0_12px_28px_-16px_rgba(16,24,40,0.08)] md:rounded-[14px] md:px-6 md:pb-6 md:pt-6 md:pr-10"
                        initial={shouldReduce ? undefined : { opacity: 0, scale: 0.97, y: 8 }}
                        whileInView={shouldReduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
                        whileHover={
                          shouldReduce
                            ? undefined
                            : {
                                scale: 1.02,
                                boxShadow:
                                  "0 1px 2px rgba(16,24,40,0.06), 0 18px 36px -14px rgba(11,100,244,0.14)",
                              }
                        }
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                          duration: 0.48,
                          ease: motionEase,
                          delay: shouldReduce ? 0 : 0.06,
                        }}
                      >
                        <motion.span
                          className={
                            figmaAltBand
                              ? "pointer-events-none absolute right-2 top-2 z-0 max-w-[38%] select-none text-right font-sans text-2xl font-light tabular-nums leading-none tracking-normal text-[#555D6D33] md:right-3 md:top-3 md:text-3xl"
                              : "pointer-events-none absolute right-2 top-2 z-0 max-w-[40%] select-none text-right font-sans text-3xl font-light tabular-nums leading-none tracking-normal text-[#555D6D33] md:right-3 md:top-3 md:text-4xl"
                          }
                          initial={shouldReduce ? undefined : { opacity: 0, x: 14 }}
                          whileInView={shouldReduce ? undefined : { opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{
                            duration: 0.42,
                            ease: motionEase,
                            delay: shouldReduce ? 0 : 0.12,
                          }}
                          aria-hidden
                        >
                          {row.index}
                        </motion.span>
                        <motion.div
                          className="relative z-10 max-w-[min(100%,calc(100%-3.25rem))] md:max-w-[min(100%,calc(100%-3.75rem))]"
                          initial={shouldReduce ? undefined : { opacity: 0, y: 12 }}
                          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{
                            duration: 0.45,
                            ease: motionEase,
                            delay: shouldReduce ? 0 : 0.18,
                          }}
                        >
                          {figmaOrangeBand ? (
                            <>
                              <p className="text-[32px] font-bold tabular-nums leading-[1.05] tracking-tight text-[#0066FF] md:text-[38px]">
                                {row.metric}
                              </p>
                              {row.metricLabel ? (
                                <p className="mt-2.5 max-w-full text-sm font-normal leading-relaxed text-[#101828] md:mt-3">
                                  {row.metricLabel}
                                </p>
                              ) : null}
                            </>
                          ) : figmaAltBand ? (
                            <p className="text-[14px] font-normal leading-relaxed text-[#101828] md:text-[15px]">
                              {row.metric}
                            </p>
                          ) : (
                            <>
                              <p className="text-[32px] font-bold tabular-nums leading-[1.05] tracking-tight text-[#0066FF] md:text-[38px]">
                                {row.metric}
                              </p>
                              {row.metricLabel ? (
                                <p className="mt-2.5 max-w-full text-sm font-normal leading-relaxed text-[#101828] md:mt-3">
                                  {row.metricLabel}
                                </p>
                              ) : null}
                            </>
                          )}
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    <div className="border-[#D6E4FA] lg:col-span-8 lg:border-l lg:pl-8 xl:pl-10">
                      <motion.h3
                        className="font-heading text-[22px] font-semibold leading-[1.25] tracking-tight text-[#0B64F4] md:text-[26px]"
                        initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
                        whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.4, ease: motionEase }}
                      >
                        {row.title}
                      </motion.h3>

                      <div className="mt-8 space-y-0">
                        <motion.div
                          initial={shouldReduce ? undefined : { opacity: 0, y: 14 }}
                          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.35 }}
                          transition={{ duration: 0.48, ease: motionEase }}
                        >
                          {outcomeSectionLabel("Problem")}
                          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#667085] md:text-base">
                            {row.problem}
                          </p>
                        </motion.div>

                        <motion.div
                          className="mt-10 border-t border-[#E4E7EC] pt-10"
                          initial={shouldReduce ? undefined : { opacity: 0, y: 14 }}
                          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.25 }}
                          transition={{
                            duration: 0.48,
                            ease: motionEase,
                            delay: shouldReduce ? 0 : 0.04,
                          }}
                        >
                          {outcomeSectionLabel("What Aegis does")}
                          <motion.ul
                            role="list"
                            className="mt-5 space-y-0"
                            {...(shouldReduce
                              ? {}
                              : {
                                  variants: whatAegisListParent,
                                  initial: "hidden" as const,
                                  whileInView: "visible" as const,
                                })}
                            viewport={{ once: true, amount: 0.2 }}
                          >
                            {row.whatAegisDoes.map((line, i) => (
                              <motion.li
                                key={i}
                                className={[
                                  "group/line relative flex cursor-default gap-4 overflow-hidden rounded-lg py-1 pl-3 md:gap-5 md:pl-4 md:pr-1",
                                  "transition-[background-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                  shouldReduce ? "" : "hover:bg-[rgba(0,102,255,0.06)] hover:shadow-[inset_3px_0_0_0_rgba(11,100,244,0.35)]",
                                ].join(" ")}
                                {...(shouldReduce ? {} : { variants: whatAegisListItemVariants })}
                                whileHover={shouldReduce ? undefined : "hover"}
                              >
                                {shouldReduce ? (
                                  <span className="inline-flex min-w-[1.625rem] shrink-0 items-center justify-start pt-0.5 font-mono text-[12px] font-normal tabular-nums leading-none tracking-normal text-[#98A2B3] antialiased md:min-w-[1.75rem] md:text-[13px]">
                                    {String(i + 1).padStart(2, "0")}
                                  </span>
                                ) : (
                                  <motion.span
                                    className="inline-flex min-w-[1.625rem] shrink-0 items-center justify-start pt-0.5 font-mono text-[12px] font-normal tabular-nums leading-none tracking-normal text-[#98A2B3] antialiased transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/line:text-[#0B64F4] md:min-w-[1.75rem] md:text-[13px]"
                                    variants={whatAegisListIndexVariants}
                                  >
                                    {String(i + 1).padStart(2, "0")}
                                  </motion.span>
                                )}
                                {shouldReduce ? (
                                  <p
                                    className={[
                                      "min-w-0 flex-1 border-b pb-4 text-[15px] leading-relaxed text-[#101828] md:pb-5 md:text-base",
                                      "border-[#E4E7EC]",
                                    ].join(" ")}
                                  >
                                    {line}
                                  </p>
                                ) : (
                                  <motion.p
                                    className={[
                                      "min-w-0 flex-1 border-b pb-4 text-[15px] leading-relaxed text-[#101828] md:pb-5 md:text-base",
                                      "border-[#E4E7EC] transition-[border-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                      "group-hover/line:border-[#0066FF]/45 group-hover/line:text-[#0F172A]",
                                    ].join(" ")}
                                    variants={{
                                      hidden: { opacity: 1, x: 0 },
                                      visible: { opacity: 1, x: 0 },
                                      hover: {
                                        x: 3,
                                        transition: { type: "spring", stiffness: 380, damping: 26 },
                                      },
                                    }}
                                  >
                                    {line}
                                  </motion.p>
                                )}
                              </motion.li>
                            ))}
                          </motion.ul>
                        </motion.div>

                        <motion.div
                          className="mt-10 border-t border-[#E4E7EC] pt-10"
                          initial={shouldReduce ? undefined : { opacity: 0, y: 14 }}
                          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.35 }}
                          transition={{
                            duration: 0.48,
                            ease: motionEase,
                            delay: shouldReduce ? 0 : 0.06,
                          }}
                        >
                          {outcomeSectionLabel("Why it works")}
                          <p
                            className={
                              plainWhyRow
                                ? "mt-4 max-w-2xl text-[15px] font-normal italic leading-relaxed text-[#667085] md:text-base"
                                : italicWhyRow
                                  ? "mt-4 max-w-2xl text-[15px] font-normal italic leading-relaxed text-[#667085] md:text-base"
                                  : "mt-4 max-w-2xl text-[15px] font-medium italic leading-relaxed text-[#667085] md:text-base"
                            }
                          >
                            {plainWhyRow || italicWhyRow ? row.whyItWorks : <>“{row.whyItWorks}”</>}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="border-t border-[#E2E8F0] bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-40"
        aria-labelledby="architectural-choices-heading"
      >
        <div className="mx-auto max-w-6xl">
          <motion.p
            className="text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-[#007AFF]"
            initial={
              shouldReduce
                ? undefined
                : { opacity: 0, y: 12, filter: "blur(8px)", scale: 0.96 }
            }
            whileInView={
              shouldReduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
            }
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.52, ease: motionEase }}
          >
            What Makes These Outcomes Possible
          </motion.p>
          <motion.h2
            id="architectural-choices-heading"
            className="mx-auto mt-4 max-w-4xl text-center text-[28px] font-semibold leading-[1.15] text-[#000000] md:text-[40px] md:leading-[1.12]"
            initial={shouldReduce ? undefined : { opacity: 0, y: 18, scale: 0.97 }}
            whileInView={shouldReduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.58,
              ease: motionEase,
              delay: shouldReduce ? 0 : 0.08,
            }}
          >
            Four Architectural choices that change everything downstream
          </motion.h2>

          <div className="relative mx-auto mt-16 max-w-5xl md:mt-20 lg:mt-24">
            {shouldReduce ? (
              <div
                className="pointer-events-none absolute left-[10%] right-[10%] top-[27px] z-0 hidden h-px bg-[#E2E8F0] lg:block"
                aria-hidden
              />
            ) : (
              <motion.div
                className="pointer-events-none absolute left-[10%] right-[10%] top-[27px] z-0 hidden h-px origin-left bg-[#E2E8F0] lg:block"
                aria-hidden
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.28 }}
                transition={{ duration: 0.92, ease: motionEase, delay: 0.04 }}
              />
            )}
            <motion.ol
              className="relative z-10 grid list-none gap-14 pl-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
              {...(shouldReduce
                ? {}
                : {
                    variants: architecturalOlVariants,
                    initial: "hidden" as const,
                    whileInView: "visible" as const,
                  })}
              viewport={{ once: true, amount: 0.22 }}
            >
              {architecturalChoices.map((item, colIndex) => (
                <motion.li
                  key={item.step}
                  custom={colIndex}
                  className="flex flex-col items-center text-center"
                  {...(shouldReduce ? {} : { variants: architecturalStepLiVariants })}
                  whileHover={shouldReduce ? undefined : { y: -6 }}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                >
                  <motion.div
                    className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#007AFF] bg-[#FFFFFF] shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
                    {...(shouldReduce ? {} : { variants: architecturalStepIconVariants })}
                    whileHover={
                      shouldReduce
                        ? undefined
                        : {
                            scale: 1.09,
                            boxShadow: "0 10px 28px -6px rgba(0,122,255,0.38)",
                          }
                    }
                    whileTap={shouldReduce ? undefined : { scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  >
                    <motion.span
                      className="inline-flex"
                      {...(shouldReduce ? {} : { variants: architecturalStepIconGlyphVariants })}
                    >
                      <ArchitecturalChoiceIcon name={item.icon} />
                    </motion.span>
                  </motion.div>
                  <motion.p
                    className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4FD1C5]"
                    {...(shouldReduce ? {} : { variants: architecturalStepLabelVariants })}
                  >
                    STEP {item.step}
                  </motion.p>
                  <motion.h3
                    className="mt-2 text-base font-semibold text-[#000000] md:text-lg"
                    {...(shouldReduce ? {} : { variants: architecturalStepTitleVariants })}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p
                    className="mt-2 max-w-[260px] text-sm leading-relaxed text-[#4A5568] md:text-[15px]"
                    {...(shouldReduce ? {} : { variants: architecturalStepDescVariants })}
                  >
                    {item.description}
                  </motion.p>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </section>

      <section
        className="bg-white px-4 pb-20 pt-4 sm:px-6 lg:px-8 lg:pb-24"
        aria-labelledby="the-shift-heading"
      >
        <div className="mx-auto max-w-6xl">
          <motion.p
            className="text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0066FF]"
            initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
            whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4 }}
          >
            THE SHIFT
          </motion.p>
          <motion.h2
            id="the-shift-heading"
            className="mx-auto mt-4 text-center text-[32px] font-semibold leading-[1.12] text-[#101828] md:text-[44px]"
            initial={shouldReduce ? undefined : { opacity: 0, y: 12 }}
            whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Before Aegis.{" "}
            <motion.span
              className="inline-block text-[#0066FF]"
              initial={shouldReduce ? undefined : { opacity: 0, scale: 0.9, rotate: -3 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ type: "spring", stiffness: 420, damping: 24, delay: shouldReduce ? 0 : 0.12 }}
            >
              After.
            </motion.span>
          </motion.h2>

          <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
            <motion.div
              className="rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-7"
              initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
              whileHover={
                shouldReduce
                  ? undefined
                  : { y: -4, boxShadow: "0 16px 40px -18px rgba(16,24,40,0.12)" }
              }
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-[#98A2B3]">
                {shiftComparison.without.label}
              </p>
              <motion.ul
                className="mt-6 space-y-4"
                role="list"
                {...(shouldReduce
                  ? {}
                  : {
                      variants: shiftListParent,
                      initial: "hidden" as const,
                      whileInView: "visible" as const,
                    })}
                viewport={{ once: true, amount: 0.35 }}
              >
                {shiftComparison.without.items.map((line) => (
                  <motion.li
                    key={line}
                    className="flex gap-3 text-left"
                    {...(shouldReduce ? {} : { variants: shiftListItem })}
                    whileHover={shouldReduce ? undefined : { x: 4 }}
                    transition={{ type: "spring", stiffness: 380, damping: 26 }}
                  >
                    <span
                      className="mt-[0.65rem] h-px w-4 shrink-0 bg-[#98A2B3]"
                      aria-hidden
                    />
                    <span className="text-[15px] leading-relaxed text-[#667085]">{line}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              className="rounded-2xl border-2 border-[#0066FF] bg-white p-6 shadow-[0_1px_2px_rgba(0,102,255,0.08)] sm:p-7"
              initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
              whileHover={
                shouldReduce
                  ? undefined
                  : {
                      y: -5,
                      scale: 1.01,
                      boxShadow: "0 20px 48px -16px rgba(0,102,255,0.28)",
                    }
              }
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: shouldReduce ? 0 : 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0066FF]">
                {shiftComparison.with.label}
              </p>
              <motion.ul
                className="mt-6 space-y-4"
                role="list"
                {...(shouldReduce
                  ? {}
                  : {
                      variants: shiftListParent,
                      initial: "hidden" as const,
                      whileInView: "visible" as const,
                    })}
                viewport={{ once: true, amount: 0.35 }}
              >
                {shiftComparison.with.items.map((line) => (
                  <motion.li
                    key={line}
                    className="flex gap-3 text-left"
                    {...(shouldReduce ? {} : { variants: shiftListItem })}
                    whileHover={shouldReduce ? undefined : { x: 6 }}
                    transition={{ type: "spring", stiffness: 380, damping: 26 }}
                  >
                    <span
                      className="mt-[0.65rem] h-px w-4 shrink-0 bg-[#0066FF]"
                      aria-hidden
                    />
                    <span className="text-[15px] font-medium leading-relaxed text-[#101828]">{line}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
