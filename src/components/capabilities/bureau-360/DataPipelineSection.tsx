"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
  { id: 1, title: "Segments", desc: "Borrower behaviour across segments" },
  { id: 2, title: "Exposure", desc: "External leverage and exposure build-up." },
  { id: 3, title: "Activity", desc: "Cross-lender credit activity." },
  { id: 4, title: "Concentration", desc: "Portfolio-level concentration patterns" },
  { id: 5, title: "Geo Trends", desc: "Geography and channel-level bureau trends" },
];

export default function DataPipelineSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-16">
        
        {/* Left Radial Visual */}
        <div className="flex-1 w-full flex justify-center items-center relative aspect-square max-w-[500px]">
          {/* Background circles */}
          <div className="absolute inset-0 bg-[#01AEE4]/5 rounded-full scale-105" />
          <div className="absolute inset-4 bg-[#01AEE4]/10 rounded-full" />
          
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute rounded-full border border-cyan-200"
            style={{ width: '60%', height: '60%' }}
          />

          {/* Center Box */}
          <div className="relative z-20 w-24 h-24 bg-white rounded-2xl shadow-[0_0_40px_rgba(1,174,228,0.2)] flex items-center justify-center border border-gray-100">
             <div className="w-8 h-8 rounded-full border-[4px] border-cyan-500/30 flex items-center justify-center">
                <div className="w-3 h-3 bg-cyan-400 rounded-full" />
             </div>
          </div>

          {/* Floating inputs */}
          <motion.div 
             initial={{ opacity: 0, x: -20, y: -20 }}
             whileInView={{ opacity: 1, x: 0, y: 0 }}
             viewport={{ once: true }}
             className="absolute top-1/4 left-1/4 bg-white border border-gray-100 shadow-sm rounded-lg p-3 z-10"
          >
            <span className="text-xs font-semibold text-gray-500">Bureau Data</span>
            {/* Connector line */}
            <svg className="absolute -bottom-8 -right-8 w-12 h-12 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m0 0l-5-5m5 5l5-5" />
            </svg>
          </motion.div>

          {/* Floating output */}
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="absolute bottom-[10%] border border-cyan-200 rounded-full bg-white px-4 py-2 shadow-sm text-center text-xs font-bold text-cyan-600 z-10"
          >
            Data Normalization
          </motion.div>
        
        </div>

        {/* Right Step List */}
        <div className="flex w-full flex-1 flex-col gap-4 md:gap-8 md:pl-10">
           {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, type: "spring", stiffness: 60 }}
               className="relative rounded-xl border-2 border-[#01AEE4]/35 bg-white p-4 shadow-[0_2px_14px_rgba(15,23,42,0.06)] transition-[border-color,box-shadow,background-color] duration-200 hover:border-[#01AEE4] hover:bg-[#F6FBFF] hover:shadow-[0_14px_40px_-12px_rgba(1,174,228,0.28)] md:border-none md:bg-transparent md:p-0 md:shadow-none md:hover:bg-transparent md:hover:shadow-none"
              >
                <Image
                  src="/line.svg"
                  alt=""
                  width={500}
                  height={500}
                  className="pointer-events-none absolute hidden md:block"
                  aria-hidden
                />

                <div className="relative z-10 flex items-start gap-3 sm:gap-4 md:gap-5">
                  <span
                    className="select-none text-4xl font-bold leading-none tabular-nums text-gray-300 sm:text-5xl md:text-6xl"
                    aria-hidden
                  >
                    {step.id}
                  </span>
                  <div className="min-w-0 flex-1 flex flex-col pt-0.5">
                    <h3 className="mb-1 inline-block w-fit text-[14px] font-semibold tracking-wide text-[#01AEE4]">
                      {step.title}
                    </h3>
                    <p className="text-sm font-medium leading-relaxed text-gray-500">
                      {step.desc}
                    </p>
                  </div>
                </div>
                 
                 {/* Connection horizontal line */}
                 {/* <div className="absolute -left-12 top-6 w-16 h-px from-transparent to-cyan-100 pointer-events-none" /> */}
              </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
}
