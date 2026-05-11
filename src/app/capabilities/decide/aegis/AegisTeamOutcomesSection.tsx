"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type TeamKey = "risk" | "collections" | "credit-strategy" | "underwriting";

type TeamCard = {
  key: TeamKey;
  label: string;
  title: string;
  bullets: string[];
  outcome: string;
};

const cards: TeamCard[] = [
  {
    key: "risk",
    label: "Risk",
    title: "Risk",
    bullets: [
      "Forward-looking risk scores",
      "Concentration & cohort drift",
      "Stress & scenario lenses",
    ],
    outcome: "Earlier visibility into deteriorating cohorts",
  },
  {
    key: "collections",
    label: "Collections",
    title: "Collections",
    bullets: [
      "Identify accounts likely to miss payments in advance",
      "Prioritise cases based on impact potential",
      "Improve recovery effectiveness",
    ],
    outcome: "Stronger recovery outcomes and better productivity",
  },
  {
    key: "credit-strategy",
    label: "Credit Strategy",
    title: "Credit Strategy",
    bullets: [
      "Segment customers based on expected behaviour",
      "Align pricing and exposure decisions",
      "Track portfolio performance across cohorts",
    ],
    outcome: "Sharper portfolio strategy and risk alignment",
  },
  {
    key: "underwriting",
    label: "Underwriting",
    title: "Underwriting",
    bullets: [
      "Evaluate expected performance at approval stage",
      "Incorporate forward-looking intelligence into decisions",
      "Identify concentration patterns",
    ],
    outcome: "Improved origination quality and consistency",
  },
];

const wheelNodeStyles: Record<TeamKey, string> = {
  risk: "left-1/2 top-[-18px] -translate-x-1/2",
  collections: "right-[-24px] top-1/2 -translate-y-1/2",
  "credit-strategy": "bottom-[-22px] left-1/2 -translate-x-1/2",
  underwriting: "left-[-18px] top-1/2 -translate-y-1/2",
};

export default function AegisTeamOutcomesSection() {
  const [activeKey, setActiveKey] = useState<TeamKey>("underwriting");

  const active = useMemo(
    () => cards.find((card) => card.key === activeKey) ?? cards[0],
    [activeKey],
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10 pb-28">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="font-heading text-3xl font-bold leading-[1.15] tracking-tight text-brand-ink sm:text-4xl md:text-5xl">
          Built for the teams that <span className="text-brand-teal">drive portfolio outcomes</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 grid items-center gap-8 lg:grid-cols-[1fr_1.12fr]"
      >
        <motion.div className="mx-auto w-full max-w-[380px]" whileHover={{ scale: 1.01 }} transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>
          <div className="relative aspect-square rounded-full border border-[#D6E5EA]">
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-6 rounded-full bg-[radial-gradient(circle,_rgba(29,104,213,0.12)_0%,_rgba(29,104,213,0)_70%)]"
              animate={{ scale: [0.96, 1.02, 0.96], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-8 rounded-full border border-dashed border-[#D8E3E8]"
              animate={{ rotate: 360 }}
              transition={{ duration: 26, ease: "linear", repeat: Infinity }}
            />
            <div className="absolute inset-[72px] rounded-full border border-[#DDE8EC]" />
            <motion.div
              className="absolute left-1/2 top-1/2 h-[94px] w-[94px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_#dbeefd_0%,_#8fc0eb_55%,_#eaf4fd_100%)] shadow-[0_10px_18px_rgba(29,104,213,0.22)] flex items-center justify-center text-center"
              animate={{ boxShadow: ["0 10px 18px rgba(29,104,213,0.18)", "0 12px 22px rgba(29,104,213,0.26)", "0 10px 18px rgba(29,104,213,0.18)"] }}
              transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity }}
            >
              <span className="text-[10px] font-semibold leading-[1.15] tracking-[0.03em] text-brand-ink">
                ATHENA
                <br />
                <span className="text-[8px] font-medium tracking-[0.04em] text-brand-muted">
                  INTELLIGENCE CORE
                </span>
              </span>
            </motion.div>

            {cards.map((card) => {
              const isActive = card.key === activeKey;
              const isRisk = card.key === "risk";
              return (
                <motion.button
                  key={`wheel-${card.key}`}
                  type="button"
                  onClick={() => setActiveKey(card.key)}
                  layout
                  whileHover={{ y: -1.5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ layout: { duration: 0.24 }, default: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
                  className={`absolute rounded-full bg-white text-[10px] font-medium transition-all duration-200 ${
                    wheelNodeStyles[card.key]
                  } ${
                    isRisk ? "px-6 py-3 text-[11px]" : "px-3.5 py-2.5"
                  } ${
                    isActive
                      ? "border border-brand-blue text-brand-ink shadow-[0_6px_16px_rgba(0,0,0,0.08)]"
                      : "border border-brand-border text-brand-muted hover:border-[#C8D5DE]"
                  }`}
                >
                  {card.label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-xl border border-[#E3E8ED] bg-white p-6 sm:p-7 shadow-[0_4px_10px_rgba(16,24,40,0.08)]"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(63,155,178,0.18)_0%,_rgba(63,155,178,0)_72%)]"
            animate={{ x: [0, -8, 6, 0], y: [0, 6, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,rgba(29,104,213,0)_0%,rgba(29,104,213,0.45)_50%,rgba(29,104,213,0)_100%)]"
            animate={{ x: ["-55%", "55%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="font-heading text-[32px] leading-tight font-semibold text-brand-ink">{active.title}</h3>

              <ul className="mt-4 space-y-1.5 list-disc pl-4 text-[15px] leading-7 text-brand-muted marker:text-brand-blue">
                {active.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="mt-5 rounded-xl bg-[#EEF2F6] px-4 py-3.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-muted">Outcome</p>
                <p className="mt-1 text-[17px] leading-7 text-[#3F9BB2]">{active.outcome}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex flex-wrap gap-2">
            {cards.map((card) => {
              const isActive = card.key === active.key;
              return (
                <motion.button
                  key={card.key}
                  type="button"
                  onClick={() => setActiveKey(card.key)}
                  layout
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ layout: { duration: 0.24 }, default: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
                  className={`rounded-full border px-3.5 py-1.5 text-[11px] font-medium transition ${
                    isActive
                      ? "border-brand-teal bg-brand-teal text-white"
                      : "border-[#E1E7EC] bg-[#F4F7FA] text-[#6E7F8E] hover:border-[#CBD7E1]"
                  }`}
                >
                  {card.label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
