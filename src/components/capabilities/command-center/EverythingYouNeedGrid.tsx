"use client";

import { motion } from "framer-motion";
import { Cloud, Lock, ServerCog, Sparkles, Sliders, Database, Shuffle } from "lucide-react";

export default function EverythingYouNeedGrid() {
  const cards = [
    { icon: Cloud, title: "Signal-to-Case Conversion", desc: "Every qualifying signal is automatically transformed into a structured, trackable case — zero manual triage, zero signal leakage." },
    { icon: Lock, title: "SLA Monitoring", desc: "Real-time tracking of responsetimelines with automatic escalation when thresholds are breached" },
    { icon: ServerCog, title: " Case Classification", desc: "Dynamic classification based on borrower behavior distinguishing stress from intentional default." },
    { icon: Sliders, title: "Ownership & Routing", desc: "Cases assigned to defined roles with structured handoff protocols ensuring accountability at every stage." },
    { isStats: true, stat: "100%", sub: "Signal capture" },
    { icon: Shuffle, title: "Cross-Team Coordination", desc: "Seamless orchestration acrossOperations, Credit, Legal, Technical, and Collections through unified workflows." },
    { icon: Sparkles, title: "Queue Monitoring", desc: "Real-time visibility into case backlog, ageing, and bottlenecks,enabling proactive workload management and SLA control." },
    { icon: Database, title: "Resolution Tracking", desc: "Every case closed with a defined outcome, structured rationale, and complete documentation." },
  ];

  return (
    <section className="py-24 bg-gray-50 border-y border-gray-200 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.div
             initial={{ opacity: 0, textShadow: "0px 0px 0px rgba(0,0,0,0)" }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="mb-4"
          >
             <span className="text-[#1677FF] font-semibold text-[16px] tracking-widest uppercase px-3 py-1 ">
                Functional Features
             </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[36px] mb-6 font-bold leading-tight text-gray-900"
          >
            Everything You Need,<br/>
            <span className="text-[#01AEE4]">Nothing You Don&apos;t.</span>
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-gray-500 font-medium text-sm max-w-3xl mx-auto leading-relaxed"
          >
            A complete operational toolkit designed for institutions that demand structure,accountability, and measurable outcomes. Signal-to-Case Conversion.Every qualifying signal is automatically ransformed into a structured, trackable case zero manual triage, zero signal leakage.100% Signal Capture
 
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {cards.map((card, idx) => {
             const useTealHover = idx % 2 === 1;
             const hoverBg = useTealHover ? "hover:bg-[#2EC2B3]" : "hover:bg-[#213242]";
             const hoverBorder = useTealHover
               ? "hover:border-[#2EC2B3]/90"
               : "hover:border-[#213242]";
             return (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.4, delay: idx * 0.1 }}
               className={`group relative flex h-full flex-col justify-center overflow-hidden rounded-2xl border border-[#01AEE4]/30 bg-white shadow-sm transition-all duration-300 hover:shadow-md ${hoverBorder} ${hoverBg}`}
             >
                {card.isStats ? (
                  <div
                    className={`flex h-full flex-col items-center justify-center p-8 text-center transition-colors ${
                      useTealHover
                        ? "group-hover:[&_h3]:text-[#213242] group-hover:[&_p]:text-[#213242]/90"
                        : "group-hover:[&_h3]:text-[#2EC2B3] group-hover:[&_p]:text-white/90"
                    }`}
                  >
                     <h3 className="es-heading-section mb-2 font-black text-[#1cdba0] transition-colors">{card.stat}</h3>
                     <p className="text-xs font-bold uppercase tracking-widest leading-relaxed text-gray-700 whitespace-pre-line transition-colors">
                       {card.sub}
                     </p>
                  </div>
                ) : (
                  <div className="flex h-full flex-col p-8 transition-colors">
                     <div
                       className={`mb-4 text-[#01AEE4] transition-colors ${
                         useTealHover
                           ? "group-hover:text-[#213242]"
                           : "group-hover:text-[#2EC2B3]"
                       }`}
                     >
                        {card.icon && <card.icon className="h-6 w-6" />}
                     </div>
                     <h3
                       className={`mb-3 text-sm font-bold text-gray-900 transition-colors ${
                         useTealHover ? "group-hover:text-[#213242]" : "group-hover:text-white"
                       }`}
                     >
                        {card.title}
                     </h3>
                     <p
                       className={`flex-1 text-xs leading-relaxed text-gray-500 transition-colors ${
                         useTealHover ? "group-hover:text-[#213242]/85" : "group-hover:text-white/80"
                       }`}
                     >
                        {card.desc}
                     </p>
                  </div>
                )}
             </motion.div>
           );
           })}
        </div>

      </div>
    </section>
  );
}
