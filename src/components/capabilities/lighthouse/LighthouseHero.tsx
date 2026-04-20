"use client";

import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { BookDemoButton } from "@/components/book-demo/BookDemoProvider";
import { motion } from "framer-motion";

const GRID_TILE = 32;
const GRID_BASE =
  "linear-gradient(to right, rgb(226 232 240) 1px, transparent 1px), linear-gradient(to bottom, rgb(226 232 240) 1px, transparent 1px)";
const GRID_ACCENT =
  "linear-gradient(to right, rgb(148 163 184) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184) 1px, transparent 1px)";

export default function LighthouseHero() {
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

  const stats = [
    { value: "500+", label: "risk and control views" },
    { value: "50+", label: "risk signal  " },
    // { value: "10+", label: "PAYMENT BEHAVIOUR SIGNALS" },
    { value: "Real Time", label: "STRESS MONITORING" }
  ];

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative pb-16 pt-24 overflow-hidden bg-[#F9FAFB] pt-0"
    >
      {/* Interactive grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 select-none"
      >
        <div className="absolute inset-0 bg-[#F9FAFB]" />
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
            background: `radial-gradient(ellipse min(480px, 50vw) min(380px, 45vh) at ${pointer.xPct}% ${pointer.yPct}%, rgba(21, 181, 193, 0.11) 0%, transparent 68%)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 pt-0 mt-0 lg:-mt-8">
        
        {/* Left Text Content */}
        <div className="flex-1 max-w-2xl mt-4 lg:mt-0">
         
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 mb-2 leading-tight"
          >
            Risk Dashboard <br/>
            <span className="text-[#15B5C1]">Lighthouse</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-500 font-medium mb-12 leading-relaxed max-w-xl"
          >
Transforms how institutions monitor and control portfolio risk. A risk control dashboard that reveals how stress forms,moves,and is acted upon across the credit life cycle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <BookDemoButton
             className="bg-[#1677FF] hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-md transition-colors shadow-sm hover:shadow-md">
              Book Demo
            </BookDemoButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-6 md:gap-10  pt-8"
          >
             {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                   <span className="text-2xl md:text-3xl font-black text-[#01AEE4] mb-1">{stat.value}</span>
                   <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wide leading-tight max-w-[80px]">{stat.label}</span>
                </div>
             ))}
          </motion.div>
        </div>

        {/* Right: Lighthouse SVG + cyan ripple overlay */}
        <div className="flex w-full max-w-[520px] flex-1 items-center justify-center -mt-8 lg:-mt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative flex w-full items-center justify-center p-8"
          >
            {/* Cyan ripples — drawn behind the art */}
            <div
              className="pointer-events-none absolute left-[49%] top-[35%] z-0 flex h-0 w-0 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              aria-hidden
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-[#01AEE4]"
                  style={{
                    width: 200,
                    height: 200,
                  }}
                  animate={{
                    scale: [1, 3.5],
                    opacity: [0.7, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 1.33,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            <img
              src="/Lighthousee.svg"
              alt="Lighthouse"
              className="relative z-10 w-full max-w-[100rem] h-auto max-h-[100vh] object-contain select-none transform translate-y-30"
              decoding="async"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
