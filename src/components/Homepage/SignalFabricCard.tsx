"use client";
import { motion } from "framer-motion";

import { useState } from "react";

import { platformCardClass, platformCardLayout, platformChart } from "./platformChartColors";

const GRID_SIZE = 8;

function cellColor(i: number) {
  const h = (i * 17 + (i % 5) * 23) % 100;
  if (h < 52) return platformChart.tealSoft;
  if (h < 68) return platformChart.teal;
  if (h < 82) return platformChart.coral;
  if (h < 92) return platformChart.peach;
  return platformChart.purple;
}

export const SignalFabricCard = () => {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 8px 30px color-mix(in srgb, var(--color-platform-teal) 18%, transparent)",
      }}
      className={`${platformCardClass} ${platformCardLayout}`}
    >
      <h3 className="text-base font-semibold text-brand-ink">Signal Fabric</h3>
      <p className="mt-1 mb-4 text-xs text-brand-muted">Multi-source data ingestion & normalisation</p>
      <div className="grid min-h-[8.5rem] flex-1 grid-cols-8 gap-1 auto-rows-fr">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
          <motion.div
            key={i}
            className="aspect-square rounded-sm"
            style={{ backgroundColor: cellColor(i) }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: hoveredCell === i ? 1 : 0.85,
              scale: hoveredCell === i ? 1.25 : 1,
            }}
            whileInView={{ opacity: 0.85, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.008, duration: 0.3 }}
            onHoverStart={() => setHoveredCell(i)}
            onHoverEnd={() => setHoveredCell(null)}
          />
        ))}
      </div>
    </motion.div>
  );
};
