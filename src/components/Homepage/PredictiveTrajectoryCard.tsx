"use client";
import { motion } from "framer-motion";

import { useState } from "react";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";

import { platformCardClass, platformCardLayout, platformChart } from "./platformChartColors";
import { PlatformSizedChart } from "./PlatformSizedChart";

const pieData = [
  { name: "Migration", value: 320 },
  { name: "Concentration", value: 280 },
  { name: "Forward", value: 261.71 },
  { name: "Residual", value: 100 },
];

const trajLineData = [
  { t: "Q1", v: 38 },
  { t: "Q2", v: 52 },
  { t: "Q3", v: 48 },
  { t: "Q4", v: 64 },
  { t: "Q5", v: 58 },
  { t: "Q6", v: 72 },
];

const DONUT_COLORS = [
  platformChart.purple,
  platformChart.coral,
  platformChart.teal,
  platformChart.peach,
];

const CENTER_TOTAL = 961.71;

export const PredictiveTrajectoryCard = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 8px 30px color-mix(in srgb, var(--color-platform-coral) 15%, transparent)",
      }}
      className={`${platformCardClass} ${platformCardLayout}`}
    >
      <h3 className="text-base font-semibold text-brand-ink">Predictive Trajectory Intelligence</h3>
      <p className="mt-1 mb-2 text-xs text-brand-muted lg:mb-4">
        Forward migration & concentration modelling
      </p>

      <div className="flex min-h-[12rem] flex-1 flex-col gap-3 lg:min-h-[14rem] lg:flex-row lg:items-stretch lg:gap-8">
        {/* Reference (lg+): teal trajectory line on the left; mobile: donut first to sit under the title */}
        <div className="order-2 min-h-0 min-w-0 flex-1 lg:order-1">
          <PlatformSizedChart className="h-[132px] w-full min-w-0 lg:h-auto lg:min-h-[10rem] lg:flex-1">
            <LineChart data={trajLineData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={platformChart.cardBorder} />
              <XAxis dataKey="t" tick={{ fontSize: 10, fill: "var(--color-brand-muted)" }} />
              <YAxis tick={{ fontSize: 10, fill: "var(--color-brand-muted)" }} domain={[0, 100]} width={28} />
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
                dataKey="v"
                stroke={platformChart.teal}
                strokeWidth={2.5}
                dot={{ r: 3, fill: platformChart.teal }}
                animationDuration={1200}
              />
            </LineChart>
          </PlatformSizedChart>
        </div>

        <div className="order-1 flex w-full min-w-0 shrink-0 flex-row items-center gap-3 sm:gap-4 lg:order-2 lg:flex-col lg:items-center lg:gap-4">
          <div className="relative h-40 w-40 shrink-0 sm:h-48 sm:w-48 lg:h-44 lg:w-44">
            <PlatformSizedChart className="h-full w-full min-h-0">
              <PieChart>
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: `1px solid ${platformChart.cardBorder}`,
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={74}
                  paddingAngle={3}
                  dataKey="value"
                  animationDuration={1500}
                  onMouseEnter={(_, i) => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {pieData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={DONUT_COLORS[i]}
                      opacity={activeIndex === null || activeIndex === i ? 1 : 0.45}
                      stroke="none"
                      style={{ transition: "opacity 0.2s" }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </PlatformSizedChart>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-xl font-bold text-brand-ink sm:text-2xl"
                key={activeIndex}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {activeIndex !== null
                  ? pieData[activeIndex]!.value.toFixed(2)
                  : CENTER_TOTAL.toFixed(2)}
              </motion.span>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 lg:flex-none lg:pl-0">
            {pieData.map((d, i) => (
              <motion.div
                key={d.name}
                className="flex items-center gap-2 text-xs text-brand-muted"
                whileHover={{ x: 4 }}
              >
                <div className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: DONUT_COLORS[i] }} />
                {d.name}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
