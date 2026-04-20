"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
} from "framer-motion";

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
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(sectionRef, { amount: 0.35 });

  const current = OUTCOMES[active]!;

  useEffect(() => {
    if (!isInView || isHovered) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActive((currentIndex) => (currentIndex + 1) % OUTCOMES.length);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [isInView, isHovered]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
      style={{ minHeight: "100vh" }}
    >
      <div className="sticky top-0 flex items-center bg-white py-6 sm:py-10 lg:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-lg border border-[#2d3340] bg-[#12151c] shadow-2xl sm:max-h-none sm:rounded-2xl"
          >
            <div className="relative z-10 border-b border-[#2d3340] px-5 py-4 sm:py-6">
              <div className="text-center">
                <span className="mb-1 block text-[12px] uppercase tracking-widest text-[#01AEE4] sm:text-[16px]">
                  Outcomes
                </span>
                <h2 className="text-[26px] font-bold leading-tight tracking-wide text-white sm:text-[36px]">
                  Business Outcome
                </h2>
              </div>
            </div>

            <div className="relative grid gap-6 p-5 sm:gap-10 sm:p-8 md:grid-cols-2 md:gap-16 md:p-16 lg:gap-20 lg:p-24">
              {/* Left - dynamic headline */}
              <div className="flex min-h-[7rem] items-center sm:min-h-32 md:min-h-40">
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={current.num}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="text-[28px] font-black leading-[1.08] text-balance sm:text-[34px] md:text-[46px] lg:text-[48px]"
                    style={{ color: ACCENT }}
                  >
                    {current.headline}
                  </motion.h3>
                </AnimatePresence>
              </div>

              {/* Right - clickable list */}
              <nav
                className="relative z-10 flex flex-col gap-1"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                aria-label="Business outcomes"
              >
                {OUTCOMES.map((item, idx) => {
                  const isActive = idx === active;
                  return (
                    <button
                      key={item.num}
                      type="button"
                      onClick={() => setActive(idx)}
                      className={`group relative flex w-full items-baseline gap-1 rounded-lg px-4 py-2 text-left transition-all duration-300 sm:py-3 ${
                        isActive 
                          ? " scale-[1.02]  shadow-black/20" 
                          : "hover:bg-white/[0.02]"
                      }`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <motion.div
                          layoutId="active-bar"
                          className="absolute left-0 top-0 h-full w-1 rounded-full"
                          style={{ backgroundColor: ACCENT }}
                        />
                      )}

                      <span
                        className="w-6 shrink-0 text-xs font-semibold tabular-nums transition-colors sm:text-sm md:text-base"
                        style={{
                          color: isActive ? ACCENT : "rgba(255,255,255,0.45)",
                        }}
                      >
                        {item.num}
                      </span>
                      <span
                        className="text-xs font-normal transition-colors sm:text-sm md:text-base"
                        style={{
                          color: isActive ? ACCENT : "rgba(255,255,255,0.45)",
                        }}
                        aria-hidden
                      >
                        -
                      </span>
                      <span
                        className={`text-xs transition-colors sm:text-sm md:text-base ${
                          isActive
                            ? "font-bold text-white"
                            : "font-medium text-white/50"
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
              className="pointer-events-none absolute bottom-0 right-2 select-none text-[clamp(5rem,34vw,14rem)] font-black leading-none tracking-tighter sm:right-4 md:right-8"
              style={{ color: `${ACCENT}14` }}
              aria-hidden
            >
              {current.num}
            </div>

            <div
              className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full blur-[80px] sm:h-64 sm:w-64 sm:blur-[100px]"
              style={{ backgroundColor: `${ACCENT}0d` }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
