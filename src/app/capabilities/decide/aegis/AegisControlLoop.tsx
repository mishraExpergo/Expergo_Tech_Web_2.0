"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type AegisControlStep = {
  id: string;
  label: string;
  title: string;
  description: string;
  signal: string;
  linePath: string;
  fillPath: string;
  dots?: Array<{ cx: number; cy: number }>;
};

const controlSteps: AegisControlStep[] = [
  {
    id: "01",
    label: "Anticipate Movement",
    title: "Anticipate Movement",
    description: "See which accounts are likely to bounce, stabilise or deteriorate.",
    signal: "Forward Signals",
    linePath:
      "M24 66C68 53 98 50 136 52C172 54 202 50 234 48C266 45 302 47 336 38C354 33 366 28 376 22",
    fillPath:
      "M24 66C68 53 98 50 136 52C172 54 202 50 234 48C266 45 302 47 336 38C354 33 366 28 376 22V84H24V66Z",
    dots: [
      { cx: 82, cy: 51 },
      { cx: 154, cy: 53 },
      { cx: 230, cy: 49 },
      { cx: 304, cy: 45 },
      { cx: 350, cy: 33 },
    ],
  },
  {
    id: "02",
    label: "Prioritise with Precision",
    title: "Prioritise with Precision",
    description: "Focus effort where action creates the highest impact.",
    signal: "Enhanced Ranking",
    linePath:
      "M22 62L70 56L110 40L165 52L224 30L286 34L340 16L374 10",
    fillPath:
      "M22 62L70 56L110 40L165 52L224 30L286 34L340 16L374 10V84H22V62Z",
    dots: [
      { cx: 70, cy: 56 },
      { cx: 110, cy: 40 },
      { cx: 165, cy: 52 },
      { cx: 224, cy: 30 },
      { cx: 286, cy: 34 },
      { cx: 340, cy: 16 },
    ],
  },
  {
    id: "03",
    label: "Act at the Right Time",
    title: "Act at the Right Time",
    description: "Engage accounts before risk becomes visible in delinquency.",
    signal: "Next Best Action",
    linePath:
      "M22 46C52 62 98 60 134 51C170 42 206 20 246 21C284 22 316 35 374 26",
    fillPath:
      "M22 46C52 62 98 60 134 51C170 42 206 20 246 21C284 22 316 35 374 26V84H22V46Z",
    dots: [
      { cx: 22, cy: 46 },
      { cx: 78, cy: 54 },
      { cx: 178, cy: 37 },
      { cx: 214, cy: 22 },
      { cx: 266, cy: 21 },
      { cx: 374, cy: 26 },
    ],
  },
  {
    id: "04",
    label: "Improve Outcomes",
    title: "Improve Outcomes",
    description: "Align decisions and actions with expected portfolio movement.",
    signal: "Closed Loop",
    linePath:
      "M22 72C42 68 64 62 84 58C102 53 118 48 136 44C154 39 170 36 188 33C206 29 224 25 242 23C262 20 282 17 302 15C326 13 350 11 374 10",
    fillPath:
      "M22 72C42 68 64 62 84 58C102 53 118 48 136 44C154 39 170 36 188 33C206 29 224 25 242 23C262 20 282 17 302 15C326 13 350 11 374 10V84H22V72Z",
    dots: [
      { cx: 84, cy: 56 },
      { cx: 136, cy: 38 },
      { cx: 188, cy: 24 },
      { cx: 242, cy: 16 },
      { cx: 304, cy: 11.5 },
      { cx: 374, cy: 11 },
    ],
  },
];

