"use client";

import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, BarChart2, Target } from "lucide-react";
import { BookDemoButton } from "../book-demo/BookDemoProvider";

const GRID_TILE = 32;
const GRID_BASE =
  "linear-gradient(to right, rgb(226 232 240) 1px, transparent 1px), linear-gradient(to bottom, rgb(226 232 240) 1px, transparent 1px)";
const GRID_ACCENT =
  "linear-gradient(to right, rgb(148 163 184) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184) 1px, transparent 1px)";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [pointer, setPointer] = useState({ xPct: 50, yPct: 42 });

  const onPointerMove = useCallback((e: ReactPointerEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const xPct = ((e.clientX - r.left) / Math.max(r.width, 1)) * 100;
    const yPct = ((e.clientY - r.top) / Math.max(r.height, 1)) * 100;
    setPointer({ xPct, yPct });
  }, []);

  const onPointerLeave = useCallback(() => {
    setPointer({ xPct: 50, yPct: 42 });
  }, []);

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative overflow-hidden bg-white pt-10 pb-20 font-sans mb-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 select-none"
      >
        <div
          className="absolute inset-0 bg-white"
        />
        <div
          className="absolute inset-0 opacity-[0.65]"
          style={{
            backgroundImage: GRID_BASE,
            backgroundSize: `${GRID_TILE}px ${GRID_TILE}px`,
          }}
        />
        <div
          className="absolute inset-0 will-change-[mask-image]"
          style={{
            backgroundImage: GRID_ACCENT,
            backgroundSize: `${GRID_TILE}px ${GRID_TILE}px`,
            opacity: 0.35,
            maskImage: `radial-gradient(ellipse min(520px, 55vw) min(420px, 48vh) at ${pointer.xPct}% ${pointer.yPct}%, #000 0%, transparent 72%)`,
            WebkitMaskImage: `radial-gradient(ellipse min(520px, 55vw) min(420px, 48vh) at ${pointer.xPct}% ${pointer.yPct}%, #000 0%, transparent 72%)`,
          }}
        />
        <div
          className="absolute inset-0 transition-[background] duration-200 ease-out"
          style={{
            background: `radial-gradient(ellipse min(480px, 50vw) min(380px, 45vh) at ${pointer.xPct}% ${pointer.yPct}%, rgba(1, 174, 228, 0.11) 0%, transparent 68%)`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
        
        {/* Left Side: Content */}
        <div className="mt-10 lg:mt-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#01AEE4]/30 bg-white shadow-[0_2px_10px_rgba(1,174,228,0.06)] mb-8"
          >
            <Shield className="w-3.5 h-3.5 text-[#01AEE4]" strokeWidth={2.5} />
            <span className="text-[#01AEE4] text-[10px] uppercase font-bold tracking-[0.16em] mt-px">
              Earlysafe by Expergo
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[52px] sm:text-[52px] lg:text-[52px] font-extrabold text-[#1E293B] leading-[1.15] mb-10 tracking-tight"
          >
            Continuous Portfolio Risk Control <br className="hidden lg:block"/>
            for <span className="text-[#1677FF] block mt-1">NBFCs, HFCs & Banks</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 mb-14"
          >
            <div className="flex items-center gap-3">
              <Eye className="w-[18px] h-[18px] text-[#01AEE4]" strokeWidth={2.5} />
              <span className="text-[#334155] font-semibold text-[15px]">Detect risk early</span>
            </div>
            <div className="flex items-center gap-3">
              <BarChart2 className="w-[18px] h-[18px] text-[#01AEE4]" strokeWidth={2.5} />
              <span className="text-[#334155] font-semibold text-[15px]">Influence portfolio outcomes.</span>
            </div>
            <div className="flex items-center gap-3">
              <Target className="w-[18px] h-[18px] text-[#01AEE4]" strokeWidth={2.5} />
              <span className="text-[#334155] font-semibold text-[15px]">Quantify trajectory.</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <BookDemoButton className="flex items-center justify-center gap-2 px-7 py-3 rounded-[10px] border-[1.5px] border-[#1677FF] text-[#1677FF] font-bold text-[15px] bg-white hover:bg-blue-50 hover:shadow-lg transition-all active:scale-95 group">
              Book a Demo
            </BookDemoButton>
            {/* <button className="flex items-center justify-center gap-2 px-7 py-3 rounded-[10px] border-[1.5px] border-[#1677FF] text-[#1677FF] font-bold text-[15px] bg-white hover:bg-blue-50 hover:shadow-lg transition-all active:scale-95 group">
              Download
              <Download className="w-4 h-4 ml-1 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
            </button> */}
          </motion.div>
        </div>

        {/* Right Side: Radar Animation */}
        <div className="relative w-full h-[400px] lg:h-[550px] mt-10 lg:mt-0 rounded-[32px] overflow-hidden">
          {/* Main Radar Circle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] lg:w-[400px] lg:h-[400px] rounded-full border border-[#1f3d4f] overflow-hidden flex items-center justify-center">
            
            {/* Sweeping Radar Arm */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-0 rounded-full origin-center"
              style={{
                background: "conic-gradient(from 0deg, rgba(22, 119, 255, 0) 0%, rgba(22, 119, 255, 0) 65%, rgba(45, 137, 248, 0.8) 100%)",
              }}
            />

            {/* Faint Inner Distance Rings */}
            <div className="absolute w-[180px] h-[180px] lg:w-[260px] lg:h-[260px] rounded-full border border-[#1f3d4f]/60" />
            <div className="absolute w-[100px] h-[100px] lg:w-[140px] lg:h-[140px] rounded-full border border-[#1f3d4f]/60" />

          </div>

          {/* Dots on the radar (Green, Gray, Orange) */}
          <div className="absolute top-[32%] left-[38%] w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.9)] z-10" />
          <div className="absolute top-[50%] left-[24%] w-1.5 h-1.5 rounded-full bg-gray-400 shadow-[0_0_10px_rgba(156,163,175,0.7)] z-10" />
          <div className="absolute bottom-[38%] right-[32%] w-2.5 h-2.5 rounded-full bg-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.9)] z-10" />

          {/* Center Glowing White Ring */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] lg:w-[68px] lg:h-[68px] rounded-full border-[8px] lg:border-[10px] border-white bg-[#0f545a] shadow-[0_0_30px_rgba(255,255,255,0.7)] z-20" />

        </div>

      </div>
    </section>
  );
}
