"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BRAND = "#15B5C1";
const BLUE = "#2B5DE1";
const CARD_BORDER = "#B6D1FF";
const INK = "#1A1A1A";
const MUTED = "#5D6B78";

/** Five stacked bands — all #15B5C1 family (opacity / tint steps). */
const STACK_LAYERS = [
  { key: "s1", fill: "rgba(21,181,193,0.95)", stroke: BRAND },
  { key: "s2", fill: "rgba(21,181,193,0.82)", stroke: BRAND },
  { key: "s3", fill: "rgba(21,181,193,0.68)", stroke: BRAND },
  { key: "s4", fill: "rgba(21,181,193,0.52)", stroke: BRAND },
  { key: "s5", fill: "rgba(21,181,193,0.36)", stroke: BRAND },
] as const;

const trendData = [
  { name: "Apr", s1: 420, s2: 380, s3: 320, s4: 260, s5: 220 },
  { name: "May", s1: 540, s2: 480, s3: 400, s4: 340, s5: 280 },
  { name: "Jun", s1: 680, s2: 600, s3: 500, s4: 420, s5: 350 },
  { name: "Jul", s1: 820, s2: 720, s3: 600, s4: 500, s5: 420 },
  { name: "Aug", s1: 940, s2: 820, s3: 680, s4: 560, s5: 460 },
  { name: "Sep", s1: 1080, s2: 920, s3: 760, s4: 620, s5: 500 },
];

const concentrationData = [
  { name: "Junagadh", v: 18.5 },
  { name: "Panipat", v: 16.5 },
  { name: "Vapi", v: 14.5 },
  { name: "Solapur", v: 12.8 },
  { name: "Jhansi", v: 10.7 },
  { name: "Bhilai", v: 8.7 },
  { name: "Ahmednagar", v: 6.7 },
  { name: "Varanasi", v: 4.7 },
  { name: "Hanumangarh", v: 2.8 },
  { name: "Nashik", v: 1.4 },
];

const LIGHT_TEAL_CELL = "#7CCED6";
const DARK_BLUE_CELL = "#739DFF";

const dumbbellRows = [
  { label: "Behavioral Risk", first: 10, close: 30 },
  { label: "Collateral Risk", first: 18, close: 40 },
  { label: "Construction Risk", first: 10, close: 30 },
  { label: "Financial Risk", first: 30, close: 80 },
  { label: "Integrity Risk", first: 22, close: 70 },
] as const;

type AssembleMotion = ReturnType<typeof useAssemble>["t"];

function useAssemble() {
  const reduce = Boolean(useReducedMotion());
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.88", "start 0.28"],
  });
  /** Direct scroll progress avoids per-frame spring work on scroll (major CPU win). */
  const t = useTransform(scrollYProgress, (v) => (reduce ? 1 : v));
  return { ref, t };
}

function LeaderDot({ color }: { color: string }) {
  return (
    <span
      className="inline-block h-2 w-2 shrink-0 rounded-full border-[1.5px] bg-white transition-all"
      style={{ borderColor: color }}
    />
  );
}

