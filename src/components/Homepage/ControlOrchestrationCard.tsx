"use client";
import { motion } from "framer-motion";

import { useState } from "react";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { platformCardClass, platformCardLayout, platformChart } from "./platformChartColors";

const data = [
  { subject: "Priority", coverage: 108, response: 92, fullMark: 120 },
  { subject: "Allocation", coverage: 98, response: 82, fullMark: 120 },
  { subject: "Tracking", coverage: 88, response: 72, fullMark: 120 },
  { subject: "Risk", coverage: 102, response: 88, fullMark: 120 },
  { subject: "Return", coverage: 86, response: 74, fullMark: 120 },
  { subject: "Control", coverage: 72, response: 58, fullMark: 120 },
];

export const ControlOrchestrationCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 8px 30px color-mix(in srgb, var(--color-platform-accent) 12%, transparent)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`${platformCardClass} ${platformCardLayout}`}
    >
      <h3 className="text-base font-semibold text-brand-ink">Control & Orchestration</h3>
      <p className="mt-1 mb-4 text-xs text-brand-muted">Prioritisation, allocation & intervention tracking</p>
      <div className="min-h-[240px] w-full flex-1 lg:min-h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke={platformChart.cardBorder} />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "var(--color-brand-muted)" }} />
          <PolarRadiusAxis tick={{ fontSize: 9, fill: "var(--color-brand-muted)" }} />
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: `1px solid ${platformChart.cardBorder}`,
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Radar
            name="Coverage"
            dataKey="coverage"
            stroke={platformChart.teal}
            fill={platformChart.teal}
            fillOpacity={isHovered ? 0.38 : 0.22}
            strokeWidth={1.5}
            animationDuration={1500}
          />
          <Radar
            name="Response"
            dataKey="response"
            stroke={platformChart.coral}
            fill={platformChart.coral}
            fillOpacity={isHovered ? 0.35 : 0.2}
            strokeWidth={1.5}
            animationDuration={1700}
          />
        </RadarChart>
      </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