export default function AegisControlLoop() {
  const [activeId, setActiveId] = useState<string>(controlSteps[0].id);

  const activeStep = useMemo(
    () => controlSteps.find((step) => step.id === activeId) ?? controlSteps[0],
    [activeId],
  );

  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12 pt-12 sm:pt-16 lg:pt-20 pb-24 sm:pb-28">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-8 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(29,104,213,0.16)_0%,_rgba(29,104,213,0)_70%)]"
        animate={{ x: [0, -14, 12, 0], y: [0, 12, -10, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="mx-auto max-w-3xl text-center">
        <p className="es-small-heading text-brand-muted uppercase tracking-[0.14em]">Capabilities</p>
        <h2 className="mt-4 font-heading text-3xl font-bold leading-[1.15] tracking-tight text-brand-ink sm:text-4xl md:text-5xl">
          From understanding to <span className="text-brand-teal">forward control.</span>
        </h2>
        <p className="mt-5 es-body mx-auto max-w-2xl text-brand-muted">
          A continuous loop — signals turn into understanding, understanding into prediction, and prediction into
          action.
        </p>
      </div>

      <div className="mt-12 grid gap-4 lg:mt-14 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-3">
          {controlSteps.map((step) => {
            const isActive = step.id === activeStep.id;

            return (
              <motion.button
                key={step.id}
                type="button"
                onClick={() => setActiveId(step.id)}
                layout
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                transition={{ layout: { duration: 0.24 }, default: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
                className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-xl border px-5 py-4 text-left transition-all duration-300 ${
                  isActive
                    ? "border-brand-teal bg-brand-teal text-white shadow-[0_10px_25px_rgba(22,178,195,0.28)]"
                    : "border-brand-border bg-[#DDF4F6] text-brand-ink hover:border-brand-teal/55 hover:bg-[#D4EFF2]"
                }`}
              >
                {isActive ? (
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.24)_45%,rgba(255,255,255,0.08)_100%)]"
                    initial={{ x: "-120%" }}
                    animate={{ x: "120%" }}
                    transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.1 }}
                  />
                ) : null}
                <motion.span
                  layout
                  className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-sm font-semibold transition-colors duration-300 ${
                    isActive ? "bg-white/20 text-white" : "bg-white/70 text-brand-ink"
                  }`}
                >
                  {step.id}
                </motion.span>
                <motion.span layout className={`relative z-10 font-medium ${isActive ? "text-white" : "text-brand-muted"}`}>
                  {step.label}
                </motion.span>
              </motion.button>
            );
          })}
        </div>

        <div className="relative overflow-hidden rounded-xl border border-[#C7E0E8] bg-[#D7EAF2] px-7 py-6 sm:px-9 sm:py-7 min-h-[242px]">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(29,104,213,0.20)_0%,_rgba(29,104,213,0)_70%)]"
            animate={{ x: [0, 8, -6, 0], y: [0, 10, 4, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#86A8B8]">
                {activeStep.signal}
              </p>

              <motion.svg
                key={`chart-${activeStep.id}`}
                viewBox="0 0 400 96"
                className="mt-4 h-24 w-[86%]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              >
                <defs>
                  <linearGradient id="aegis-line" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#16B2C3" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#1D68D5" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="aegis-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1D68D5" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#1D68D5" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                <path d={activeStep.fillPath} fill="url(#aegis-fill)" />
                <motion.path
                  d={activeStep.linePath}
                  stroke="url(#aegis-line)"
                  strokeWidth="2.35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.75, ease: "easeOut" }}
                />
                {activeStep.dots?.map((dot, index) => (
                  <motion.circle
                    key={`${activeStep.id}-dot-${index}`}
                    cx={dot.cx}
                    cy={dot.cy}
                    r="2"
                    fill="#1D68D5"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.9, scale: 1 }}
                    transition={{ duration: 0.28, delay: 0.18 + index * 0.05 }}
                  />
                ))}
              </motion.svg>

              <h3 className="mt-4 font-heading text-[38px] leading-[1.1] text-brand-ink font-semibold">
                {activeStep.title}
              </h3>
              <p className="mt-2 max-w-lg text-[14px] leading-[1.45] text-[#5D7381]">{activeStep.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