/** Side annotation + leader toward chart — lives in grid column, never stacks on the card. */
function DataPointCallout({
  side,
  text,
  assemble,
  color = "#4BC6D3",
}: {
  side: "left" | "right";
  text: string;
  assemble: AssembleMotion;
  color?: string;
}) {
  const shift = useTransform(assemble, [0, 1], side === "left" ? [-10, 0] : [10, 0]);
  const fade = useTransform(assemble, [0, 0.18, 1], [0.4, 1, 1]);
  const lineScale = useTransform(assemble, [0, 1], [0.12, 1]);

  if (side === "left") {
    return (
      <motion.div
        style={{ opacity: fade }}
        className="flex w-full min-w-0 items-center justify-end"
      >
        <motion.p
          style={{ x: shift, color: INK }}
          className="mr-3 max-w-[12rem] text-balance text-right text-[10px] font-bold leading-snug tracking-tight sm:max-w-[13.5rem] sm:text-[11px]"
        >
          {text}
        </motion.p>
        <div className="flex shrink-0 items-center">
          <motion.div
            className="h-[1.5px] w-12 origin-right sm:w-16"
            style={{ scaleX: lineScale, backgroundColor: color }}
          />
          <LeaderDot color={color} />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div style={{ opacity: fade }} className="flex w-full min-w-0 items-center">
      <div className="flex shrink-0 items-center">
        <LeaderDot color={color} />
        <motion.div
          className="h-[1.5px] w-12 origin-left sm:w-16"
          style={{ scaleX: lineScale, backgroundColor: color }}
        />
      </div>
      <motion.p
        style={{ x: shift, color: INK }}
        className="ml-3 max-w-[12rem] text-balance text-left text-[10px] font-bold leading-snug tracking-tight sm:max-w-[13.5rem] sm:text-[11px]"
      >
        {text}
      </motion.p>
    </motion.div>
  );
}

function InsightShell({
  assemble,
  left,
  right,
  lineColor,
  children,
}: {
  assemble: AssembleMotion;
  left: [string, string];
  right: [string, string];
  lineColor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex h-full min-h-0 w-full max-w-[1060px] flex-col px-6 py-1 md:px-12 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-y-0 lg:gap-x-0">
      <aside className="order-2 flex flex-col justify-between gap-6 md:order-none md:min-h-[14rem] md:gap-8 md:py-1 lg:min-h-[16rem] lg:gap-10 opacity-90">
        <DataPointCallout side="left" text={left[0]} assemble={assemble} color={lineColor} />
        <DataPointCallout side="left" text={left[1]} assemble={assemble} color={lineColor} />
      </aside>
      <main className="relative z-[1] order-1 min-w-0 md:order-none mx-2 my-8 md:mx-0 md:my-0 scale-95 md:scale-100 flex items-center justify-center">
        {children}
      </main>
      <aside className="order-3 flex flex-col justify-between gap-6 md:order-none md:min-h-[14rem] md:gap-8 md:py-1 lg:min-h-[16rem] lg:gap-10 opacity-90">
        <DataPointCallout side="right" text={right[0]} assemble={assemble} color={lineColor} />
        <DataPointCallout side="right" text={right[1]} assemble={assemble} color={lineColor} />
      </aside>
    </div>
  );
}

function DelinquencyTrend({ assemble }: { assemble: AssembleMotion }) {
  const whiteDot = (props: { cx?: number; cy?: number; index?: number }) => {
    if (props.cx == null || props.cy == null) return null;
    return (
      <circle cx={props.cx} cy={props.cy} r={2} fill="#fff" stroke={BRAND} strokeWidth={1} />
    );
  };

  return (
    <InsightShell
      assemble={assemble}
      lineColor="#A5C7FF"
      left={[
        "Early stress signals rising across periods.",
        "Stress builds before delinquency becomes visible.",
      ]}
      right={[
        "Layered signals reveal hidden portfolio pressure.",
        "Upward trend indicates accelerating stress.",
      ]}
    >
      <div
        className="w-[calc(100vw-4rem)] md:w-[500px] xl:w-[520px] rounded-[20px] bg-white p-5 sm:p-6 shadow-[0px_0px_50px_rgba(75,198,211,0.25)] relative"
      >
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full border border-[#A5C7FF]" />
          <p className="text-[11px] font-bold tracking-wide text-gray-800">Triggers</p>
        </div>
        <div className="h-[220px] w-full sm:h-[260px] mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 6, left: -20, bottom: 2 }}>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#F0F4F8" />
              <XAxis
                dataKey="name"
                axisLine={{ stroke: "#E4E7EC" }}
                tickLine={false}
                tick={{ fontSize: 10, fill: INK, fontWeight: 600 }}
                dy={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: MUTED }}
                domain={[0, 5000]}
                ticks={[0, 1000, 2000, 3000, 4000, 5000]}
                tickFormatter={(val) => (val === 0 ? "0" : val.toLocaleString())}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: `1px solid ${CARD_BORDER}`,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
                labelStyle={{ fontSize: 12, fontWeight: 700, color: INK }}
                itemStyle={{ fontSize: 11, color: MUTED }}
              />
              {STACK_LAYERS.map(({ key, fill, stroke }) => (
                <Area
                  key={key}
                  type="linear"
                  dataKey={key}
                  stackId="1"
                  stroke={"#fff"}
                  strokeWidth={0.8}
                  fill={fill}
                  fillOpacity={1}
                  isAnimationActive={false}
                  dot={key === "s1" ? whiteDot : false}
                  activeDot={{ r: 4, fill: "#fff", stroke: BRAND, strokeWidth: 1.5 }}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </InsightShell>
  );
}

function barFillForIndex(i: number, n: number) {
  // Creating a nice gradient from dark blue to lighter blue
  const colors = [
    "#216AF2", // Darkest branch 1
    "#3475FA", // Branch 2
    "#4987FB", // Branch 3
    "#629BFD", // Branch 4
    "#7CAEFB", // Branch 5
    "#95BFFC", // Branch 6
    "#AACFFB", // Branch 7
    "#C8DDFF", // Branch 8
    "#DBEAFF", // Branch 9
    "#EAF2FF", // Lightest branch 10
  ];
  return colors[i % colors.length];
}

function RiskConcentration({ assemble }: { assemble: AssembleMotion }) {
  return (
    <InsightShell
      assemble={assemble}
      lineColor="#4BC6D3"
      left={[
        "Risk concentrated across select branches",
        "Top locations contribute disproportionately to exposure",
      ]}
      right={[
        "High concentration increases portfolio vulnerability",
        "Highlights need for diversification and control",
      ]}
    >
      <div
        className="w-[calc(100vw-4rem)] md:w-[500px] xl:w-[520px] rounded-2xl bg-white p-5 shadow-[0px_0px_50px_rgba(75,198,211,0.25)] sm:p-7"
      >
        <p className="mb-2 text-[11px] font-bold text-gray-800">Concentration%</p>
        <div className="h-[220px] w-full sm:h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={concentrationData} margin={{ top: 8, right: 4, left: -26, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8ECF0" />
              <XAxis
                dataKey="name"
                axisLine={{ stroke: "#E4E7EC" }}
                tickLine={false}
                interval={0}
                angle={-35}
                textAnchor="end"
                height={60}
                tick={{ fontSize: 7, fill: INK, fontWeight: 700 }}
                dy={6}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: MUTED }}
                domain={[0, 21]}
                ticks={[0, 3, 6, 9, 12, 15, 18, 21]}
              />
              <Tooltip
                cursor={{ fill: "rgba(33,106,242,0.06)" }}
                contentStyle={{
                  borderRadius: 8,
                  border: `1px solid ${CARD_BORDER}`,
                  fontSize: 11,
                }}
              />
              <Bar dataKey="v" radius={[4, 4, 0, 0]} maxBarSize={22} isAnimationActive={false}>
                {concentrationData.map((_, i) => (
                  <Cell key={i} fill={barFillForIndex(i, concentrationData.length)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-center text-[11px] font-bold tracking-wide text-gray-800">Branches</p>
      </div>
    </InsightShell>
  );
}

function ExternalInternalRisk({ assemble }: { assemble: AssembleMotion }) {
  return (
    <InsightShell
      assemble={assemble}
      lineColor="#4BC6D3"
      left={[
        "Segmented view of borrower behaviour.",
        "Internal vs external performance comparison.",
      ]}
      right={["High-risk segments clearly identified.", "Enables targeted risk intervention."]}
    >
      <div
        className="w-[calc(100vw-4rem)] md:w-[480px] xl:w-[500px] rounded-2xl bg-white p-6 shadow-[0px_0px_50px_rgba(75,198,211,0.25)] sm:p-8"
      >
        <div className="mx-auto flex w-full flex-col items-center gap-3">
          <div className="flex w-full items-stretch justify-center gap-3 sm:gap-4">
            <div className="flex w-8 shrink-0 flex-col justify-between py-6 text-right text-[10px] items-end font-bold leading-tight text-gray-800 sm:w-16 sm:text-[11px]">
              <span className="mt-4 break-words w-full">Bad with Us</span>
              <span className="mb-4 break-words w-full">Good with Us</span>
            </div>
            <div className="grid aspect-square min-h-0 w-full max-w-[min(100%,280px)] grid-cols-2 grid-rows-2 gap-[2px] sm:max-w-[min(100%,320px)] bg-white">
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="flex cursor-default items-center justify-center shadow-inner"
                style={{ backgroundColor: DARK_BLUE_CELL }}
              >
                <span className="text-xl font-bold text-white">2</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="flex cursor-default items-center justify-center shadow-inner"
                style={{ backgroundColor: LIGHT_TEAL_CELL }}
              >
                <span className="text-xl font-bold text-white">2</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="flex cursor-default items-center justify-center shadow-inner"
                style={{ backgroundColor: LIGHT_TEAL_CELL }}
              >
                <span className="text-xl font-bold text-white">2</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="flex cursor-default items-center justify-center shadow-inner"
                style={{ backgroundColor: DARK_BLUE_CELL }}
              >
                <span className="text-xl font-bold text-white">1</span>
              </motion.div>
            </div>
          </div>
          <div className="flex justify-between px-1 w-full max-w-[min(100%,280px)] sm:max-w-[min(100%,320px)] text-[10px] font-bold text-gray-800 sm:px-3 sm:text-[11px] ml-8 sm:ml-16">
            <span className="flex-1 text-center pl-2">Good Outside</span>
            <span className="flex-1 text-center pr-2">Bad Outside</span>
          </div>
        </div>
      </div>
    </InsightShell>
  );
}

function DumbbellRow({
  row,
  assemble,
  index,
  hovered,
  setHovered,
}: {
  row: (typeof dumbbellRows)[number];
  assemble: AssembleMotion;
  index: number;
  hovered: number | null;
  setHovered: (n: number | null) => void;
}) {
  const pct = (v: number) => `${v}%`;
  const lineWidth = useTransform(assemble, (p) => `${Math.max(0, row.close - row.first) * p}%`);
  const firstScale = useTransform(assemble, [0, 0.4, 1], [0.45, 0.88, 1]);
  const closeScale = useTransform(assemble, [0, 0.55, 1], [0.45, 0.92, 1]);

  return (
    <motion.div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={`mb-4 grid grid-cols-[minmax(0,110px)_1fr] items-center gap-4 sm:grid-cols-[minmax(0,130px)_1fr] sm:gap-6 ${
        hovered === index ? "rounded-md bg-[#15B5C1]/6 py-1" : ""
      }`}
    >
      <span className="text-right text-[10px] font-semibold leading-tight text-gray-900 sm:text-[11px]">
        {row.label}
      </span>
      <div className="relative h-10 sm:h-12 w-full pr-6">
        <motion.div
          className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-[#C8D7ED]"
          style={{
            left: pct(row.first),
            width: lineWidth,
          }}
        />
        <motion.span
          title={`First touch: ${row.first} days`}
          className="absolute top-1/2 z-[1] h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 cursor-default rounded-full shadow-sm"
          style={{
            left: pct(row.first),
            backgroundColor: "#2B5DE1",
            scale: firstScale,
          }}
        />
        <motion.span
          title={`Closure: ${row.close} days`}
          className="absolute top-1/2 z-[1] h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 cursor-default rounded-full shadow-sm"
          style={{
            left: pct(row.close),
            backgroundColor: "#15B5C1",
            scale: closeScale,
          }}
        />
      </div>
    </motion.div>
  );
}

function TriggerCloserTime({ assemble }: { assemble: AssembleMotion }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <InsightShell
      assemble={assemble}
      lineColor="#4BC6D3"
      left={[
        "First response is timely, but closure is delayed",
        "Large gap indicates operational inefficiency",
      ]}
      right={[
        "Higher-risk cases take longer to resolve",
        "Improves focus on reducing resolution timelines",
      ]}
    >
      <div
        className="w-[calc(100vw-4rem)] md:w-[500px] xl:w-[540px] rounded-2xl bg-white px-5 pb-12 pt-6 shadow-[0px_0px_50px_rgba(75,198,211,0.25)] sm:px-8"
      >
        <p className="text-left text-[12px] font-bold text-gray-900 mb-6">Risk Categories</p>
        
        <div className="relative mt-4">
          <div className="absolute inset-y-0 left-[110px] sm:left-[130px] right-6">
            <div className="relative h-full w-full">
              {[0, 20, 40, 60, 80, 100].map((n) => (
                <div key={n} className="absolute top-0 bottom-0 border-l border-dashed border-gray-200" style={{ left: `${n}%` }} />
              ))}
            </div>
          </div>

          <div className="relative z-10">
            {dumbbellRows.map((row, i) => (
              <DumbbellRow
                key={row.label}
                row={row}
                assemble={assemble}
                index={i}
                hovered={hovered}
                setHovered={setHovered}
              />
            ))}
          </div>

          <div className="relative mt-2 pl-[110px] sm:pl-[130px] pr-6">
            <div className="flex justify-between w-full h-[18px] text-[10px] font-semibold text-gray-500">
              {[0, 20, 40, 60, 80, 100].map((n) => (
                <div key={n} className="relative w-0 flex justify-center">
                  <span className="absolute transform -translate-x-1/2 mt-1">{n}</span>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-center text-[10px] font-bold text-gray-800 mt-6 mx-auto">
            No. of days
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[10px] font-bold">
          <span className="flex items-center gap-2" style={{ color: INK }}>
            <span className="inline-block h-3 w-3 rounded-full bg-[#2B5DE1]" />
            First Touch (Days)
          </span>
          <span className="flex items-center gap-2" style={{ color: INK }}>
            <span className="inline-block h-3 w-3 rounded-full bg-[#15B5C1]" />
            Closure Time (Days)
          </span>
        </div>
      </div>
    </InsightShell>
  );
}

export default function NewFile() {
  const [activeTab, setActiveTab] = useState(0);
  const { ref: assembleRef, t: assemble } = useAssemble();

  const tabs = [
    { title: "Delinquency Trends", Comp: DelinquencyTrend },
    { title: "Risk Concentration", Comp: RiskConcentration },
    { title: "External Internal Risk", Comp: ExternalInternalRisk },
    { title: "Trigger Clouser Time", Comp: TriggerCloserTime },
  ] as const;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [tabs.length]);

  const Active = tabs[activeTab].Comp;

  return (
    <section
      ref={assembleRef}
      className="flex flex-col items-center justify-center overflow-hidden bg-transparent md:py-16 py-2 font-sans w-full"
    >
      <div className="relative z-20 mb-8 flex flex-wrap justify-center gap-3 px-4">
        {tabs.map((tab, idx) => (
          <button
            key={tab.title}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
              activeTab === idx
                ? "text-white shadow-[0_4px_20px_rgba(21,181,193,0.45)]"
                : "border border-gray-100 bg-white text-gray-500 shadow-sm hover:text-gray-900"
            }`}
            style={activeTab === idx ? { backgroundColor: BRAND } : undefined}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full rounded-[24px] border-[1.5px] border-[#B6D1FF] bg-white pt-8 pb-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative z-10 overflow-visible min-h-[560px]">
          <h2 className="z-20 mb-8 text-center md:text-3xl text-2xl font-extrabold text-gray-900 transition-all">
            {tabs[activeTab].title}
          </h2>

          <div className="relative flex w-full items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <Active assemble={assemble} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
