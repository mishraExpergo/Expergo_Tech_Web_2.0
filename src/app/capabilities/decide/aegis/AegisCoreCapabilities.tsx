"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/** Figma tokens (shared with Aegis enables / hero) */
const FIGMA = {
  teal: "#15B5C1",
  ink: "#101828",
  labelBlue: "#1D70F2",
  body: "#667085",
  cardBorder: "#E4E7EC",
  accent: "#01AEE4",
} as const;

const gradientTextStyle = {
  color: FIGMA.accent,
} as const;

const capabilities = [
  {
    num: "01",
    title: "Signal Interpretation",
    items: [
      "Repayment behaviour",
      "Credit exposure",
      "Collections engagement",
      "Human intelligence",
    ],
    footer: "Understand each account in full context",
  },
  {
    num: "02",
    title: "Behaviour Mapping",
    items: ["Consistent", "Disrupted", "Delayed", "Volatile"],
    footer: "See how borrower behaviour is changing over time",
  },
  {
    num: "03",
    title: "Cross-Signal Context",
    items: [
      "Bureau stress + payment drift",
      "Engagement drop + repayment delay",
      "Documentation gap + account movement",
    ],
    footer: "Understand how signals reinforce each other",
  },
  {
    num: "04",
    title: "Driver-Level Insight",
    items: [
      "Payment behaviour",
      "Credit exposure signals",
      "Engagement patterns",
      "Structural factors",
    ],
    footer: "Know what is shaping current account behaviour",
  },
  {
    num: "05",
    title: "Consistent Classification",
    items: ["Risk teams", "Collections teams", "Credit teams", "Underwriting teams"],
    footer: "Create a shared language for portfolio decisions",
  },
  {
    num: "06",
    title: "Segment Pattern Visibility",
    items: ["Products", "Geographies", "Cohorts", "Customer segments"],
    footer: "Identify where portfolio behaviour is forming & shifting",
  },
] as const;

const LIST_SLOT_COUNT = 4;

const headerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

function CapabilityChevron({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5.25 2.625L10.9375 7L5.25 11.375V2.625Z"
        className="fill-[#15B5C1] transition-colors duration-300 group-hover:fill-[#15B5C1]"
      />
    </svg>
  );
}

type CapabilityCardProps = {
  num: string;
  title: string;
  items: readonly string[];
  footer: string;
  reduceMotion: boolean | null;
  /** First-column cards (01 & 04) — extra right padding to align widths */
  widenRight?: boolean;
};

function CapabilityCard({
  num,
  title,
  items,
  footer,
  reduceMotion,
  widenRight = false,
}: CapabilityCardProps) {
  const padX = widenRight ? "px-6 sm:px-7 lg:px-8 lg:pr-9" : "px-6 sm:px-7";

  return (
    <motion.article
      className="group relative flex h-full w-full min-h-[300px] flex-col overflow-hidden rounded-2xl border bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-[border-color,box-shadow] duration-300 sm:min-h-[320px]"
      style={{ borderColor: FIGMA.cardBorder }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              borderColor: FIGMA.teal,
              boxShadow: "0 0 0 1px #15B5C1, 0 12px 32px rgba(21, 181, 193, 0.22)",
            }
      }
      transition={{ duration: 0.28, ease }}
    >
      <span
        className="pointer-events-none absolute right-5 top-5 z-[1] select-none font-serif text-[2.75rem] font-normal leading-none text-[#E5E7EB] sm:text-[3rem]"
        aria-hidden
      >
        {num}
      </span>

      <div className={`flex shrink-0 items-center gap-2 pb-4 pt-6 sm:pt-7 ${padX}`}>
        <span className="-ml-1.5 flex h-[14px] w-[14px] shrink-0 items-center justify-center transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(21,181,193,0.75)] sm:-ml-2">
          <CapabilityChevron />
        </span>
        <h3 className="min-w-0 flex-1 pr-11 font-heading text-base font-bold leading-snug text-[#101828] transition-colors duration-300 group-hover:text-[#15B5C1] sm:text-lg">
          {title}
        </h3>
      </div>

      <ul className={`min-h-[7.75rem] flex-1 space-y-2.5 pb-5 sm:min-h-[8.25rem] ${padX}`}>
        {Array.from({ length: LIST_SLOT_COUNT }, (_, i) => {
          const item = items[i];
          if (!item) {
            return (
              <li key={`spacer-${i}`} className="invisible flex gap-2.5 text-left" aria-hidden>
                <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-transparent" />
                <span className="text-sm leading-relaxed sm:text-[15px]">&nbsp;</span>
              </li>
            );
          }
          return (
            <li key={item} className="flex gap-2.5 text-left">
              <span
                className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#D0D5DD] transition-all duration-300 group-hover:bg-[#15B5C1] group-hover:shadow-[0_0_8px_rgba(21,181,193,0.7)]"
                aria-hidden
              />
              <span className="text-sm leading-relaxed text-[#667085] sm:text-[15px]">{item}</span>
            </li>
          );
        })}
      </ul>

      <div
        className={`mt-auto flex min-h-[5.75rem] shrink-0 items-start border-t border-[#E4E7EC] bg-white py-5 transition-colors duration-300 group-hover:border-[#15B5C1] sm:min-h-[6rem] sm:py-5 ${padX}`}
      >
        <p className="text-left text-sm leading-relaxed text-[#667085] sm:text-[15px]">{footer}</p>
      </div>
    </motion.article>
  );
}

export default function AegisCoreCapabilities() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="bg-[#F9FAFB] px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24"
      aria-labelledby="aegis-core-capabilities-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.header
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={headerVariants}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1677FF]">
            CORE CAPABILITIES
          </p>
          <h2
            id="aegis-core-capabilities-heading"
            className="mt-4 font-heading text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-[44px]"
          >
            <span style={gradientTextStyle}>Understanding intelligence</span>
            <span style={{ color: FIGMA.ink }}> across the portfolio</span>
          </h2>
        </motion.header>

        <motion.div
          className="mt-12 grid grid-cols-1 auto-rows-fr items-stretch gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={reduceMotion ? undefined : gridVariants}
          role="list"
        >
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.num}
              role="listitem"
              variants={reduceMotion ? undefined : cardVariants}
              className={`flex h-full w-full min-w-0 ${index === 0 ? "lg:w-[calc(100%+12px)]" : ""}`}
            >
              <CapabilityCard
                num={cap.num}
                title={cap.title}
                items={cap.items}
                footer={cap.footer}
                reduceMotion={reduceMotion}
                widenRight={index === 0}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
