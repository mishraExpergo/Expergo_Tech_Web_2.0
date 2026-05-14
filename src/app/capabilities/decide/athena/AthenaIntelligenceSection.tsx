"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type SystemNodeId = "signals" | "aegis" | "athena" | "command-centre" | "outcomes";
type SystemModuleId = "lighthouse" | "regulus";
type ActiveItemId = SystemNodeId | SystemModuleId;

type SystemNode = {
  id: SystemNodeId;
  label: string;
  badge: string;
  summaryTitle: string;
  summaryText: string;
};

type SystemModule = {
  id: SystemModuleId;
  name: string;
  type: string;
  summaryTitle: string;
  summaryText: string;
};

const systemNodes: SystemNode[] = [
  {
    id: "signals",
    label: "Signals",
    badge: "S",
    summaryTitle: "Signals",
    summaryText: "Real time portfolio behaviour and external data ingestion.",
  },
  {
    id: "aegis",
    label: "Aegis",
    badge: "A",
    summaryTitle: "Aegis",
    summaryText: "Risk reasoning layer translates raw signal into understanding.",
  },
  {
    id: "athena",
    label: "Athena",
    badge: "A",
    summaryTitle: "Athena",
    summaryText: "Predictive intelligence — anticipates movement and prescribes action.",
  },
  {
    id: "command-centre",
    label: "Command Centre",
    badge: "C",
    summaryTitle: "Command Centre",
    summaryText: "Operating surface for teams to act on intelligence.",
  },
  {
    id: "outcomes",
    label: "Outcomes",
    badge: "O",
    summaryTitle: "Outcomes",
    summaryText: "Measured improvement looped back into the system.",
  },
];

const topModules: SystemModule[] = [
  {
    id: "lighthouse",
    name: "Lighthouse",
    type: "Visibility",
    summaryTitle: "Lighthouse",
    summaryText: "Visibility modular orchestrated alongside Athena.",
  },
  {
    id: "regulus",
    name: "Regulus",
    type: "Governance",
    summaryTitle: "Regulus",
    summaryText: "Governance modular orchestrated alongside Athena.",
  },
];

