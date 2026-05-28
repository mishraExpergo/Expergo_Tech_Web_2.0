"use client";

import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/** Figma “Capabilities Across Functions” layout tokens */
const LAYOUT = {
  tabWidth: 252,
  tabHeight: 76,
  tabGap: 14,
  panelMaxWidth: 584,
  columnGap: 36,
  radius: 12,
} as const;

const FIGMA = {
  teal: "#15B5C1",
  ink: "#101828",
  kickerBlue: "#1677FF",
  iconBlue: "#1D70F2",
  iconFill: "#D6EBFF",
  iconFillSoft: "#E8F2FC",
  body: "#667085",
  tabBorderIdle: "#C5D9ED",
  activeBorder: "#15B5C1",
  divider: "#B8E6EE",
  gradient: "linear-gradient(180deg, #15B5C1 0%, #666666 100%)",
  iconShadow: "drop-shadow(0 6px 14px rgba(29, 112, 242, 0.32))",
  panelShadow: "0 2px 16px rgba(16, 24, 40, 0.06)",
} as const;

const gradientTextStyle = {
  backgroundImage: FIGMA.gradient,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

const panelTransition = { duration: 0.28, ease } as const;

const teams = [
  {
    id: "risk",
    label: "Risk",
    points: [
      "Understand emerging stress across segments",
      "Track behavioural shifts across portfolios",
      "Strengthen risk monitoring and review",
    ],
    outcome: "Clearer understanding of portfolio risk formation",
  },
  {
    id: "collection",
    label: "Collection",
    points: [
      "Understand which accounts need attention and why",
      "Segment cases by behaviour and intent",
      "Improve field and calling decisions",
    ],
    outcome: "Better-informed engagement and stronger execution quality.",
  },
  {
    id: "credit-strategy",
    label: "Credit Strategy",
    points: [
      "Analyse borrower behaviour across cohorts",
      "Identify drivers of segment performance",
      "Refine policy and portfolio strategy",
    ],
    outcome: "Sharper alignment between policy and borrower behaviour.",
  },
  {
    id: "underwriting",
    label: "Underwriting",
    points: [
      "Add behavioural context to approval decisions",
      "Identify structural and segment-level patterns",
      "Improve consistency in credit evaluation",
    ],
    outcome: "More informed and consistent origination decisions.",
  },
] as const;

type TeamId = (typeof teams)[number]["id"];
type Team = (typeof teams)[number];

const headerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const ICON_SIZE = 52;

function RiskIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 52 52" fill="none" aria-hidden>
      <path
        d="M26 9 40.5 39H11.5L26 9Z"
        fill={FIGMA.iconFill}
        stroke={FIGMA.iconBlue}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M26 20v6.5"
        stroke={FIGMA.iconBlue}
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <circle cx="26" cy="30.5" r="1.5" fill={FIGMA.iconBlue} />
    </svg>
  );
}

function CollectionIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 52 52" fill="none" aria-hidden>
      {/* Soft shadow (drawn shapes — avoids SVG filter clipping) */}
      <rect x="8" y="20" width="22" height="28" rx="3" fill="#1D70F2" fillOpacity="0.14" />
      <rect x="15" y="15" width="22" height="28" rx="3" fill="#1D70F2" fillOpacity="0.1" />
      {/* Back card */}
      <rect
        x="6"
        y="18"
        width="22"
        height="28"
        rx="3"
        fill="#B8DBF8"
        stroke={FIGMA.iconBlue}
        strokeWidth="1.5"
      />
      {/* Middle card */}
      <rect
        x="13"
        y="13"
        width="22"
        height="28"
        rx="3"
        fill={FIGMA.iconFill}
        stroke={FIGMA.iconBlue}
        strokeWidth="1.5"
      />
      {/* Front card — light blue fill so it stays visible on white panel */}
      <rect
        x="20"
        y="8"
        width="22"
        height="28"
        rx="3"
        fill={FIGMA.iconFillSoft}
        stroke={FIGMA.iconBlue}
        strokeWidth="1.75"
      />
      <path
        d="M24 15.5H38M24 19.5H36M24 23.5H34"
        stroke={FIGMA.iconBlue}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />
    </svg>
  );
}

