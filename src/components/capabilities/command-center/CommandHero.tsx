"use client";

import { BookDemoButton } from "@/components/book-demo/BookDemoProvider";
import { motion } from "framer-motion";
import { LineChart, BarChart3, Activity, PieChart, Shield } from "lucide-react";

export default function CommandHero() {
  return (
    <section className="relative pt-20 pb-16 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
        
        {/* Left Text Content */}
        <div className="flex-1 max-w-2xl">
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
            className="text-[52px] mb-6 font-bold tracking-tight text-[#15B5C1]"
          >
            Command Centre
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[20px] text-gray-600 font-medium mb-10 leading-relaxed max-w-lg"
          >
EarlySafe Command Centre transforms how institutions execute early warning responses — converting signals into structured workflows with ownership, timelines, and accountability.          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <BookDemoButton className="bg-[#1677FF] hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-md transition-colors shadow-sm">
              Book Demo
            </BookDemoButton>
          </motion.div>
        </div>

        {/* Right UI Visual Mockup */}
       <div className="">
        <img src="/1 1.png" alt="Command Center" width={600} height={600} />
       </div>

      </div>
    </section>
  );
}
