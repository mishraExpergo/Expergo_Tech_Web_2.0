"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shuffle, SlidersVertical, Target } from "lucide-react";
import { FaPlay } from "react-icons/fa";

const cards = [
  {
    icon: Target,
    title: "Detect",
    bullets: [
      "Identify early warning and anomaly patterns before migration is visible in DPD.",
      "Multi-source signal fusion across internal, external, behavioural dimensions.",
      "Monitor acceleration across cohorts and emerging structural stress.",
    ],
  },
  {
    icon: Shuffle,
    title: "Decide",
    bullets: [
      "Model state transitions and forward migration probability.",
      "Risk state modelling, trajectory probabilities, capital-at-risk quantification.",
      "Assess concentration risk and incremental capital impact under evolving portfolio conditions.",
    ],
  },
  {
    icon: SlidersVertical,
    title: "Control",
    bullets: [
      "Translate intelligence into disciplined intervention.",
      "Prioritise exposure. Allocate collections and investigation capacity rationally.",
      "Escalate high-risk clusters. Maintain governance traceability.",
      "Control stabilises loss emergence.",
    ],
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function DetectDecideControlSection() {
  const [activeCard, setActiveCard] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const intervalId = window.setInterval(() => {
      setActiveCard((current) => (current + 1) % cards.length);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  return (
    <section
      className="font-heading mt-12 bg-[#0B0E14] px-5 py-12 shadow-lg sm:px-6 md:mt-24 md:px-8 md:py-20 lg:px-16 lg:py-24"
      aria-labelledby="detect-decide-control-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2
          id="detect-decide-control-heading"
          className="mb-8 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl md:mb-14 md:text-4xl lg:text-site-sub lg:leading-tight flex flex-row items-center justify-center gap-2 sm:gap-4 md:gap-8 lg:gap-12 flex-wrap"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
        >
          <span>Detect</span>
          <FaPlay className="text-[10px] sm:text-[12px] md:text-base lg:text-xl text-[#15B5C1]" />
          <span>Decide</span>
          <FaPlay className="text-[10px] sm:text-[12px] md:text-base lg:text-xl text-[#15B5C1]" />
          <span>Control</span>
        </motion.h2>

        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6 lg:gap-8"
          role="tablist"
          aria-label="Detect Decide Control"
        >
          {cards.map((card, i) => {
            const Icon = card.icon;
            const isActive = i === activeCard;
            return (
              <motion.article
                key={card.title}
                className={`cursor-pointer rounded-2xl border-2 p-6 md:p-8 text-white transition-all duration-300 ease-out ${
                  isActive
                    ? "scale-[1.03] border-[#15B5C1] bg-[#202832] shadow-[0_18px_60px_rgba(21,181,193,0.28)] ring-1 ring-[#15B5C1]/50"
                    : "border-transparent bg-[#1C1F26] hover:border-[#15B5C1]"
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease }}
                onClick={() => setActiveCard(i)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
                role="tab"
                aria-selected={isActive}
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveCard(i);
                  }
                }}
              >
                <div className="mb-4 md:mb-5 flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg text-white transition-colors ${
                      isActive ? "bg-[#15B5C1]" : "bg-white/10"
                    }`}
                  >
                    <Icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                </div>
                <h3 className="mb-4 md:mb-5 text-base md:text-lg font-bold text-white">{card.title}</h3>
                <div
                  className={`mb-5 h-1 rounded-full bg-[#15B5C1] transition-all duration-300 ${
                    isActive ? "w-16 opacity-100" : "w-6 opacity-30"
                  }`}
                  aria-hidden
                />
                <ul className="space-y-2 md:space-y-3 text-sm md:text-[15px] font-normal leading-relaxed md:leading-[1.55] text-white/95">
                  {card.bullets.map((item) => (
                    <li key={item} className="flex gap-2 md:gap-3">
                      <span
                        className="mt-1.5 md:mt-2 h-1 md:h-1.5 w-1 md:w-1.5 shrink-0 rounded-full bg-white"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
