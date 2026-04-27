"use client";

import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { BookDemoButton } from "@/components/book-demo/BookDemoProvider";
import { motion } from "framer-motion";

const GRID_TILE = 32;
const GRID_BASE =
  "linear-gradient(to right, rgb(226 232 240) 1px, transparent 1px), linear-gradient(to bottom, rgb(226 232 240) 1px, transparent 1px)";
const GRID_ACCENT =
  "linear-gradient(to right, rgb(148 163 184) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184) 1px, transparent 1px)";

export type CommandHeroCopy = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  sideImageUrl: string | null;
  sideImageAlt: string;
};

export default function CommandHero({ hero }: { hero: CommandHeroCopy }) {
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
      className="relative pt-20 pb-16 overflow-hidden bg-white"
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
        <div className="flex-1 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, textShadow: "0px 0px 0px rgba(0,0,0,0)" }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[52px] mb-6 font-bold tracking-tight text-[#15B5C1]"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[20px] text-gray-600 font-medium mb-10 leading-relaxed max-w-lg"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <BookDemoButton className="bg-[#1677FF] hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-md transition-colors shadow-sm">
              {hero.ctaLabel}
            </BookDemoButton>
          </motion.div>
        </div>

        <div className="">
          {hero.sideImageUrl ? (
            <img src={hero.sideImageUrl} alt={hero.sideImageAlt || "Command Center"} width={600} height={600} />
          ) : null}
        </div>

      </div>
    </section>
  );
}
