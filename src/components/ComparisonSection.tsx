"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangleIcon, ArrowDown, ChevronDown, ShieldCheckIcon } from "lucide-react";
import { MotionSection } from "./MotionSection";

const periodicSteps = [
  "Data collection",
  "Risk calculation",
  "Dashboarding",
  "Rule Thresholds",
  "Notifications",
  "Manual Actions",
];

const periodicBullets = [
  "Reactive view of risk",
  "Delayed decision-making ",
  "Operational inefficiencies",
  "Higher dependence on manual processes",
];

const continuousSteps = [
  "Multi-Signal Capture",
  "EWS Scoring",
  "Live Portfolio View",
  "Adaptive Triggers",
  "Real-Time Alerts",
  "Automated Interventions",
];

const continuousBullets = [
  "Proactive risk identification",
  "Faster, confident decisioning",
  "Unified portfolio intelligence",
  "Scalable, automated risk operations ",
];

const ease = [0.22, 1, 0.36, 1] as const;

const listViewport = {
  once: true,
  margin: "-12% 0px",
  amount: 0.25,
} as const;

const staggerList = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.145, delayChildren: 0.085 },
  },
};

const staggerSteps = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.115, delayChildren: 0.065 },
  },
};

const itemFromLeft = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.455, ease },
  },
};

const itemFromRight = {
  hidden: { opacity: 0, x: 14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.455, ease },
  },
};

const stepFromLeft = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.425, ease },
  },
};

const stepFromRight = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.425, ease },
  },
};

export function ComparisonSection() {
  const reduceMotion = useReducedMotion();
  const reduce = Boolean(reduceMotion);

  return (
    <MotionSection
      id="solutions"
      variant="slide-left"
      className=" px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center flex flex-col items-center">
          <p className="text-[16px] font-poppins  text-[#1D68D5]">
            THE SHIFT
          </p>
          <h2 className="text-[36px]  mt-3 w-[50vw] font-bold leading-tight text-brand-ink">
            From Periodic Risk Monitoring to Continuous Portfolio Intelligence
          </h2>
          <p className="mt-4 max-w-3xl  text-base leading-relaxed text-[#1F1F1F]">
          Traditional risk operations rely on periodic queries and manual review.
          EarlySafe enables a continuous intelligence loop.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <motion.article
            whileHover={reduce ? undefined : { y: -4 }}
            transition={{ type: "spring", stiffness: 320, damping: 26, mass: 1.04 }}
            className="flex h-full min-h-0 flex-col rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-sm sm:p-8"
          >
            <h3 className="text-lg flex items-center gap-2 font-semibold ">
              <span className="text-amber-700"><AlertTriangleIcon/></span>
              Periodic Risk Monitoring
            </h3>
            {reduce ? (
              <div className="mt-6 flex-1 space-y-2">
                {periodicSteps.map((label, i) => (
                  <div key={label}>
                    <div className="flex items-center gap-3 rounded-lg bg-[#D6EDF2] px-3 py-2.5 text-sm font-medium">
                      <span className="min-w-0 flex-1 ">{label}</span>
                    </div>
                    {i < periodicSteps.length - 1 && (
                      <div className="flex justify-center py-1 text-[#98A2B3] ">
                        <ArrowDown className="h-4 w-4 " aria-hidden />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                className="mt-6 flex-1 space-y-2"
                variants={staggerSteps}
                initial="hidden"
                whileInView="visible"
                viewport={listViewport}
              >
                {periodicSteps.map((label, i) => (
                  <motion.div key={label} variants={stepFromLeft}>
                    <div className="flex items-center gap-3 rounded-lg bg-[#D6EDF2] px-3 py-2.5 text-sm font-medium text-black">
                      <span className="min-w-0 flex-1">{label}</span>
                    </div>
                    {i < periodicSteps.length - 1 && (
                      <div className="flex justify-center py-1 text-[#15B5C1]">
                        <ArrowDown className="h-4 w-4" aria-hidden />
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
            {reduce ? (
              <ul className="mt-8 space-y-2 border-t border-[#E4E7EC] pt-6 text-sm text-brand-muted">
                {periodicBullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#98A2B3]" />
                    {b}
                  </li>
                ))}
              </ul>
            ) : (
              <motion.ul
                className="mt-8 space-y-2 border-t border-[#E4E7EC] pt-6 text-sm text-brand-muted"
                variants={staggerList}
                initial="hidden"
                whileInView="visible"
                viewport={listViewport}
              >
                {periodicBullets.map((b) => (
                  <motion.li key={b} variants={itemFromLeft} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#98A2B3]" />
                    {b}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.article>

          <motion.article
            whileHover={reduce ? undefined : { y: -4 }}
            transition={{ type: "spring", stiffness: 320, damping: 26, mass: 1.04 }}
            className="flex h-full min-h-0 flex-col rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-sm sm:p-8"
          >
            <h3 className="text-lg flex items-center gap-2 font-semibold text-brand-ink">
              <span className="text-green-700"><ShieldCheckIcon/></span>
              Continuous Portfolio Intelligence
            </h3>
            {reduce ? (
              <div className="mt-6 flex-1 space-y-2">
                {continuousSteps.map((label, i) => (
                  <div key={label}>
                    <div className="flex items-center gap-3 rounded-lg bg-[#16B2C3] px-3 py-2.5 text-sm font-semibold text-white">
                      <span className="min-w-0 flex-1">{label}</span>
                      <ChevronDown className="h-4 w-4 opacity-90" aria-hidden />
                    </div>
                    {i < continuousSteps.length - 1 && (
                      <div className="flex justify-center py-1 text-[#D6EDF2]">
                        <ArrowDown className="h-4 w-4" aria-hidden />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                className="mt-6 flex-1 space-y-2"
                variants={staggerSteps}
                initial="hidden"
                whileInView="visible"
                viewport={listViewport}
              >
                {continuousSteps.map((label, i) => (
                  <motion.div key={label} variants={stepFromRight}>
                    <div className="flex items-center gap-3 rounded-lg bg-[#D6EDF2] px-3 py-2.5 text-sm font-semibold text-[#1F1F1F] ">
                      <span className="min-w-0 flex-1">{label}</span>
                    </div>
                    {i < continuousSteps.length - 1 && (
                      <div className="flex justify-center py-1 ">
                        <ArrowDown className="h-4 w-4 text-[#15B5C1]" aria-hidden />
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
            {reduce ? (
              <ul className="mt-8 space-y-2 border-t border-[#E4E7EC] pt-6 text-sm text-brand-muted">
                {continuousBullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#16B2C3]" />
                    {b}
                  </li>
                ))}
              </ul>
            ) : (
              <motion.ul
                className="mt-8 space-y-2 border-t border-[#E4E7EC] pt-6 text-sm text-brand-muted"
                variants={staggerList}
                initial="hidden"
                whileInView="visible"
                viewport={listViewport}
              >
                {continuousBullets.map((b) => (
                  <motion.li key={b} variants={itemFromRight} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#16B2C3]" />
                    {b}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.article>
        </div>
      </div>
    </MotionSection>
  );
}
