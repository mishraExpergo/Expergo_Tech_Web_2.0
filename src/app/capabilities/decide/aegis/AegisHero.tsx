"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BookDemoButton } from "@/components/book-demo/BookDemoProvider";

/** Figma hero frame (node 5507-4634) — layout & color tokens */
const FIGMA = {
  containerMax: 1475,
  ink: "#000000",
  teal: "#15B5C1",
  gray: "#666666",
  gradient: "linear-gradient(180deg, #15B5C1 0%, #666666 100%)",
  accentBlue: "#1D70F2",
  accentMuted: "#7695C0",
  body: "#1F1F1F",
  diagramLabel: "#98A2B3",
  signalInk: "#101828",
} as const;

const gradientTextStyle = {
  backgroundImage: FIGMA.gradient,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

const SIGNALS = [
  { label: "Repayment", dotY: 40, path: "M 118 40 Q 188 38 228 88" },
  { label: "Bureau", dotY: 90, path: "M 118 90 Q 195 90 228 108" },
  { label: "Collections", dotY: 140, path: "M 118 140 Q 198 140 228 132" },
  { label: "HUMINT", dotY: 190, path: "M 118 190 Q 198 190 228 152" },
  { label: "Documents", dotY: 240, path: "M 118 240 Q 188 242 228 172" },
] as const;

const CENTER = { x: 280, y: 132, r: 54 };
/** Desktop — extra right inset so “Understanding Behaviour” is not clipped */
const DESKTOP_DIAGRAM_VIEWBOX = { w: 660, h: 280 };
/** Tighter crop on mobile so the diagram scales up within the viewport */
const MOBILE_DIAGRAM_VIEWBOX = { w: 500, h: 280 };
const easeOut = [0.22, 1, 0.36, 1] as const;

type SignalsDiagramProps = {
  viewBox: { w: number; h: number };
  signalLabelClass: string;
  centerLabelClass: string;
  outcomeLabelClass: string;
  dotRadius: number;
  pathStrokeWidth: number;
  arrowMarkerId: string;
  outputArrowPath?: string;
  outcomeTextX?: number;
  preserveAspectRatio?: string;
  className?: string;
};

function SignalsUnderstandingDiagram({
  viewBox,
  signalLabelClass,
  centerLabelClass,
  outcomeLabelClass,
  dotRadius,
  pathStrokeWidth,
  arrowMarkerId,
  outputArrowPath = "M 334 132 L 378 132",
  outcomeTextX = 388,
  preserveAspectRatio = "xMidYMid meet",
  className = "",
}: SignalsDiagramProps) {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox={`0 0 ${viewBox.w} ${viewBox.h}`}
      className={className}
      fill="none"
      preserveAspectRatio={preserveAspectRatio}
      aria-hidden
      role="presentation"
    >
      {SIGNALS.map((signal, i) => (
        <g key={signal.label}>
          <motion.text
            x="0"
            y={signal.dotY + 5}
            fill={FIGMA.signalInk}
            className={signalLabelClass}
            initial={reduceMotion ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.18 + i * 0.08, ease: easeOut }}
          >
            {signal.label}
          </motion.text>
          <motion.circle
            cx="118"
            cy={signal.dotY}
            r={dotRadius}
            fill={FIGMA.accentBlue}
            initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.22 + i * 0.08, ease: easeOut }}
          />
          {!reduceMotion && (
            <motion.circle
              cx="118"
              cy={signal.dotY}
              r={dotRadius}
              fill={FIGMA.accentBlue}
              animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.28,
                ease: "easeOut",
              }}
              style={{ transformOrigin: `118px ${signal.dotY}px` }}
            />
          )}
          <motion.path
            d={signal.path}
            stroke={FIGMA.teal}
            strokeWidth={pathStrokeWidth}
            strokeLinecap="round"
            initial={
              reduceMotion
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0.4 }
            }
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 0.85, delay: 0.32 + i * 0.1, ease: easeOut },
              opacity: { duration: 0.35, delay: 0.32 + i * 0.1 },
            }}
          />
        </g>
      ))}

      <motion.circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={CENTER.r}
        fill={FIGMA.teal}
        initial={reduceMotion ? { scale: 1, opacity: 1 } : { scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.78, ease: easeOut }}
        style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
      />
      {!reduceMotion && (
        <motion.circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={CENTER.r}
          stroke={FIGMA.teal}
          strokeWidth="2"
          fill="none"
          initial={{ scale: 1, opacity: 0.4 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 1 }}
          style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
        />
      )}
      <text
        x={CENTER.x}
        y={CENTER.y - 6}
        textAnchor="middle"
        fill="white"
        className={centerLabelClass}
      >
        Aegis
      </text>
      <text
        x={CENTER.x}
        y={CENTER.y + 10}
        textAnchor="middle"
        fill="white"
        className={centerLabelClass}
      >
        Interpret
      </text>

      <motion.path
        d={outputArrowPath}
        stroke={FIGMA.teal}
        strokeWidth={pathStrokeWidth}
        strokeLinecap="round"
        markerEnd={`url(#${arrowMarkerId})`}
        initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, delay: 1.05, ease: easeOut }}
      />
      <defs>
        <marker
          id={arrowMarkerId}
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0 0 L8 4 L0 8 Z" fill={FIGMA.teal} />
        </marker>
      </defs>

      <motion.text
        x={outcomeTextX}
        y="128"
        fill={FIGMA.signalInk}
        className={outcomeLabelClass}
        initial={reduceMotion ? false : { opacity: 0, x: 6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 1.12, ease: easeOut }}
      >
        Understanding
      </motion.text>
      <motion.text
        x={outcomeTextX}
        y="146"
        fill={FIGMA.signalInk}
        className={outcomeLabelClass}
        initial={reduceMotion ? false : { opacity: 0, x: 6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 1.12, ease: easeOut }}
      >
        Behaviour
      </motion.text>
    </svg>
  );
}

