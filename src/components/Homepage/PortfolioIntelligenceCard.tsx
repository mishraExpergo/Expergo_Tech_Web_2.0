"use client";
import { motion } from "framer-motion";

import { useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { platformCardClass, platformCardLayout, platformChart } from "./platformChartColors";

const data = [
  { name: "JAN", value: 45 },
  { name: "FEB", value: 30 },
  { name: "MAR", value: 85 },
  { name: "APR", value: 60 },
  { name: "MAY", value: 95 },
  { name: "JUN", value: 95 },
];

/** Reference: uniform purple bars */
const BAR_FILL = platformChart.purple;

export const PortfolioIntelligenceCard = () => {
  const [activeBar, setActiveBar] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 8px 30px color-mix(in srgb, var(--color-platform-purple) 15%, transparent)",
      }}
      className={`${platformCardClass} ${platformCardLayout}`}
    >
      <h3 className="text-base font-semibold text-brand-ink">Portfolio Intelligence Interface</h3>
      <p className="mt-1 mb-4 text-xs text-brand-muted">Executive dashboards & heat maps</p>
      <div className="min-h-[11rem] w-full flex-1">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
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
          <Bar
            dataKey="value"
            radius={[4, 4, 0, 0]}
            animationDuration={1200}
            onMouseEnter={(_, i) => setActiveBar(i)}
            onMouseLeave={() => setActiveBar(null)}
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={BAR_FILL}
                opacity={activeBar === null || activeBar === i ? 1 : 0.45}
                style={{ transition: "opacity 0.2s" }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
