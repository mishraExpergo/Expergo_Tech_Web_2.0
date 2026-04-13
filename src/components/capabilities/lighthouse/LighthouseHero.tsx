"use client";

import { motion } from "framer-motion";

export default function LighthouseHero() {
  const stats = [
    { value: "500+", label: "Logic limits evaluated" },
    { value: "40+", label: "Integrations" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "<2s", label: "Event Latency" }
  ];

  return (
    <section className="relative pb-16 pt-24 overflow-hidden bg-[#F9FAFB] pt-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 pt-0 mt-0 lg:-mt-8">
        
        {/* Left Text Content */}
        <div className="flex-1 max-w-2xl mt-4 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, textShadow: "0px 0px 0px rgba(0,0,0,0)" }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4"
          >
             <span className="text-[#01AEE4] font-semibold text-xs tracking-widest uppercase px-3 py-1 bg-[#01AEE4]/10 rounded-full border border-[#01AEE4]/20 inline-block font-sans">
                CAPABILITIES OVERVIEW
             </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 mb-2 leading-tight"
          >
            Risk Dashboard <br/>
            <span className="text-[#01AEE4]">Lighthouse</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-500 font-medium mb-12 leading-relaxed max-w-xl"
          >
Transforms how institutions monitor and control portfolio risk. A risk control dashboard that reveals how stress forms,moves,and is acted upon across the credit life cycle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-6 md:gap-10 border-t border-gray-200 pt-8"
          >
             {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                   <span className="text-2xl md:text-3xl font-black text-[#01AEE4] mb-1">{stat.value}</span>
                   <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wide leading-tight max-w-[80px]">{stat.label}</span>
                </div>
             ))}
          </motion.div>
        </div>

        {/* Right: Lighthouse SVG + cyan ripple overlay */}
        <div className="flex w-full max-w-[520px] flex-1 items-center justify-center -mt-8 lg:-mt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative flex w-full items-center justify-center p-8"
          >
            {/* Cyan ripples — drawn behind the art */}
            <div
              className="pointer-events-none absolute left-1/2 top-[45%] z-0 flex h-0 w-0 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              aria-hidden
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-[#01AEE4]"
                  style={{
                    width: 200,
                    height: 200,
                  }}
                  animate={{
                    scale: [1, 3.5],
                    opacity: [0.7, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 1.33,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            <img
              src="/Lighthousee.svg"
              alt="Lighthouse"
              className="relative z-10 w-full max-w-[100rem] h-auto max-h-[100vh] object-contain select-none transform translate-y-8"
              decoding="async"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
