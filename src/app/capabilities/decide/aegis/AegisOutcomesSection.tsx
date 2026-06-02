"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const viewportReveal = { once: true, amount: 0.15, margin: "-40px 0px" };

const FIGMA = {
  teal: "#15B5C1",
  ink: "#101828",
  muted: "#667085",
  divider: "#E4E7EC",
  progressIdle: "#D0D5DD",
  kicker: "#1677FF",
} as const;

const outcomes = [
  {
    title: "Unified Visibility",
    tag: "Predictive Base",
    description: "Bring relevant borrower signals into one structured view.",
  },
  {
    title: "Better Interpretation",
    tag: "Predictive Base",
    description: "Understand behaviour through context, pattern and sequence.",
  },
  {
    title: "Stronger Alignment",
    tag: "Predictive Base",
    description: "Create a shared language across Risk,Collections, Credit and Underwriting.",
  },
  {
    title: "Earlier Pattern Recognition",
    tag: "Predictive Base",
    description: "Identify behavioural shifts as they begin to form..",
  },
  {
    title: "Improved Decision Quality",
    tag: "Predictive Base",
    description: "Support decisions with richer account and segment context.",
  },
  {
    title: "Foundation for Prediction",
    tag: "Predictive Base",
    description: "Prepare structured intelligence for Athena’s predictive layer.",
  },
] as const;

const TOTAL = outcomes.length;

function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function ProgressSegments({
  activeIndex,
  className = "",
}: {
  activeIndex: number;
  className?: string;
}) {
  return (
    <div className={`flex gap-1.5 sm:gap-2 ${className}`} role="tablist" aria-label="Outcome progress">
      {outcomes.map((item, index) => (
        <div
          key={item.title}
          role="presentation"
          className="h-[3px] min-w-0 flex-1 rounded-full transition-colors duration-300"
          style={{
            backgroundColor: index === activeIndex ? FIGMA.teal : FIGMA.progressIdle,
          }}
        />
      ))}
    </div>
  );
}

function DetailContent({ index }: { index: number }) {
  const item = outcomes[index];

  return (
    <>
      <p
        className="font-heading text-lg font-bold leading-tight tracking-tight sm:text-xl sm:leading-tight"
        style={{ color: FIGMA.ink }}
      >
        {item.tag}
      </p>
      <p className="mt-2 font-heading text-xl font-bold tracking-tight sm:mt-3 sm:text-2xl">
        <span style={{ color: FIGMA.teal }}>{formatIndex(index)}</span>
        <span style={{ color: FIGMA.muted }}> / {String(TOTAL).padStart(2, "0")}</span>
      </p>
      <p
        className="mt-3 max-w-md text-left text-[15px] font-normal leading-relaxed sm:mt-4 sm:text-base sm:leading-[1.55]"
        style={{ color: FIGMA.muted }}
      >
        {item.description}
      </p>
    </>
  );
}

export default function AegisOutcomesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="flex min-h-0 flex-col justify-center bg-white px-6 py-10 sm:px-10 sm:py-12 lg:min-h-[calc(100vh-4rem)] lg:max-h-screen lg:px-14 lg:py-10"
      aria-labelledby="aegis-outcomes-heading"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col justify-center">
        <motion.header
          className="mx-auto max-w-3xl shrink-0 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportReveal}
          transition={{ duration: 0.45, ease }}
        >
          <p
            className="text-regular uppercase tracking-[0.16em] sm:text-sm"
            style={{ color: FIGMA.kicker }}
          >
            Outcomes
          </p>
          <h2
            id="aegis-outcomes-heading"
            className="mt-2 font-heading text-[1.75rem] font-semibold leading-[1.12] tracking-tight sm:mt-3 sm:text-4xl lg:text-[36px]"
          >
            <span style={{ color: FIGMA.ink }}>Designed for clearer </span>
            <span style={{ color: FIGMA.teal }}>decision-making</span>
          </h2>
        </motion.header>

        <div className="mt-8 flex min-h-0 flex-1 flex-col lg:mt-10 lg:min-h-0 lg:flex-row lg:items-stretch lg:gap-12 xl:gap-16">
          {/* Left navigation — equal height rows on desktop */}
          <nav
            className="flex min-h-0 flex-col border-t lg:flex-1 lg:justify-center lg:border-t-0"
            style={{ borderColor: FIGMA.divider }}
            aria-label="Outcomes"
          >
            {outcomes.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.title}
                  className="flex flex-col border-b lg:flex-1 lg:justify-center"
                  style={{ borderColor: FIGMA.divider }}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    className="w-full py-3.5 text-left transition-colors duration-300 sm:py-4 lg:py-0 lg:min-h-[3.25rem] lg:flex lg:items-center"
                    style={{ color: isActive ? FIGMA.teal : FIGMA.muted }}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className="font-heading text-base font-semibold leading-snug sm:text-lg">
                      {index + 1}. {item.title}
                    </span>
                  </button>

                  <div className="lg:hidden">
                    {isActive && (
                      <motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, ease }}
                        className="pb-4"
                      >
                        <ProgressSegments activeIndex={activeIndex} className="mb-4" />
                        <DetailContent index={index} />
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Desktop detail — vertically centered with left list */}
          <div className="relative hidden min-h-0 lg:flex lg:flex-1 lg:flex-col lg:justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease }}
                className="flex min-h-[220px] flex-col justify-center py-2"
              >
                <DetailContent index={activeIndex} />
                <ProgressSegments activeIndex={activeIndex} className="mt-8 max-w-md" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