export default function AegisHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative bg-white pt-[72px] pb-[56px] sm:pt-[80px] sm:pb-[64px] lg:pt-[88px] lg:pb-[72px]"
      aria-labelledby="aegis-hero-heading"
    >
      <div
        className="relative z-10 mx-auto flex w-full max-w-[1475px] flex-col gap-10 px-6 sm:gap-12 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-14 xl:px-16"
      >
        {/* Left — ~60% (Figma) */}
        <div className="w-full min-w-0 lg:flex-[1.15] lg:max-w-[58%]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: easeOut }}
            className="mb-6 flex items-center gap-2"
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: FIGMA.teal }}
              aria-hidden
            />
            <span
              className="font-sans text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: FIGMA.ink }}
            >
              Interpretation
            </span>
          </motion.div>

          <motion.h1
            id="aegis-hero-heading"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06, ease: easeOut }}
            className="font-heading text-[36px] font-bold uppercase leading-[1.08] tracking-tight sm:text-[40px] lg:text-[44px]"
            style={{ color: FIGMA.ink }}
          >
            Understand what is
            <br />
            <span style={gradientTextStyle}>happening across</span>
            <br />
            your portfolio
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14, ease: easeOut }}
            className="mt-8 max-w-[560px] font-sans text-[18px] font-normal leading-[1.55] lg:text-[20px]"
            style={{ color: FIGMA.body }}
          >
            Aegis enables lending teams to interpret borrower behaviour, connect signals, and build a
            clear understanding of portfolio risk formation.
          </motion.p>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
            className="mt-5 max-w-[560px] font-sans text-[18px] font-normal leading-[1.55] lg:text-[20px]"
            style={{ color: FIGMA.accentMuted }}
          >
            Built for Risk, Collections, Credit and Underwriting leaders who need clarity on why
            accounts are behaving the way they are and what patterns are emerging.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: easeOut }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <BookDemoButton
              mode="demo"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#1D70F2] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1864db]"
            >
              Request a Demo
            </BookDemoButton>
            <Link
              href="/use-cases"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border bg-white px-8 py-3 text-sm font-medium transition-colors hover:bg-[#F9FAFB]"
              style={{ borderColor: FIGMA.ink, color: FIGMA.ink }}
            >
              Explore Use Cases
            </Link>
          </motion.div>
        </div>

        {/* Right — ~40% (Figma) */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.12, ease: easeOut }}
          className="w-full min-w-0 lg:flex-[0.85] lg:max-w-[42%] lg:overflow-visible"
        >
          <p
            className="mb-4 text-center font-sans text-[10px] font-semibold uppercase tracking-[0.2em] lg:text-left"
            style={{ color: FIGMA.diagramLabel }}
          >
            Signals — Understanding
          </p>

          {/* Mobile — larger readable diagram, fit within viewport */}
          <div className="w-full overflow-hidden lg:hidden">
            <SignalsUnderstandingDiagram
              viewBox={MOBILE_DIAGRAM_VIEWBOX}
              signalLabelClass="font-sans text-[18px] font-medium"
              centerLabelClass="font-heading text-[12px] font-bold uppercase"
              outcomeLabelClass="font-sans text-[16px] font-semibold"
              dotRadius={5}
              pathStrokeWidth={2}
              arrowMarkerId="aegis-hero-arrow-mobile"
              outputArrowPath="M 334 132 L 356 132"
              outcomeTextX={372}
              className="mx-auto h-auto w-full max-w-full"
            />
          </div>

          {/* Desktop */}
          <div className="hidden w-full overflow-visible lg:block">
            <SignalsUnderstandingDiagram
              viewBox={DESKTOP_DIAGRAM_VIEWBOX}
              preserveAspectRatio="xMinYMid meet"
              signalLabelClass="font-sans text-[14px] font-medium"
              centerLabelClass="font-heading text-[10px] font-bold uppercase"
              outcomeLabelClass="font-sans text-[13px] font-semibold"
              dotRadius={4}
              pathStrokeWidth={1.5}
              arrowMarkerId="aegis-hero-arrow-desktop"
              className="h-auto w-full max-w-full overflow-visible lg:mx-0"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
