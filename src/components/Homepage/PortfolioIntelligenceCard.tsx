"use client";
import { motion } from "framer-motion";

import { useState } from "react";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";

import { platformCardClass, platformCardLayout, platformChart } from "./platformChartColors";
import { PlatformSizedChart } from "./PlatformSizedChart";
import { useIsBelowLg } from "@/hooks/useIsBelowLg";

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
  const compactChart = useIsBelowLg();
  const chartMargin = compactChart
    ? { top: 6, right: 6, bottom: 6, left: 0 }
    : { top: 5, right: 5, bottom: 5, left: 5 };

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
      <PlatformSizedChart className="min-h-[11rem] h-[200px] w-full min-w-0 flex-1 shrink-0 self-stretch text-left lg:h-auto">
        <BarChart data={data} margin={chartMargin}>
          <CartesianGrid strokeDasharray="3 3" stroke={platformChart.cardBorder} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--color-brand-muted)" }} />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: compactChart ? 10 : 11, fill: "var(--color-brand-muted)" }}
            width={compactChart ? 28 : undefined}
          />
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
      </PlatformSizedChart>
    </motion.div>
  );
};
