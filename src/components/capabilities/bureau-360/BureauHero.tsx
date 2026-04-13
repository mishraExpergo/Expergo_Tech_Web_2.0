"use client";

import { useState } from "react";
import { BookDemoButton } from "@/components/book-demo/BookDemoProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";

export default function BureauHero() {
  const [isHovered, setIsHovered] = useState(false);
  const tags = [
    "Trended Credit Data",
    "Sector Geo Evidence",
    "Borrower Financial Patterns",
    "Co-lenders Momentum"
  ];

  return (
    <section className="relative  pb-16  overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
        {/* Left Text Content */}
        <div className="flex-1 max-w-2xl py-28">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[52px] mb-6 font-bold  text-[#15B5C1]"
          >
            BUREAU 360°
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className=" text-gray-800  mb-8 w-[30rem] text-[20px] leading-snug"
          >
            BUREAU 360° converts credit bureau signals into structured
            borrower behaviour intelligence — giving lenders continuous,
            cross-lender visibility into how credit activity, leverage, and
            exposure evolve across the wider lending ecosystem.        
              </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <BookDemoButton className="bg-[#1677FF] hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-md transition-colors shadow-sm">
              Book Demo
            </BookDemoButton>
          </motion.div>

          {/* Tags row */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {tags.map((tag, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-[#F0F7FF] border border-[#E0EFFF] py-2 px-4 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-[#01AEE4]" strokeWidth={2.5} />
                <span className="text-gray-700 text-xs font-semibold"></span>
              </div>
            ))}
          </motion.div> */}
        </div>

        {/* Right Isometric Visual */}
          
           <div 
          className="flex-1 flex justify-center items-center relative w-full aspect-square max-w-[500px] cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated concentric circles */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
              className="absolute rounded-full border border-cyan-400/30"
              style={{
                width: `${(i + 1) * 20}%`,
                height: `${(i + 1) * 20}%`,
              }}
            />
          ))}

          {/* Dotted outer circle */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute rounded-full border-2 border-dashed border-cyan-200"
            style={{ width: '85%', height: '85%' }}
          />
          
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute rounded-full border border-cyan-300/40"
            style={{ width: '95%', height: '95%' }}
          />

          {/* Center Shield Container */}
          <div className={`relative z-20 rounded-full p-8 border border-cyan-100 flex items-center justify-center transition-all duration-500 bg-white ${isHovered ? 'shadow-[0_0_60px_rgba(1,174,228,0.3)] shadow-[#01AEE4]/40 scale-110' : 'shadow-none scale-100'}`}>
             <Shield className="w-28 h-28 text-cyan-500" strokeWidth={1.5} />
          </div>

          {/* Floating Hover Cards */}
          <AnimatePresence>
            {isHovered && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 10, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: [0, -15, 0],
                    y: [0, -15, 0]
                  }}
                  exit={{ opacity: 0, scale: 0.95, x: 10, y: 10 }}
                  transition={{ 
                    x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 },
                    opacity: { duration: 0.3 }, 
                    scale: { duration: 0.3 } 
                  }}
                  className="absolute top-[20%] -left-10 lg:-left-20 bg-white rounded-2xl shadow-xl px-5 py-2 flex items-center gap-3 z-30"
                >
                  <span className="text-4xl font-bold text-gray-200 uppercase" style={{ fontFamily: "Arial, sans-serif" }}>1</span>
                  <span className="text-[#01AEE4] font-semibold text-sm whitespace-nowrap">Customer-to-loan level<span className="border-b-[3px] border-[#01AEE4] pb-1"> interpretation</span></span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: -10, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: [0, 15, 0],
                    y: [0, -15, 0]
                  }}
                  exit={{ opacity: 0, scale: 0.95, x: -10, y: 10 }}
                  transition={{ 
                    x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                    opacity: { duration: 0.3 }, 
                    scale: { duration: 0.3 } 
                  }}
                  className="absolute top-[35%] -right-10 lg:-right-32 bg-white rounded-2xl shadow-xl px-5 py-2 flex items-center gap-3 z-30"
                >
                  <span className="text-4xl font-bold text-gray-200 uppercase" style={{ fontFamily: "Arial, sans-serif" }}>2</span>
                  <span className="text-[#01AEE4] font-semibold text-sm whitespace-nowrap">External ↔ Internal <span className="border-b-[3px] border-[#01AEE4] pb-1">stress linkage </span></span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 10, y: -10 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: [0, -15, 0],
                    y: [0, 15, 0]
                  }}
                  exit={{ opacity: 0, scale: 0.95, x: 10, y: -10 }}
                  transition={{ 
                    x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.0 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.0 },
                    opacity: { duration: 0.3 }, 
                    scale: { duration: 0.3 } 
                  }}
                  className="absolute bottom-[35%] -left-5 lg:-left-16 bg-white rounded-2xl shadow-xl px-5 py-2 flex items-center gap-3 z-30"
                >
                  <span className="text-4xl font-bold text-gray-200 uppercase" style={{ fontFamily: "Arial, sans-serif" }}>3</span>
                  <span className="text-[#01AEE4] font-semibold text-sm whitespace-nowrap">Score & enquiry <span className="border-b-[3px] border-[#01AEE4] pb-1">signal movement</span></span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: -10, y: -10 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: [0, 15, 0],
                    y: [0, 15, 0]
                  }}
                  exit={{ opacity: 0, scale: 0.95, x: -10, y: -10 }}
                  transition={{ 
                    x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
                    opacity: { duration: 0.3 }, 
                    scale: { duration: 0.3 } 
                  }}
                  className="absolute bottom-[20%] -right-5 lg:-right-16 bg-white rounded-2xl shadow-xl px-5 py-2 flex items-center gap-3 z-30"
                >
                  <span className="text-4xl font-bold text-gray-200 uppercase" style={{ fontFamily: "Arial, sans-serif" }}>4</span>
                  <span className="text-[#01AEE4] font-semibold text-sm whitespace-nowrap">Cross-lender <span className="border-b-[3px] border-[#01AEE4] pb-1">exposure & leverage</span></span>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
