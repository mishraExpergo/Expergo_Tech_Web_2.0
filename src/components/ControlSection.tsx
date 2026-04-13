// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
// import {
//   Bell,
//   Filter,
//   ShieldCheck,
//   SlidersHorizontal,
//   Target,
// } from "lucide-react";
// import { MotionSection } from "./MotionSection";

// const tabs = ["Detect", "Decide", "Control"] as const;

// const tabCopy: Record<
//   (typeof tabs)[number],
//   { sub: string; points: { icon: typeof Bell; text: string }[] }
// > = {
//   Detect: {
//     sub: "Surface emerging risk early—before it shows up in lagging reports.",
//     points: [
//       {
//         icon: Bell,
//         text: "Multi-source ingestion with normalization across product silos.",
//       },
//       {
//         icon: Filter,
//         text: "Anomaly and trend detection tuned to portfolio segments.",
//       },
//       {
//         icon: SlidersHorizontal,
//         text: "Signal ranking by materiality, velocity, and business impact.",
//       },
//       {
//         icon: Target,
//         text: "Explainable drivers so analysts trust the alert, not just the score.",
//       },
//     ],
//   },
//   Decide: {
//     sub: "Operationalize review with clear ownership, SLAs, and evidence.",
//     points: [
//       {
//         icon: Bell,
//         text: "Queues and assignments aligned to credit policy and authority.",
//       },
//       {
//         icon: Filter,
//         text: "Triage workflows with mandatory checks and documentation.",
//       },
//       {
//         icon: SlidersHorizontal,
//         text: "Integration with ticketing and GRC for audit-ready history.",
//       },
//       {
//         icon: Target,
//         text: "Metrics on throughput, quality, and repeat findings.",
//       },
//     ],
//   },
//   Control: {
//     sub: "Translate intelligence into disciplined interventions.",
//     points: [
//       {
//         icon: Bell,
//         text: "Rules-based early-warning signals aligned to policy and exposure.",
//       },
//       {
//         icon: Filter,
//         text: "Directed screening that routes the highest-impact cases first.",
//       },
//       {
//         icon: SlidersHorizontal,
//         text: "Configurable thresholds with audit trails across teams.",
//       },
//       {
//         icon: Target,
//         text: "Closed-loop tracking from signal → owner → resolution.",
//       },
//     ],
//   },
// };

// const decisionRows = [
//   {
//     name: "Northwind Credit Facility",
//     id: "ID: 882104",
//     status: "Escalated",
//     tone: "bg-[#FEF3F2] text-[#B42318] border-[#FECDCA]",
//   },
//   {
//     name: "Summit Asset Pool",
//     id: "ID: 441902",
//     status: "Action Required",
//     tone: "bg-[#FFFAEB] text-[#B54708] border-[#FEDF89]",
//   },
//   {
//     name: "Harbor Street CLO",
//     id: "ID: 102384",
//     status: "Monitoring",
//     tone: "bg-[#EFF8FF] text-[#175CD3] border-[#B2DDFF]",
//   },
//   {
//     name: "Atlas Working Capital",
//     id: "ID: 774120",
//     status: "Escalated",
//     tone: "bg-[#FEF3F2] text-[#B42318] border-[#FECDCA]",
//   },
// ];

// export function ControlSection() {
//   const [active, setActive] = useState<(typeof tabs)[number]>("Control");
//   const reduce = useReducedMotion();

//   return (
//     <MotionSection id="outcomes" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-6xl">
//         <div className="flex flex-wrap items-center justify-start gap-2">
//           {tabs.map((t) => (
//             <button
//               key={t}
//               type="button"
//               onClick={() => setActive(t)}
//               className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
//                 active === t
//                   ? "border-[#16B2C3] bg-[#ECFDFF] text-[#0E8A99]"
//                   : "border-[#E4E7EC] bg-white text-[#667085] hover:border-[#D0D5DD]"
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>

//         <div className="mt-12 grid items-start gap-12 lg:grid-cols-2">
//           <div>
//             <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1D68D5]">
//               Product
//             </p>
//             <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#16B2C3] sm:text-4xl">
//               {active}
//             </h2>
//             <p className="mt-3 text-lg text-[#667085]">{tabCopy[active].sub}</p>

