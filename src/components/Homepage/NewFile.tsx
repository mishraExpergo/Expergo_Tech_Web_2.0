"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// --- Mock Data ---

const trendData = [
  { name: "Apr", green: 800, yellow: 1200, red: 500 },
  { name: "May", green: 1000, yellow: 1400, red: 600 },
  { name: "Jun", green: 1200, yellow: 1800, red: 700 },
  { name: "Jul", green: 1400, yellow: 2200, red: 800 },
  { name: "Aug", green: 1500, yellow: 2600, red: 900 },
  { name: "Sep", green: 1600, yellow: 3000, red: 1000 },
];

const momentumData = [
  {
    id: "L1HL004",
    location: "PUNE",
    score: 72,
    velocity: "+12",
    momentum: 80,
    status: "CRITICALLY DETERIORATING",
    statusColor: "bg-red-50 text-red-600 border-red-100",
  },
  {
    id: "L1LAP035",
    location: "DELHI",
    score: 65,
    velocity: "+8",
    momentum: 74,
    status: "STEADY DETERIORATION",
    statusColor: "bg-gray-100 text-gray-600 border-gray-200",
  },
  {
    id: "L1HL0304",
    location: "NOIDA",
    score: 45,
    velocity: "+15",
    momentum: 82,
    status: "RAPID STRESS",
    statusColor: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    id: "L1HL054",
    location: "BOMBAY",
    score: 55,
    velocity: "+5",
    momentum: 61,
    status: "WATCHING",
    statusColor: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    id: "L1LAP076",
    location: "BHIWANDI",
    score: 81,
    velocity: "+2",
    momentum: 45,
    status: "HIGH DPD / STABLE",
    statusColor: "bg-gray-100 text-gray-600 border-gray-200",
  },
];

// --- Components ---

const Callout = ({
  text,
  position,
  delay = 0,
}: {
  text: string;
  position: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className={`absolute ${position} flex items-center gap-2 max-w-[200px] z-20`}
    >
      <span className="text-[10px] leading-tight font-semibold text-gray-800">
        {text}
      </span>
    </motion.div>
  );
};

// 1. Delinquency Trend View
const DelinquencyTrend = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      {/* Callouts */}
      <div className="absolute top-12 -left-12 max-w-[140px] text-right pr-4">
        <p className="text-[10px] font-bold text-gray-800">
          Early stress signals rising across periods.
        </p>
        <div className="absolute top-1/2 -right-2 w-4 h-[1px] bg-[#01AEE4]" />
        <div className="absolute top-1/2 -right-3 w-1.5 h-1.5 rounded-full border border-[#01AEE4] bg-white -translate-y-1/2" />
      </div>

      <div className="absolute bottom-12 -left-12 max-w-[140px] text-right pr-4">
        <p className="text-[10px] font-bold text-gray-800">
          Stress builds before delinquency becomes visible.
        </p>
        <div className="absolute top-1/2 -right-2 w-4 h-[1px] bg-[#01AEE4]" />
        <div className="absolute top-1/2 -right-3 w-1.5 h-1.5 rounded-full border border-[#01AEE4] bg-white -translate-y-1/2" />
      </div>

      <div className="absolute top-20 -right-12 max-w-[140px] pl-4">
        <p className="text-[10px] font-bold text-gray-800">
          Layered signals reveal hidden portfolio pressure.
        </p>
        <div className="absolute top-1/2 -left-2 w-4 h-[1px] bg-[#01AEE4]" />
        <div className="absolute top-1/2 -left-3 w-1.5 h-1.5 rounded-full border border-[#01AEE4] bg-white -translate-y-1/2" />
      </div>

      <div className="absolute bottom-20 -right-12 max-w-[150px] pl-4">
        <p className="text-[10px] font-bold text-gray-800">
          Upward trend indicates accelerating stress.
        </p>
        <div className="absolute top-1/2 -left-2 w-4 h-[1px] bg-[#01AEE4]" />
        <div className="absolute top-1/2 -left-3 w-1.5 h-1.5 rounded-full border border-[#01AEE4] bg-white -translate-y-1/2" />
      </div>

      {/* Chart */}
      <div className="w-full h-[250px] bg-white rounded-xl shadow-[0_0_40px_rgba(1,174,228,0.15)] border border-gray-100 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={trendData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#6b7280" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#6b7280" }}
              domain={[0, 5000]}
              ticks={[0, 1000, 2000, 3000, 4000, 5000]}
            />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              itemStyle={{ fontSize: "12px" }}
              labelStyle={{ fontSize: "12px", fontWeight: "bold", color: "#374151" }}
            />
            <Area
              type="monotone"
              dataKey="green"
              stackId="1"
              stroke="#22c55e"
              fill="#86efac"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="yellow"
              stackId="1"
              stroke="#eab308"
              fill="#fde047"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="red"
              stackId="1"
              stroke="#ef4444"
              fill="#fca5a5"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// 2. Risk Momentum View
