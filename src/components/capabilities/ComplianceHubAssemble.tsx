"use client";

import { useId, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CircleDollarSign,
  ClipboardCheck,
  Gavel,
  Globe,
  Handshake,
  Scale,
  ScanSearch,
  Shield,
  Smartphone,
  TrendingUp,
} from "lucide-react";

/** Brand accent — all hub / branch / glow tones derive from this. */
const C = "#15B5C1";

const VB = 400;
const CX = VB / 2;
const CY = VB / 2;
const HUB_EDGE = 54;
const D_NEAR = 118;
const D_FAR = 198;

const NODES: { Icon: LucideIcon }[] = [
  { Icon: Gavel },
  { Icon: Handshake },
  { Icon: Globe },
  { Icon: ClipboardCheck },
  { Icon: ScanSearch },
  { Icon: Shield },
  { Icon: Smartphone },
  { Icon: TrendingUp },
  { Icon: Building2 },
  { Icon: Scale },
  { Icon: CircleDollarSign },
];

function branchAngles(count: number) {
  return Array.from({ length: count }, (_, i) => -Math.PI /24 + (i * 2 * Math.PI) / count);
}

function BranchLine({
  angle,
  d,
  filterId,
}: {
  angle: number;
  d: MotionValue<number>;
  filterId: string;
}) {
  const x2 = useTransform(d, (dist) => CX + Math.cos(angle) * dist);
  const y2 = useTransform(d, (dist) => CY + Math.sin(angle) * dist);
  return (
    <motion.line
      stroke={C}
      strokeWidth={1.35}
      strokeOpacity={0.45}
      strokeLinecap="round"
      filter={`url(#${filterId})`}
      x1={CX + Math.cos(angle) * HUB_EDGE}
      y1={CY + Math.sin(angle) * HUB_EDGE}
      x2={x2}
      y2={y2}
    />
  );
}

function OrbitNode({
  angle,
  d,
  Icon,
}: {
  angle: number;
  d: MotionValue<number>;
  Icon: LucideIcon;
}) {
  const left = useTransform(d, (dist) => `${((CX + Math.cos(angle) * dist) / VB) * 100}%`);
  const top = useTransform(d, (dist) => `${((CY + Math.sin(angle) * dist) / VB) * 100}%`);
  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0 h-0 w-0"
      style={{ left, top }}
    >
      <div className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#15B5C1]/55 bg-[#15B5C1] text-white shadow-[0_0_14px_rgba(21,181,193,0.5)]">
        <Icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
      </div>
    </motion.div>
  );
}

export function ComplianceHubAssemble() {
  const uid = useId().replace(/:/g, "");
  const glowId = `compliance-hub-glow-${uid}`;
  const filterId = `compliance-soft-glow-${uid}`;
  const ref = useRef<HTMLDivElement>(null);
  const reduce = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.88", "start 0.22"],
  });

  const progress = useTransform(scrollYProgress, (v) => (reduce ? 1 : v));

  const d = useTransform(progress, (p) => D_FAR + (D_NEAR - D_FAR) * p);
  const meshOpacity = useTransform(progress, [0, 0.35, 1], [0.45, 0.72, 0.9]);
  const hubScale = useTransform(progress, [0, 1], [0.92, 1]);

  const angles = branchAngles(NODES.length);

  return (
    <div
      ref={ref}
      className="relative mx-auto h-[min(400px,85vw)] w-[min(400px,85vw)] shrink-0 select-none"
      role="img"
      aria-label="Compliance hub: peripheral controls move inward and connect to the center as this section scrolls into view."
    >
      <svg
        viewBox={`0 0 ${VB} ${VB}`}
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <radialGradient id={glowId} cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor={C} stopOpacity="0.32" />
            <stop offset="55%" stopColor={C} stopOpacity="0.12" />
            <stop offset="100%" stopColor={C} stopOpacity="0" />
          </radialGradient>
          <filter id={filterId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.circle
          cx={CX}
          cy={CY}
          r={142}
          fill={`url(#${glowId})`}
          style={{ opacity: meshOpacity }}
        />

        {angles.map((angle, i) => (
          <BranchLine key={`line-${i}`} angle={angle} d={d} filterId={filterId} />
        ))}

        <motion.g style={{ scale: hubScale, transformOrigin: `${CX}px ${CY}px` }}>
          <circle cx={CX} cy={CY} r={62} fill={C} opacity={0.2} />
          <circle cx={CX} cy={CY} r={56} fill="none" stroke={C} strokeWidth={1.2} opacity={0.5} />
          <circle cx={CX} cy={CY} r={48} fill={C} filter={`url(#${filterId})`} />
          <text
            x={CX}
            y={CY + 5}
            textAnchor="middle"
            fill="white"
            fontFamily="system-ui, sans-serif"
            fontSize={11}
            fontWeight={700}
            letterSpacing="0.14em"
          >
            COMPLIANCE
          </text>
        </motion.g>
      </svg>

      {angles.map((angle, i) => (
        <OrbitNode key={`node-${i}`} angle={angle} d={d} Icon={NODES[i].Icon} />
      ))}
    </div>
  );
}
