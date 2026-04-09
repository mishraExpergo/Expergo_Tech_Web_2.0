"use client";

import { motion } from "framer-motion";

export default function ExternalSignalsFlow() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h4
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             className="text-[#1677FF] font-semibold text-sm tracking-wide uppercase mb-2"
          >
            Capabilities
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="es-heading-section font-bold text-gray-900"
          >
            External signals that bring <span className="text-[#01AEE4]">borrower</span><br/>
            <span className="text-[#01AEE4]">behaviour</span> into focus
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ delay: 0.2 }}
             className="text-gray-600 mt-4 max-w-3xl mx-auto font-medium"
          >
            EXPERGO 360 harnesses macro trends across demographic sectors, merging intelligent analysis for new rules 
            outlining patterns to generate precise outcomes directly tied to underlying indicators of change.
          </motion.p>
        </div>

        {/* Flow Diagram Container */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="bg-[#1D2534] rounded-[1.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-xl"
        >
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#01AEE4]/5 blur-[120px] rounded-full pointer-events-none" />

          {/* Left Block */}
          <div className="flex-1 w-full md:w-auto relative z-10 flex justify-center md:justify-end">
            <div className="bg-[#242F41] border border-gray-600 rounded-lg py-5 px-8 flex flex-col shadow-[0_0_20px_rgba(0,0,0,0.2)] whitespace-nowrap min-w-[240px]">
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Ingestion</span>
              <span className="text-white font-bold text-lg">Bureau Data Ingestion</span>
              {/* Output dot */}
              <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full border border-cyan-500 bg-[#242F41] flex items-center justify-center">
                 <div className="w-2 h-2 bg-cyan-400 rounded-full" />
              </div>
            </div>
            
            {/* Connecting lines on desktop */}
            <div className="hidden md:block absolute top-1/2 -right-16 w-16 h-px bg-gradient-to-r from-cyan-500/80 to-transparent" />
          </div>

          {/* Right Blocks mapped through a vertical flow line */}
          <div className="flex-[1.2] w-full md:w-auto relative z-10 flex flex-col gap-6 pl-0 md:pl-12 border-l border-cyan-800/50">
             
             {[
               { sub: "Geometry", title: "Credit Registry and Geometry" },
               { sub: "Logic", title: "API driven latency speeds" },
               { sub: "Output", title: "Multi bureau aggregation attributes" },
             ].map((block, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.3 + (idx * 0.1), duration: 0.4 }}
                  className="bg-[#242F41] border border-gray-600 rounded-lg py-4 px-6 shadow-[0_0_20px_rgba(0,0,0,0.1)] relative"
                >
                   {/* Connection line horizontal piece */}
                   <div className="hidden md:block absolute top-1/2 -left-[49px] w-12 h-px bg-cyan-700/50" />
                   {/* Input dot */}
                   <div className="hidden md:block absolute top-1/2 -left-[5px] -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#01AEE4]" />
                   
                   <span className="block text-cyan-400 text-[10px] font-bold uppercase tracking-wide mb-1">{block.sub}</span>
                   <span className="block text-white font-semibold text-sm">{block.title}</span>
                </motion.div>
             ))}
             
          </div>

        </motion.div>

        {/* Small footer text */}
        <div className="mt-8 text-center px-4">
          <p className="text-[10px] leading-relaxed text-gray-400 max-w-2xl mx-auto uppercase tracking-wide font-medium">
             BUREAU 360 PROVIDES CONTINUOUS DYNAMIC LOGIC MAPPING FROM RAW BUREAU AGGREGATION CONSTANTS INTO ACTIONABLE
             PORTFOLIO VISIBILITY WITH REINFORCED REGULATORY ASSURANCE EMBEDDED THROUGHOUT.
          </p>
        </div>

      </div>
    </section>
  );
}
