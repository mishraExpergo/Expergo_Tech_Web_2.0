"use client";

import type { CSSProperties, ReactNode } from "react";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const viewportReveal = { once: true, amount: 0.22, margin: "-48px 0px -32px 0px" };

/** Figma: “What Makes These Outcomes Possible” — colors and copy match design reference. */
const FIGMA_ACCENT = "#3B82F6";
const FIGMA_TITLE = "#000000";
const FIGMA_BODY = "#6B7280";
const FIGMA_STEP = "#60A5FA";
const FIGMA_ICON_FILL = "#3B82F6";
const FIGMA_ICON_RING = "#DBEAFE";
const FIGMA_CONNECTOR = "#E5E7EB";
const ICON_STROKE_ON_BLUE = "#FFFFFF";

const ICON_OUTER = 72;
const ICON_INNER = 48;

/** Figma export for step 01 — clip id namespaced to avoid duplicate ids. */
function IconSignalStack({ className }: { className?: string }) {
  const clipId = "clip_aegis_arch_step1";
  return (
    <svg
      className={className}
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M8.70864 1.47985C8.53177 1.39917 8.33963 1.35742 8.14522 1.35742C7.95082 1.35742 7.75868 1.39917 7.5818 1.47985L1.76432 4.12725C1.64387 4.18036 1.54145 4.26735 1.46955 4.37763C1.39766 4.48791 1.35938 4.61672 1.35938 4.74837C1.35938 4.88001 1.39766 5.00882 1.46955 5.1191C1.54145 5.22938 1.64387 5.31637 1.76432 5.36949L7.58859 8.02367C7.76547 8.10435 7.95761 8.1461 8.15201 8.1461C8.34642 8.1461 8.53856 8.10435 8.71543 8.02367L14.5397 5.37628C14.6602 5.32316 14.7626 5.23617 14.8345 5.12589C14.9064 5.01561 14.9447 4.8868 14.9447 4.75516C14.9447 4.62351 14.9064 4.4947 14.8345 4.38442C14.7626 4.27414 14.6602 4.18715 14.5397 4.13404L8.70864 1.47985Z"
          stroke={ICON_STROKE_ON_BLUE}
          strokeWidth="1.35764"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.35938 8.14453C1.35906 8.27437 1.39598 8.40157 1.46576 8.51106C1.53554 8.62055 1.63526 8.70773 1.75309 8.76226L7.59094 11.4164C7.76689 11.4961 7.95782 11.5373 8.15097 11.5373C8.34411 11.5373 8.53504 11.4961 8.71099 11.4164L14.5353 8.76905C14.6554 8.71504 14.7573 8.62723 14.8284 8.51634C14.8995 8.40545 14.9368 8.27626 14.9358 8.14453"
          stroke={ICON_STROKE_ON_BLUE}
          strokeWidth="1.35764"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.35938 11.5391C1.35906 11.6689 1.39598 11.7961 1.46576 11.9056C1.53554 12.0151 1.63526 12.1023 1.75309 12.1568L7.59094 14.811C7.76689 14.8906 7.95782 14.9319 8.15097 14.9319C8.34411 14.9319 8.53504 14.8906 8.71099 14.811L14.5353 12.1636C14.6554 12.1096 14.7573 12.0218 14.8284 11.9109C14.8995 11.8 14.9368 11.6708 14.9358 11.5391"
          stroke={ICON_STROKE_ON_BLUE}
          strokeWidth="1.35764"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="16.2917" height="16.2917" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

/** Figma export for step 02 — trajectory + nodes; white stroke on blue pill. */
function IconTrajectory({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M10.1875 4.07161C8.56719 4.07161 7.01325 4.71528 5.86752 5.86101C4.72179 7.00674 4.07813 8.56068 4.07812 10.181V2.03516"
        stroke={ICON_STROKE_ON_BLUE}
        strokeWidth="1.35764"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.224 6.10807C13.3487 6.10807 14.2604 5.19632 14.2604 4.07161C14.2604 2.94691 13.3487 2.03516 12.224 2.03516C11.0993 2.03516 10.1875 2.94691 10.1875 4.07161C10.1875 5.19632 11.0993 6.10807 12.224 6.10807Z"
        stroke={ICON_STROKE_ON_BLUE}
        strokeWidth="1.35764"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.07552 14.2546C5.20023 14.2546 6.11198 13.3428 6.11198 12.2181C6.11198 11.0934 5.20023 10.1816 4.07552 10.1816C2.95082 10.1816 2.03906 11.0934 2.03906 12.2181C2.03906 13.3428 2.95082 14.2546 4.07552 14.2546Z"
        stroke={ICON_STROKE_ON_BLUE}
        strokeWidth="1.35764"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCheckCircle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="7.5" stroke="white" strokeWidth="2" />
      <path d="M8.25 12.25 L10.75 14.75 L16.25 9.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconTarget({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="2" fill="white" />
    </svg>
  );
}

function StepIcon({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative z-[3] mx-auto flex shrink-0 items-center justify-center"
      style={{ width: ICON_OUTER, height: ICON_OUTER }}
    >
      <div
        className="absolute rounded-full bg-white"
        style={{
          inset: 0,
          border: `2px solid ${FIGMA_ICON_RING}`,
        }}
      />
      <div
        className="relative z-[1] flex items-center justify-center rounded-full"
        style={{
          width: ICON_INNER,
          height: ICON_INNER,
          backgroundColor: FIGMA_ICON_FILL,
        }}
      >
        <div className="flex h-[26px] w-[26px] items-center justify-center [&>svg]:h-full [&>svg]:w-full">{children}</div>
      </div>
    </div>
  );
}

const steps = [
  {
    step: "STEP 01",
    title: "Multi-Signal Interpretation",
    body: "Payment, bureau, engagement and structural signals — interpreted together, never in isolation.",
    icon: <IconSignalStack />,
  },
  {
    step: "STEP 02",
    title: "Risk Trajectories",
    body: "Tracks how risk evolves over time. Enables intervention before outcomes deteriorate.",
    icon: <IconTrajectory />,
  },
  {
    step: "STEP 03",
    title: "Cross-Signal Confidence",
    body: "Validates signals across sources so teams act with conviction, not doubt.",
    icon: <IconCheckCircle />,
  },
  {
    step: "STEP 04",
    title: "Direct Link to Action",
    body: "Every insight resolves to who, why and what action will measurably change the outcome.",
    icon: <IconTarget />,
  },
] as const;

const connectorMaskStyle: CSSProperties = {
  maskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
  WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
};

export default function AegisArchitecturalOutcomes() {
  const lineTop = ICON_OUTER / 2;
  const [nearConnector, setNearConnector] = useState(false);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      const y = e.clientY - r.top;
      const x = e.clientX - r.left;
      const inBandX = x >= r.width * 0.04 && x <= r.width * 0.96;
      setNearConnector(inBandX && Math.abs(y - lineTop) < 18);
    },
    [lineTop],
  );

  const handlePointerLeave = useCallback(() => setNearConnector(false), []);

  return (
    <section className="bg-white px-6 pb-24 pt-16 sm:px-10 sm:pb-28 sm:pt-20 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-4xl text-center">
          <motion.p
            className="font-body text-base font-semibold sm:text-lg"
            style={{ color: FIGMA_ACCENT }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportReveal}
            transition={{ duration: 0.5, ease }}
          >
            What Makes These Outcomes Possible
          </motion.p>
          <motion.h2
            className="font-heading mt-4 text-3xl font-bold leading-[1.15] tracking-tight sm:mt-5 sm:text-4xl md:text-[44px] md:leading-[1.12]"
            style={{ color: FIGMA_TITLE }}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportReveal}
            transition={{ duration: 0.58, ease, delay: 0.08 }}
          >
            Four Architectural choices that change everything downstream
          </motion.h2>
        </header>

        <div
          className="relative mx-auto mt-14 max-w-6xl sm:mt-16 md:mt-20"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {/* Horizontal connector behind steps; end mask + white icon discs avoid line reading through outer rings */}
          <div
            className="pointer-events-none absolute left-0 right-0 z-[1] hidden md:block"
            style={{ top: lineTop, transform: "translateY(-50%)" }}
            aria-hidden
          >
            <motion.div
              className="h-px w-full rounded-full will-change-transform"
              style={{
                backgroundColor: FIGMA_CONNECTOR,
                ...connectorMaskStyle,
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
                transformOrigin: "center center",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={viewportReveal}
              transition={{ duration: 0.85, ease, delay: 0.12 }}
              animate={
                nearConnector
                  ? {
                      scaleY: 2.4,
                      backgroundColor: FIGMA_ACCENT,
                      boxShadow: "0 0 22px rgba(59, 130, 246, 0.42)",
                      transition: { duration: 0.22, ease },
                    }
                  : {
                      scaleY: 1,
                      backgroundColor: FIGMA_CONNECTOR,
                      boxShadow: "0 0 0 rgba(59, 130, 246, 0)",
                      transition: { duration: 0.35, ease },
                    }
              }
            />
          </div>

          <ul className="relative z-[2] grid list-none grid-cols-1 gap-12 md:grid-cols-4 md:gap-8 lg:gap-10">
            {steps.map((item, i) => (
              <motion.li
                key={item.step}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportReveal}
                transition={{ duration: 0.55, ease, delay: 0.06 + i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.28, ease } }}
              >
                <StepIcon>{item.icon}</StepIcon>
                <p
                  className="mt-4 font-body text-xs font-bold uppercase tracking-[0.12em] sm:mt-5"
                  style={{ color: FIGMA_STEP }}
                >
                  {item.step}
                </p>
                <h3
                  className="font-heading mt-3 text-lg font-bold leading-snug sm:text-xl"
                  style={{ color: FIGMA_TITLE }}
                >
                  {item.title}
                </h3>
                <p
                  className="font-body mt-3 max-w-sm text-sm leading-relaxed sm:mt-3.5 md:max-w-none"
                  style={{ color: FIGMA_BODY }}
                >
                  {item.body}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
