"use client";

import {
  useCallback,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";
import { BookDemoButton } from "@/components/book-demo/BookDemoProvider";

const GRID_TILE = 32;
const GRID_BASE =
  "linear-gradient(to right, rgb(226 232 240) 1px, transparent 1px), linear-gradient(to bottom, rgb(226 232 240) 1px, transparent 1px)";
const GRID_ACCENT =
  "linear-gradient(to right, rgb(148 163 184) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184) 1px, transparent 1px)";

export default function RegulusHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [pointer, setPointer] = useState({ xPct: 50, yPct: 42 });
  const [isHovered, setIsHovered] = useState(false);

  const onPointerMove = useCallback((e: ReactPointerEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPointer({
      xPct: ((e.clientX - r.left) / Math.max(r.width, 1)) * 100,
      yPct: ((e.clientY - r.top) / Math.max(r.height, 1)) * 100,
    });
  }, []);

  const onPointerLeave = useCallback(() => {
    setPointer({ xPct: 50, yPct: 42 });
  }, []);

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative overflow-hidden pt-10 bg-white pb-32"
    >
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
            background: `radial-gradient(ellipse min(480px, 50vw) min(380px, 45vh) at ${pointer.xPct}% ${pointer.yPct}%, rgba(21, 181, 193, 0.12) 0%, transparent 68%)`,
          }}
        />
      </div>

      {/* Background gradients that align with the design */}
      <div className="pointer-events-none absolute top-0 right-0 z-1 h-full w-1/2 bg-linear-to-l from-cyan-50/50 to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-16 px-6 lg:flex-row lg:gap-8 lg:px-8">
        {/* Left Text Content */}
        <div className="flex-1 max-w-2xl">
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex w-fit items-center gap-2 rounded-full border border-[#0B64F44D] p-2 text-base font-semibold text-blue-500"
          >
           
          </motion.div> */}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[52px] mb-6 font-bold tracking-tight text-[#15B5C1]"
          >
            REGULUS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 w-2/3 text-base leading-snug text-gray-900"
          >
            The Statutory Early Warning Compliance tool for RBI & NHB regulated
            lenders.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-700 font-semibold mb-10"
          >
            Action Tracked. Accountability Defined. Compliance Proven.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <BookDemoButton className="bg-[#1677FF] hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-md transition-colors shadow-sm hover:shadow-md">
              Book Demo
            </BookDemoButton>
          </motion.div>
        </div>

        {/* Right Hex/Radial Visual — overflow-hidden + inset layer keeps hover cards on-screen */}
        <div
          className="relative mx-auto flex aspect-square w-full max-w-[min(100%,28rem)] cursor-pointer items-center justify-center overflow-hidden sm:max-w-[500px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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
              className="absolute rounded-full border border-cyan-400"
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
            className="absolute rounded-full border-2 border-dashed border-cyan-500"
            style={{ width: "85%", height: "85%" }}
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute rounded-full border border-cyan-400"
            style={{ width: "95%", height: "95%" }}
          />

          {/* Center Shield Container */}
          <div
            className={`relative z-20 rounded-full p-8 border border-cyan-100 flex items-center justify-center transition-all duration-500 bg-white ${isHovered ? "shadow-[0_0_60px_rgba(1,174,228,0.3)] shadow-[#01AEE4]/40 scale-110" : "shadow-none scale-100"}`}
          >
            <Shield className="w-28 h-28 text-cyan-500" strokeWidth={1.5} />
          </div>

          {/* Floating hover cards — positioned inside inset so they never sit outside the viewport */}
          <div
            className="pointer-events-none absolute inset-2 z-30 sm:inset-3"
            aria-hidden={true}
          >
            <AnimatePresence>
              {isHovered && (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 6, y: 6 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: [0, -6, 0],
                      y: [0, -6, 0],
                    }}
                    exit={{ opacity: 0, scale: 0.95, x: 6, y: 6 }}
                    transition={{
                      x: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0,
                      },
                      y: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0,
                      },
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 },
                    }}
                    className="absolute left-0 top-[24%] flex max-w-[min(100%,11.5rem)] items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-xl sm:top-[26%] sm:max-w-[13rem] sm:gap-3 sm:rounded-2xl sm:px-4"
                  >
                    <span
                      className="text-2xl font-bold uppercase text-gray-200 sm:text-4xl"
                      style={{ fontFamily: "Arial, sans-serif" }}
                    >
                      1
                    </span>
                    <span className="text-xs font-semibold text-[#01AEE4] leading-snug sm:text-sm">
                      <span className="border-b-[3px] border-[#01AEE4] pb-0.5 sm:pb-1">
                        DPD is lagging
                      </span>
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: -6, y: 6 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: [0, 6, 0],
                      y: [0, -6, 0],
                    }}
                    exit={{ opacity: 0, scale: 0.95, x: -6, y: 6 }}
                    transition={{
                      x: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      },
                      y: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      },
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 },
                    }}
                    className="absolute right-0 top-[30%] flex max-w-[min(100%,13rem)] items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-xl sm:top-[32%] sm:max-w-[15rem] sm:gap-3 sm:rounded-2xl sm:px-4"
                  >
                    <span
                      className="text-2xl font-bold uppercase text-gray-200 sm:text-4xl"
                      style={{ fontFamily: "Arial, sans-serif" }}
                    >
                      2
                    </span>
                    <span className="text-xs font-semibold text-[#01AEE4] leading-snug sm:text-sm">
                      Portfolio momentum{" "}
                      <span className="border-b-[3px] border-[#01AEE4] pb-0.5 sm:pb-1">
                        forms earlier
                      </span>
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 6, y: -6 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: [0, -6, 0],
                      y: [0, 6, 0],
                    }}
                    exit={{ opacity: 0, scale: 0.95, x: 6, y: -6 }}
                    transition={{
                      x: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.0,
                      },
                      y: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.0,
                      },
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 },
                    }}
                    className="absolute bottom-[28%] left-0 flex max-w-[min(100%,12.5rem)] items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-xl sm:bottom-[30%] sm:max-w-[14rem] sm:gap-3 sm:rounded-2xl sm:px-4"
                  >
                    <span
                      className="text-2xl font-bold uppercase text-gray-200 sm:text-4xl"
                      style={{ fontFamily: "Arial, sans-serif" }}
                    >
                      3
                    </span>
                    <span className="text-xs font-semibold text-[#01AEE4] leading-snug sm:text-sm">
                      Collections{" "}
                      <span className="border-b-[3px] border-[#01AEE4] pb-0.5 sm:pb-1">
                        capacity is finite
                      </span>
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: -6, y: -6 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: [0, 6, 0],
                      y: [0, 6, 0],
                    }}
                    exit={{ opacity: 0, scale: 0.95, x: -6, y: -6 }}
                    transition={{
                      x: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.5,
                      },
                      y: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.5,
                      },
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 },
                    }}
                    className="absolute bottom-[18%] right-0 flex max-w-[min(100%,11.5rem)] items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-xl sm:bottom-[20%] sm:max-w-[13rem] sm:gap-3 sm:rounded-2xl sm:px-4"
                  >
                    <span
                      className="text-2xl font-bold uppercase text-gray-200 sm:text-4xl"
                      style={{ fontFamily: "Arial, sans-serif" }}
                    >
                      4
                    </span>
                    <span className="text-xs font-semibold text-[#01AEE4] leading-snug sm:text-sm">
                      Capital{" "}
                      <span className="border-b-[3px] border-[#01AEE4] pb-0.5 sm:pb-1">
                        impact compounds
                      </span>
                    </span>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
