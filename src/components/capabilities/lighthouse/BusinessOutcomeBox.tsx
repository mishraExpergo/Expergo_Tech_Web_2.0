"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ACCENT = "#1677FF";

const OUTCOMES = [
  {
    num: "01",
    label: "Portfolio Stress",
    headline: "Earlier identification of portfolio stress",
  },
  {
    num: "02",
    label: "Bucket Control",
    headline: "Improved control over bucket movement and slippage ",
  },
  {
    num: "03",
    label: "Resource Allocation",
    headline: "Better allocation of collections and recovery resources",
  },
  {
    num: "04",
    label: "Ownership Tracking",
    headline: "Reduced operational gaps through clear ownership tracking",
  },
  {
    num: "05",
    label: "Fraud Discipline",
    headline: "Stronger fraud monitoring and escalation discipline",
  },
  {
    num: "06",
    label: "Migration Clarity",
    headline: "Improved provisioning visibility through migration clarity",
  },
  {
    num: "07",
    label: "Governance Trail",
    headline: "Audit ready governance with documented action trails ",
  },
] as const;

export default function BusinessOutcomeBox() {
  const [active, setActive] = useState(4);

  const current = OUTCOMES[active]!;

  return (
    <section className="relative bg-white py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-[#2d3340] bg-[#12151c] shadow-2xl"
        >
          <div className="relative z-10 border-b border-[#2d3340] py-6">
            <div className="text-center">
              <span className="text-[16px] uppercase mb-1 block tracking-widest text-[#01AEE4]">
                Outcomes
              </span>
              <h2 className="text-[36px] text-white font-bold tracking-wide text-white">Business Outcome</h2>
            </div>
          </div>

          <div className="relative grid gap-12 p-10 md:grid-cols-2 md:gap-16 md:p-16 lg:gap-20 lg:p-24">
            {/* Left — dynamic headline */}
            <div className="flex min-h-32 items-center md:min-h-40">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={current.num}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="es-heading-hero font-black"
                  style={{ color: ACCENT }}
                >
                  {current.headline}
                </motion.h3>
              </AnimatePresence>
            </div>

            {/* Right — clickable list */}
            <nav className="flex flex-col gap-1" aria-label="Business outcomes">
              {OUTCOMES.map((item, idx) => {
                const isActive = idx === active;
                return (
                  <button
                    key={item.num}
                    type="button"
                    onClick={() => setActive(idx)}
                    className="group flex w-full items-baseline gap-1 rounded-lg py-2.5 text-left transition-colors md:py-3"
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span
                      className="w-6 shrink-0 text-sm font-semibold tabular-nums transition-colors md:text-base"
                      style={{ color: isActive ? ACCENT : "rgba(255,255,255,0.45)" }}
                    >
                      {item.num}
                    </span>
                    <span
                      className="text-sm font-normal transition-colors md:text-base"
                      style={{ color: isActive ? ACCENT : "rgba(255,255,255,0.45)" }}
                      aria-hidden
                    >
                      -
                    </span>
                    <span
                      className={`text-sm transition-colors md:text-base ${
                        isActive ? "font-bold text-white" : "font-medium text-white/50"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Large decorative number */}
          <div
            className="pointer-events-none absolute bottom-0 right-4 select-none text-[clamp(8rem,22vw,14rem)] font-black leading-none tracking-tighter md:right-8"
            style={{ color: `${ACCENT}14` }}
            aria-hidden
          >
            {current.num}
          </div>

          <div
            className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full blur-[100px]"
            style={{ backgroundColor: `${ACCENT}0d` }}
          />
        </motion.div>
      </div>
    </section>
  );
}