//             <AnimatePresence mode="wait">
//               <motion.ul
//                 key={active}
//                 initial={reduce ? false : { opacity: 0, y: 8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={reduce ? undefined : { opacity: 0, y: -8 }}
//                 transition={{ duration: 0.25 }}
//                 className="mt-8 space-y-4"
//               >
//                 {tabCopy[active].points.map(({ icon: Icon, text }) => (
//                   <li key={text} className="flex gap-3">
//                     <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ECFDFF] text-[#16B2C3]">
//                       <Icon className="h-4 w-4" aria-hidden />
//                     </span>
//                     <p className="text-[15px] leading-relaxed text-[#344054]">
//                       {text}
//                     </p>
//                   </li>
//                 ))}
//               </motion.ul>
//             </AnimatePresence>

//             <p className="mt-10 text-base font-semibold text-[#101828]">
//               Structured prioritization guides timely intervention.
//             </p>
//           </div>

//           <motion.div
//             initial={reduce ? false : { opacity: 0, x: 16 }}
//             whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.45 }}
//             className="rounded-2xl border border-[#E4E7EC] bg-[#F9FAFB] p-6 shadow-sm"
//           >
//             <div className="flex items-center justify-between gap-3">
//               <h3 className="text-sm font-semibold text-[#101828]">
//                 Decision Center
//               </h3>
//               <ShieldCheck className="h-5 w-5 text-[#16B2C3]" aria-hidden />
//             </div>
//             <p className="mt-1 text-xs text-[#667085]">
//               Live queue · last updated Jan 14, 2024
//             </p>
//             <div className="mt-5 divide-y divide-[#E4E7EC] rounded-xl border border-[#E4E7EC] bg-white">
//               {decisionRows.map((row, i) => (
//                 <motion.div
//                   key={row.id}
//                   initial={reduce ? false : { opacity: 0, x: -8 }}
//                   whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: reduce ? 0 : i * 0.06, duration: 0.35 }}
//                   className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
//                 >
//                   <div>
//                     <p className="text-sm font-medium text-[#101828]">
//                       {row.name}
//                     </p>
//                     <p className="text-xs text-[#667085]">{row.id}</p>
//                   </div>
//                   <span
//                     className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${row.tone}`}
//                   >
//                     {row.status}
//                   </span>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </MotionSection>
//   );
// }












"use client"
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "detect" | "decide" | "control";

interface AccountNode {
  id: number;
  x: number;
  y: number;
  signal: string;
  segment: string;
  riskState: "stable" | "watch" | "accelerating" | "high";
  migrationProb: number;
}

const GRID = 10;
const TOTAL = GRID * GRID;

const generateAccounts = (): AccountNode[] => {
  const segments = ["Housing", "MSME", "Auto", "LAP", "Personal"];
  const signals = ["Payment volatility", "Bureau exposure increase", "LTV change", "Anomaly cluster", "Repayment deviation"];
  return Array.from({ length: TOTAL }, (_, i) => {
    const rand = Math.random();
    const riskState: AccountNode["riskState"] =
      rand < 0.55 ? "stable" : rand < 0.75 ? "watch" : rand < 0.9 ? "accelerating" : "high";
    return {
      id: i,
      x: (i % GRID) * 1,
      y: Math.floor(i / GRID) * 1,
      signal: signals[i % signals.length],
      segment: segments[i % segments.length],
      riskState,
      migrationProb: riskState === "high" ? 14 + Math.floor(Math.random() * 10) : riskState === "accelerating" ? 7 + Math.floor(Math.random() * 8) : Math.floor(Math.random() * 5),
    };
  });
};

const riskColors: Record<string, string> = {
  stable: "bg-risk-stable",
  watch: "bg-risk-watch",
  accelerating: "bg-risk-accelerating",
  high: "bg-risk-high",
};

const phaseContent: Record<Phase, { heading: string; sub: string; bullets: string[] }> = {
  detect: {
    heading: "Detect",
    sub: "Identify emerging risk signals before delinquency",
    bullets: [
      "Behavioural shifts detection (repayment, utilisation, cashflow patterns)",
      "Signal clustering across customers & cohorts",
      "Customer → loan-level risk propagation ",
      "Multi-bureau & credit activity changes (scores, enquiries, exposure)",
      "External stress overlays (industry, geo, macro signals)"
      ,
    ],
  },
  decide: {
    heading: "Decide",
    sub: "Model where the portfolio is moving ",
    bullets: [
      "Risk segmentation across portfolio states (Stable, Watch, Accelerating, High Risk)",
      "Forward flow tracking across risk buckets",
      "Trajectory-based risk movement at loan level",
      "Anomaly cluster identification before escalation",
    ],
  },
  control: {
    heading: "Control",
    sub: "Translate intelligence into disciplined intervention",
    bullets: [
      "Risk-based prioritisation of accounts ",
      "Intervention queues with ownership & SLA tracking",
      "Action triggers across collections, risk & compliance ",
      "Workflow-driven escalation with audit trails",
      "Intervention effectiveness & feedback loops",
      "Governance layer with policies, controls & oversight"
    ],
  },
};

