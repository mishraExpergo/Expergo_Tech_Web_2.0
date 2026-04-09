"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function MeasurableImpactSection() {
  const points = [
    "Cross-referencing bureau interactions removes false positive alerts.",
    "Targeted alerts directly prioritize work paths based on high importance risk parameters.",
    "Strategy overrides automatically applied when parameters detect a rapid demographic dip.",
    "Reduces manual evaluation workloads with completely automated path flows.",
    "Full access to historical traces allows deeper analysis on origin event indicators.",
    "Cost savings from streamlining operations and reducing total loss magnitude."
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start">
           
           {/* Left Column Stats */}
           <div className="flex-1 w-full max-w-xl">
              <motion.div
                initial={{ opacity: 0, textShadow: "0px 0px 0px rgba(0,0,0,0)" }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-4"
              >
                <span className="text-[#1677FF] font-semibold text-xs tracking-widest uppercase px-3 py-1 bg-[#1677FF]/10 rounded-full border border-[#1677FF]/20">
                  Outcomes
                </span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="es-heading-section mb-6 font-bold leading-tight text-gray-900"
              >
                Measurable Impact on Portfolio Monitoring
              </motion.h2>
              
              <motion.p
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="text-gray-600 font-medium mb-10"
              >
                BUREAU 360 directly transforms multi-bureau telemetry into highly focused, immediately actionable events, drastically changing your operational response timing.
              </motion.p>
              
              <div className="grid grid-cols-2 gap-4">
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="bg-[#F0F7FF] border border-[#E0EFFF] rounded-xl p-6 shadow-sm"
                 >
                    <h3 className="es-heading-section mb-2 font-bold tracking-tight text-[#1677FF]">100x <span className="text-sm">Faster</span></h3>
                    <p className="text-xs font-semibold text-gray-700 uppercase">Alert detection logic processing</p>
                 </motion.div>
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="bg-[#F4F6F8] border border-gray-200 rounded-xl p-6 shadow-sm"
                 >
                    <h3 className="es-heading-section mb-2 font-bold tracking-tight text-gray-900">3x <span className="text-sm">Fewer</span></h3>
                    <p className="text-xs font-semibold text-gray-500 uppercase">False positive manual reviews</p>
                 </motion.div>
              </div>
           </div>

           {/* Right Column Checklist */}
           <div className="flex-1 w-full flex items-center">
              <div className="flex flex-col gap-6">
                 {points.map((point, idx) => (
                    <motion.div 
                       key={idx}
                       initial={{ opacity: 0, x: 20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true, margin: "-50px" }}
                       transition={{ duration: 0.4, delay: idx * 0.1 }}
                       className="flex items-start gap-4 group"
                    >
                       <CheckCircle className="w-6 h-6 text-[#01AEE4] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                       <span className="text-sm font-medium text-gray-700 leading-relaxed max-w-sm">
                         {point}
                       </span>
                    </motion.div>
                 ))}
              </div>
           </div>

        </div>
      </div>
    </section>
  );
}
