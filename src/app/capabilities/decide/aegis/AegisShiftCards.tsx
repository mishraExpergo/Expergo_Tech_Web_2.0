"use client";

import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/** Figma-aligned tokens */
const WHITE = "#FFFFFF";

/** First card — compact Figma card 01 */
const FIGMA_C1_PANEL = WHITE;
const FIGMA_C1_STAT = "#1A56DB";
const FIGMA_C1_STAT_SUB = "#344054";
const FIGMA_C1_TITLE = "#1A56DB";
const FIGMA_C1_CHEVRON = "#1A56DB";
const FIGMA_C1_SECTION = "#101828";
const FIGMA_C1_BODY = "#344054";
const FIGMA_C1_INDEX = "#D0D5DD";
const FIGMA_C1_RULE = "#E5E7EB";
/** Vertical rule between left panel and copy — 1.5px linear gradient (Figma: #0B64F4 → #15B5C1) */
const FIGMA_C1_PARTITION = "linear-gradient(180deg, #0B64F4 0%, #15B5C1 100%)";
/** Keeps the rule clipped to the card row (no gradient bleed past rounded / grid bounds). */
const PARTITION_RULE_STYLE = {
  backgroundImage: FIGMA_C1_PARTITION,
  backgroundSize: "100% 100%",
  backgroundRepeat: "no-repeat",
} satisfies CSSProperties;
const FIGMA_C1_WATERMARK = "#E2E8F0";
const FIGMA_C1_WHY_ACCENT = "#14B8A6";
/** Card 03 — light frame around illustration (Figma) */
const FIGMA_C3_ILLUSTRATION_FRAME = "#93C5FD";
/** White panel + shadow around hero metric on blue column */
const FIGMA_C1_STAT_SURFACE =
  "relative w-full rounded-lg bg-white py-2.5 pl-3 pr-10 shadow-[0_2px_12px_rgba(15,23,42,0.1)] sm:py-3 sm:pl-3.5 sm:pr-12";

type PointerSide = "left" | "right";

type ShiftCardData = {
  key: string;
  visualFirst: boolean;
  pointer: PointerSide;
  indexLabel: string;
  metric: string;
  metricSub: string;
  title: string;
  problem: string;
  whatLines: readonly string[];
  why: string;
  illustration: ReactNode;
};

