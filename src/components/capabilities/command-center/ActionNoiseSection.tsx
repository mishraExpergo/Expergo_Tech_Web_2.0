"use client";

import { motion } from "framer-motion";

export default function ActionNoiseSection() {
  const points = [
    "Signals are detected but not acted upon consistently",
    "Ownership of cases remains unclear",
    "Actions are delayed due to manual coordination",
    "SLAs are defined but not enforced",
    "Escalations occur late or inconsistently",
    "Early stress silently progresses into delinquency"
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.div
             initial={{ opacity: 0, textShadow: "0px 0px 0px rgba(0,0,0,0)" }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="mb-4"
          >
             <span className="es-small-heading px-3 py-1 tracking-widest text-[#1677FF] bg-[#1677FF]/10 rounded-full border border-[#1677FF]/20">
                PROBLEM
             </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="es-heading-section mb-6 font-bold text-gray-900"
          >
            Warning Without <span className="text-[#1677FF]">Action</span><br/> Is Just Noise
          </motion.h2>
        </div>

        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
           {points.map((point, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.4, delay: idx * 0.1 }}
               className="flex items-center bg-white border border-[#01AEE4]/30 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
             >
                {/* Thin colored line on the left */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1677FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Number block */}
                <div className="shrink-0 w-12 flex justify-center text-[#9edaf1] text-3xl font-light font-sans group-hover:text-[#01AEE4] transition-colors">
                  {idx + 1}
                </div>
                
                <div className="flex-1 pl-4 border-l border-gray-100 ml-2">
                  <p className="text-gray-700 font-semibold text-sm">{point}</p>
                </div>
             </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
}
