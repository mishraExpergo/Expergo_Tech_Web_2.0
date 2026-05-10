"use client";

import { motion } from "framer-motion";

export default function WhatIsLighthouse() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 md:my-0 my-[-90px]">
        
        <div className="mb-5 text-center md:mb-10">
          <motion.div
             initial={{ opacity: 0, textShadow: "0px 0px 0px rgba(0,0,0,0)" }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="mb-2 md:mb-1"
          >
             <span className="text-[16px] uppercase px-3 py-1 tracking-widest text-blue-500 ">
                OVERVIEW
             </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-0 text-[30px] font-bold leading-[1.1] tracking-tight text-gray-900 md:text-[36px] md:leading-snug"
          >
            What is{" "}
            <span className="text-[#15B5C1]">Lighthouse?</span>
          </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
           {/* Left Text */}
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.5 }}
             className="flex-1 max-w-xl"
           >
              <p className="pt-1 text-gray-600 text-[16px] font-medium leading-relaxed md:pt-0 md:text-[20px]">
              EarlySafe Lighthouse is a risk control dashboard designed for credit portfolios.It provides structured visibility into how risk builds, moves across delinquency buckets, and is handled through operational actions.By bringing together payment behaviour, bureau signals, and operational data, Lighthouse enables institutions 
              to monitor triggers, track ownership, and measure resolution in one unified view. It transforms portfolio monitoring from static reporting into a controlled, accountable process. 
              </p>
           </motion.div>

           {/* Right Line Chart */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.6 }}
             className="flex-1 w-full"
           >
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 pt-10 relative">
                 <div className="absolute top-4 left-6 text-xs font-bold text-gray-500 uppercase">Operational Limits</div>
                 
                 <div className="h-64 w-full relative">
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 bottom-8 w-6 flex flex-col justify-between text-[10px] text-gray-400 font-bold">
                       <span>100</span>
                       <span>75</span>
                       <span>50</span>
                       <span>25</span>
                       <span>0</span>
                    </div>

                    {/* Chart Area */}
                    <div className="absolute left-8 right-0 top-2 bottom-8 border-l border-b border-gray-200">
                       
                       {/* Grid lines */}
                       <div className="absolute top-1/4 left-0 right-0 border-t border-dashed border-gray-200" />
                       <div className="absolute top-2/4 left-0 right-0 border-t border-dashed border-gray-200" />
                       <div className="absolute top-3/4 left-0 right-0 border-t border-dashed border-gray-200" />

                       {/* SVG lines */}
                       <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                          {/* Dashed baseline (Traditional) */}
                          <motion.path 
                             initial={{ pathLength: 0 }}
                             whileInView={{ pathLength: 1 }}
                             transition={{ duration: 1.5, ease: "easeInOut" }}
                             d="M0,80 L20,70 L40,75 L60,60 L80,65 L100,50"
                             fill="none"
                             stroke="#9CA3AF"
                             strokeWidth="2"
                             strokeDasharray="4,4"
                          />
                          {/* Solid active line (Lighthouse) */}
                          <motion.path 
                             initial={{ pathLength: 0 }}
                             whileInView={{ pathLength: 1 }}
                             transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                             d="M0,75 Q15,60 25,65 T50,40 T75,50 T100,20"
                             fill="none"
                             stroke="#01AEE4"
                             strokeWidth="3"
                          />
                          
                          {/* Points on solid line */}
                          <circle cx="25" cy="65" r="2" fill="#01AEE4" />
                          <circle cx="50" cy="40" r="2" fill="#01AEE4" />
                          <circle cx="75" cy="50" r="2" fill="#01AEE4" />
                          <circle cx="100" cy="20" r="2" fill="#01AEE4" />
                       </svg>
                    </div>

                    {/* X-axis labels */}
                    <div className="absolute left-8 right-0 bottom-0 h-8 flex justify-between items-end text-[10px] text-gray-400 font-bold px-2">
                       <span>Jan</span>
                       <span>Feb</span>
                       <span>Mar</span>
                       <span>Apr</span>
                       <span>May</span>
                       <span>Jun</span>
                    </div>

                 </div>

                 {/* Legend */}
                 <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                       <div className="w-4 h-[2px] bg-gray-400 border-dashed" />
                       <span className="text-[10px] font-bold text-gray-500 uppercase">Traditional Limits</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-4 h-[3px] bg-[#01AEE4]" />
                       <span className="text-[10px] font-bold text-gray-500 uppercase">Lighthouse Efficiency</span>
                    </div>
                 </div>

              </div>
           </motion.div>
        </div>

      </div>
    </section>
  );
}
