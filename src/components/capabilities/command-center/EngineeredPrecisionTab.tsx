"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Server, Activity, Database, GitMerge, Zap, ShieldCheck } from "lucide-react";
import { CgController } from "react-icons/cg";
import { PiTreeStructureDuotone } from "react-icons/pi";



const features = [
  { id: "01", title: "Signal-to-Action Conversion ", icon: Server, desc: "Every qualifying early warning signal is automatically converted into an actionable case, ensuring no critical trigger remains unattended." },

  { id: "02", title: "Ownership & Accountability", icon: Activity, desc: "Each case is assigned to a clearly defined role or function, ensuring responsibility is established at every stage of the resolution process." },

  { id: "03", title: "SLA-Driven Execution", icon: Database, desc: "Actions are governed by defined timelines, with delays tracked in real time and escalated automatically when thresholds are breached.." },

  { id: "04", title: "Parallelised Processing", icon: GitMerge, desc: "Distributes logical verifications concurrently allowing millions of evaluations simultaneously without bottlenecking." },

  { id: "05", title: "Role-Based Workflows", icon: Zap, desc: "Cases move through structured workflows across multiple teams — Operations, Credit, Legal, Technical, and Collections." },

  { id: "06", title: "Decision-Based Routing", icon: ShieldCheck, desc: "Cases are classified based on borrower behaviour — behavioural vs intentional stress allowing workflows to adjust accordingly." },

  { id: "07", title: "Escalation & Control", icon: CgController, desc: "High-risk cases and SLA breaches trigger automatic escalation, providing management visibility and immediate control." },
  
  { id: "08", title: "Structured Resolution", icon: PiTreeStructureDuotone, desc: "Every case is closed with a defined outcome, documented rationale, and a complete action history for governance review." }
];

function FeatureDetailBody({
  activeIndex,
  className = "",
  contentClassName = "",
  showTopAccentLine = true,
  compactTitle = false,
}: {
  activeIndex: number;
  className?: string;
  contentClassName?: string;
  /** Hide the cyan line above the icon (mobile detail panels). */
  showTopAccentLine?: boolean;
  /** Smaller, wrapping title for narrow mobile panels. */
  compactTitle?: boolean;
}) {
  return (
    <div className={`relative flex min-h-0 flex-col justify-center ${className}`}>
      {showTopAccentLine ? (
        <div className="absolute left-0 top-0 hidden h-[2px] w-16 bg-[#01AEE4]/50 md:block" aria-hidden />
      ) : null}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          className={`relative z-10 min-w-0 ${contentClassName}`}
        >
          <div className="mb-4 text-[#01AEE4]">
            {(() => {
              const Icon = features[activeIndex].icon;
              return <Icon className="h-8 w-8 shrink-0" />;
            })()}
          </div>
          <h3
            className={
              compactTitle
                ? "mb-3 break-words text-lg font-bold leading-snug tracking-tight text-white sm:text-xl"
                : "es-heading-section mb-4 font-bold text-white"
            }
          >
            {features[activeIndex].title.trim()}
          </h3>
          <p className="max-w-lg leading-relaxed text-gray-400">
            {features[activeIndex].desc}
          </p>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-2 right-2 md:bottom-6 md:right-6 text-6xl sm:text-7xl md:text-[120px] leading-none font-bold text-white/5 pointer-events-none select-none tracking-tighter">
        {features[activeIndex].id}
      </div>
    </div>
  );
}

export default function EngineeredPrecisionTab() {
  const [activeTab, setActiveTab] = useState(0);
  const [isMdUp, setIsMdUp] = useState(false);
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsMdUp(mql.matches);
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!isMdUp) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMdUp]);

  const listItemActive = (idx: number) => (isMdUp ? activeTab === idx : mobileOpenIndex === idx);

  return (
    <section className="md:py-24 py-12 bg-white relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <motion.div
             initial={{ opacity: 0, textShadow: "0px 0px 0px rgba(0,0,0,0)" }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="mb-4"
          >
             <span className="text-[#1677FF] font-semibold text-[16px] tracking-widest uppercase px-3 py-1 ">
                CORE CAPABILITIES
             </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[36px] mb-6 font-bold text-gray-900"
          >
            Engineered for <span className="text-[#01AEE4]">Precision</span>
          </motion.h2>
        </div>

        {/* Tab Interface container */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           className="bg-[#1D2534] rounded-2xl   overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#1e2a3c]"
        >
           
           {/* Left Section List */}
           <div className="w-full md:w-1/2 bg-[#171d29] md:border-r border-[#2d3a50] p-6">
              <ul className="flex flex-col gap-2">
                 {features.map((feat, idx) => {
                    const active = listItemActive(idx);
                    return (
                    <li key={idx} className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => {
                          if (isMdUp) {
                            setActiveTab(idx);
                          } else {
                            setMobileOpenIndex((prev) => (prev === idx ? null : idx));
                            if (mobileOpenIndex !== idx) {
                              setActiveTab(idx);
                            }
                          }
                        }}
                        aria-expanded={!isMdUp ? mobileOpenIndex === idx : undefined}
                        className={`flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm font-semibold transition-colors md:gap-3
                          ${active ? "border border-[#2d3a50] bg-[#1D2534] text-white" : "border border-transparent text-gray-400 hover:bg-[#1f2838] hover:text-gray-200"}
                        `}
                      >
                        <feat.icon className={`h-4 w-4 shrink-0 ${active ? "text-[#01AEE4]" : "text-gray-500"}`} />
                        <span className="min-w-0 flex-1 leading-snug">
                          {feat.id}. {feat.title.trim()}
                        </span>
                        {!isMdUp ? (
                          <ChevronDown
                            className={`h-5 w-5 shrink-0 text-white/70 transition-transform duration-200 ease-out ${
                              mobileOpenIndex === idx ? "rotate-180" : ""
                            }`}
                            aria-hidden
                          />
                        ) : null}
                      </button>
                      <AnimatePresence initial={false}>
                        {!isMdUp && mobileOpenIndex === idx && (
                          <motion.div
                            key={`panel-${idx}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="md:hidden overflow-hidden"
                          >
                            <div className="relative mt-1 overflow-x-clip rounded-md border border-[#2d3a50] bg-[#1D2534] px-3 py-4 sm:px-4">
                              <FeatureDetailBody
                                activeIndex={idx}
                                className="min-h-0 py-1 pb-10"
                                showTopAccentLine={false}
                                compactTitle
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                    );
                 })}
              </ul>
           </div>

           {/* Right display side — desktop only */}
           <div className="hidden md:flex w-full md:w-2/3 p-10 md:p-16 relative flex-col justify-center min-h-[400px]">
              <FeatureDetailBody activeIndex={activeTab} className="w-full" />
           </div>

        </motion.div>

      </div>
    </section>
  );
}
