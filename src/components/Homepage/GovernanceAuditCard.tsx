"use client";
import { motion } from "framer-motion";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

import { platformCardClass, platformCardLayout, platformChart } from "./platformChartColors";
import { PlatformSizedChart } from "./PlatformSizedChart";
import { useIsBelowLg } from "@/hooks/useIsBelowLg";

const data = [
  { name: "Jan", y2020: 48, y2021: 55, y2022: 62 },
  { name: "Feb", y2020: 52, y2021: 58, y2022: 65 },
  { name: "Mar", y2020: 45, y2021: 60, y2022: 70 },
  { name: "Apr", y2020: 58, y2021: 62, y2022: 72 },
  { name: "May", y2020: 55, y2021: 65, y2022: 78 },
  { name: "Jun", y2020: 50, y2021: 68, y2022: 82 },
];

export const GovernanceAuditCard = () => {
  const compactChart = useIsBelowLg();
  const chartMargin = compactChart
    ? { top: 6, right: 6, bottom: 22, left: 0 }
    : { top: 5, right: 5, bottom: 5, left: 5 };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 8px 30px color-mix(in srgb, var(--color-platform-teal) 15%, transparent)",
      }}
      className={`${platformCardClass} ${platformCardLayout}`}
    >
      <h3 className="text-base font-semibold text-brand-ink">Governance & Audit</h3>
      <p className="mt-1 mb-4 text-xs text-brand-muted">Traceability, explainability & compliance</p>
      <PlatformSizedChart className="min-h-[11rem] h-[220px] w-full min-w-0 flex-1 shrink-0 self-stretch text-left lg:h-auto lg:min-h-0">
        <LineChart data={data} margin={chartMargin}>
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
          <Legend
            align={compactChart ? "left" : "center"}
            wrapperStyle={{ fontSize: 11 }}
          />
          <Line
            type="monotone"
            dataKey="y2020"
            name="2020"
            stroke={platformChart.purple}
            strokeWidth={2}
            dot={{ r: 3, fill: platformChart.purple }}
            animationDuration={1000}
          />
          <Line
            type="monotone"
            dataKey="y2021"
            name="2021"
            stroke={platformChart.coral}
            strokeWidth={2}
            dot={{ r: 3, fill: platformChart.coral }}
            animationDuration={1300}
          />
          <Line
            type="monotone"
            dataKey="y2022"
            name="2022"
            stroke={platformChart.teal}
            strokeWidth={2}
            dot={{ r: 3, fill: platformChart.teal }}
            animationDuration={1600}
          />
        </LineChart>
      </PlatformSizedChart>
    </motion.div>
  );
};
