"use client";

import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { BookDemoButton } from "@/components/book-demo/BookDemoProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";

const GRID_TILE = 32;
const GRID_BASE =
  "linear-gradient(to right, rgb(226 232 240) 1px, transparent 1px), linear-gradient(to bottom, rgb(226 232 240) 1px, transparent 1px)";
const GRID_ACCENT =
  "linear-gradient(to right, rgb(148 163 184) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184) 1px, transparent 1px)";

export type BureauHeroCopy = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  tags: string[];
};

export default function BureauHero({ hero }: { hero: BureauHeroCopy }) {
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
      className="relative pb-16 overflow-hidden bg-white"
    >
      {/* Interactive grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 select-none"
      >
        <div className="absolute inset-0 bg-white" />
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

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
        {/* Left Text Content */}
        <div className="flex-1 max-w-2xl pt-8 pb-6 lg:py-18">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="m-15 my-0.5 text-[44px] py-1  mb-6 font-bold  text-[#15B5C1]"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-500 py-1 p-18 mb-2 w-[30rem] text-[16px] font-medium"
          >
            {hero.subtitle}
          </motion.p>

          {/* {hero.tags.length ? (
            <div className="mb-8 flex max-w-xl flex-wrap gap-2">
              {hero.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-cyan-200 bg-cyan-50/60 px-3 py-1 text-xs font-medium text-cyan-800"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null} */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 -py-2"
          >
            <BookDemoButton className="bg-[#1677FF] hover:bg-blue-600 text-white font-medium m-18 px-8 py-3 rounded-md transition-colors shadow-sm">
              Book Demo
            </BookDemoButton>
          </motion.div>
        </div>

        {/* Right Isometric Visual */}
        <div 
          className="flex-1 flex justify-center items-center relative w-full h-[380px] sm:h-[420px] lg:h-[500px] max-w-[500px] cursor-pointer"
        >
          {/* Animated concentric circles */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
              className="absolute rounded-full border border-cyan-400/30 lg:inset-0 lg:m-auto"
              style={{
                width: `${(i + 1) * 20}%`,
                height: `${(i + 1) * 20}%`,
              }}
            />
          ))}

          {/* Dotted outer circle */}
         <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="hidden lg:block absolute inset-0 m-auto rounded-full border-2 border-dashed border-cyan-200"
          style={{ width: '85%', height: '85%' }}
        />
          
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="hidden lg:block absolute inset-0 m-auto rounded-full border border-cyan-300/40"
            style={{ width: '95%', height: '95%' }}
          />

         

          {/* Floating Cards */}
          <AnimatePresence>            
          <div className="flex flex-col items-center gap-3 mt-[-80]
          lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center">

            {/*card one */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 10, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: [0, -15, 0],
                    y: [0, -15, 0]
                  }}
                  exit={{ opacity: 0, scale: 0.95, x: 10, y: 10 }}
                  transition={{ 
                    x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 },
                    opacity: { duration: 0.3 }, 
                    scale: { duration: 0.3 } 
                  }}
                className="relative order-1 lg:absolute
                  lg:top-[30%] lg:-left-24
                  w-[260px] max-w-[85vw]
                  bg-white rounded-xl shadow-lg px-4 py-2 flex items-center gap-3 z-30">
                  <span className="text-4xl font-bold text-gray-200 uppercase" style={{ fontFamily: "Arial, sans-serif" }}>1</span>
                  <span className="text-[#01AEE4] font-semibold text-sm leading-snug">Customer-to-loan level<span className="border-b-[3px] border-[#01AEE4] pb-1"> interpretation</span></span>
                </motion.div>

                {/*card two */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: -10, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: [0, 15, 0],
                    y: [0, -15, 0]
                  }}
                  exit={{ opacity: 0, scale: 0.95, x: -10, y: 10 }}
                  transition={{ 
                    x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                    opacity: { duration: 0.3 }, 
                    scale: { duration: 0.3 } 
                  }}
               className="relative order-2 lg:absolute
                lg:top-[30%] lg:-right-10
                w-[220px] max-w-[85vw]
                bg-white rounded-xl shadow-lg px-4 py-2 flex items-center gap-3 z-30">
                
                  <span className="text-4xl font-bold text-gray-200 uppercase" style={{ fontFamily: "Arial, sans-serif" }}>2</span>
                 <span className="text-[#01AEE4] font-semibold text-sm leading-snug">External ↔ Internal <span className="border-b-[3px] border-[#01AEE4] pb-1">stress linkage </span></span>
                </motion.div>

                 {/* Center Shield Container */}
          <div className="relative order-3  z-10 my-2 lg:my-0 rounded-full p-8 border border-cyan-100 flex items-center justify-center transition-all duration-500 bg-white shadow-[0_0_60px_rgba(1,174,228,0.3)] shadow-[#01AEE4]/40 scale-110">
             <Shield className="w-28 h-28 text-cyan-500" strokeWidth={1.5} />
          </div>

                {/*card three */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 10, y: -10 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: [0, -15, 0],
                    y: [0, 15, 0]
                  }}
                  exit={{ opacity: 0, scale: 0.95, x: 10, y: -10 }}
                  transition={{ 
                    x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.0 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.0 },
                    opacity: { duration: 0.3 }, 
                    scale: { duration: 0.3 } 
                  }}
              className="relative order-4 mt-4 lg:absolute
              lg:bottom-[35%] lg:-left-28
              w-[260px] max-w-[85vw] h-13
              bg-white rounded-xl shadow-lg px-4  flex items-center gap-3 z-30">
                  
                  <span className="text-4xl font-bold text-gray-200 uppercase" style={{ fontFamily: "Arial, sans-serif" }}>3</span>
                 <span className="text-[#01AEE4] font-semibold text-sm leading-snug">Score & enquiry <span className="border-b-[3px] border-[#01AEE4] pb-1">signal movement</span></span>
                </motion.div>

                {/*card four */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: -10, y: -10 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: [0, 15, 0],
                    y: [0, 15, 0]
                  }}
                  exit={{ opacity: 0, scale: 0.95, x: -10, y: -10 }}
                  transition={{ 
                    x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
                    opacity: { duration: 0.3 }, 
                    scale: { duration: 0.3 } 
                  }}
               className="relative order-5 mb-6 lg:absolute
              lg:bottom-[28%] lg:-right-10
              w-[210px] max-w-[85vw]
              bg-white rounded-xl shadow-lg px-4 py-2 flex items-center gap-3 z-30">
                  <span className="text-4xl font-bold text-gray-200 uppercase" style={{ fontFamily: "Arial, sans-serif" }}>4</span>
                  <span className="text-[#01AEE4] font-semibold text-sm leading-snug">Cross-lender <span className="border-b-[3px] border-[#01AEE4] pb-1">exposure & leverage</span></span>
                </motion.div>
              </div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
