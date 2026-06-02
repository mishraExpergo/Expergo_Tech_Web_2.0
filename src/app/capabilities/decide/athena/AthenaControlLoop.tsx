"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useMemo, useState } from "react";

type AthenaControlStep = {
  id: string;
  label: string;
  title: string;
  description: string;
  signal: string;
  linePath: string;
  fillPath: string;
  dots?: Array<{ cx: number; cy: number }>;
};

const controlSteps: AthenaControlStep[] = [
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

const panelEase = [0.22, 1, 0.36, 1] as const;
const springSnappy = { type: "spring" as const, stiffness: 420, damping: 32 };
const springSoft = { type: "spring" as const, stiffness: 280, damping: 30 };

const headerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
} as const;

const headerItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: panelEase },
  },
} as const;

const stepListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
} as const;

const stepItemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: panelEase },
  },
} as const;

const detailPanelVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.18, ease: panelEase },
  },
} as const;

const detailItemVariants = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.38, ease: panelEase },
  },
} as const;

function AthenaStepChart({ step, chartId }: { step: AthenaControlStep; chartId: string }) {
  const lineGradId = `${chartId}-line`;
  const fillGradId = `${chartId}-fill`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: panelEase }}
      className="relative mt-5 overflow-hidden rounded-2xl border border-[#C5DDE6]/80 bg-white/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] sm:p-5"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(22,178,195,0.04)_0%,rgba(255,255,255,0)_55%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: panelEase, delay: 0.1 }}
      />
      <svg viewBox="0 0 400 96" className="relative h-24 w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={lineGradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#16B2C3" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#1D68D5" stopOpacity="1" />
          </linearGradient>
          <linearGradient id={fillGradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1D68D5" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#1D68D5" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {[18, 34, 50, 66].map((y, index) => (
          <motion.line
            key={y}
            x1="16"
            y1={y}
            x2="384"
            y2={y}
            stroke="#C5DDE6"
            strokeWidth="0.75"
            strokeDasharray="3 6"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ duration: 0.5, ease: panelEase, delay: 0.04 * index }}
          />
        ))}

        <motion.path
          d={step.fillPath}
          fill={`url(#${fillGradId})`}
          initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 0.65, ease: panelEase, delay: 0.08 }}
        />
        <motion.path
          d={step.linePath}
          stroke={`url(#${lineGradId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.95, ease: panelEase, delay: 0.12 }}
        />
        {step.dots?.map((dot, index) => (
          <motion.g key={`${step.id}-dot-${index}`}>
            <motion.circle
              cx={dot.cx}
              cy={dot.cy}
              r="5"
              fill="#1D68D5"
              fillOpacity="0.12"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: panelEase, delay: 0.28 + index * 0.07 }}
              style={{ transformOrigin: `${dot.cx}px ${dot.cy}px` }}
            />
            <motion.circle
              cx={dot.cx}
              cy={dot.cy}
              r="2.5"
              fill="#1D68D5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.25, 1], opacity: [0, 1, 1] }}
              transition={{ duration: 0.42, ease: panelEase, delay: 0.36 + index * 0.07 }}
              style={{ transformOrigin: `${dot.cx}px ${dot.cy}px` }}
            />
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
}

function AthenaStepDetail({ step, chartId }: { step: AthenaControlStep; chartId: string }) {
  return (
    <>
      <motion.p
        variants={detailItemVariants}
        className="inline-flex items-center rounded-full border border-[#C5DDE6] bg-white/80 px-3 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#86A8B8] shadow-sm"
      >
        {step.signal}
      </motion.p>
      <motion.div variants={detailItemVariants}>
        <AthenaStepChart step={step} chartId={chartId} />
      </motion.div>
      <motion.h3
        variants={detailItemVariants}
        className="mt-5 font-heading text-[38px] leading-[1.1] text-brand-ink font-semibold"
      >
        {step.title}
      </motion.h3>
      <motion.p variants={detailItemVariants} className="mt-2 max-w-lg text-[14px] leading-[1.45] text-[#5D7381]">
        {step.description}
      </motion.p>
    </>
  );
}

function AthenaDetailPanel({ step, chartId }: { step: AthenaControlStep; chartId: string }) {
  return (
    <motion.div
      key={`panel-${step.id}`}
      initial={{ scale: 0.985, opacity: 0.92 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={springSoft}
      className="relative overflow-hidden rounded-[24px] border border-brand-border/90 bg-[linear-gradient(165deg,rgba(22,178,195,0.06)_0%,rgba(255,255,255,0.98)_42%,rgba(241,248,250,0.96)_100%)] px-7 py-7 shadow-[0_24px_64px_-40px_rgba(22,178,195,0.45),inset_0_1px_0_rgba(255,255,255,0.9)] sm:px-9 sm:py-8 min-h-[280px]"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-teal/[0.08] blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 bottom-0 h-36 w-36 rounded-full bg-[#0B64F4]/[0.05] blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
      <motion.div
        aria-hidden="true"
        key={`glow-${step.id}`}
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-teal/50 to-transparent"
        initial={{ opacity: 0, scaleX: 0.2 }}
        animate={{ opacity: [0, 1, 0.65, 1], scaleX: 1 }}
        transition={{
          opacity: { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
          scaleX: { duration: 0.55, ease: panelEase },
        }}
        style={{ transformOrigin: "center" }}
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step.id}
          variants={detailPanelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <AthenaStepDetail step={step} chartId={`${chartId}-${step.id}`} />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

type StepTriggerProps = {
  step: AthenaControlStep;
  isActive: boolean;
  onSelect: () => void;
  showConnector?: boolean;
  isConnectorFilled?: boolean;
};

function StepTrigger({ step, isActive, onSelect, showConnector = false, isConnectorFilled = false }: StepTriggerProps) {
  return (
    <div className="relative">
      {showConnector ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[23px] top-[52px] h-[calc(100%-12px)] w-px overflow-hidden bg-gradient-to-b from-brand-teal/25 via-brand-border to-brand-border"
        >
          <motion.span
            aria-hidden="true"
            className="block h-full w-full origin-top bg-gradient-to-b from-[#16B2C3] to-[#1D68D5]"
            initial={false}
            animate={{ scaleY: isConnectorFilled || isActive ? 1 : 0.15, opacity: isConnectorFilled ? 1 : isActive ? 0.75 : 0.35 }}
            transition={{ duration: 0.45, ease: panelEase }}
          />
        </span>
      ) : null}
      <motion.button
        type="button"
        onClick={onSelect}
        whileHover={{ y: -3, transition: { duration: 0.22, ease: panelEase } }}
        whileTap={{ scale: 0.978, y: 0 }}
        transition={{ duration: 0.18, ease: panelEase }}
        className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border px-5 py-4 text-left transition-[border-color,background-color,box-shadow,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/45 focus-visible:ring-offset-2 ${
          isActive
            ? "border-brand-teal/35 bg-white shadow-[0_16px_40px_-22px_rgba(22,178,195,0.45),inset_0_1px_0_rgba(255,255,255,0.95)] ring-1 ring-brand-teal/15"
            : "border-brand-border/80 bg-white/70 hover:border-brand-teal/25 hover:bg-white hover:shadow-[0_10px_28px_-20px_rgba(15,23,42,0.12)]"
        }`}
      >
        <motion.span
          aria-hidden="true"
          className="absolute inset-y-3 left-0 w-[3px] rounded-full bg-gradient-to-b from-[#16B2C3] to-[#1D68D5]"
          initial={false}
          animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.35 }}
          transition={springSnappy}
          style={{ transformOrigin: "center" }}
        />
        {isActive ? (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.16)_48%,rgba(255,255,255,0)_100%)]"
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 2.2 }}
          />
        ) : null}
        <motion.span
          key={isActive ? `active-${step.id}` : `idle-${step.id}`}
          initial={isActive ? { scale: 0.88, rotate: -6 } : false}
          animate={isActive ? { scale: 1, rotate: 0 } : { scale: 1, rotate: 0 }}
          transition={springSnappy}
          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-br from-[#16B2C3] to-[#1D68D5] text-white shadow-[0_8px_20px_-8px_rgba(22,178,195,0.65)]"
              : "border border-brand-border/80 bg-[#F4FAFB] text-brand-ink group-hover:border-brand-teal/25 group-hover:bg-white"
          }`}
        >
          {step.id}
        </motion.span>
        <motion.span
          animate={{ x: isActive ? 2 : 0 }}
          transition={springSoft}
          className={`relative z-10 text-[15px] font-medium transition-colors duration-300 ${
            isActive ? "text-brand-ink" : "text-brand-muted group-hover:text-brand-ink/85"
          }`}
        >
          {step.label}
        </motion.span>
      </motion.button>
    </div>
  );
}

export default function AthenaControlLoop() {
  const [activeId, setActiveId] = useState<string>(controlSteps[0].id);
  const chartId = useId().replace(/:/g, "");

  const activeStep = useMemo(
    () => controlSteps.find((step) => step.id === activeId) ?? controlSteps[0],
    [activeId],
  );

  const activeIndex = useMemo(
    () => controlSteps.findIndex((step) => step.id === activeId),
    [activeId],
  );

  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12 pt-12 sm:pt-16 lg:pt-20 pb-24 sm:pb-28">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-8 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(29,104,213,0.10)_0%,_rgba(29,104,213,0)_70%)] blur-2xl"
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="mx-auto max-w-3xl text-center"
        variants={headerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.65 }}
      >
        <motion.p variants={headerItemVariants} className="text-[16px] text-[#0B64F4] uppercase tracking-[0.14em]">
          Capabilities
        </motion.p>
        <motion.h2
          variants={headerItemVariants}
          className="mt-4 font-heading text-3xl font-semibold leading-[1.15] tracking-tight text-brand-ink sm:text-4xl md:text-[36px]"
        >
          From understanding to <span className="text-[#15B5C1]">forward control.</span>
        </motion.h2>
        <motion.p variants={headerItemVariants} className="mt-5 es-body mx-auto max-w-2xl text-brand-muted">
          A continuous loop — signals turn into understanding, understanding into prediction, and prediction into
          action.
        </motion.p>
      </motion.div>

      <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_1.25fr] lg:gap-8 lg:items-start">
        <motion.div
          className="space-y-3 lg:hidden"
          variants={stepListVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {controlSteps.map((step) => {
            const isActive = step.id === activeStep.id;

            return (
              <motion.div key={step.id} variants={stepItemVariants} className="space-y-3">
                <StepTrigger step={step} isActive={isActive} onSelect={() => setActiveId(step.id)} />
                <AnimatePresence initial={false}>
                  {isActive ? (
                    <motion.div
                      key={`mobile-panel-${step.id}`}
                      initial={{ opacity: 0, height: 0, scale: 0.98 }}
                      animate={{ opacity: 1, height: "auto", scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.98 }}
                      transition={{ duration: 0.38, ease: panelEase }}
                      className="overflow-hidden"
                    >
                      <AthenaDetailPanel step={step} chartId={`${chartId}-mobile`} />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="hidden lg:block"
          variants={stepListVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="space-y-3">
            {controlSteps.map((step, index) => {
              const isActive = step.id === activeStep.id;

              return (
                <motion.div key={step.id} variants={stepItemVariants}>
                  <StepTrigger
                    step={step}
                    isActive={isActive}
                    onSelect={() => setActiveId(step.id)}
                    showConnector={index < controlSteps.length - 1}
                    isConnectorFilled={index < activeIndex}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="hidden lg:block lg:sticky lg:top-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: panelEase, delay: 0.15 }}
        >
          <AthenaDetailPanel step={activeStep} chartId={chartId} />
        </motion.div>
      </div>
    </section>
  );
}
