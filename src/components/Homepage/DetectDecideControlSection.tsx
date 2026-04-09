"use client";

import { motion } from "framer-motion";
import { SlidersVertical, Target } from "lucide-react";

function PlusOneCircleIcon({ className }: { className?: string }) {
  return (
    <span
      className={`flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] border-white text-[8px] font-bold leading-none text-white ${className ?? ""}`}
      aria-hidden
    >
      +1
    </span>
  );
}

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
    icon: PlusOneCircleIcon,
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
  return (
    <section
      className="font-heading bg-[#0B0E14] px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24"
      aria-labelledby="detect-decide-control-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2
          id="detect-decide-control-heading"
          className="mb-12 text-center text-3xl font-bold tracking-tight text-white md:mb-14 md:text-4xl lg:text-site-sub lg:leading-tight"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
        >
          Detect → Decide → Control
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6 lg:gap-8">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                className="rounded-2xl bg-[#1C1F26] p-8 text-white"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease }}
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                    {Icon === PlusOneCircleIcon ? (
                      <PlusOneCircleIcon />
                    ) : (
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    )}
                  </span>
                </div>
                <h3 className="mb-5 text-lg font-bold text-white">{card.title}</h3>
                <ul className="space-y-3 text-[15px] font-normal leading-[1.55] text-white/95">
                  {card.bullets.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white"
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
