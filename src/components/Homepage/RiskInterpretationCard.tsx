"use client";
import { motion } from "framer-motion";

import { useState } from "react";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import { platformCardClass, platformCardLayout, platformChart } from "./platformChartColors";
import { PlatformSizedChart } from "./PlatformSizedChart";

const data = [
  { name: "Jan", risk: 85, threshold: 85, baseline: 85 },
  { name: "Feb", risk: 78, threshold: 72, baseline: 55 },
  { name: "Mar", risk: 90, threshold: 68, baseline: 50 },
  { name: "Apr", risk: 65, threshold: 65, baseline: 58 },
  { name: "May", risk: 72, threshold: 60, baseline: 52 },
  { name: "Jun", risk: 55, threshold: 58, baseline: 48 },
];

export const RiskInterpretationCard = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 8px 30px color-mix(in srgb, var(--color-platform-purple) 15%, transparent)",
      }}
      className={`${platformCardClass} ${platformCardLayout}`}
    >
      <h3 className="text-base font-semibold text-brand-ink">Risk Interpretation</h3>
      <p className="mt-1 mb-4 text-xs text-brand-muted">Structured state classification & EWS mapping</p>
      <PlatformSizedChart className="min-h-[10rem] h-[200px] w-full min-w-0 flex-1 shrink-0 lg:h-auto lg:min-h-0">
        <LineChart
          data={data}
          onMouseMove={(e) => {
            if (e?.activeTooltipIndex !== undefined) setActiveIndex(Number(e.activeTooltipIndex));
          }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={platformChart.cardBorder} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--color-brand-muted)" }} />
          <YAxis tick={{ fontSize: 11, fill: "var(--color-brand-muted)" }} domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: `1px solid ${platformChart.cardBorder}`,
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="risk"
            stroke={platformChart.purple}
            strokeWidth={2}
            dot={{ r: activeIndex !== null ? 5 : 3, fill: platformChart.purple }}
            animationDuration={1500}
          />
          <Line
            type="monotone"
            dataKey="threshold"
            stroke={platformChart.coral}
            strokeWidth={2}
            dot={{ r: activeIndex !== null ? 5 : 3, fill: platformChart.coral }}
            animationDuration={1800}
          />
          <Line
            type="monotone"
            dataKey="baseline"
            stroke={platformChart.teal}
            strokeWidth={2}
            dot={{ r: activeIndex !== null ? 5 : 3, fill: platformChart.teal }}
            animationDuration={2100}
          />
        </LineChart>
      </PlatformSizedChart>
    </motion.div>
  );
};