function CreditStrategyIcon() {
  const stroke = FIGMA.iconBlue;
  const sw = 2.25;

  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 52 52" fill="none" aria-hidden>
      {/* Credit card */}
      <rect x="5" y="12" width="34" height="24" rx="4" stroke={stroke} strokeWidth={sw} />
      <path d="M9 19H35" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      <path d="M9 27H21M9 30.5H18" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      {/* Target — overlaps bottom-right of card */}
      <circle cx="37" cy="35" r="9" stroke={stroke} strokeWidth={sw} />
      <circle cx="37" cy="35" r="5.75" stroke={stroke} strokeWidth={sw} />
      <circle cx="37" cy="35" r="2.75" stroke={stroke} strokeWidth={sw} />
      {/* Arrow — top-right into bullseye */}
      <path d="M45 18.5L37 35" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      <path
        d="M37 35L33.8 31.8M37 35L39.8 31.5"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M45 18.5L42.6 16.8M45 18.5L47.2 16.5"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UnderwritingIcon() {
  const stroke = FIGMA.iconBlue;
  const sw = 2;

  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 52 52" fill="none" aria-hidden>
      {/* Soft depth — matches Collection card shadows */}
      <circle cx="23" cy="25" r="13.5" fill="#1D70F2" fillOpacity="0.12" />
      {/* Lens — filled like Risk / Collection icons */}
      <circle cx="23" cy="25" r="13.5" fill={FIGMA.iconFill} stroke={stroke} strokeWidth={sw} />
      {/* Chart */}
      <path d="M12 30.5H32" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      <path
        d="M15.5 30.5V22.5M20 30.5V26M24.5 30.5V19.5M29 30.5V15.5"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      <path
        d="M13 27.5L16.5 22.5L20.5 26L25 21L30 15.5"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Handle */}
      <path d="M34.5 34L40 40" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      <ellipse
        cx="42"
        cy="41.5"
        rx="3.5"
        ry="2"
        transform="rotate(45 42 41.5)"
        stroke={stroke}
        strokeWidth={sw}
      />
    </svg>
  );
}

function TeamPanelIcon({ teamId }: { teamId: TeamId }) {
  switch (teamId) {
    case "risk":
      return <RiskIcon />;
    case "collection":
      return <CollectionIcon />;
    case "credit-strategy":
      return <CreditStrategyIcon />;
    case "underwriting":
      return <UnderwritingIcon />;
  }
}

function ChevronDownIcon({ isExpanded }: { isExpanded: boolean }) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="shrink-0 transition-transform duration-250"
      style={{
        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
        color: "currentColor",
      }}
    >
      <path
        d="M5 7.5 10 12.5 15 7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TabButton({
  team,
  isActive,
  onSelect,
}: {
  team: Team;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={false}
      animate={{
        borderColor: isActive ? FIGMA.activeBorder : FIGMA.tabBorderIdle,
        color: isActive ? FIGMA.activeBorder : FIGMA.ink,
        boxShadow: isActive
          ? "0 6px 20px rgba(21, 181, 193, 0.28), 0 0 0 1px rgba(21, 181, 193, 0.08)"
          : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.25, ease }}
      className="flex w-full shrink-0 items-center justify-center rounded-xl border-[1.5px] bg-white px-4 text-center font-heading text-[15px] font-semibold leading-tight"
      style={{ height: LAYOUT.tabHeight }}
      aria-pressed={isActive}
    >
      {team.label}
    </motion.button>
  );
}

/** Mobile-only accordion row: label opens; chevron toggles (closes when open). */
function MobileAccordionTab({
  team,
  isOpen,
  onSelect,
  onChevronClick,
}: {
  team: Team;
  isOpen: boolean;
  onSelect: () => void;
  onChevronClick: () => void;
}) {
  return (
    <motion.div
      initial={false}
      animate={{
        borderColor: isOpen ? FIGMA.activeBorder : FIGMA.tabBorderIdle,
        boxShadow: isOpen
          ? "0 6px 20px rgba(21, 181, 193, 0.28), 0 0 0 1px rgba(21, 181, 193, 0.08)"
          : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.25, ease }}
      className="flex w-full shrink-0 overflow-hidden rounded-xl border-[1.5px] bg-white"
      style={{ height: LAYOUT.tabHeight }}
    >
      <button
        type="button"
        onClick={onSelect}
        className="flex min-w-0 flex-1 items-center justify-center px-4 text-center font-heading text-[15px] font-semibold leading-tight transition-colors duration-250"
        style={{ color: isOpen ? FIGMA.activeBorder : FIGMA.ink }}
        aria-pressed={isOpen}
      >
        {team.label}
      </button>
      <button
        type="button"
        onClick={onChevronClick}
        className="flex shrink-0 items-center justify-center border-l px-4 transition-colors duration-250"
        style={{
          borderLeftColor: isOpen ? FIGMA.activeBorder : FIGMA.tabBorderIdle,
          color: isOpen ? FIGMA.activeBorder : FIGMA.ink,
        }}
        aria-expanded={isOpen}
        aria-label={isOpen ? `Close ${team.label} details` : `Open ${team.label} details`}
      >
        <ChevronDownIcon isExpanded={isOpen} />
      </button>
    </motion.div>
  );
}

