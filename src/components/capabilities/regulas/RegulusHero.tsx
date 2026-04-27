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
import { ComplianceHubAssemble } from "../ComplianceHubAssemble";

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
      className="relative overflow-hidden bg-white pt-6 pb-6 lg:pt-10 lg:pb-32"
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

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 lg:flex-row lg:gap-8 lg:px-8">
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
            className="mb-3 text-4xl font-bold tracking-tight text-[#15B5C1] lg:mb-6 lg:text-[52px]"
          >
            REGULUS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-3 w-full max-w-md text-base leading-snug text-gray-900 lg:mb-4 lg:w-2/3"
          >
            The Statutory Early Warning Compliance tool for RBI & NHB regulated
            lenders.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-5 text-base font-semibold text-gray-700 lg:mb-10 lg:text-lg"
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

        {/* Right Hex/Radial Visual — compact on small screens so hero fits one viewport */}
        <ComplianceHubAssemble className="h-[min(320px,calc(100vw-3rem))] w-[min(320px,calc(100vw-3rem))] lg:h-[min(400px,85vw)] lg:w-[min(400px,85vw)]" />
      </div>
    </section>
  );
}