function ShiftColFromLeft({ className, style, children }: { className?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, x: -64 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.18, margin: "-80px 0px -40px 0px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ShiftColFromRight({ className, style, children }: { className?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, x: 64 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.18, margin: "-80px 0px -40px 0px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ShiftCardRowFirst({ data }: { data: ShiftCardData }) {
  const labelClass =
    "font-heading text-[10.5px] font-bold uppercase tracking-[0.14em] sm:text-[11px]";
  const chevronClass = "font-heading text-[10px] font-bold leading-none sm:text-[10.5px]";
  const labelRow = "flex items-baseline gap-x-1";
  const listRow = "flex gap-2.5 text-left";

  return (
    <article className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white md:grid md:grid-cols-[minmax(0,1fr)_1.5px_minmax(0,1fr)] md:items-stretch md:gap-0">
      <ShiftColFromLeft
        className="relative flex min-h-0 flex-col overflow-visible px-5 pb-5 pt-5 md:h-full md:min-h-0 md:rounded-l-xl md:px-5 md:pb-5 md:pt-5"
        style={{ backgroundColor: FIGMA_C1_PANEL }}
      >
        <div className="relative z-[1] w-full shrink-0">
          <div className={FIGMA_C1_STAT_SURFACE}>
            <span
              className="pointer-events-none absolute right-2 top-1.5 select-none font-serif text-[3rem] font-semibold leading-none sm:right-3 sm:top-2 sm:text-[3.25rem]"
              style={{ color: FIGMA_C1_WATERMARK, opacity: 0.55 }}
              aria-hidden
            >
              {data.indexLabel}
            </span>
            <p
              className="font-heading text-[1.625rem] font-bold leading-[1.05] tracking-tight sm:text-[1.75rem] md:text-[1.875rem]"
              style={{ color: FIGMA_C1_STAT }}
            >
              {data.metric}
            </p>
            <p
              className="font-body mt-1.5 max-w-[15rem] text-[13px] font-normal leading-snug sm:text-[13px]"
              style={{ color: FIGMA_C1_STAT_SUB }}
            >
              {data.metricSub}
            </p>
          </div>
        </div>
        <div className="relative z-[1] mt-3 w-full shrink-0 md:mt-3">
          <div
            className="flex w-full justify-center rounded-lg border bg-white/90 p-2 sm:p-2.5"
            style={{ borderColor: FIGMA_C3_ILLUSTRATION_FRAME }}
          >
            <Image
              src="/images/aegis/pre-bounce.jpg"
              alt="Aegis interprets dashboard, growth, and security signals before payment bounce"
              width={480}
              height={300}
              className="h-auto w-full max-w-[260px] object-contain sm:max-w-[280px] md:max-w-[350px]"
              sizes="(max-width: 768px) 70vw, 350px"
              priority
            />
          </div>
        </div>
        <div className="hidden min-h-0 md:block md:flex-1" aria-hidden />
      </ShiftColFromLeft>

      <div className="hidden w-[1.5px] shrink-0 self-stretch overflow-hidden md:block" style={PARTITION_RULE_STYLE} aria-hidden />

      <ShiftColFromRight
        className="min-w-0 px-5 pb-5 pt-5 md:flex md:h-full md:min-h-0 md:flex-col md:justify-center md:rounded-r-xl md:px-5 md:pb-5 md:pt-5"
        style={{ backgroundColor: WHITE }}
      >
        <h3
          className="font-heading w-full text-[16px] font-bold leading-tight tracking-tight sm:text-[17px]"
          style={{ color: FIGMA_C1_TITLE }}
        >
          {data.title}
        </h3>

        <div className="mt-3 w-full text-left md:mt-2.5">
          <p className={`${labelRow} w-full`}>
            <span className={chevronClass} style={{ color: FIGMA_C1_CHEVRON }}>
              &gt;
            </span>
            <span className={labelClass} style={{ color: FIGMA_C1_SECTION }}>
              PROBLEM
            </span>
          </p>
          <p className="font-body mt-1 w-full text-[13px] font-normal leading-snug sm:text-[14px]" style={{ color: FIGMA_C1_BODY }}>
            {data.problem}
          </p>
        </div>

        <div className="mt-3 w-full text-left md:mt-2.5">
          <p className={`${labelRow} w-full`}>
            <span className={chevronClass} style={{ color: FIGMA_C1_CHEVRON }}>
              &gt;
            </span>
            <span className={labelClass} style={{ color: FIGMA_C1_SECTION }}>
              WHAT AEGIS DOES
            </span>
          </p>
          <div className="mt-2">
            <div className="mx-1.5 border-t sm:mx-2" style={{ borderColor: FIGMA_C1_RULE }} aria-hidden />
            {data.whatLines.map((line, i) => (
              <div key={line} className="mx-1.5 border-b py-2 sm:mx-2 sm:py-2" style={{ borderColor: FIGMA_C1_RULE }}>
                <p className={`font-body w-full text-[13px] font-normal leading-snug sm:text-[14px] ${listRow}`} style={{ color: FIGMA_C1_BODY }}>
                  <span
                    className="w-7 shrink-0 font-serif text-[14px] font-normal tabular-nums sm:w-8 sm:text-[15px]"
                    style={{ color: FIGMA_C1_INDEX }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 max-w-full">{line}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 w-full text-left md:mt-2.5">
          <p className={`${labelRow} w-full`}>
            <span className={chevronClass} style={{ color: FIGMA_C1_CHEVRON }}>
              &gt;
            </span>
            <span className={labelClass} style={{ color: FIGMA_C1_SECTION }}>
              WHY IT WORKS
            </span>
          </p>
          <p
            className="font-body mt-1 w-full border-l-[3px] pl-2.5 text-[13px] italic leading-snug sm:text-[14px]"
            style={{ borderColor: FIGMA_C1_WHY_ACCENT, color: FIGMA_C1_BODY }}
          >
            {data.why}
          </p>
        </div>
      </ShiftColFromRight>
    </article>
  );
}

function ShiftCardRowSecond({ data }: { data: ShiftCardData }) {
  const labelClass =
    "font-heading text-[10.5px] font-bold uppercase tracking-[0.14em] sm:text-[11px]";
  const chevronClass = "font-heading text-[10px] font-bold leading-none sm:text-[10.5px]";
  const labelRow = "flex items-baseline gap-x-1";
  const listRow = "flex gap-2.5 text-left";

  return (
    <article className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white md:grid md:grid-cols-[minmax(0,1fr)_1.5px_minmax(0,1fr)] md:items-stretch md:gap-0">
      <ShiftColFromLeft
        className="min-w-0 px-5 pb-5 pt-5 md:flex md:h-full md:min-h-0 md:flex-col md:justify-center md:rounded-l-xl md:px-5 md:pb-5 md:pt-5"
        style={{ backgroundColor: WHITE }}
      >
        <h3
          className="font-heading w-full text-left text-[16px] font-bold leading-tight tracking-tight sm:text-[17px]"
          style={{ color: FIGMA_C1_TITLE }}
        >
          {data.title}
        </h3>

        <div className="mt-3 w-full text-left md:mt-2.5">
          <p className={`${labelRow} w-full`}>
            <span className={chevronClass} style={{ color: FIGMA_C1_CHEVRON }}>
              &gt;
            </span>
            <span className={labelClass} style={{ color: FIGMA_C1_SECTION }}>
              PROBLEM
            </span>
          </p>
          <p className="font-body mt-1 w-full text-[13px] font-normal leading-snug sm:text-[14px]" style={{ color: FIGMA_C1_BODY }}>
            {data.problem}
          </p>
        </div>

        <div className="mt-3 w-full text-left md:mt-2.5">
          <p className={`${labelRow} w-full`}>
            <span className={chevronClass} style={{ color: FIGMA_C1_CHEVRON }}>
              &gt;
            </span>
            <span className={labelClass} style={{ color: FIGMA_C1_SECTION }}>
              WHAT AEGIS DOES
            </span>
          </p>
          <div className="mt-2">
            <div className="mx-1.5 border-t sm:mx-2" style={{ borderColor: FIGMA_C1_RULE }} aria-hidden />
            {data.whatLines.map((line, i) => (
              <div key={line} className="mx-1.5 border-b py-2 sm:mx-2 sm:py-2" style={{ borderColor: FIGMA_C1_RULE }}>
                <p className={`font-body w-full text-[13px] font-normal leading-snug sm:text-[14px] ${listRow}`} style={{ color: FIGMA_C1_BODY }}>
                  <span
                    className="w-7 shrink-0 font-serif text-[14px] font-normal tabular-nums sm:w-8 sm:text-[15px]"
                    style={{ color: FIGMA_C1_INDEX }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 max-w-full">{line}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 w-full text-left md:mt-2.5">
          <p className={`${labelRow} w-full`}>
            <span className={chevronClass} style={{ color: FIGMA_C1_CHEVRON }}>
              &gt;
            </span>
            <span className={labelClass} style={{ color: FIGMA_C1_SECTION }}>
              WHY IT WORKS
            </span>
          </p>
          <p
            className="font-body mt-1 w-full border-l-[3px] pl-2.5 text-left text-[13px] italic leading-snug sm:text-[14px]"
            style={{ borderColor: FIGMA_C1_WHY_ACCENT, color: FIGMA_C1_BODY }}
          >
            {data.why}
          </p>
        </div>
      </ShiftColFromLeft>

      <div className="hidden w-[1.5px] shrink-0 self-stretch overflow-hidden md:block" style={PARTITION_RULE_STYLE} aria-hidden />

      <ShiftColFromRight
        className="relative flex min-h-0 flex-col overflow-visible px-5 pb-5 pt-5 md:h-full md:min-h-0 md:rounded-r-xl md:px-5 md:pb-5 md:pt-5"
        style={{ backgroundColor: FIGMA_C1_PANEL }}
      >
        <div className="relative z-[1] w-full shrink-0">
          <div className={FIGMA_C1_STAT_SURFACE}>
            <span
              className="pointer-events-none absolute right-2 top-1.5 select-none font-serif text-[3rem] font-semibold leading-none sm:right-3 sm:top-2 sm:text-[3.25rem]"
              style={{ color: FIGMA_C1_WATERMARK, opacity: 0.55 }}
              aria-hidden
            >
              {data.indexLabel}
            </span>
            <p
              className="font-heading text-[1.625rem] font-bold leading-[1.05] tracking-tight sm:text-[1.75rem] md:text-[1.875rem]"
              style={{ color: FIGMA_C1_STAT }}
            >
              {data.metric}
            </p>
            <p
              className="font-body mt-1.5 max-w-[15rem] text-[13px] font-normal leading-snug sm:text-[13px]"
              style={{ color: FIGMA_C1_STAT_SUB }}
            >
              {data.metricSub}
            </p>
          </div>
        </div>
        <div className="relative z-[1] mt-3 w-full shrink-0 md:mt-3">
          <div
            className="flex w-full justify-center rounded-lg border bg-white/90 p-2 sm:p-2.5"
            style={{ borderColor: FIGMA_C3_ILLUSTRATION_FRAME }}
          >
            <Image
              src="/images/aegis/dpd-reduction.png"
              alt="Early delinquency risk: warning signal and declining trend toward reduced 0–30 DPD"
              width={640}
              height={360}
              className="h-auto w-full max-w-[260px] object-contain sm:max-w-[280px] md:max-w-[350px]"
              sizes="(max-width: 768px) 70vw, 350px"
            />
          </div>
        </div>
        <div className="hidden min-h-0 md:block md:flex-1" aria-hidden />
      </ShiftColFromRight>
    </article>
  );
}

function ShiftCardRowThird({ data }: { data: ShiftCardData }) {
  const labelClass =
    "font-heading text-[10.5px] font-bold uppercase tracking-[0.14em] sm:text-[11px]";
  const chevronClass = "font-heading text-[10px] font-bold leading-none sm:text-[10.5px]";
  const labelRow = "flex items-baseline gap-x-1";
  const listRow = "flex gap-2.5 text-left";

  return (
    <article className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white md:grid md:grid-cols-[minmax(0,1fr)_1.5px_minmax(0,1fr)] md:items-stretch md:gap-0">
      <ShiftColFromLeft
        className="relative flex min-h-0 flex-col overflow-visible px-5 pb-5 pt-5 md:h-full md:min-h-0 md:rounded-l-xl md:px-5 md:pb-5 md:pt-5"
        style={{ backgroundColor: FIGMA_C1_PANEL }}
      >
        <div className="relative z-[1] w-full shrink-0">
          <div className={FIGMA_C1_STAT_SURFACE}>
            <span
              className="pointer-events-none absolute right-2 top-1.5 select-none font-serif text-[3rem] font-semibold leading-none sm:right-3 sm:top-2 sm:text-[3.25rem]"
              style={{ color: FIGMA_C1_WATERMARK, opacity: 0.55 }}
              aria-hidden
            >
              {data.indexLabel}
            </span>
            <p
              className="font-heading text-[1.625rem] font-bold leading-[1.05] tracking-tight sm:text-[1.75rem] md:text-[1.875rem]"
              style={{ color: FIGMA_C1_STAT }}
            >
              {data.metric}
            </p>
            <p
              className="font-body mt-1.5 max-w-[15rem] text-[13px] font-normal leading-snug sm:text-[13px]"
              style={{ color: FIGMA_C1_STAT_SUB }}
            >
              {data.metricSub}
            </p>
          </div>
        </div>
        <div className="relative z-[1] mt-3 w-full shrink-0 md:mt-3">
          <div
            className="flex w-full justify-center rounded-lg border bg-white/90 p-2 sm:p-2.5"
            style={{ borderColor: FIGMA_C3_ILLUSTRATION_FRAME }}
          >
            <Image
              src="/images/aegis/hidden-risk.png"
              alt="Magnifying glass on risk signals with rising bars: hidden delinquency patterns surfaced early"
              width={640}
              height={360}
              className="h-auto w-full max-w-[240px] object-contain sm:max-w-[268px] md:max-w-[320px]"
              sizes="(max-width: 768px) 70vw, 320px"
            />
          </div>
        </div>
        <div className="hidden min-h-0 md:block md:flex-1" aria-hidden />
      </ShiftColFromLeft>

      <div className="hidden w-[1.5px] shrink-0 self-stretch overflow-hidden md:block" style={PARTITION_RULE_STYLE} aria-hidden />

      <ShiftColFromRight
        className="min-w-0 px-5 pb-5 pt-5 md:flex md:h-full md:min-h-0 md:flex-col md:justify-center md:rounded-r-xl md:px-5 md:pb-5 md:pt-5"
        style={{ backgroundColor: WHITE }}
      >
        <h3
          className="font-heading w-full text-left text-[16px] font-bold leading-tight tracking-tight sm:text-[17px]"
          style={{ color: FIGMA_C1_TITLE }}
        >
          {data.title}
        </h3>

        <div className="mt-3 w-full text-left md:mt-2.5">
          <p className={`${labelRow} w-full`}>
            <span className={chevronClass} style={{ color: FIGMA_C1_CHEVRON }}>
              &gt;
            </span>
            <span className={labelClass} style={{ color: FIGMA_C1_SECTION }}>
              PROBLEM
            </span>
          </p>
          <p className="font-body mt-1 w-full text-[13px] font-normal leading-snug sm:text-[14px]" style={{ color: FIGMA_C1_BODY }}>
            {data.problem}
          </p>
        </div>

        <div className="mt-3 w-full text-left md:mt-2.5">
          <p className={`${labelRow} w-full`}>
            <span className={chevronClass} style={{ color: FIGMA_C1_CHEVRON }}>
              &gt;
            </span>
            <span className={labelClass} style={{ color: FIGMA_C1_SECTION }}>
              WHAT AEGIS DOES
            </span>
          </p>
          <div className="mt-2">
            <div className="mx-1.5 border-t sm:mx-2" style={{ borderColor: FIGMA_C1_RULE }} aria-hidden />
            {data.whatLines.map((line, i) => (
              <div key={line} className="mx-1.5 border-b py-2 sm:mx-2 sm:py-2" style={{ borderColor: FIGMA_C1_RULE }}>
                <p className={`font-body w-full text-[13px] font-normal leading-snug sm:text-[14px] ${listRow}`} style={{ color: FIGMA_C1_BODY }}>
                  <span
                    className="w-7 shrink-0 font-serif text-[14px] font-normal tabular-nums sm:w-8 sm:text-[15px]"
                    style={{ color: FIGMA_C1_INDEX }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 max-w-full">{line}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 w-full text-left md:mt-2.5">
          <p className={`${labelRow} w-full`}>
            <span className={chevronClass} style={{ color: FIGMA_C1_CHEVRON }}>
              &gt;
            </span>
            <span className={labelClass} style={{ color: FIGMA_C1_SECTION }}>
              WHY IT WORKS
            </span>
          </p>
          <p
            className="font-body mt-1 w-full border-l-[3px] pl-2.5 text-[13px] italic leading-snug sm:text-[14px]"
            style={{ borderColor: FIGMA_C1_WHY_ACCENT, color: FIGMA_C1_BODY }}
          >
            {data.why}
          </p>
        </div>
      </ShiftColFromRight>
    </article>
  );
}

function ShiftCardRowFourth({ data }: { data: ShiftCardData }) {
  const labelClass =
    "font-heading text-[10.5px] font-bold uppercase tracking-[0.14em] sm:text-[11px]";
  const chevronClass = "font-heading text-[10px] font-bold leading-none sm:text-[10.5px]";
  const labelRow = "flex items-baseline gap-x-1";
  const listRow = "flex gap-2.5 text-left";

  return (
    <article className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white md:grid md:grid-cols-[minmax(0,1fr)_1.5px_minmax(0,1fr)] md:items-stretch md:gap-0">
      <ShiftColFromLeft
        className="min-w-0 px-5 pb-5 pt-5 md:flex md:h-full md:min-h-0 md:flex-col md:justify-center md:rounded-l-xl md:px-5 md:pb-5 md:pt-5"
        style={{ backgroundColor: WHITE }}
      >
        <h3
          className="font-heading w-full text-left text-[16px] font-bold leading-tight tracking-tight sm:text-[17px]"
          style={{ color: FIGMA_C1_TITLE }}
        >
          {data.title}
        </h3>

        <div className="mt-3 w-full text-left md:mt-2.5">
          <p className={`${labelRow} w-full`}>
            <span className={chevronClass} style={{ color: FIGMA_C1_CHEVRON }}>
              &gt;
            </span>
            <span className={labelClass} style={{ color: FIGMA_C1_SECTION }}>
              PROBLEM
            </span>
          </p>
          <p className="font-body mt-1 w-full text-[13px] font-normal leading-snug sm:text-[14px]" style={{ color: FIGMA_C1_BODY }}>
            {data.problem}
          </p>
        </div>

        <div className="mt-3 w-full text-left md:mt-2.5">
          <p className={`${labelRow} w-full`}>
            <span className={chevronClass} style={{ color: FIGMA_C1_CHEVRON }}>
              &gt;
            </span>
            <span className={labelClass} style={{ color: FIGMA_C1_SECTION }}>
              WHAT AEGIS DOES
            </span>
          </p>
          <div className="mt-2">
            <div className="mx-1.5 border-t sm:mx-2" style={{ borderColor: FIGMA_C1_RULE }} aria-hidden />
            {data.whatLines.map((line, i) => (
              <div key={line} className="mx-1.5 border-b py-2 sm:mx-2 sm:py-2" style={{ borderColor: FIGMA_C1_RULE }}>
                <p className={`font-body w-full text-[13px] font-normal leading-snug sm:text-[14px] ${listRow}`} style={{ color: FIGMA_C1_BODY }}>
                  <span
                    className="w-7 shrink-0 font-serif text-[14px] font-normal tabular-nums sm:w-8 sm:text-[15px]"
                    style={{ color: FIGMA_C1_INDEX }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 max-w-full">{line}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 w-full text-left md:mt-2.5">
          <p className={`${labelRow} w-full`}>
            <span className={chevronClass} style={{ color: FIGMA_C1_CHEVRON }}>
              &gt;
            </span>
            <span className={labelClass} style={{ color: FIGMA_C1_SECTION }}>
              WHY IT WORKS
            </span>
          </p>
          <p
            className="font-body mt-1 w-full border-l-[3px] pl-2.5 text-left text-[13px] italic leading-snug sm:text-[14px]"
            style={{ borderColor: FIGMA_C1_WHY_ACCENT, color: FIGMA_C1_BODY }}
          >
            {data.why}
          </p>
        </div>
      </ShiftColFromLeft>

      <div className="hidden w-[1.5px] shrink-0 self-stretch overflow-hidden md:block" style={PARTITION_RULE_STYLE} aria-hidden />

      <ShiftColFromRight
        className="relative flex min-h-0 flex-col overflow-visible px-5 pb-5 pt-5 md:h-full md:min-h-0 md:rounded-r-xl md:px-5 md:pb-5 md:pt-5"
        style={{ backgroundColor: FIGMA_C1_PANEL }}
      >
        <div className="relative z-[1] w-full shrink-0">
          <div className={FIGMA_C1_STAT_SURFACE}>
            <span
              className="pointer-events-none absolute right-2 top-1.5 select-none font-serif text-[3rem] font-semibold leading-none sm:right-3 sm:top-2 sm:text-[3.25rem]"
              style={{ color: FIGMA_C1_WATERMARK, opacity: 0.55 }}
              aria-hidden
            >
              {data.indexLabel}
            </span>
            <p
              className="font-heading text-[1.625rem] font-bold leading-[1.05] tracking-tight sm:text-[1.75rem] md:text-[1.875rem]"
              style={{ color: FIGMA_C1_STAT }}
            >
              {data.metric}
            </p>
            <p
              className="font-body mt-1.5 max-w-[15rem] text-[13px] font-normal leading-snug sm:text-[13px]"
              style={{ color: FIGMA_C1_STAT_SUB }}
            >
              {data.metricSub}
            </p>
          </div>
        </div>
        <div className="relative z-[1] mt-3 w-full shrink-0 md:mt-3">
          <div
            className="flex w-full justify-center rounded-lg border bg-white/90 p-2 shadow-sm sm:p-2.5"
            style={{ borderColor: FIGMA_C3_ILLUSTRATION_FRAME }}
          >
            <Image
              src="/images/aegis/collections-efficiency.png"
              alt="Target-backed prioritisation: dynamic queues and outcome-focused collections effort"
              width={640}
              height={360}
              className="h-auto w-full max-w-[260px] object-contain sm:max-w-[280px] md:max-w-[350px]"
              sizes="(max-width: 768px) 70vw, 350px"
            />
          </div>
        </div>
        <div className="hidden min-h-0 md:block md:flex-1" aria-hidden />
      </ShiftColFromRight>
    </article>
  );
}

function ShiftCardRowFifth({ data }: { data: ShiftCardData }) {
  const labelClass =
    "font-heading text-[10.5px] font-bold uppercase tracking-[0.14em] sm:text-[11px]";
  const chevronClass = "font-heading text-[10px] font-bold leading-none sm:text-[10.5px]";
  const labelRow = "flex items-baseline gap-x-1";
  const listRow = "flex gap-2.5 text-left";

  return (
    <article className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white md:grid md:grid-cols-[minmax(0,1fr)_1.5px_minmax(0,1fr)] md:items-stretch md:gap-0">
      <ShiftColFromLeft
        className="relative flex min-h-0 flex-col overflow-visible px-5 pb-5 pt-5 md:h-full md:min-h-0 md:rounded-l-xl md:px-5 md:pb-5 md:pt-5"
        style={{ backgroundColor: FIGMA_C1_PANEL }}
      >
        <div className="relative z-[1] w-full shrink-0">
          <div className={FIGMA_C1_STAT_SURFACE}>
            <span
              className="pointer-events-none absolute right-2 top-1.5 select-none font-serif text-[3rem] font-semibold leading-none sm:right-3 sm:top-2 sm:text-[3.25rem]"
              style={{ color: FIGMA_C1_WATERMARK, opacity: 0.55 }}
              aria-hidden
            >
              {data.indexLabel}
            </span>
            <p
              className="font-heading text-[1.625rem] font-bold leading-[1.05] tracking-tight sm:text-[1.75rem] md:text-[1.875rem]"
              style={{ color: FIGMA_C1_STAT }}
            >
              {data.metric}
            </p>
            <p
              className="font-body mt-1.5 max-w-[15rem] text-[13px] font-normal leading-snug sm:text-[13px]"
              style={{ color: FIGMA_C1_STAT_SUB }}
            >
              {data.metricSub}
            </p>
          </div>
        </div>
        <div className="relative z-[1] mt-3 w-full shrink-0 md:mt-3">
          <div
            className="flex w-full justify-center rounded-lg border bg-white/90 p-2 sm:p-2.5"
            style={{ borderColor: FIGMA_C3_ILLUSTRATION_FRAME }}
          >
            <Image
              src="/images/aegis/card-05-marketing-illustration.png"
              alt="Support and outreach tied to growth: headset, messaging, and rising performance trend"
              width={1024}
              height={591}
              className="h-auto w-full max-w-[240px] object-contain sm:max-w-[268px] md:max-w-[320px]"
              sizes="(max-width: 768px) 70vw, 320px"
            />
          </div>
        </div>
        <div className="hidden min-h-0 md:block md:flex-1" aria-hidden />
      </ShiftColFromLeft>

      <div className="hidden w-[1.5px] shrink-0 self-stretch overflow-hidden md:block" style={PARTITION_RULE_STYLE} aria-hidden />

      <ShiftColFromRight
        className="min-w-0 px-5 pb-5 pt-5 md:flex md:h-full md:min-h-0 md:flex-col md:justify-center md:rounded-r-xl md:px-5 md:pb-5 md:pt-5"
        style={{ backgroundColor: WHITE }}
      >
        <h3
          className="font-heading w-full text-left text-[16px] font-bold leading-tight tracking-tight sm:text-[17px]"
          style={{ color: FIGMA_C1_TITLE }}
        >
          {data.title}
        </h3>

        <div className="mt-3 w-full text-left md:mt-2.5">
          <p className={`${labelRow} w-full`}>
            <span className={chevronClass} style={{ color: FIGMA_C1_CHEVRON }}>
              &gt;
            </span>
            <span className={labelClass} style={{ color: FIGMA_C1_SECTION }}>
              PROBLEM
            </span>
          </p>
          <p className="font-body mt-1 w-full text-[13px] font-normal leading-snug sm:text-[14px]" style={{ color: FIGMA_C1_BODY }}>
            {data.problem}
          </p>
        </div>

        <div className="mt-3 w-full text-left md:mt-2.5">
          <p className={`${labelRow} w-full`}>
            <span className={chevronClass} style={{ color: FIGMA_C1_CHEVRON }}>
              &gt;
            </span>
            <span className={labelClass} style={{ color: FIGMA_C1_SECTION }}>
              WHAT AEGIS DOES
            </span>
          </p>
          <div className="mt-2">
            <div className="mx-1.5 border-t sm:mx-2" style={{ borderColor: FIGMA_C1_RULE }} aria-hidden />
            {data.whatLines.map((line, i) => (
              <div key={line} className="mx-1.5 border-b py-2 sm:mx-2 sm:py-2" style={{ borderColor: FIGMA_C1_RULE }}>
                <p className={`font-body w-full text-[13px] font-normal leading-snug sm:text-[14px] ${listRow}`} style={{ color: FIGMA_C1_BODY }}>
                  <span
                    className="w-7 shrink-0 font-serif text-[14px] font-normal tabular-nums sm:w-8 sm:text-[15px]"
                    style={{ color: FIGMA_C1_INDEX }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 max-w-full">{line}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 w-full text-left md:mt-2.5">
          <p className={`${labelRow} w-full`}>
            <span className={chevronClass} style={{ color: FIGMA_C1_CHEVRON }}>
              &gt;
            </span>
            <span className={labelClass} style={{ color: FIGMA_C1_SECTION }}>
              WHY IT WORKS
            </span>
          </p>
          <p
            className="font-body mt-1 w-full border-l-[3px] pl-2.5 text-[13px] italic leading-snug sm:text-[14px]"
            style={{ borderColor: FIGMA_C1_WHY_ACCENT, color: FIGMA_C1_BODY }}
          >
            {data.why}
          </p>
        </div>
      </ShiftColFromRight>
    </article>
  );
}

function ShiftCardRowSixth({ data }: { data: ShiftCardData }) {
  const labelClass =
    "font-heading text-[10.5px] font-bold uppercase tracking-[0.14em] sm:text-[11px]";
  const chevronClass = "font-heading text-[10px] font-bold leading-none sm:text-[10.5px]";
  const labelRow = "flex items-baseline gap-x-1";
  const listRow = "flex gap-2.5 text-left";

  return (
    <article className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white md:grid md:grid-cols-[minmax(0,1fr)_1.5px_minmax(0,1fr)] md:items-stretch md:gap-0">
      <ShiftColFromLeft
        className="min-w-0 px-5 pb-5 pt-5 md:flex md:h-full md:min-h-0 md:flex-col md:justify-center md:rounded-l-xl md:px-5 md:pb-5 md:pt-5"
        style={{ backgroundColor: WHITE }}
      >
        <h3
          className="font-heading w-full text-left text-[16px] font-bold leading-tight tracking-tight sm:text-[17px]"
          style={{ color: FIGMA_C1_TITLE }}
        >
          {data.title}
        </h3>

        <div className="mt-3 w-full text-left md:mt-2.5">
          <p className={`${labelRow} w-full`}>
            <span className={chevronClass} style={{ color: FIGMA_C1_CHEVRON }}>
              &gt;
            </span>
            <span className={labelClass} style={{ color: FIGMA_C1_SECTION }}>
              PROBLEM
            </span>
          </p>
          <p className="font-body mt-1 w-full text-[13px] font-normal leading-snug sm:text-[14px]" style={{ color: FIGMA_C1_BODY }}>
            {data.problem}
          </p>
        </div>

        <div className="mt-3 w-full text-left md:mt-2.5">
          <p className={`${labelRow} w-full`}>
            <span className={chevronClass} style={{ color: FIGMA_C1_CHEVRON }}>
              &gt;
            </span>
            <span className={labelClass} style={{ color: FIGMA_C1_SECTION }}>
              WHAT AEGIS DOES
            </span>
          </p>
          <div className="mt-2">
            <div className="mx-1.5 border-t sm:mx-2" style={{ borderColor: FIGMA_C1_RULE }} aria-hidden />
            {data.whatLines.map((line, i) => (
              <div key={line} className="mx-1.5 border-b py-2 sm:mx-2 sm:py-2" style={{ borderColor: FIGMA_C1_RULE }}>
                <p className={`font-body w-full text-[13px] font-normal leading-snug sm:text-[14px] ${listRow}`} style={{ color: FIGMA_C1_BODY }}>
                  <span
                    className="w-7 shrink-0 font-serif text-[14px] font-normal tabular-nums sm:w-8 sm:text-[15px]"
                    style={{ color: FIGMA_C1_INDEX }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 max-w-full">{line}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 w-full text-left md:mt-2.5">
          <p className={`${labelRow} w-full`}>
            <span className={chevronClass} style={{ color: FIGMA_C1_CHEVRON }}>
              &gt;
            </span>
            <span className={labelClass} style={{ color: FIGMA_C1_SECTION }}>
              WHY IT WORKS
            </span>
          </p>
          <p
            className="font-body mt-1 w-full border-l-[3px] pl-2.5 text-left text-[13px] italic leading-snug sm:text-[14px]"
            style={{ borderColor: FIGMA_C1_WHY_ACCENT, color: FIGMA_C1_BODY }}
          >
            {data.why}
          </p>
        </div>
      </ShiftColFromLeft>

      <div className="hidden w-[1.5px] shrink-0 self-stretch overflow-hidden md:block" style={PARTITION_RULE_STYLE} aria-hidden />

      <ShiftColFromRight
        className="relative flex min-h-0 flex-col overflow-visible px-5 pb-5 pt-5 md:h-full md:min-h-0 md:rounded-r-xl md:px-5 md:pb-5 md:pt-5"
        style={{ backgroundColor: FIGMA_C1_PANEL }}
      >
        <div className="relative z-[1] w-full shrink-0">
          <div className={FIGMA_C1_STAT_SURFACE}>
            <span
              className="pointer-events-none absolute right-2 top-1.5 select-none font-serif text-[3rem] font-semibold leading-none sm:right-3 sm:top-2 sm:text-[3.25rem]"
              style={{ color: FIGMA_C1_WATERMARK, opacity: 0.55 }}
              aria-hidden
            >
              {data.indexLabel}
            </span>
            <p
              className="font-heading text-[1.625rem] font-bold leading-[1.05] tracking-tight sm:text-[1.75rem] md:text-[1.875rem]"
              style={{ color: FIGMA_C1_STAT }}
            >
              {data.metric}
            </p>
            <p
              className="font-body mt-1.5 max-w-[15rem] text-[13px] font-normal leading-snug sm:text-[13px]"
              style={{ color: FIGMA_C1_STAT_SUB }}
            >
              {data.metricSub}
            </p>
          </div>
        </div>
        <div className="relative z-[1] mt-3 w-full shrink-0 md:mt-3">
          <div
            className="flex w-full justify-center rounded-lg border bg-white/90 p-2 shadow-sm sm:p-2.5"
            style={{ borderColor: FIGMA_C3_ILLUSTRATION_FRAME }}
          >
            <Image
              src="/images/aegis/card-06-cohort-illustration.png"
              alt="Segment and cohort view: pie chart, global footprint, and trajectory dashboards for capital allocation"
              width={1024}
              height={512}
              className="h-auto w-full max-w-[260px] object-contain sm:max-w-[280px] md:max-w-[350px]"
              sizes="(max-width: 768px) 70vw, 350px"
            />
          </div>
        </div>
        <div className="hidden min-h-0 md:block md:flex-1" aria-hidden />
      </ShiftColFromRight>
    </article>
  );
}

function ShiftCardRowSeventh({ data }: { data: ShiftCardData }) {
  const labelClass =
    "font-heading text-[10.5px] font-bold uppercase tracking-[0.14em] sm:text-[11px]";
  const chevronClass = "font-heading text-[10px] font-bold leading-none sm:text-[10.5px]";
  const labelRow = "flex items-baseline gap-x-1";
  const listRow = "flex gap-2.5 text-left";

  return (
    <article className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white md:grid md:grid-cols-[minmax(0,1fr)_1.5px_minmax(0,1fr)] md:items-stretch md:gap-0">
      <ShiftColFromLeft
        className="relative flex min-h-0 flex-col overflow-visible px-5 pb-5 pt-5 md:h-full md:min-h-0 md:rounded-l-xl md:px-5 md:pb-5 md:pt-5"
        style={{ backgroundColor: FIGMA_C1_PANEL }}
      >
        <div className="relative z-[1] w-full shrink-0">
          <div className={FIGMA_C1_STAT_SURFACE}>
            <span
              className="pointer-events-none absolute right-2 top-1.5 select-none font-serif text-[3rem] font-semibold leading-none sm:right-3 sm:top-2 sm:text-[3.25rem]"
              style={{ color: FIGMA_C1_WATERMARK, opacity: 0.55 }}
              aria-hidden
            >
              {data.indexLabel}
            </span>
            <p
              className="font-heading text-[1.625rem] font-bold leading-[1.05] tracking-tight sm:text-[1.75rem] md:text-[1.875rem]"
              style={{ color: FIGMA_C1_STAT }}
            >
              {data.metric}
            </p>
            <p
              className="font-body mt-1.5 max-w-[15rem] text-[13px] font-normal leading-snug sm:text-[13px]"
              style={{ color: FIGMA_C1_STAT_SUB }}
            >
              {data.metricSub}
            </p>
          </div>
        </div>
        <div className="relative z-[1] mt-3 w-full shrink-0 md:mt-3">
          <div
            className="flex w-full justify-center rounded-lg border bg-white/90 p-2 sm:p-2.5"
            style={{ borderColor: FIGMA_C3_ILLUSTRATION_FRAME }}
          >
            <Image
              src="/images/aegis/audit-explainable-decisions.png"
              alt="Audit-ready decisions: checklist, verified shield, and magnified analytics"
              width={1024}
              height={729}
              className="h-auto w-full max-w-[240px] object-contain sm:max-w-[268px] md:max-w-[320px]"
              sizes="(max-width: 768px) 70vw, 320px"
            />
          </div>
        </div>
        <div className="hidden min-h-0 md:block md:flex-1" aria-hidden />
      </ShiftColFromLeft>

      <div className="hidden w-[1.5px] shrink-0 self-stretch overflow-hidden md:block" style={PARTITION_RULE_STYLE} aria-hidden />

      <ShiftColFromRight
        className="min-w-0 px-5 pb-5 pt-5 md:flex md:h-full md:min-h-0 md:flex-col md:justify-center md:rounded-r-xl md:px-5 md:pb-5 md:pt-5"
        style={{ backgroundColor: WHITE }}
      >
        <h3
          className="font-heading w-full text-left text-[16px] font-bold leading-tight tracking-tight sm:text-[17px]"
          style={{ color: FIGMA_C1_TITLE }}
        >
          {data.title}
        </h3>

        <div className="mt-3 w-full text-left md:mt-2.5">
          <p className={`${labelRow} w-full`}>
            <span className={chevronClass} style={{ color: FIGMA_C1_CHEVRON }}>
              &gt;
            </span>
            <span className={labelClass} style={{ color: FIGMA_C1_SECTION }}>
              PROBLEM
            </span>
          </p>
          <p className="font-body mt-1 w-full text-[13px] font-normal leading-snug sm:text-[14px]" style={{ color: FIGMA_C1_BODY }}>
            {data.problem}
          </p>
        </div>

        <div className="mt-3 w-full text-left md:mt-2.5">
          <p className={`${labelRow} w-full`}>
            <span className={chevronClass} style={{ color: FIGMA_C1_CHEVRON }}>
              &gt;
            </span>
            <span className={labelClass} style={{ color: FIGMA_C1_SECTION }}>
              WHAT AEGIS DOES
            </span>
          </p>
          <div className="mt-2">
            <div className="mx-1.5 border-t sm:mx-2" style={{ borderColor: FIGMA_C1_RULE }} aria-hidden />
            {data.whatLines.map((line, i) => (
              <div key={line} className="mx-1.5 border-b py-2 sm:mx-2 sm:py-2" style={{ borderColor: FIGMA_C1_RULE }}>
                <p className={`font-body w-full text-[13px] font-normal leading-snug sm:text-[14px] ${listRow}`} style={{ color: FIGMA_C1_BODY }}>
                  <span
                    className="w-7 shrink-0 font-serif text-[14px] font-normal tabular-nums sm:w-8 sm:text-[15px]"
                    style={{ color: FIGMA_C1_INDEX }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 max-w-full">{line}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 w-full text-left md:mt-2.5">
          <p className={`${labelRow} w-full`}>
            <span className={chevronClass} style={{ color: FIGMA_C1_CHEVRON }}>
              &gt;
            </span>
            <span className={labelClass} style={{ color: FIGMA_C1_SECTION }}>
              WHY IT WORKS
            </span>
          </p>
          <p
            className="font-body mt-1 w-full border-l-[3px] pl-2.5 text-[13px] italic leading-snug sm:text-[14px]"
            style={{ borderColor: FIGMA_C1_WHY_ACCENT, color: FIGMA_C1_BODY }}
          >
            {data.why}
          </p>
        </div>
      </ShiftColFromRight>
    </article>
  );
}

const shiftCards: readonly ShiftCardData[] = [
  {
    key: "01",
    visualFirst: true,
    pointer: "right",
    indexLabel: "01",
    metric: "20-40%",
    metricSub: "increase in pre-bounce recoveries",
    title: "Increase Pre-Bounce Recovery",
    problem: "Collections teams act after bounce — when recovery probability is already lower.",
    whatLines: [
      "Detects payment friction buildup before failure",
      "Identifies accounts likely to bounce 7-15 days in advance",
      "Prioritises them for early intervention",
    ],
    why: "Aegis interprets timing drift, mandate failures and behavior patterns — not just missed payments.",
    illustration: <></>,
  },
  {
    key: "02",
    visualFirst: false,
    pointer: "left",
    indexLabel: "02",
    metric: "10-25%",
    metricSub: "reduction in early delinquency (0->30)",
    title: "Reduce 0 -> 30 DPD Flow",
    problem: "Most risk becomes visible only after slippage begins.",
    whatLines: [
      "Identifies accounts deteriorating before DPD movement",
      "Tracks risk momentum, not just status",
      "Enables early intervention before slippage",
    ],
    why: "Aegis focuses on direction of risk, not just current bucket.",
    illustration: <></>,
  },
  {
    key: "03",
    visualFirst: true,
    pointer: "right",
    indexLabel: "03",
    metric: "15–30%",
    metricSub: "of future delinquency identified early",
    title: "Detect Hidden Risk Before It Surfaces",
    problem: "A large portion of future NPAs are in 'current' accounts today.",
    whatLines: [
      "Bureau stress (utilization, inquiries)",
      "Payment behavior shifts",
      "Engagement signals (intent deterioration)",
    ],
    why: "Aegis converts multiple weak signals into strong patterns.",
    illustration: <></>,
  },
  {
    key: "04",
    visualFirst: false,
    pointer: "left",
    indexLabel: "04",
    metric: "15–25%",
    metricSub: "improvement in collections efficiency",
    title: "Improve Collections Efficiency",
    problem: "Collections teams work on static queues (DPD, overdue) → low efficiency.",
    whatLines: [
      "Replaces static queues with dynamic prioritisation",
      "Focuses effort on accounts with highest outcome impact",
    ],
    why: "Aegis ensures effort is spent where risk is actively building, not where it is already visible.",
    illustration: <></>,
  },
  {
    key: "05",
    visualFirst: true,
    pointer: "right",
    indexLabel: "05",
    metric: "30-50%",
    metricSub: "lift in timely responses to pre-bounce outreach",
    title: "Activate Pre-Bounce Marketing Journeys",
    problem:
      "Marketing often runs on static segments while collections reacts after bounce — so high-risk customers miss timely nudges when interventions still work.",
    whatLines: [
      "Triggers journeys from modeled bounce proximity and exposure, not fixed calendars",
      "Targets outreach using default risk and recent payment-behavior context",
      "Sequences reminders ahead of mandate failure and friction buildup",
    ],
    why: "Aegis ties journey timing to the same trajectory signals collections trusts — before the account is already in distress.",
    illustration: <></>,
  },
  {
    key: "06",
    visualFirst: false,
    pointer: "left",
    indexLabel: "06",
    metric: "15–25%",
    metricSub: "view across cohorts and segments",
    title: "Enable Better Capital Allocation",
    problem: "Capital allocation is based on historical performance, not forward risk.",
    whatLines: [
      "Trajectory view across segments",
      "Identifies deteriorating cohorts and hidden stress pockets — geo, builder, segment",
    ],
    why: "Aegis shows where risk is going, not where it has been.",
    illustration: <></>,
  },
  {
    key: "07",
    visualFirst: true,
    pointer: "right",
    indexLabel: "07",
    metric: "30–50%",
    metricSub: "ready, explainable, regulator-aligned",
    title: "Ensure Audit-Ready, Explainable Decisions",
    problem: "Early warning systems often lack explainability, audit trails and regulatory alignment.",
    whatLines: [
      "Every risk signal is traceable",
      "Every signal is explainable",
      "Consistently interpreted across the portfolio",
    ],
    why: "Aegis is built as a structured interpretation system, not a black box.",
    illustration: <></>,
  },
];

export default function AegisShiftCards() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-20 px-6 pb-24 sm:space-y-28 sm:px-10 sm:pb-28 lg:px-14">
      {shiftCards.map((data) =>
        data.key === "01" ? (
          <ShiftCardRowFirst key={data.key} data={data} />
        ) : data.key === "02" ? (
          <ShiftCardRowSecond key={data.key} data={data} />
        ) : data.key === "03" ? (
          <ShiftCardRowThird key={data.key} data={data} />
        ) : data.key === "04" ? (
          <ShiftCardRowFourth key={data.key} data={data} />
        ) : data.key === "05" ? (
          <ShiftCardRowFifth key={data.key} data={data} />
        ) : data.key === "06" ? (
          <ShiftCardRowSixth key={data.key} data={data} />
        ) : (
          <ShiftCardRowSeventh key={data.key} data={data} />
        ),
      )}
    </section>
  );
}
