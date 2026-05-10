"use client";

import { motion } from "framer-motion";
import { Zap, Shield, FileText, CheckSquare, Target, Activity } from "lucide-react";

export default function CommandImpactTimeline() {
  const elements = [
    { title: "Faster Stress Response", desc: "Rapidly identify and act on emerging portfolio stress before it escalates into systematic risk", icon: Zap, side: "left" },
    { title: "Reduced Roll Forward", desc: "Prevent accounts from rolling into deeper delinquency stages through early early targeted intervention.", icon: Shield, side: "right" },
    { title: "Improved Cure Rates", desc: "Prevent accounts from rolling into deeper delinquency stages through early early targeted intervention.", icon: FileText, side: "left" },
    { title: "Clear Accountability", desc: "Each case is assigned to a defined owner with tracked responsibility. This ensures no signal is missed or left unaddressed.", icon: Target, side: "right" },
    { title: "Stronger Execution Discipline", desc: "Standardised workflows ensure consistent and coordinated action across teams.This improves efficiency across Ops, Credit, Legal, and Collections.", icon: CheckSquare, side: "left" },
    { title: "Better Performance Visibility", desc: "Real-time tracking highlights delays, bottlenecks, and SLA breaches.This enables proactive intervention and performance improvement.", icon: Activity, side: "right" },
    { title: "Structured Resolution", desc: "Every case is closed with a defined outcome and complete action trail. This ensures consistency, traceability, and stronger governance.", icon: Activity, side: "left" },
  ];

  return (
    <section className="md:py-24 py-8 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        
        <div className="mb-8 text-center md:mb-24">
          <motion.div
             initial={{ opacity: 0, textShadow: "0px 0px 0px rgba(0,0,0,0)" }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="mb-4"
          >
             <span className="text-[#1677FF]   tracking-widest uppercase px-3 py-1 text-[16px]">
                Business Outcomes
             </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-balance text-[28px] font-bold leading-[1.06] tracking-tight text-gray-900 md:text-[36px] md:leading-snug"
          >
            <span className="text-[#15B5C1]">Measurable</span>
            {" "}
            Impact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-sm font-medium tracking-wide text-gray-500 md:mt-4"
          >
            Seven pillars driving measurable impact across your portfolio.
          </motion.p>
        </div>

        <div className="relative">
           {/* Center flow line — desktop / tablet only */}
           <div
             className="absolute bottom-0 left-1/2 top-0 hidden w-[2px] -translate-x-1/2 bg-gradient-to-b from-cyan-100 via-blue-200 to-transparent md:block"
             aria-hidden
           />

           {elements.map((item, idx) => (
             <div
               key={idx}
               className={`relative mb-10 flex flex-row items-center justify-center md:mb-2 md:justify-start ${item.side === "left" ? "md:flex-row-reverse" : "md:flex-row"}`}
             >
                {/* Connector dot — md+ */}
                <div
                  className="absolute left-1/2 top-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#1677FF] bg-white md:block"
                  aria-hidden
                />
                
                {/* Connector from timeline to card — md+ */}
                <div
                  className={`absolute top-1/2 hidden h-px w-16 -translate-y-1/2 bg-cyan-200 md:block ${item.side === "left" ? "right-1/2 mr-2" : "left-1/2 ml-2"}`}
                  aria-hidden
                />

                {/* Card container: full width + centered on mobile; alternating sides on md+ */}
                <div
                  className={`mx-auto w-full max-w-md md:mx-0 md:max-w-none md:w-1/2 ${
                    item.side === "left" ? "md:pr-16 md:pl-0" : "md:pl-16"
                  }`}
                >
                   <motion.div
                     initial={{ opacity: 0, x: item.side === 'left' ? -150 : 150 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ duration: 4, type: "spring", stiffness: 40 }}
                     className="bg-white border border-[#01AEE4]/20 rounded-xl p-6 shadow-[0_4px_20px_rgba(1,174,228,0.05)] hover:shadow-[0_8px_30px_rgba(1,174,228,0.1)] transition-all"
                   >
                     <div className="bg-[#E8F2FA] w-10 h-10 rounded-full flex items-center justify-center text-[#01AEE4] mb-4">
                        <item.icon className="w-5 h-5" />
                     </div>
                     <h3 className="font-bold text-gray-900 text-sm mb-2 uppercase tracking-wide">{item.title}</h3>
                     <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                   </motion.div>
                </div>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
}
