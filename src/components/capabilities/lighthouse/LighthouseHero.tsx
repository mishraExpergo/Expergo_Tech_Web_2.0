"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function LighthouseHero() {
  const stats = [
    { value: "300+", label: "Risk and Controll View" },
    { value: "40+", label: "Risk Signal" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "<2s", label: "Signal Latency" }
  ];

  return (
    <section className="relative z-0 flex min-h-[calc(100dvh-72px)] flex-col justify-center overflow-hidden bg-[#F9FAFB] pb-24 lg:pb-28">
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-12 px-6 py-8 lg:flex-row lg:gap-10 lg:px-8 lg:py-10">
        {/* Left Text Content */}
        <div className="flex w-full max-w-2xl flex-1 flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, textShadow: "0px 0px 0px rgba(0,0,0,0)" }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[52px] mb-2 font-black leading-tight text-gray-900"
          >
            Risk Dashboard <br/>
            <span className="text-[#15B5C1]">Lighthouse</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[20px] text-[#1F1F1F]  mb-12  max-w-xl"
          >
          Transforms how institutions monitor and control portfolio risk. A risk control dashboard that reveals how stress forms,moves,and is acted upon across the credit life cycle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-6 md:gap-10  pt-8"
          >
             {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col w-1/2">
                   <span className="text-[32px] md:text-[32px] font-black text-[#15B5C1] mb-1">{stat.value}</span>
                   <span className="text-[12px] md:text-[12px] font-bold text-gray-900 uppercase tracking-wide  max-w-[80px]">{stat.label}</span>
                </div>
             ))}
          </motion.div>
        </div>

        {/* Right: Lighthouse SVG + cyan ripple overlay */}
        <div className="flex w-full min-h-0 flex-1 items-center justify-center lg:max-w-[700px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative flex w-full items-center justify-center p-4 sm:p-8"
          >
            {/* Cyan ripples — behind the lighthouse, anchored near the lantern / top */}
            <div
              className="pointer-events-none absolute left-[calc(50%-6px)] top-[14%] z-0 flex h-0 w-0 -translate-x-1/2 items-center justify-center"
              aria-hidden
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-[#01AEE4]"
                  style={{
                    width: 102,
                    height: 102,
                  }}
                  animate={{
                    scale: [1, 1.75, 2.32],
                    opacity: [0.42, 0.2, 0],
                  }}
                  transition={{
                    duration: 4.25,
                    repeat: Infinity,
                    delay: i * 1.42,
                    ease: [
                      [0.33, 0, 0.2, 1],
                      [0.22, 1, 0.36, 1],
                    ],
                    times: [0, 0.48, 1],
                  }}
                />
              ))}
            </div>

            <img
              src="/Lighthousee.svg"
              alt="Lighthouse"
              className="relative scale-150 mt-35 z-10 h-auto w-full max-h-[min(52dvh,480px)] max-w-[100rem] object-contain select-none sm:max-h-[min(56dvh,520px)] lg:max-h-[min(62dvh,580px)]"
              decoding="async"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