const narrativeCaptions: Record<Phase, string> = {
  detect: "Signals emerge across the portfolio before delinquency moves.",
  decide: "Trajectory intelligence reveals where the portfolio is moving.",
  control: "Structured prioritisation guides timely intervention.",
};

// --- Detect View ---
const DetectView = ({ accounts, hoveredId, setHoveredId }: { accounts: AccountNode[]; hoveredId: number | null; setHoveredId: (id: number | null) => void }) => (
  <div className="relative">
    <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)` }}>
      {accounts.map((a) => {
        const isSignal = a.riskState !== "stable";
        return (
          <motion.div
            key={a.id}
            className={`aspect-square rounded-sm cursor-pointer relative ${isSignal ? (a.riskState === "high" ? "bg-risk-accelerating" : "bg-primary/30") : "bg-muted"}`}
            animate={isSignal ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
            transition={isSignal ? { duration: 2.505, repeat: Infinity, ease: "easeInOut", delay: a.id * 0.03 } : {}}
            onMouseEnter={() => setHoveredId(a.id)}
            onMouseLeave={() => setHoveredId(null)}
          />
        );
      })}
    </div>
    <AnimatePresence>
      {hoveredId !== null && (() => {
        const a = accounts[hoveredId];
        if (!a || a.riskState === "stable") return null;
        return (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.205 }}
            className="absolute top-0 right-0 -mr-2 -mt-2 bg-foreground text-primary-foreground text-xs rounded-lg p-3 shadow-lg min-w-[180px] z-10"
          >
            <p className="font-medium mb-1">Account #{a.id}</p>
            <p className="opacity-70">{a.segment}</p>
            <p className="opacity-70 mt-1">Signal: {a.signal}</p>
          </motion.div>
        );
      })()}
    </AnimatePresence>
  </div>
);

// --- Decide View ---
const DecideView = ({ accounts }: { accounts: AccountNode[] }) => {
  const groups = useMemo(() => {
    const g: Record<string, AccountNode[]> = { stable: [], watch: [], accelerating: [], high: [] };
    accounts.forEach((a) => g[a.riskState].push(a));
    return g;
  }, [accounts]);

  const labels: Record<string, string> = { stable: "Stable", watch: "Watch", accelerating: "Accelerating", high: "High Risk" };

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex gap-4 flex-wrap mb-2">
        {Object.entries(labels).map(([key, label]) => (
          <div key={key} className="flex  items-center gap-1.5">
            <div className={`w-3 h-3 rounded-sm ${riskColors[key]}`} />
            <span className="es-caption">{label}</span>
          </div>
        ))}
      </div>

      {Object.entries(groups).map(([state, nodes]) => (
        <motion.div
          key={state}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: state === "stable" ? 0 : state === "watch" ? 0.1 : state === "accelerating" ? 0.2 : 0.3, duration: 0.405 }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-foreground">{labels[state]}</span>
            <span className="es-caption">{nodes.length} accounts</span>
          </div>
          <div className="flex gap-0.5 flex-wrap">
            {nodes.slice(0, 30).map((n) => (
              <div key={n.id} className={`w-3 h-3 rounded-[2px] ${riskColors[state]}`} />
            ))}
            {state !== "stable" && nodes.length > 30 && (
              <span className="es-caption self-center ml-1">+{nodes.length - 30}</span>
            )}
          </div>
        </motion.div>
      ))}

      {/* Migration arrows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.305 }}
        className="mt-4 p-4 border border-border rounded-lg bg-muted/50"
      >
        <p className="text-xs font-medium text-foreground mb-2">Migration Flow</p>
        <div className="flex flex-col gap-2.5 text-xs text-muted-foreground sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-8 sm:gap-y-2">
          <span className="inline-flex flex-wrap items-baseline gap-x-1.5">
            <span className="font-medium text-foreground">Stable</span>
            {/* <span className="text-primary">→ 8%</span> */}
          </span>
          <span className="inline-flex flex-wrap items-baseline gap-x-1.5">
            <span className="font-medium text-foreground">Watch</span>
            {/* <span className="text-risk-accelerating-text">→ 14%</span> */}
          </span>
          <span className="inline-flex flex-wrap items-baseline gap-x-1.5">
            <span className="font-medium text-foreground">Accelerating</span>
            {/* <span className="text-risk-high-text">→ 6%</span> */}
          </span>
          <span className="font-medium text-foreground">High</span>
        </div>
      </motion.div>
    </div>
  );
};

// --- Control View ---
const ControlView = ({ accounts }: { accounts: AccountNode[] }) => {
  const priorityQueue = useMemo(
    () => accounts.filter((a) => a.riskState === "high" || a.riskState === "accelerating").sort((a, b) => b.migrationProb - a.migrationProb).slice(0, 5),
    [accounts]
  );

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.305 }}
        className="p-4 border border-primary/20 rounded-lg bg-primary/5"
      >
        <p className="text-xs font-semibold text-primary mb-3">Priority Intervention Queue</p>
        <div className="space-y-2">
          {priorityQueue.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.305 }}
              className="flex items-center justify-between py-2 px-3 rounded-md bg-background border border-border"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-muted-foreground w-5">#{i + 1}</span>
                <div>
                  <p className="text-xs font-medium text-foreground">Account {a.id} · {a.segment}</p>
                  <p className="text-[11px] text-muted-foreground">{a.signal}</p>
                </div>
              </div>
              <div className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${a.riskState === "high" ? "bg-risk-high text-risk-high-text" : "bg-risk-accelerating text-risk-accelerating-text"}`}>
                {a.migrationProb}% migration
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.305 }}
        className="grid grid-cols-2 gap-3"
      >
        <div className="p-4 border border-border rounded-lg">
          <p className="text-[11px] text-muted-foreground mb-1">Accounts Prioritised</p>
          <p className="text-2xl font-semibold text-foreground">{priorityQueue.length}</p>
        </div>
        <div className="p-4 border border-border rounded-lg">
          <p className="text-[11px] text-muted-foreground mb-1">Projected Flow Reduction</p>
          <p className="text-2xl font-semibold text-primary">−23%</p>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Component ---
