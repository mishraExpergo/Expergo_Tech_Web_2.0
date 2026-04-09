"use client";

import { motion } from "framer-motion";
import { Cloud, Lock, ServerCog, Sparkles, Sliders, Database, Shuffle, CheckCircle2 } from "lucide-react";

export default function EverythingYouNeedGrid() {
  const cards = [
    { icon: Cloud, title: "Signal-to-Case Conversion", desc: "Every qualifying signal is automatically transformed into a structured, trackable case — zero manual triage, zero signal leakage." },
    { icon: Lock, title: "SLA Monitoring", desc: "Real-time tracking of responsetimelines with automatic escalation when thresholds are breached" },
    { icon: ServerCog, title: " Case Classification", desc: "Dynamic classification based on borrower behavior distinguishing stress from intentional default." },
    { icon: Sliders, title: "Ownership & Routing", desc: "Cases assigned to defined roles with structured handoff protocols ensuring accountability at every stage." },
    { isStats: true, stat: "100%", sub: "Signal capture" },
    { icon: Shuffle, title: "Cross-Team Coordination", desc: "Seamless orchestration acrossOperations, Credit, Legal, Technical, and Collections through unified workflows." },
    { icon: Sparkles, title: "Queue Monitoring", desc: "Continuous visibility into case age, queue depth, and bottlenecks for proactive resource allocation." },
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
             <span className="text-[#1677FF] font-semibold text-xs tracking-widest uppercase px-3 py-1 bg-[#1677FF]/10 rounded-full border border-[#1677FF]/20">
                CORE CAPABILITIES
             </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="es-heading-section mb-6 font-bold leading-tight text-gray-900"
          >
            Everything You Need.<br/>
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
           {cards.map((card, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.4, delay: idx * 0.1 }}
               className="bg-white border border-[#01AEE4]/30 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden h-full flex flex-col justify-center"
             >
                {/* Thin top accent block on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#01AEE4] to-[#1677FF] opacity-0 transition-opacity" style={{ opacity: 0 }} />

                {card.isStats ? (
                  <div className="p-8 flex flex-col justify-center items-center h-full text-center group hover:bg-[#F0F7FF] transition-colors">
                     <h3 className="es-heading-section mb-2 font-black text-[#1cdba0]">{card.stat}</h3>
                     <p className="text-xs font-bold text-gray-700 uppercase tracking-widest leading-relaxed whitespace-pre-line">
                       {card.sub}
                     </p>
                  </div>
                ) : (
                  <div className="p-8 group hover:bg-[#F0F7FF]/50 transition-colors h-full flex flex-col">
                     <div className="text-[#01AEE4] mb-4">
                        {card.icon && <card.icon className="w-6 h-6" />}
                     </div>
                     <h3 className="font-bold text-gray-900 text-sm mb-3">
                        {card.title}
                     </h3>
                     <p className="text-gray-500 text-xs leading-relaxed flex-1">
                        {card.desc}
                     </p>
                  </div>
                )}
             </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
}
