"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function BureauHero() {
  const tags = [
    "Trended Credit Data",
    "Sector Geo Evidence",
    "Borrower Financial Patterns",
    "Co-lenders Momentum"
  ];

  return (
    <section className="relative  pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
        {/* Left Text Content */}
        <div className="flex-1 max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="es-heading-hero mb-6 font-bold  text-[#15B5C1]"
          >
            BUREAU 360°
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className=" text-gray-800 font-medium mb-8 text-[20px] leading-snug"
          >
            BUREAU 360° is a credit bureau aggregator and analysis engine that continuously searches for trends over prior months rather than static lines checking single boundaries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <button className="bg-[#1677FF] hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-md transition-colors shadow-sm">
              Request access
            </button>
          </motion.div>

          {/* Tags row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {tags.map((tag, idx) => (
               <div key={idx} className="flex items-center gap-2 bg-[#F0F7FF] border border-[#E0EFFF] py-2 px-4 rounded-full">
                 <CheckCircle2 className="w-4 h-4 text-[#01AEE4]" strokeWidth={2.5} />
                 <span className="text-gray-700 text-xs font-semibold">{tag}</span>
               </div>
            ))}
          </motion.div>
        </div>

        {/* Right Isometric Visual */}
        <div className="flex-1 flex justify-center items-center w-full aspect-square max-w-[500px] relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full h-full relative"
          >
            <img 
               src="/BureauHero.png" 
               alt="Bureau 360 Dashboard Isometric Layers" 
               className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
