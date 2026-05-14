"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const viewportReveal = { once: true, amount: 0.2, margin: "-40px 0px" };

/** Figma “THE SHIFT” — #0766EE accent */
const FIGMA_BLUE = "#0766EE";
const FIGMA_TITLE_DARK = "#101828";
const FIGMA_LEFT_MUTED = "#667085";
const FIGMA_LEFT_BORDER = "#E4E7EC";
const FIGMA_DIVIDER = "#E5E7EB";
const FIGMA_BULLET_GRAY = "#98A2B3";
const FIGMA_RIGHT_CARD_BG = "rgba(7, 102, 238, 0.04)";

const leftRows = [
  "Data → dashboards → delayed action",
  "Effort → activity → limited impact",
  "Risk visible only after slippage",
  "Static queues, blind outreach",
] as const;

const rightRows = [
  "Signals → interpretation → trajectories",
  "Actions → prioritised → outcomes shift",
  "Risk surfaced before it surfaces",
  "Dynamic priorities, informed intervention",
] as const;

function ShiftRow({
  text,
  index,
  side,
  bulletColor,
  textColor,
}: {
  text: string;
  index: number;
  side: "left" | "right";
  bulletColor: string;
  textColor: string;
}) {
  const delay = 0.12 + index * 0.07;

  return (
    <motion.div
      className="flex items-start gap-3 border-b py-4 last:border-b-0 sm:gap-3.5 sm:py-4"
      style={{ borderColor: FIGMA_DIVIDER }}
      initial={{ opacity: 0, x: side === "left" ? -14 : 14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportReveal}
      transition={{ duration: 0.45, ease, delay }}
    >
      <div className="flex shrink-0 items-center pt-[0.55rem] sm:pt-2">
        <motion.div
          className="h-0.5 w-6 shrink-0 rounded-full sm:w-7"
          style={{ backgroundColor: bulletColor, transformOrigin: "left center" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportReveal}
          transition={{ duration: 0.42, ease, delay: delay + 0.06 }}
        />
      </div>
      <p
        className="min-w-0 text-left text-sm font-normal leading-relaxed sm:text-[15px] sm:leading-[1.55]"
        style={{ color: textColor }}
      >
        {text}
      </p>
    </motion.div>
  );
}

export default function AegisBeforeAfterShift() {
  return (
    <section className="bg-white px-6 pb-24 pt-8 sm:px-10 sm:pb-28 sm:pt-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <motion.header
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportReveal}
          transition={{ duration: 0.55, ease }}
        >
          <p
            className="font-body text-xs font-semibold uppercase tracking-[0.2em] sm:text-sm"
            style={{ color: FIGMA_BLUE }}
          >
            THE SHIFT
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold leading-[1.12] tracking-tight sm:mt-4 sm:text-4xl md:text-[44px] md:leading-[1.1]">
            <span style={{ color: FIGMA_TITLE_DARK }}>Before Aegis. </span>
            <span style={{ color: FIGMA_BLUE }}>After.</span>
          </h2>
        </motion.header>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:mt-14 md:grid-cols-2 md:gap-6 lg:gap-8">
          {/* Without Aegis */}
          <motion.div
            className="rounded-2xl border p-4 sm:rounded-[22px] sm:p-4 md:p-4"
            style={{
              borderColor: FIGMA_LEFT_BORDER,
              backgroundColor: "#FFFFFF",
            }}
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportReveal}
            transition={{ duration: 0.55, ease, delay: 0.08 }}
            whileHover={{
              scale: 1.015,
              borderColor: "#D0D5DD",
              transition: { duration: 0.28, ease },
            }}
            whileTap={{ scale: 0.995 }}
          >
            <p
              className="font-body text-left text-xs font-semibold uppercase tracking-[0.14em] sm:text-[13px]"
              style={{ color: FIGMA_LEFT_MUTED }}
            >
              WITHOUT AEGIS
            </p>
            <div className="mt-1">
              {leftRows.map((row, i) => (
                <ShiftRow
                  key={row}
                  text={row}
                  index={i}
                  side="left"
                  bulletColor={FIGMA_BULLET_GRAY}
                  textColor={FIGMA_LEFT_MUTED}
                />
              ))}
            </div>
          </motion.div>

          {/* With Aegis */}
          <motion.div
            className="rounded-2xl border p-4 sm:rounded-[22px] sm:p-4 md:p-4"
            style={{
              borderColor: FIGMA_BLUE,
              backgroundColor: FIGMA_RIGHT_CARD_BG,
            }}
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportReveal}
            transition={{ duration: 0.55, ease, delay: 0.12 }}
            whileHover={{
              scale: 1.015,
              boxShadow: "0 12px 40px rgba(7, 102, 238, 0.12)",
              transition: { duration: 0.28, ease },
            }}
            whileTap={{ scale: 0.995 }}
          >
            <p
              className="font-body text-left text-xs font-semibold uppercase tracking-[0.14em] sm:text-[13px]"
              style={{ color: FIGMA_BLUE }}
            >
              WITH AEGIS
            </p>
            <div className="mt-1">
              {rightRows.map((row, i) => (
                <ShiftRow
                  key={row}
                  text={row}
                  index={i}
                  side="right"
                  bulletColor={FIGMA_BLUE}
                  textColor={FIGMA_TITLE_DARK}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