const RiskMomentum = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      {/* Callouts */}
      <div className="absolute top-16 -left-16 max-w-[140px] text-right pr-4">
        <p className="text-[10px] font-bold text-gray-800">
          Highlights continuously deteriorating accounts.
        </p>
        <div className="absolute top-1/2 -right-2 w-4 h-[1px] bg-[#01AEE4]" />
        <div className="absolute top-1/2 -right-3 w-1.5 h-1.5 rounded-full border border-[#01AEE4] bg-white -translate-y-1/2" />
      </div>

      <div className="absolute bottom-12 -left-16 max-w-[140px] text-right pr-4">
        <p className="text-[10px] font-bold text-gray-800">
          Momentum and velocity show worsening trends.
        </p>
        <div className="absolute top-1/2 -right-2 w-4 h-[1px] bg-[#01AEE4]" />
        <div className="absolute top-1/2 -right-3 w-1.5 h-1.5 rounded-full border border-[#01AEE4] bg-white -translate-y-1/2" />
      </div>

      <div className="absolute top-24 -right-16 max-w-[140px] pl-4">
        <p className="text-[10px] font-bold text-gray-800">
          High scores indicate rapid risk escalation.
        </p>
        <div className="absolute top-1/2 -left-2 w-4 h-[1px] bg-[#01AEE4]" />
        <div className="absolute top-1/2 -left-3 w-1.5 h-1.5 rounded-full border border-[#01AEE4] bg-white -translate-y-1/2" />
      </div>

      <div className="absolute bottom-24 -right-16 max-w-[140px] pl-4">
        <p className="text-[10px] font-bold text-gray-800">
          Enables prioritization of critical accounts.
        </p>
        <div className="absolute top-1/2 -left-2 w-4 h-[1px] bg-[#01AEE4]" />
        <div className="absolute top-1/2 -left-3 w-1.5 h-1.5 rounded-full border border-[#01AEE4] bg-white -translate-y-1/2" />
      </div>

      {/* Table */}
      <div className="w-full h-full bg-white rounded-xl shadow-[0_0_40px_rgba(1,174,228,0.15)] border border-gray-100 p-6 overflow-hidden flex flex-col">
        <div className="grid grid-cols-5 text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-4">
          <div className="col-span-1">Account Details</div>
          <div className="text-center">Current Score</div>
          <div className="text-center">Velocity (Δ)</div>
          <div className="text-center">Momentum Score</div>
          <div className="text-right">Trend Status</div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          {momentumData.map((row, idx) => (
            <motion.div
              key={row.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="grid grid-cols-5 items-center py-2"
            >
              <div className="col-span-1">
                <div className="text-[11px] font-bold text-gray-800">
                  {row.id}
                </div>
                <div className="text-[9px] text-gray-400 uppercase">
                  {row.location}
                </div>
              </div>
              <div className="text-center text-[11px] font-semibold text-gray-800">
                {row.score}
              </div>
              <div className="text-center text-[11px] font-bold text-red-500">
                {row.velocity}
              </div>
              <div className="text-center flex justify-center items-center gap-2">
                <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      row.momentum > 70 ? "bg-red-500" : "bg-green-500"
                    }`}
                    style={{ width: `${row.momentum}%` }}
                  />
                </div>
                <span className="text-[9px] font-bold text-gray-600">
                  {row.momentum} / 100
                </span>
              </div>
              <div className="text-right flex justify-end">
                <span
                  className={`text-[8px] font-bold px-2 py-1 rounded border ${row.statusColor}`}
                >
                  {row.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 3. External to Internal Risk View
const ExternalInternalRisk = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      {/* Callouts */}
      <div className="absolute top-12 -left-12 max-w-[140px] text-right pr-4">
        <p className="text-[10px] font-bold text-gray-800">
          Segmented view of borrower behaviour.
        </p>
        <div className="absolute top-1/2 -right-2 w-4 h-[1px] bg-[#01AEE4]" />
        <div className="absolute top-1/2 -right-3 w-1.5 h-1.5 rounded-full border border-[#01AEE4] bg-white -translate-y-1/2" />
      </div>

      <div className="absolute bottom-16 -left-12 max-w-[140px] text-right pr-4">
        <p className="text-[10px] font-bold text-gray-800">
          Internal vs external performance comparison.
        </p>
        <div className="absolute top-1/2 -right-2 w-4 h-[1px] bg-[#01AEE4]" />
        <div className="absolute top-1/2 -right-3 w-1.5 h-1.5 rounded-full border border-[#01AEE4] bg-white -translate-y-1/2" />
      </div>

      <div className="absolute top-24 -right-12 max-w-[140px] pl-4">
        <p className="text-[10px] font-bold text-gray-800">
          High-risk segments clearly identified.
        </p>
        <div className="absolute top-1/2 -left-2 w-4 h-[1px] bg-[#01AEE4]" />
        <div className="absolute top-1/2 -left-3 w-1.5 h-1.5 rounded-full border border-[#01AEE4] bg-white -translate-y-1/2" />
      </div>

      <div className="absolute bottom-24 -right-12 max-w-[140px] pl-4">
        <p className="text-[10px] font-bold text-gray-800">
          Enables targeted risk intervention.
        </p>
        <div className="absolute top-1/2 -left-2 w-4 h-[1px] bg-[#01AEE4]" />
        <div className="absolute top-1/2 -left-3 w-1.5 h-1.5 rounded-full border border-[#01AEE4] bg-white -translate-y-1/2" />
      </div>

      {/* Grid Matrix */}
      <div className="w-full h-full bg-white rounded-xl shadow-[0_0_40px_rgba(1,174,228,0.15)] border border-gray-100 p-8 flex items-center justify-center">
        <div className="relative w-[80%] aspect-square max-w-[280px]">
          {/* Y Axis Label */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col items-end gap-16 text-[9px] font-bold text-gray-500 whitespace-nowrap">
            <span>Bad with Us</span>
            <span>Good with Us</span>
          </div>

          {/* X Axis Label */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex justify-between w-[80%] text-[9px] font-bold text-gray-500 whitespace-nowrap pt-2">
            <span>Good Outside</span>
            <span>Bad Outside</span>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-orange-500 rounded flex items-center justify-center flex-col shadow-inner cursor-pointer hover:bg-orange-400 transition-colors"
            >
              <span className="text-white font-bold text-lg">2</span>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-red-500 rounded flex items-center justify-center shadow-inner cursor-pointer hover:bg-red-400 transition-colors"
            >
              <span className="text-white font-bold text-lg">2</span>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-green-500 rounded flex items-center justify-center shadow-inner cursor-pointer hover:bg-green-400 transition-colors"
            >
              <span className="text-white font-bold text-lg">2</span>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-yellow-400 rounded flex items-center justify-center shadow-inner cursor-pointer hover:bg-yellow-300 transition-colors"
            >
              <span className="text-white font-bold text-lg">1</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function NewFile() {
  const [activeTab, setActiveTab] = useState<number>(0);
  
  const tabs = [
    { title: "Delinquency Trend", component: DelinquencyTrend },
    { title: "Risk Momentum", component: RiskMomentum },
    { title: "External to Internal Risk", component: ExternalInternalRisk },
  ];

  // Auto-cycle through tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tabs.length]);

  return (
    <section className="py-24 bg-gray-50/50 flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* Header Tabs */}
      <div className="flex gap-4 mb-12 relative z-20">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all relative ${
              activeTab === idx
                ? "text-white bg-[#0f545a] shadow-[0_4px_20px_rgba(15,84,90,0.4)]"
                : "text-gray-500 hover:text-gray-900 bg-white shadow-sm border border-gray-100"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
        {/* Glow behind main card */}
        <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#01AEE4]/20 blur-[100px] rounded-full point-events-none" />
        
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 z-20 transition-all">
          {tabs[activeTab].title}
        </h2>

        {/* Main Presentation Area */}
        <div className="relative w-full max-w-[800px] h-[400px] z-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {React.createElement(tabs[activeTab].component)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
