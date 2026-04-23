"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ExternalSignalsFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const leftCards = [
    { id: "01", text: "Bureau score migration" },
    { id: "03", text: "Trade line additions and closures" },
    { id: "05", text: "Borrower behaviour segmentation" },
  ];

  const rightCards = [
    { id: "02", text: "Enquiry velocity and recency" },
    { id: "04", text: "Off-us delinquency signals" }, // Text from the image
    { id: "06", text: "Multi-lender exposure patterns" },
  ];

  return (
    <section className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h4
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-10px" }}
             className="text-[#01AEE4] my-[-44] font-bold text-xs tracking-wider uppercase mb-3"
          >
            OVERVIEW
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl  lg:text-[40px] font-black text-[#1D2B3D] leading-tight"
          >
            External signals that bring <span className="text-[#01AEE4]">borrower</span><br/>
            <span className="text-[#01AEE4]">behaviour</span> into focus
          </motion.h2>
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ delay: 0.2 }}
             className="text-[#5C6E82] mt-6 max-w-3xl mx-auto font-medium leading-relaxed text-sm md:text-base space-y-4"
          >
            <p>
              BUREAU 360° is a bureau intelligence layer designed for credit portfolios. It helps institutions monitor borrower
              behaviour across lenders by converting bureau data into structured, portfolio-level intelligence.
            </p>
            <p>
              It brings together key bureau indicators such as:
            </p>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <motion.div
           ref={containerRef}
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="bg-[#212E41] rounded-[24px] p-8 md:p-16 relative shadow-2xl"
        >
          {/* Middle Vertical Line Tracker */}
          <div className="absolute top-16 bottom-48 left-1/2 -translate-x-1/2 w-px hidden md:block bg-transparent">
             <motion.div 
                style={{ height: pathHeight }}
                className="w-full bg-[#01AEE4]" 
             />
          </div>

          <div className="flex flex-col md:flex-row justify-center relative w-full h-auto">
             
            {/* Mobile View - Single Column */}
            <div className="flex md:hidden flex-col gap-6 w-full relative z-10">
              {[...leftCards, ...rightCards].sort((a,b) => parseInt(a.id) - parseInt(b.id)).map((card, idx) => (
                <motion.div 
                  key={card.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#2B394E] rounded-xl border border-[#3E4F66] p-5 shadow-lg relative"
                >
                  <span className="block text-xs font-bold text-white mb-1.5">{card.id}</span>
                  <span className="block text-white font-semibold text-[15px]">{card.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Desktop View - Two Columns */}
            <div className="hidden md:flex w-full h-[550px] relative z-10">
               {/* Left Column */}
               <div className="flex-1 flex flex-col justify-between pr-12 relative h-full">
                  {leftCards.map((card, idx) => (
                    <motion.div 
                      key={card.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: 0.2 + (idx * 0.2) }}
                      className="bg-[#2B394E] rounded-xl border border-[#3E4F66] p-4 lg:p-5 shadow-lg relative ml-auto w-full max-w-[280px] lg:max-w-[340px]"
                    >
                      {/* Connection Line to Center */}
                      <div className="absolute top-1/2 -right-12 w-12 h-px bg-[#01AEE4]" />
                      {/* Dot on Center Line */}
                      <div className="absolute top-1/2 -right-[51px] -translate-y-1/2 w-2 h-2 rounded-full bg-[#01AEE4]" />

                      <span className="block text-xs font-bold text-white mb-1">{card.id}</span>
                      <span className="block text-white font-bold text-[14px] lg:text-[15px] leading-snug">{card.text}</span>
                    </motion.div>
                  ))}
               </div>

               {/* Right Column (Staggered by adding a margin top) */}
               <div className="flex-1 flex flex-col justify-between pl-12 relative h-full pt-[60px] pb-[60px]">
                  {rightCards.map((card, idx) => (
                    <motion.div 
                      key={card.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: 0.3 + (idx * 0.2) }}
                      className="bg-[#2B394E] rounded-xl border border-[#3E4F66] p-4 lg:p-5 shadow-lg relative mr-auto w-full max-w-[280px] lg:max-w-[340px]"
                    >
                      {/* Connection Line to Center */}
                      <div className="absolute top-1/2 -left-12 w-12 h-px bg-[#01AEE4]" />
                      {/* Dot on Center Line */}
                      <div className="absolute top-1/2 -left-[51px] -translate-y-1/2 w-2 h-2 rounded-full bg-[#01AEE4]" />

                      <span className="block text-xs font-bold text-white mb-1">{card.id}</span>
                      <span className="block text-white font-bold text-[14px] lg:text-[15px] leading-snug">{card.text}</span>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>

          {/* Bottom Footer Text within Container */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.8 }}
            className="mt-16 md:mt-24 text-center px-4"
          >
            <p className="text-[#C0CBE3] text-[13px] md:text-[14px] leading-relaxed max-w-2xl mx-auto font-medium">
               Instead of using bureau data as a static input, BUREAU 360° helps institutions interpret how 
               borrower credit behaviour is evolving across the wider lending ecosystem. <br className="hidden md:block"/>
               This enables structured visibility into:
            </p>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
