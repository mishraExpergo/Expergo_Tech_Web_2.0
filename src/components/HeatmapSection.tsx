"use client";
import {
  Fragment,
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
  type FocusEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

type Dimension = "Product" | "Geography" | "Segment";
type SignalType = "Migration Risk" | "Behavioural Anomaly" | "Fraud Exposure" | "Capital-at-Risk";
type TimeWindow = "7D" | "30D" | "90D" | "180D";

interface CellData {
  row: string;
  col: string;
  level: number; // 0-3
  accounts: number;
  direction: string;
  anomalySignals: number;
}

const vintages = ["2021", "2022", "2023", "2024"];

const dimensionRows: Record<Dimension, string[]> = {
  Product: ["Housing", "MSME", "Auto", "LAP", "Personal"],
  Geography: ["North", "South", "West", "East", "Central"],
  Segment: ["Prime", "Near-Prime", "Sub-Prime", "New-to-Credit"],
};

const generateHeatmapData = (dim: Dimension, signal: SignalType): CellData[] => {
  const rows = dimensionRows[dim];
  const data: CellData[] = [];
  const seed = signal.length + dim.length;
  rows.forEach((row, ri) => {
    vintages.forEach((col, ci) => {
      const pseudo = ((ri * 7 + ci * 13 + seed) % 17) / 17;
      const level = pseudo < 0.3 ? 0 : pseudo < 0.55 ? 1 : pseudo < 0.8 ? 2 : 3;
      data.push({
        row,
        col,
        level,
        accounts: 1200 + Math.floor(pseudo * 4000),
        direction: pseudo > 0.6 ? "accelerating" : pseudo > 0.4 ? "stable" : "improving",
        anomalySignals: Math.floor(pseudo * 20),
      });
    });
  });
  return data;
};

const levelColors = [
  "bg-risk-stable",
  "bg-risk-watch",
  "bg-risk-accelerating",
  "bg-risk-high",
];

const levelLabels = ["Stable", "Watch", "Accelerating", "High Risk"];

const TIME_SEQUENCE: TimeWindow[] = ["7D", "30D", "90D", "180D"];
const AUTO_TAB_MS = 3200;
const CLICK_PAUSE_MS = 10000;

const HeatmapSection = () => {
  const [dimension, setDimension] = useState<Dimension>("Product");
  const [signal, setSignal] = useState<SignalType>("Migration Risk");
  const [timeWindow, setTimeWindow] = useState<TimeWindow>("90D");
  const data = useMemo(() => generateHeatmapData(dimension, signal), [dimension, signal]);
  const rows = dimensionRows[dimension];

  const [selectedCell, setSelectedCell] = useState<CellData | null>(data[0] ?? null);

  // Reset to first cell when dimension or signal changes
  useEffect(() => {
    setSelectedCell(data[0] ?? null);
  }, [data]);

  const sectionRef = useRef<HTMLElement>(null);
  const [sectionInView, setSectionInView] = useState(false);
  const [tabsPointerInside, setTabsPointerInside] = useState(false);
  const [tabsFocusInside, setTabsFocusInside] = useState(false);
  const [clickPaused, setClickPaused] = useState(false);
  const clickPauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pauseAuto = tabsPointerInside || tabsFocusInside || clickPaused;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setSectionInView(entry.isIntersecting);
        if (!entry.isIntersecting) {
          if (clickPauseTimerRef.current) {
            clearTimeout(clickPauseTimerRef.current);
            clickPauseTimerRef.current = null;
          }
          setClickPaused(false);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!sectionInView || pauseAuto) return;
    const id = window.setInterval(() => {
      setTimeWindow((prev) => {
        const i = TIME_SEQUENCE.indexOf(prev);
        return TIME_SEQUENCE[(i + 1) % TIME_SEQUENCE.length];
      });
    }, AUTO_TAB_MS);
    return () => clearInterval(id);
  }, [sectionInView, pauseAuto]);

  const handleTimeTabClick = useCallback((t: TimeWindow) => {
    setTimeWindow(t);
    if (clickPauseTimerRef.current) clearTimeout(clickPauseTimerRef.current);
    setClickPaused(true);
    clickPauseTimerRef.current = setTimeout(() => {
      setClickPaused(false);
      clickPauseTimerRef.current = null;
    }, CLICK_PAUSE_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (clickPauseTimerRef.current) clearTimeout(clickPauseTimerRef.current);
    };
  }, []);

  const handleTabsBlur = useCallback((e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setTabsFocusInside(false);
    }
  }, []);

  return (
    <section ref={sectionRef} className="bg-card pt-20 pb-8 md:py-28">
      <div className="container mx-auto max-w-[1200px] px-6 md:my-0 md:px-10 max-md:my-[-70px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.305 }}
          className="mb-10"
        >
          <p className="text-[16px] uppercase mb-1 text-[#15B5C1]">Portfolio Intelligence</p>
          <h2 className="text-[36px]  mb-4 font-semibold">Interactive  <span className="text-[#15B5C1]">Portfolio Heatmap</span></h2>
          <p className="es-body max-w-3xl ">
            Visualise where stress is forming across dimensions, vintages, and signal types.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={dimension}
            onChange={(e) => setDimension(e.target.value as Dimension)}
            className="text-sm border border-border rounded-lg px-4 py-2 bg-background text-foreground"
          >
            {(["Product", "Geography", "Segment"] as Dimension[]).map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <select
            value={signal}
            onChange={(e) => setSignal(e.target.value as SignalType)}
            className="text-sm border border-border rounded-lg px-4 py-2 bg-background text-foreground"
          >
            {(["Migration Risk", "Behavioural Anomaly", "Fraud Exposure", "Capital-at-Risk"] as SignalType[]).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <div
            className="flex gap-1 p-1 bg-muted rounded-lg"
            onMouseEnter={() => setTabsPointerInside(true)}
            onMouseLeave={() => setTabsPointerInside(false)}
            onFocusCapture={() => setTabsFocusInside(true)}
            onBlurCapture={handleTabsBlur}
            role="tablist"
            aria-label="Time window"
          >
            {TIME_SEQUENCE.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={timeWindow === t}
                onClick={() => handleTimeTabClick(t)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  timeWindow === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Heatmap */}
          <div className="lg:col-span-2">
            <div className="border border-border rounded-xl bg-background px-4 py-6 sm:p-6">
              {/* Legend */}
              <div className="mb-6 flex flex-nowrap items-center justify-between gap-0.5 sm:gap-2 md:justify-start md:gap-4">
                {levelLabels.map((label, i) => (
                  <div key={label} className="flex shrink-0 items-center gap-0.5 sm:gap-1.5">
                    <div
                      className={`h-2.5 w-2.5 shrink-0 rounded-sm sm:h-3 sm:w-3 ${levelColors[i]}`}
                    />
                    <span className="whitespace-nowrap text-[9px] leading-none text-muted-foreground sm:text-[11px] md:text-xs md:leading-snug lg:text-sm">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Grid header */}
              <div className="grid gap-2" style={{ gridTemplateColumns: `120px repeat(${vintages.length}, 1fr)` }}>
                <div />
                {vintages.map((v) => (
                  <div key={v} className="text-center es-caption font-medium">{v}</div>
                ))}

                {rows.map((row) => (
                  <Fragment key={row}>
                    <div className="flex items-center text-sm text-foreground font-medium">{row}</div>
                    {vintages.map((col) => {
                      const cell = data.find((d) => d.row === row && d.col === col)!;
                      const isSelected = selectedCell?.row === row && selectedCell?.col === col;
                      return (
                        <motion.button
                          key={`${row}-${col}`}
                          onClick={() => setSelectedCell(isSelected ? null : cell)}
                          className={`aspect-2/1 rounded-md ${levelColors[cell.level]} transition-all ${
                            isSelected ? "ring-2 ring-foreground ring-offset-2" : "hover:ring-1 hover:ring-foreground/20"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.155 }}
                        />
                      );
                    })}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Detail drawer */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {selectedCell ? (
                <motion.div
                  key={`${selectedCell.row}-${selectedCell.col}`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.305 }}
                  className="border border-border rounded-xl p-6 bg-background sticky top-24"
                >
                  <h3 className="text-base font-semibold text-foreground mb-1">{selectedCell.row} · {selectedCell.col} Vintage</h3>
                  <p className="es-caption mb-5">{signal} · {timeWindow} window</p>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Accounts</span>
                      <span className="text-sm font-medium text-foreground">{selectedCell.accounts.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Risk Level</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[selectedCell.level]} ${
                        selectedCell.level === 3 ? "text-risk-high-text" : selectedCell.level === 2 ? "text-risk-accelerating-text" : selectedCell.level === 1 ? "text-risk-watch-text" : "text-risk-stable-text"
                      }`}>
                        {levelLabels[selectedCell.level]}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Direction</span>
                      <span className="text-sm font-medium text-foreground capitalize">{selectedCell.direction}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Anomaly Signals</span>
                      <span className="text-sm font-medium text-foreground">{selectedCell.anomalySignals}</span>
                    </div>
                  </div>

                  <div className="mt-6 p-3 rounded-lg bg-muted">
                    <p className="text-xs text-foreground leading-relaxed">
                      {selectedCell.direction === "accelerating"
                        ? "Acceleration visible in recent repayment deviation and bureau movement. Prioritise collections review."
                        : selectedCell.direction === "stable"
                        ? "Cohort shows stable performance within expected parameters. Continue monitoring."
                        : "Improving trajectory detected. Reduced intervention pressure recommended."}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.305 }}
                  className="border border-dashed border-border rounded-xl p-6 flex items-center justify-center min-h-[300px]"
                >
                  <p className="text-xl text-center text-blue-500">Select a cell to view cohort details</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeatmapSection;
