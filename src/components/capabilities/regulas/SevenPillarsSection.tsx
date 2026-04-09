"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ClipboardList,
  Clock4,
  FileStack,
  GitBranch,
  PackageOpen,
  Scale,
  UserCircle2,
} from "lucide-react";

type Pillar = {
  title: string;
  icon: LucideIcon;
  description: string;
};

const pillars: Pillar[] = [
  {
    title: "Statutory Early Warning Register",
    icon: ClipboardList,
    description:
      "Maintains a central system of record for all qualifying Early Warning Signals, ensuring consistent documentation across the portfolio. ",
  },
  {
    title: "Regulatory SOP Mapping",
    icon: GitBranch,
    description:"Each signal is mapped to applicable supervisory expectations, ensuring the correct review and action process is followed."},
  {
    title: "Ownership & Accountability",
    icon: UserCircle2,
    description:
      "For every action, there is a responsible person to ensure accountability throughout the compliance lifecycle. ",
  },
  {
    title: "Regulatory Ageing Tracking",
    icon: Clock4,
    description:
      "Signals are monitored based on defined timelines, allowing institutions to track regulatory exposure and ensure timely response. .",
  },
  {
    title: "Evidence & Documentation Capture",
    icon: FileStack,
    description:
      "Supporting documentation, review notes, and approvals are captured within the system to maintain complete compliance records.",
  },
  {
    title: "Risk Acceptance & Decision Records",
    icon: Scale,
    description:
      "Formal records of decisions, risk acceptance, and supervisory approvals are captured to ensure transparent governance.",
  },
  {
    title: "Board & Inspection Pack Generation",
    icon: PackageOpen,
    description:
      "Structured reporting enables automated generation of board review summaries and regulatory inspection packs.",
  },
];

const panelId = "seven-pillars-detail-panel";

export default function SevenPillarsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = pillars[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Title area */}
       

        {/* Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:items-stretch">
          {/* Left Column (Pillars list) */}
          <div className="flex flex-col gap-3" role="tablist" aria-label="Seven pillars">
            {pillars.map(({ title, icon: Icon }, idx) => {
              const selected = idx === activeIndex;
              return (
                <motion.button
                  key={title}
                  type="button"
                  role="tab"
                  id={`pillar-tab-${idx}`}
                  aria-selected={selected}
                  aria-controls={panelId}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  onClick={() => setActiveIndex(idx)}
                  className={`text-left bg-[#1a2b3c] text-white py-4 px-6 rounded-md flex items-center gap-3 transition-colors shadow-sm cursor-pointer border-2 ${
                    selected
                      ? "border-cyan-400/70 bg-[#20374e] ring-1 ring-cyan-400/30"
                      : "border-transparent hover:bg-[#20374e]"
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/10">
                    <Icon className="h-5 w-5 text-[#188B6E]" strokeWidth={2} aria-hidden />
                  </span>
                  <span className="font-medium text-sm md:text-base">{title}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Right Column (Info Card) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="min-h-[320px] lg:min-h-0"
          >
             <div className="text-left mb-16">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[16px] mb-2 uppercase  text-[#1677FF]"
          >
            Core Capabilities
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="es-heading-hero font-bold text-gray-900"
          >
            Seven pillars of <br /> regulatory <span className="text-[#15B5C1]">discipline</span>
          </motion.h2>
        </div>
            <div className="bg-[#1a2b3c] text-white  p-10 h-[420px] flex flex-col justify-center  relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-44 bg-[#01AEE4]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-64 h-44 bg-[#1677FF]/10 rounded-full blur-3xl pointer-events-none" />

              <div
                id={panelId}
                role="tabpanel"
                aria-labelledby={`pillar-tab-${activeIndex}`}
                className="relative z-10"
              >
                
               
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ActiveIcon className="w-18 h-18 text-[#188B6E] mb-8" strokeWidth={1.5} aria-hidden />
                    <h3 className="text-[24px] mb-4 font-bold text-balance">
                      {active.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{active.description}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
