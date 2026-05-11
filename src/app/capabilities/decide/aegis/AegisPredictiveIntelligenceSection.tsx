"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useId } from "react";

const cardEase = [0.22, 1, 0.36, 1] as const;

/** Isometric-style vertical bars with perspective (top + right faces). */
function PrescriptiveGuidanceBarChart({ barHeights }: { barHeights: number[] }) {
  const yBase = 48;
  const barW = 6;
  const gap = 4.5;
  const depth = 2.2;
  const skewDeg = -7;

  return (
    <svg viewBox="0 0 138 56" className="h-16 w-full max-w-[200px]" fill="none" aria-hidden>
      <line x1="2" y1={yBase} x2="134" y2={yBase} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <g transform={`skewX(${skewDeg}) translate(6 0)`}>
        {barHeights.map((h, i) => {
          const x = 4 + i * (barW + gap);
          const yt = yBase - h;
          const front = i % 2 === 0 ? "#00C2CB" : "#2a9daa";
          const top = i % 2 === 0 ? "#33d6de" : "#3db8c4";
          const right = i % 2 === 0 ? "#0099a1" : "#1e7c87";
          return (
            <motion.g
              key={i}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.42, ease: cardEase, delay: 0.035 * i }}
              style={{ transformOrigin: `${x + barW / 2}px ${yBase}px` }}
            >
              <path
                d={`M ${x} ${yt} L ${x + depth} ${yt - depth * 0.85} L ${x + barW + depth} ${yt - depth * 0.85} L ${x + barW} ${yt} Z`}
                fill={top}
              />
              <path
                d={`M ${x + barW} ${yt} L ${x + barW + depth} ${yt - depth * 0.85} L ${x + barW + depth} ${yBase - depth * 0.85} L ${x + barW} ${yBase} Z`}
                fill={right}
              />
              <rect x={x} y={yt} width={barW} height={h} rx={1} fill={front} />
            </motion.g>
          );
        })}
      </g>
    </svg>
  );
}

function Panel({
  title,
  children,
  footer,
  bulletList,
  bulletColumns,
}: {
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
  bulletList?: string[];
  bulletColumns?: [string[], string[]];
}) {
  return (
    <motion.div
      className="rounded-xl border border-white/[0.07] bg-white/[0.035] p-4 sm:p-5"
      initial={false}
      whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.06)" }}
      transition={{ duration: 0.22, ease: cardEase }}
    >
      <h3 className="text-[13px] font-semibold tracking-tight text-white sm:text-sm">{title}</h3>

      {bulletList ? (
        <ul className="mt-3 space-y-1.5 text-[12px] leading-snug text-white/70 sm:text-[13px]">
          {bulletList.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#00C2CB]" aria-hidden />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {bulletColumns ? (
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[12px] leading-snug text-white/70 sm:text-[13px]">
          <ul className="space-y-1.5">
            {bulletColumns[0].map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#00C2CB]" aria-hidden />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <ul className="space-y-1.5">
            {bulletColumns[1].map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#00C2CB]" aria-hidden />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {footer ? <div className="mt-4 flex min-h-[72px] items-end justify-center sm:min-h-[80px]">{footer}</div> : null}
      {children}
    </motion.div>
  );
}

export default function AegisPredictiveIntelligenceSection() {
  const uid = useId().replace(/:/g, "");
  const outcomeFill = `intel-outcome-fill-${uid}`;
  const outcomeLine = `M4 40 L28 34 L52 28 L76 18 L100 10 L116 6`;
  const outcomeArea = `${outcomeLine} L116 46 L4 46 Z`;
  const riskFill = `intel-risk-fill-${uid}`;
  const riskLine = "M4 34 C24 30 40 14 56 22 C72 30 88 10 104 18 C120 26 136 12 156 8";
  const riskArea = `${riskLine} L156 46 L4 46 Z`;

  const prescriptiveBarHeights = [9, 16, 11, 21, 13, 19, 14, 25, 10, 18, 12, 22];

  return (
    <section className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12 pb-24 sm:pb-28">
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: cardEase }}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#64748b] sm:text-xs">Intelligence</p>
        <h2 className="mt-4 font-heading text-3xl font-bold leading-[1.15] tracking-tight text-brand-ink sm:text-4xl md:text-5xl">
          Predictive intelligence <span className="text-[#00C2CB]">across the portfolio</span>
        </h2>
        <p className="mt-5 es-body mx-auto max-w-2xl text-[#64748b]">
          A focused intelligence surface — tuned to the decisions your teams actually make.
        </p>
      </motion.div>

      <motion.div
        className="mt-10 rounded-[20px] border border-[#243547] bg-[#1A2B3C] p-4 sm:p-6 lg:p-8"
        style={{ boxShadow: "0 20px 50px rgba(0, 0, 0, 0.18)" }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.55, ease: cardEase, delay: 0.05 }}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Panel
            bulletList={["Pre-bounce likelihood", "Flow-forward across delinquency buckets"]}
            title="Outcome Prediction"
            footer={
              <svg viewBox="0 0 120 52" className="h-14 w-full max-w-[150px]" fill="none" aria-hidden>
                <defs>
                  <linearGradient id={outcomeFill} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00C2CB" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#00C2CB" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d={outcomeArea}
                  fill={`url(#${outcomeFill})`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                />
                <motion.path
                  d={outcomeLine}
                  stroke="#00C2CB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                />
              </svg>
            }
          />

          <Panel
            title="Dynamic Prioritisation"
            bulletList={["Bucket movement", "Portfolio quality trends"]}
            footer={
              <div className="flex w-full max-w-[168px] flex-col gap-2.5">
                <div className="h-2 overflow-hidden rounded-full bg-black/25">
                  <motion.div
                    className="h-full rounded-full bg-[#00C2CB]"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "78%" }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.9, ease: cardEase, delay: 0.2 }}
                  />
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-black/25">
                  <motion.div
                    className="h-full rounded-full bg-[#0d7a82]"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "52%" }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.9, ease: cardEase, delay: 0.35 }}
                  />
                </div>
              </div>
            }
          />

          <Panel
            title="Prescriptive Guidance"
            bulletList={["When to act", "Which accounts to priorities"]}
            footer={<PrescriptiveGuidanceBarChart barHeights={prescriptiveBarHeights} />}
          />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Panel
            title="Risk Trajectories"
            bulletColumns={[
              ["Improving", "Stable"],
              ["Deteriorating", "Volatile"],
            ]}
            footer={
              <svg viewBox="0 0 160 52" className="h-14 w-full max-w-[210px]" fill="none" aria-hidden>
                <defs>
                  <linearGradient id={riskFill} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00C2CB" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#00C2CB" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d={riskArea}
                  fill={`url(#${riskFill})`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
                />
                <motion.path
                  d={riskLine}
                  stroke="#00C2CB"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
                />
              </svg>
            }
          />

          <Panel
            title="Portfolio Forecasting"
            bulletList={["Bucket movement", "Segment performance", "Portfolio quality trends"]}
            footer={<div className="min-h-[48px]" aria-hidden />}
          />
        </div>
      </motion.div>
    </section>
  );
}