const ScrollNarrative = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("detect");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const accounts = useMemo(() => generateAccounts(), []);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionHeight = rect.height;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight - window.innerHeight)));

    if (progress < 0.33) setPhase("detect");
    else if (progress < 0.66) setPhase("decide");
    else setPhase("control");
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section ref={sectionRef} className="relative" style={{ minHeight: "300vh" }}>
      <div className="sticky top-0 flex min-h-screen items-center py-12">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          {/* Phase tabs */}
          <div className="mb-10 flex w-fit gap-1 rounded-lg bg-muted p-1">
            {(["detect", "decide", "control"] as Phase[]).map((p) => (
              <button
                key={p}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                  phase === p ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                }`}
                onClick={() => setPhase(p)}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            {/* Left - copy; aligns to vertical center of visual on large screens */}
            <div className="flex min-h-0 w-full flex-col lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={phase}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.355 }}
                >
                  <h2 className="text-[52px] text-[#15B5C1] mb-3  font-bold">{phaseContent[phase].heading}</h2>
                  <p className="es-heading-sub text-muted-foreground mb-6">{phaseContent[phase].sub}</p>
                  <ul className="space-y-3 mb-8">
                    {phaseContent[phase].bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-foreground font-medium italic">{narrativeCaptions[phase]}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right - visual panel */}
            <div className="flex w-full min-h-[min(420px,55vh)] flex-col lg:col-span-7">
              <div className="flex min-h-[min(420px,55vh)] w-full flex-1 flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
                <AnimatePresence mode="wait">
                  {phase === "detect" && (
                    <motion.div
                      key="detect"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.305 }}
                    >
                      <DetectView accounts={accounts} hoveredId={hoveredId} setHoveredId={setHoveredId} />
                    </motion.div>
                  )}
                  {phase === "decide" && (
                    <motion.div
                      key="decide"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.305 }}
                    >
                      <DecideView accounts={accounts} />
                    </motion.div>
                  )}
                  {phase === "control" && (
                    <motion.div
                      key="control"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.305 }}
                    >
                      <ControlView accounts={accounts} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollNarrative;

