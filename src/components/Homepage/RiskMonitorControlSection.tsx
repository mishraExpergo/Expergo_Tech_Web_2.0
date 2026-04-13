"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

/** Initial x/y offset so cards appear stacked at the orbit center, then settle into corners. */
const cards = [
  {
    num: "1",
    text: "DPD is lagging",
    position: "md:absolute md:left-0 md:top-[10%] md:max-w-[min(240px,42%)]",
    enterFrom: { x: 200, y: 120 },
  },
  {
    num: "2",
    text: "Portfolio momentum forms earlier",
    position: "md:absolute md:right-0 md:top-[10%] md:max-w-[min(260px,44%)]",
    enterFrom: { x: -210, y: 125 },
  },
  {
    num: "3",
    text: "Collections capacity is finite",
    position: "md:absolute md:left-0 md:bottom-[10%] md:max-w-[min(260px,42%)]",
    enterFrom: { x: 200, y: -125 },
  },
  {
    num: "4",
    text: "Capital impact compounds",
    position: "md:absolute md:right-0 md:bottom-[10%] md:max-w-[min(240px,42%)]",
    enterFrom: { x: -200, y: -120 },
  },
] as const;

const scrollEnterTransition = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1] as const,
};

const cardHover = {
  scale: 1.05,
  y: -6,
  boxShadow:
    "0 25px 50px -12px rgb(0 0 0 / 0.2), 0 0 0 1px rgba(20, 184, 166, 0.2), 0 0 28px -8px rgba(20, 184, 166, 0.25)",
  transition: { duration: 0.3, ease: "easeInOut" as const },
};

type InsightCardProps = {
  num: string;
  text: string;
  className: string;
  index: number;
  /** Offset from final position toward orbit center (desktop); mobile uses a shared vertical pull. */
  enterFrom: { x: number; y: number };
  enterVariant: "desktop" | "mobile";
};

function InsightCard({ num, text, className, index, enterFrom, enterVariant }: InsightCardProps) {
  const fromCenter =
    enterVariant === "mobile"
      ? { x: 0, y: 56 }
      : { x: enterFrom.x, y: enterFrom.y };

  return (
    <motion.article
      className={`group will-change-transform cursor-default rounded-xl border border-gray-100/80 bg-white p-4 shadow-md transition-colors duration-300 ease-in-out hover:border-[#14B8A6]/25 md:p-5 ${className}`}
      initial={{ opacity: 0, x: fromCenter.x, y: fromCenter.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      transition={{
        ...scrollEnterTransition,
        delay: index * 0.1,
      }}
      whileHover={cardHover}
      whileTap={{ scale: 1.02, y: -2, transition: { duration: 0.15 } }}
    >
      <div className="flex items-start gap-3 md:gap-4">
        <span
          className="select-none text-4xl font-bold leading-none text-gray-200 transition-colors duration-300 ease-in-out group-hover:text-[#14B8A6]/35 md:text-5xl"
          aria-hidden
        >
          {num}
        </span>
        <div className="min-w-0 flex-1 pt-1">
          <p className="text-sm font-semibold leading-snug text-[#14B8A6] md:text-base">{text}</p>
          <div className="mt-2 h-[2px] w-3/4 max-w-44 origin-left rounded-full bg-[#14B8A6]/90 transition-[width,transform] duration-300 ease-in-out group-hover:w-full group-hover:max-w-none" />
        </div>
      </div>
    </motion.article>
  );
}

export function RiskMonitorControlSection() {
  return (
    <section
      className="font-heading mb-16 md:mb-20 lg:mb-24"
      aria-labelledby="risk-monitor-control-heading"
    >
      <motion.h2
        id="risk-monitor-control-heading"
        className="es-heading-hero mx-auto max-w-4xl text-center font-bold text-[#111827]"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
      >
        Most risk frameworks monitor. <span className="text-[#14B8A6]">Few control.</span>
      </motion.h2>

      {/* Mobile: stacked */}
      <div className="mt-10 space-y-4 md:hidden">
        <div className="relative mx-auto flex max-w-sm flex-col items-center justify-center py-8">
          <ConcentricShieldGraphic className="scale-90" />
        </div>
        <div className="mx-auto grid max-w-md gap-4">
          {cards.map((c, i) => (
            <InsightCard
              key={c.num}
              num={c.num}
              text={c.text}
              className=""
              index={i}
              enterFrom={c.enterFrom}
              enterVariant="mobile"
            />
          ))}
        </div>
      </div>

      {/* Desktop: orbit layout */}
      <div className="relative mx-auto mt-14 hidden min-h-[480px] w-full max-w-5xl md:block lg:mt-16 lg:min-h-[520px]">
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 flex h-[min(90vw,420px)] w-[min(90vw,420px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center lg:h-[440px] lg:w-[440px]">
          <svg
            className="absolute inset-0 h-full w-full text-sky-200"
            viewBox="0 0 400 400"
            fill="none"
            aria-hidden
          >
            <circle cx="200" cy="200" r="188" stroke="currentColor" strokeWidth="1.25" opacity="0.85" />
            <circle cx="200" cy="200" r="152" stroke="currentColor" strokeWidth="1" opacity="0.7" />
            <circle cx="200" cy="200" r="118" stroke="currentColor" strokeWidth="1" opacity="0.55" />
            <circle cx="200" cy="200" r="84" stroke="#7DD3FC" strokeWidth="1" opacity="0.5" />
          </svg>
          <div className="relative z-[1] flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-cyan-100 via-cyan-50 to-sky-100 shadow-[0_0_48px_rgba(34,211,238,0.35)] ring-1 ring-cyan-200/60 lg:h-36 lg:w-36">
            <Shield className="h-14 w-14 text-[#15B5C1] lg:h-16 lg:w-16" strokeWidth={1.35} aria-hidden />
          </div>
        </div>

        {cards.map((c, i) => (
          <InsightCard
            key={c.num}
            num={c.num}
            text={c.text}
            className={`relative z-10 ${c.position}`}
            index={i}
            enterFrom={c.enterFrom}
            enterVariant="desktop"
          />
        ))}
      </div>
    </section>
  );
}

function ConcentricShieldGraphic({ className }: { className?: string }) {
  return (
    <div className={`relative flex h-[280px] w-[280px] items-center justify-center ${className ?? ""}`}>
      <svg
        className="absolute inset-0 h-full w-full text-sky-200"
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden
      >
        <circle cx="200" cy="200" r="188" stroke="currentColor" strokeWidth="1.25" opacity="0.85" />
        <circle cx="200" cy="200" r="152" stroke="currentColor" strokeWidth="1" opacity="0.7" />
        <circle cx="200" cy="200" r="118" stroke="currentColor" strokeWidth="1" opacity="0.55" />
        <circle cx="200" cy="200" r="84" stroke="#7DD3FC" strokeWidth="1" opacity="0.5" />
      </svg>
      <div className="relative z-[1] flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-cyan-100 via-cyan-50 to-sky-100 shadow-[0_0_40px_rgba(34,211,238,0.35)] ring-1 ring-cyan-200/60">
        <Shield className="h-12 w-12 text-[#2563EB]" strokeWidth={1.35} aria-hidden />
      </div>
    </div>
  );
}
