"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const FIGMA = {
  teal: "#15B5C1",
  blue: "#0B64F4",
  kicker: "#0B64F4",
  ink: "#101828",
  lineIdle: "#B8E6EE",
  ringIdle: "#B8E6EE",
  accent: "#15B5C1",
} as const;

const gradientTextStyle = {
  color: FIGMA.accent,
} as const;

const systemNodes = [
  {
    id: "signals",
    label: "Signals",
    description: "Portfolio and external signals flow into the intelligence system.",
  },
  {
    id: "aegis",
    label: "Aegis",
    description: "Aegis brings clarity to borrower behaviour and signal patterns",
  },
  {
    id: "athena",
    label: "Athena",
    description: "Predictive intelligence anticipates movement and guides action.",
  },
  {
    id: "command-centre",
    label: "Command Centre",
    description: "Teams execute on intelligence with ownership and accountability.",
  },
  {
    id: "outcomes",
    label: "Outcomes",
    description: "Measured portfolio outcomes feed back into the system.",
  },
] as const;

const NODE_COUNT = systemNodes.length;
const DEFAULT_ACTIVE = 1;

const NODE_ICON_SIZE = 42;
const NODE_STROKE = 1.5;

function NodeIconSvg({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg
      className={className}
      width={NODE_ICON_SIZE}
      height={NODE_ICON_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function SignalsIcon({ className }: { className?: string }) {
  return (
    <NodeIconSvg className={className}>
      <circle cx="12" cy="12" r="1.85" fill="currentColor" />
      <path
        d="M10.35 9.35C8.1 12 8.1 12 10.35 14.65"
        stroke="currentColor"
        strokeWidth={NODE_STROKE}
        strokeLinecap="round"
      />
      <path
        d="M8.35 7.35C5.25 12 5.25 12 8.35 16.65"
        stroke="currentColor"
        strokeWidth={NODE_STROKE}
        strokeLinecap="round"
      />
      <path
        d="M13.65 9.35C15.9 12 15.9 12 13.65 14.65"
        stroke="currentColor"
        strokeWidth={NODE_STROKE}
        strokeLinecap="round"
      />
      <path
        d="M15.65 7.35C18.75 12 18.75 12 15.65 16.65"
        stroke="currentColor"
        strokeWidth={NODE_STROKE}
        strokeLinecap="round"
      />
    </NodeIconSvg>
  );
}

function AegisLayersIcon({ className }: { className?: string }) {
  return (
    <NodeIconSvg className={className}>
      <path
        d="M12 6.5 17.4 9.45 12 12.4 6.6 9.45 12 6.5Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.35"
        strokeLinejoin="round"
      />
      <path
        d="M7.1 13.05Q12 15.2 16.9 13.05"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M5.75 15.7Q12 18.45 18.25 15.7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        fill="none"
      />
    </NodeIconSvg>
  );
}

function AthenaBrainIcon({ className }: { className?: string }) {
  return (
    <NodeIconSvg className={className}>
      <path
        d="M12 5.35C9 5.35 6.55 7.05 6.3 9.65c-.15 1.4.3 2.75 1.15 3.75-.7.9-1.15 2.05-.95 3.15.65.7 2.55.25 3.45-.9.45.7.95 1.2 1.65 1.2.7 0 1.2-.5 1.65-1.2.9 1.15 2.8.75 3.45.9.2-1.1-.25-2.25-.95-3.15.85-1 1.3-2.35 1.15-3.75C17.45 7.05 15 5.35 12 5.35Z"
        stroke="currentColor"
        strokeWidth={NODE_STROKE}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M12 6.85v10.35"
        stroke="currentColor"
        strokeWidth={NODE_STROKE}
        strokeLinecap="round"
      />
      <path
        d="M8.4 8.2Q10.2 7.45 11.15 8.35"
        stroke="currentColor"
        strokeWidth={NODE_STROKE}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M8 10.5Q10.35 9.9 11.3 10.6"
        stroke="currentColor"
        strokeWidth={NODE_STROKE}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M8.3 12.7Q10.15 12.1 11.35 12.85"
        stroke="currentColor"
        strokeWidth={NODE_STROKE}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M8.75 14.85Q10.1 14.4 11.2 14.95"
        stroke="currentColor"
        strokeWidth={NODE_STROKE}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M15.6 8.2Q13.8 7.45 12.85 8.35"
        stroke="currentColor"
        strokeWidth={NODE_STROKE}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M16 10.5Q13.65 9.9 12.7 10.6"
        stroke="currentColor"
        strokeWidth={NODE_STROKE}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M15.7 12.7Q13.85 12.1 12.65 12.85"
        stroke="currentColor"
        strokeWidth={NODE_STROKE}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M15.25 14.85Q13.9 14.4 12.8 14.95"
        stroke="currentColor"
        strokeWidth={NODE_STROKE}
        strokeLinecap="round"
        fill="none"
      />
    </NodeIconSvg>
  );
}

function CommandGridIcon({ className }: { className?: string }) {
  return (
    <NodeIconSvg className={className}>
      <rect x="4.25" y="4.25" width="6.75" height="6.75" rx="1.35" stroke="currentColor" strokeWidth={NODE_STROKE} />
      <rect x="13" y="4.25" width="6.75" height="6.75" rx="1.35" stroke="currentColor" strokeWidth={NODE_STROKE} />
      <rect x="4.25" y="13" width="6.75" height="6.75" rx="1.35" stroke="currentColor" strokeWidth={NODE_STROKE} />
      <rect x="13" y="13" width="6.75" height="6.75" rx="1.35" stroke="currentColor" strokeWidth={NODE_STROKE} />
    </NodeIconSvg>
  );
}

function OutcomesTargetIcon({ className }: { className?: string }) {
  return (
    <NodeIconSvg className={className}>
      <circle
        cx="12"
        cy="12"
        r="7.15"
        stroke="currentColor"
        strokeWidth={NODE_STROKE}
        strokeLinecap="round"
        fill="none"
        pathLength={100}
        strokeDasharray="76 24"
        transform="rotate(-48 12 12)"
      />
      <circle
        cx="12"
        cy="12"
        r="5.05"
        stroke="currentColor"
        strokeWidth={NODE_STROKE}
        strokeLinecap="round"
        fill="none"
        pathLength={100}
        strokeDasharray="74 26"
        transform="rotate(-48 12 12)"
      />
      <circle
        cx="12"
        cy="12"
        r="1.9"
        stroke="currentColor"
        strokeWidth={NODE_STROKE}
        fill="none"
      />
      <path
        d="M12 12L13.62 10.08"
        stroke="currentColor"
        strokeWidth={NODE_STROKE}
        strokeLinecap="round"
      />
      <circle cx="13.62" cy="10.08" r="0.55" fill="currentColor" />
      <circle cx="16.42" cy="9.02" r="0.55" fill="currentColor" />
      <circle cx="18.05" cy="8.18" r="0.55" fill="currentColor" />
      <circle cx="17.05" cy="8.72" r="0.55" fill="currentColor" />
    </NodeIconSvg>
  );
}

function LighthouseMiniIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="7.5" cy="7.5" r="5" stroke="currentColor" strokeWidth="1.35" />
      <path d="M11 11l4 4" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path d="M5.5 7h4M5.5 9h2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function RegulusTempleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M2 20.5h20" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path d="M3.5 18.5h17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M5 16.5h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="6.25" y="9.25" width="2.35" height="7.25" fill="#FFFFFF" stroke="currentColor" strokeWidth="1.25" />
      <rect x="10.82" y="9.25" width="2.35" height="7.25" fill="#FFFFFF" stroke="currentColor" strokeWidth="1.25" />
      <rect x="15.4" y="9.25" width="2.35" height="7.25" fill="#FFFFFF" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M4.25 9.25 12 3.75 19.75 9.25Z"
        fill="#FFFFFF"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="6.35" r="0.9" fill="currentColor" />
    </svg>
  );
}

const nodeIcons = [SignalsIcon, AegisLayersIcon, AthenaBrainIcon, CommandGridIcon, OutcomesTargetIcon] as const;

export default function AegisHowItFitsSection() {
  const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE);
  const reduceMotion = useReducedMotion();
  const aegisContent = systemNodes[DEFAULT_ACTIVE];
  const lineProgress = NODE_COUNT > 1 ? activeIndex / (NODE_COUNT - 1) : 0;

  return (
    <section
      className="bg-white px-6 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20"
      aria-labelledby="aegis-how-it-fits-heading"
    >
      <div className="mx-auto max-w-5xl">
        <motion.header
          className="text-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease }}
        >
          <p
            className="text-regular uppercase tracking-[0.16em]"
            style={{ color: FIGMA.kicker }}
          >
            How Aegis Fits
          </p>
          <h2
            id="aegis-how-it-fits-heading"
            className="mt-3 font-heading text-[1.75rem] font-semibold leading-[1.12] tracking-tight sm:mt-4 sm:text-4xl lg:text-[36px]"
          >
            <span style={{ color: FIGMA.ink }}>Part of the </span>
            <span style={gradientTextStyle}>EarlySafe Intelligence System</span>
          </h2>

          <div
            className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-base font-semibold sm:mt-6 sm:text-[17px]"
            style={{ color: FIGMA.ink }}
          >
            <span className="inline-flex items-center gap-2">
              Lighthouse
              <span className="inline-flex shrink-0" style={{ color: FIGMA.teal }}>
                <LighthouseMiniIcon />
              </span>
            </span>
            <span className="h-4 w-px bg-[#D0D5DD]" aria-hidden />
            <span className="inline-flex items-center gap-2">
              Regulus
              <span className="inline-flex shrink-0" style={{ color: FIGMA.teal }}>
                <RegulusTempleIcon />
              </span>
            </span>
          </div>
        </motion.header>

        <div className="relative mx-auto mt-12 max-w-3xl sm:mt-14">
          {/* Connector line — bold track so fill animation reads clearly between icons */}
          <div
            className="pointer-events-none absolute left-[10%] right-[10%] top-[36px] z-0 h-[5px] overflow-hidden rounded-full sm:top-[37px] sm:h-[6px]"
            aria-hidden
          >
            <div className="h-full w-full" style={{ backgroundColor: FIGMA.lineIdle }} />
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ backgroundColor: FIGMA.teal }}
              initial={false}
              animate={{ width: `${lineProgress * 100}%` }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease }}
            />
          </div>

          <div className="relative z-10 flex items-start justify-between gap-1 sm:gap-2">
            {systemNodes.map((node, index) => {
              const isActive = index === activeIndex;
              const Icon = nodeIcons[index];

              return (
                <motion.button
                  key={node.id}
                  type="button"
                  className="group flex min-w-0 flex-1 flex-col items-center"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                  transition={{ duration: 0.22, ease }}
                  aria-pressed={isActive}
                >
                  <motion.span
                    className="flex h-[76px] w-[76px] items-center justify-center rounded-full border-2 transition-colors duration-300 sm:h-[80px] sm:w-[80px]"
                    style={{
                      borderColor: isActive ? FIGMA.teal : FIGMA.ringIdle,
                      backgroundColor: isActive ? FIGMA.teal : "#FFFFFF",
                      color: isActive ? "#FFFFFF" : FIGMA.teal,
                      boxShadow: isActive
                        ? "0 6px 18px rgba(21, 181, 193, 0.28)"
                        : "0 0 0 rgba(0,0,0,0)",
                    }}
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            scale: isActive ? 1.04 : 1,
                          }
                    }
                    transition={{ duration: 0.28, ease }}
                  >
                    <Icon />
                  </motion.span>
                  <span
                    className="mt-3 text-center text-xs font-semibold leading-tight sm:text-sm"
                    style={{ color: FIGMA.ink }}
                  >
                    {node.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl sm:mt-12">
          <div className="flex items-center gap-4">
            <p
              className="shrink-0 font-heading text-lg font-semibold sm:text-xl"
              style={{ color: FIGMA.blue }}
            >
              {aegisContent.label}
            </p>
            <div className="h-px min-w-0 flex-1" style={{ backgroundColor: FIGMA.lineIdle }} />
          </div>
          <p
            className="mt-4 text-left text-base font-normal leading-relaxed sm:text-[17px] sm:leading-[1.55]"
            style={{ color: "#666666" }}
          >
            {aegisContent.description}
          </p>
        </div>
      </div>
    </section>
  );
}
