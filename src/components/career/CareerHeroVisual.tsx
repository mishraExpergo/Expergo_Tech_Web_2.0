"use client";

import type { CSSProperties, MouseEvent } from "react";
import { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type RangeKey = "1D" | "1W" | "1M" | "1Y";

const rangeOrder: RangeKey[] = ["1D", "1W", "1M", "1Y"];

const rangeData: Record<
  RangeKey,
  {
    label: string;
    gain: string;
    allocation: string;
    risk: string;
    volatility: string;
    bars: number[];
    line: number[];
    riskLine: number[];
    trendValues: string[];
  }
> = {
  "1D": {
    label: "Last 24 hours",
    gain: "+$142K today",
    allocation: "Live rebalance",
    risk: "Stable",
    volatility: "Volatility 0.41",
    bars: [34, 56, 42, 68, 44, 72, 54, 65],
    line: [30, 35, 33, 42, 39, 48, 45, 53, 50, 58, 55, 60],
    riskLine: [38, 34, 41, 46, 43, 50, 48, 55],
    trendValues: ["+0.8", "+1.1", "+0.9", "+1.4", "+1.2", "+1.6", "+1.8", "+2.0", "+2.2", "+2.5", "+2.3", "+2.7"],
  },
  "1W": {
    label: "Last 7 days",
    gain: "+$538K this week",
    allocation: "Streaming update",
    risk: "Guarded",
    volatility: "Volatility 0.63",
    bars: [40, 62, 47, 76, 55, 70, 60, 74],
    line: [28, 33, 37, 35, 42, 47, 45, 52, 57, 54, 60, 63],
    riskLine: [40, 37, 44, 49, 46, 52, 57, 54],
    trendValues: ["+1.2", "+1.5", "+1.7", "+1.6", "+2.0", "+2.4", "+2.3", "+2.8", "+3.1", "+2.9", "+3.4", "+3.7"],
  },
  "1M": {
    label: "Last 30 days",
    gain: "+$1.24M today",
    allocation: "Updating...",
    risk: "Low",
    volatility: "Volatility 0.82",
    bars: [36, 68, 48, 82, 42, 72, 58, 74],
    line: [24, 29, 26, 36, 33, 42, 38, 47, 44, 53, 50, 58],
    riskLine: [35, 42, 39, 47, 52, 49, 57, 54],
    trendValues: ["+1.0", "+1.3", "+1.1", "+1.9", "+1.7", "+2.4", "+2.2", "+2.9", "+2.6", "+3.3", "+3.1", "+3.8"],
  },
  "1Y": {
    label: "Last 12 months",
    gain: "+$9.7M YTD",
    allocation: "Quarterly tune",
    risk: "Medium",
    volatility: "Volatility 1.12",
    bars: [52, 74, 60, 84, 66, 88, 72, 92],
    line: [20, 24, 31, 36, 40, 45, 49, 55, 60, 66, 71, 78],
    riskLine: [30, 36, 42, 48, 52, 58, 63, 69],
    trendValues: ["+1.5", "+1.8", "+2.4", "+2.7", "+3.0", "+3.3", "+3.6", "+4.1", "+4.5", "+5.0", "+5.4", "+6.0"],
  },
};

const chartWidth = 238;
const chartHeight = 70;
const riskWidth = 92;
const riskHeight = 30;

function buildPoints(values: number[], width: number, height: number) {
  const step = values.length > 1 ? width / (values.length - 1) : width;
  return values
    .map((value, idx) => {
      const x = idx * step;
      const y = height - (value / 100) * height;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

export default function CareerHeroVisual() {
  const reduceMotion = useReducedMotion();
  const visualRef = useRef<HTMLDivElement>(null);
  const [selectedRange, setSelectedRange] = useState<RangeKey>("1M");
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const current = rangeData[selectedRange];
  const linePoints = useMemo(() => buildPoints(current.line, chartWidth, chartHeight), [current.line]);
  const riskPoints = useMemo(() => buildPoints(current.riskLine, riskWidth, riskHeight), [current.riskLine]);
  const hoveredValue =
    activePoint === null ? current.trendValues[current.trendValues.length - 1] : current.trendValues[activePoint];
  const activeX = activePoint === null ? chartWidth : (activePoint / (current.line.length - 1)) * chartWidth;
  const activeY =
    activePoint === null
      ? chartHeight - (current.line[current.line.length - 1] / 100) * chartHeight
      : chartHeight - (current.line[activePoint] / 100) * chartHeight;

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const node = visualRef.current;
    if (!node) return;

    const bounds = node.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    node.style.setProperty("--rx", `${(x - 0.5) * 10}deg`);
    node.style.setProperty("--ry", `${(0.5 - y) * 9}deg`);
    node.style.setProperty("--mx", `${x * 100}%`);
    node.style.setProperty("--my", `${y * 100}%`);
  };

  const resetTilt = () => {
    const node = visualRef.current;
    if (!node) return;

    node.style.setProperty("--rx", "0deg");
    node.style.setProperty("--ry", "0deg");
    node.style.setProperty("--mx", "50%");
    node.style.setProperty("--my", "50%");
  };

  const handleChartMove = (event: MouseEvent<SVGSVGElement>) => {
    const svg = event.currentTarget;
    const bounds = svg.getBoundingClientRect();
    const rawX = Math.max(0, Math.min(bounds.width, event.clientX - bounds.left));
    const ratio = rawX / bounds.width;
    const idx = Math.round(ratio * (current.line.length - 1));
    setActivePoint(Math.max(0, Math.min(current.line.length - 1, idx)));
  };

  return (
    <div
      ref={visualRef}
      className="career-hero-visual relative mx-auto w-full max-w-[460px] lg:mt-3"
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      style={
        {
          "--rx": "0deg",
          "--ry": "0deg",
          "--mx": "50%",
          "--my": "50%",
        } as CSSProperties
      }
    >
      <motion.div className="career-hero-card relative rounded-[18px] border border-brand-border bg-card p-3.5 shadow-[0_10px_30px_rgba(12,35,64,0.08)] transition-shadow duration-300 hover:shadow-[0_14px_40px_rgba(12,35,64,0.12)] sm:p-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-brand-muted">Portfolio performance</p>
          <div className="text-[9px] flex items-center gap-0.5 font-semibold text-muted-foreground">
            {rangeOrder.map((range) => (
              <motion.button
                key={range}
                type="button"
                onClick={() => setSelectedRange(range)}
                aria-pressed={selectedRange === range}
                whileHover={reduceMotion ? undefined : { scale: 1.06 }}
                whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
                className={`career-hero-range relative cursor-pointer rounded-full px-1.5 py-0.5 transition-colors ${
                  selectedRange === range
                    ? "text-white"
                    : "text-muted-foreground hover:bg-brand-surface hover:text-brand-ink"
                }`}
              >
                {selectedRange === range ? (
                  <motion.span
                    layoutId="career-range-highlight"
                    className="absolute inset-0 rounded-full bg-brand-footer shadow-[0_1px_3px_rgba(15,23,42,0.2)]"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                ) : null}
                <span className="relative z-[1]">{range}</span>
              </motion.button>
            ))}
          </div>
        </div>
        <p className="mt-0.5 text-[10px] text-muted-foreground">{current.label}</p>

        <div className="career-hero-chart relative mt-2 rounded-xl border border-brand-border bg-white px-3 pb-2 pt-3">
          <div className="career-hero-chart-grid absolute inset-0 rounded-xl" />
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="relative z-[1] h-[72px] w-full"
            onMouseMove={handleChartMove}
            onMouseLeave={() => setActivePoint(null)}
            role="img"
            aria-label="Portfolio trend chart"
          >
            <line
              x1={activeX}
              y1={0}
              x2={activeX}
              y2={chartHeight}
              className="career-hero-chart-cursor"
              style={{ opacity: activePoint === null ? 0 : 1 }}
            />
            <polyline className="career-hero-main-line" points={linePoints} />
            <circle
              cx={activeX}
              cy={activeY}
              r="2.8"
              className="career-hero-main-dot"
              style={{ opacity: activePoint === null ? 0 : 1 }}
            />
          </svg>
          <div className="career-hero-badge absolute -right-2.5 -top-2.5 rounded-md border border-brand-border bg-white px-2 py-1 text-[10px] font-semibold text-brand-ink shadow-sm">
            {hoveredValue}
          </div>
          <div className="absolute right-2 top-9 rounded-md bg-white/95 px-1.5 py-0.5 text-[10px] font-semibold text-brand-ink shadow-sm">
            {current.gain}
          </div>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          <div className="career-hero-metric-card rounded-xl border border-brand-border bg-white p-2.5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold text-brand-muted">Allocation</p>
              <p className="text-[9px] text-muted-foreground">{current.allocation}</p>
            </div>
            <div className="mt-2 flex h-9 items-end gap-1">
              {current.bars.map((height, idx) => (
                <motion.span
                  key={`${selectedRange}-${idx}`}
                  initial={reduceMotion ? false : { scaleY: 0.35, opacity: 0.65 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 24, delay: idx * 0.035 }
                  }
                  className={`career-hero-bar origin-bottom w-4 rounded-full ${idx % 3 === 0 ? "bg-brand-teal" : "bg-brand-blue"}`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          <div className="career-hero-metric-card rounded-xl border border-brand-border bg-white p-2.5">
            <p className="text-[10px] font-semibold text-brand-muted">Risk</p>
            <p className="mt-1 text-[25px] font-semibold leading-none text-brand-footer">{current.risk}</p>
            <svg
              viewBox={`0 0 ${riskWidth} ${riskHeight}`}
              className="mt-1.5 h-8 w-full"
              role="img"
              aria-label="Risk trend"
            >
              <polyline className="career-hero-risk-line" points={riskPoints} />
            </svg>
            <p className="text-[10px] text-muted-foreground">{current.volatility}</p>
          </div>
        </div>
      </motion.div>

      <div className="career-hero-status absolute bottom-[14px] -left-14 hidden items-center gap-1.5 rounded-full border border-brand-border bg-white px-2.5 py-1 text-[10px] font-semibold text-brand-ink shadow-sm sm:inline-flex">
        <span className="career-hero-status-dot h-1.5 w-1.5 rounded-full bg-primary" />
        Settled · T+0
      </div>
    </div>
  );
}