function DetailPanel({
  active,
  activeId,
  reduceMotion,
  className = "",
  style,
}: {
  active: Team;
  activeId: TeamId;
  reduceMotion: boolean | null;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      style={{ ...style, boxShadow: FIGMA.panelShadow }}
      className={`flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border-[1.5px] bg-white ${className}`}
      animate={{ borderColor: FIGMA.activeBorder }}
      transition={{ duration: 0.25, ease }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active.id}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={panelTransition}
          className="flex h-full min-h-0 flex-1 flex-col"
        >
          <div className="flex flex-1 flex-col px-9 py-8 sm:px-10 sm:py-9">
            <motion.div
              className="flex items-center gap-4"
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...panelTransition, delay: 0.04 }}
            >
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center"
                style={{ filter: FIGMA.iconShadow }}
              >
                <TeamPanelIcon teamId={active.id} />
              </div>
              <h3
                className="font-heading text-[24px] font-bold leading-snug"
                style={{ color: FIGMA.iconBlue }}
              >
                {active.label}
              </h3>
            </motion.div>

            <ol className="mt-6 list-decimal space-y-3 pl-5 marker:font-medium marker:text-[#101828]">
              {active.points.map((point, index) => (
                <motion.li
                  key={point}
                  initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.22,
                    ease,
                    delay: reduceMotion ? 0 : 0.06 + index * 0.05,
                  }}
                  className="pl-1 text-sm leading-relaxed sm:text-[15px]"
                  style={{ color: FIGMA.body }}
                >
                  {point}
                </motion.li>
              ))}
            </ol>
          </div>

          <motion.div
            className="shrink-0 border-t bg-white px-9 py-5 sm:px-10 sm:py-6"
            style={{ borderTopColor: FIGMA.divider }}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...panelTransition, delay: 0.12 }}
          >
            <p className="text-sm leading-relaxed sm:text-[15px]" style={{ color: FIGMA.body }}>
              <span className="font-semibold">Outcome: </span>
              {active.outcome}
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default function AegisCapabilitiesAcrossFunctions() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<TeamId>("risk");
  const [mobileOpenId, setMobileOpenId] = useState<TeamId | null>("risk");
  const active = teams.find((t) => t.id === activeId) ?? teams[0];

  const stackHeight =
    LAYOUT.tabHeight * 4 + LAYOUT.tabGap * 3;

  return (
    <section
      className="bg-white px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24"
      aria-labelledby="aegis-across-functions-heading"
    >
      <div className="mx-auto max-w-[1475px]">
        <motion.header
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={headerVariants}
        >
          <p
            className="text-sm font-semibold uppercase tracking-[0.16em]"
            style={{ color: FIGMA.kickerBlue }}
          >
            CAPABILITIES ACROSS FUNCTIONS
          </p>
          <h2
            id="aegis-across-functions-heading"
            className="mt-4 font-heading text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-[44px]"
          >
            <span style={gradientTextStyle}>Built for the teams</span>
            <span style={{ color: FIGMA.ink }}> that interpret portfolio behaviour</span>
          </h2>
        </motion.header>

        {/* Mobile — accordion: panel opens below its tab */}
        <div className="mx-auto mt-12 flex w-full max-w-lg flex-col gap-3.5 sm:mt-14 lg:hidden">
          <nav className="flex flex-col gap-3.5" aria-label="Teams">
            {teams.map((team) => {
              const isOpen = team.id === mobileOpenId;
              return (
                <div key={team.id} className="flex flex-col gap-3.5">
                  <MobileAccordionTab
                    team={team}
                    isOpen={isOpen}
                    onSelect={() => setMobileOpenId(team.id)}
                    onChevronClick={() =>
                      setMobileOpenId((current) => (current === team.id ? null : team.id))
                    }
                  />
                  {isOpen && (
                    <DetailPanel
                      active={team}
                      activeId={team.id}
                      reduceMotion={reduceMotion}
                      className="min-h-[300px] w-full"
                    />
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Desktop — flex stretch: right card height = 4 equal tabs + gaps */}
        <div className="mt-12 hidden justify-center sm:mt-14 lg:mt-16 lg:flex">
          <div
            className="flex items-stretch"
            style={{ gap: LAYOUT.columnGap, maxWidth: LAYOUT.tabWidth + LAYOUT.columnGap + LAYOUT.panelMaxWidth }}
          >
            <nav
              className="flex shrink-0 flex-col"
              style={{ width: LAYOUT.tabWidth, gap: LAYOUT.tabGap }}
              aria-label="Teams"
            >
              {teams.map((team) => (
                <TabButton
                  key={team.id}
                  team={team}
                  isActive={team.id === activeId}
                  onSelect={() => setActiveId(team.id)}
                />
              ))}
            </nav>

            <DetailPanel
              active={active}
              activeId={activeId}
              reduceMotion={reduceMotion}
              className="w-full"
              style={{
                maxWidth: LAYOUT.panelMaxWidth,
                minHeight: stackHeight,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