export default function AthenaIntelligenceSection() {
  const [activeItemId, setActiveItemId] = useState<ActiveItemId>("athena");

  const activeItem = useMemo(
    () => [...systemNodes, ...topModules].find((item) => item.id === activeItemId) ?? systemNodes[2],
    [activeItemId],
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10 pb-24 sm:pb-28">
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="font-heading text-3xl font-bold leading-[1.15] tracking-tight text-brand-ink sm:text-4xl md:text-5xl">
          Part of the EarlySafe <span className="text-brand-teal">Intelligence System</span>
        </h2>
        <p className="mt-4 text-[17px] leading-[1.45] text-brand-muted mx-auto max-w-2xl">
          Athena is one module in an enterprise-grade operating system — connected, orchestrated, continuously
          learning.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-10 mx-auto max-w-[920px] overflow-hidden rounded-[18px] border border-[#79C7D9] bg-[#BFE2EA] px-6 py-8 sm:px-9 sm:py-9"
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -left-14 top-8 h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.36)_0%,_rgba(255,255,255,0)_72%)]"
          animate={{ x: [0, 12, -8, 0], y: [0, -8, 10, 0] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 bottom-4 h-52 w-52 rounded-full bg-[radial-gradient(circle,_rgba(29,104,213,0.18)_0%,_rgba(29,104,213,0)_70%)]"
          animate={{ x: [0, -10, 12, 0], y: [0, 8, -10, 0] }}
          transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="flex items-center justify-center gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {topModules.map((item) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setActiveItemId(item.id)}
              layout
              whileHover={{ y: -1.5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ layout: { duration: 0.24 }, default: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
              }}
              className={`rounded-full border px-4 py-2 text-left shadow-[0_2px_8px_rgba(16,24,40,0.06)] transition ${
                activeItemId === item.id
                  ? "border-brand-blue bg-white"
                  : "border-[#DCEAF0] bg-[#F9FCFD] hover:border-[#BDD2DD]"
              }`}
            >
              <p className="text-[11px] font-semibold leading-tight text-brand-ink">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-brand-blue" />
                {item.name}
              </p>
              <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.08em] text-[#8CA0AE]">{item.type}</p>
            </motion.button>
          ))}
        </motion.div>

        {/* Figma: inverted-V dotted guides from Lighthouse/Regulus toward Athena */}
        <svg
          viewBox="0 0 1000 220"
          className="pointer-events-none absolute left-0 right-0 top-[72px] z-[1] mx-auto hidden h-[200px] w-full max-w-[1000px] lg:block"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
            d="M 330 8 L 500 108 L 670 8"
            stroke="#1D68D5"
            strokeWidth="2"
            strokeDasharray="6 8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.55}
            animate={{ strokeDashoffset: [0, -28] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        <motion.div className="relative z-[2] mt-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: {} }}>
          {/* Below lg: grid wraps in the viewport — no horizontal overflow */}
          <motion.div
            className="grid grid-cols-2 justify-items-center gap-3 sm:grid-cols-3 lg:hidden"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
            }}
          >
            {systemNodes.map((node) => {
              const active = node.id === activeItemId;

              return (
                <motion.div
                  key={node.id}
                  className="w-full max-w-[104px] justify-self-center"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
                  }}
                >
                  <motion.button
                    type="button"
                    onClick={() => setActiveItemId(node.id)}
                    layout
                    whileHover={{ y: -1.5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ layout: { duration: 0.22 }, default: { duration: 0.2 } }}
                    className={`relative w-full max-w-[90px] rounded-2xl border bg-white px-2 py-2.5 text-center transition shadow-[0_4px_10px_rgba(16,24,40,0.08)] ${
                      active ? "border-brand-blue" : "border-[#D9E8EE] hover:border-[#B6CDD9]"
                    }`}
                  >
                    {active ? (
                      <motion.span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(120deg,rgba(29,104,213,0.16)_0%,rgba(29,104,213,0)_60%)]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.35, 0.55, 0.35] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      />
                    ) : null}
                    <motion.div
                      layout
                      className={`relative mx-auto flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold ${
                        active ? "bg-brand-blue text-white" : "bg-[#EDF4F7] text-[#8FA4B1]"
                      }`}
                    >
                      {node.badge}
                    </motion.div>
                    <motion.p layout className="relative mt-2 text-[12px] leading-tight font-semibold text-brand-ink">
                      {node.label}
                    </motion.p>
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>

          {/* lg+: single row with connectors — fits at large breakpoints */}
          <motion.div
            className="mt-0 hidden items-center justify-center gap-x-2 lg:flex"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
            }}
          >
            {systemNodes.map((node, idx) => {
              const active = node.id === activeItemId;

              return (
                <motion.div
                  key={`${node.id}-row`}
                  className="flex items-center gap-2"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
                  }}
                >
                  <motion.button
                    type="button"
                    onClick={() => setActiveItemId(node.id)}
                    layout
                    whileHover={{ y: -1.5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ layout: { duration: 0.22 }, default: { duration: 0.2 } }}
                    className={`relative w-[78px] sm:w-[90px] rounded-2xl border bg-white px-2 py-2.5 text-center transition shadow-[0_4px_10px_rgba(16,24,40,0.08)] ${
                      active ? "border-brand-blue" : "border-[#D9E8EE] hover:border-[#B6CDD9]"
                    }`}
                  >
                    {active ? (
                      <motion.span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(120deg,rgba(29,104,213,0.16)_0%,rgba(29,104,213,0)_60%)]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.35, 0.55, 0.35] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      />
                    ) : null}
                    <motion.div
                      layout
                      className={`relative mx-auto flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold ${
                        active ? "bg-brand-blue text-white" : "bg-[#EDF4F7] text-[#8FA4B1]"
                      }`}
                    >
                      {node.badge}
                    </motion.div>
                    <motion.p layout className="relative mt-2 text-[12px] leading-tight font-semibold text-brand-ink">
                      {node.label}
                    </motion.p>
                  </motion.button>

                  {idx < systemNodes.length - 1 && (
                    <motion.svg
                      viewBox="0 0 40 12"
                      className="w-6 shrink-0 sm:w-8"
                      fill="none"
                      aria-hidden="true"
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <path d="M1 6H34" stroke="#1D68D5" strokeWidth="1.2" />
                      <path d="M30 2L34 6L30 10" stroke="#1D68D5" strokeWidth="1.2" strokeLinecap="round" />
                    </motion.svg>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <div className="mt-8 border-t border-[#A9D1DC] pt-5 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[17px] font-semibold text-brand-ink">{activeItem.summaryTitle}</p>
              <p className="mt-1 text-[15px] leading-[1.45] text-[#4F6775] max-w-2xl mx-auto">{activeItem.summaryText}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
