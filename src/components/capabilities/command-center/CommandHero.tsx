"use client";

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
             <span className="es-small-heading flex w-fit items-center justify-center gap-2 px-3 py-2 tracking-widest text-[#1677FF] rounded-full border border-[#1677FF]/20">
             <span><Shield className="w-4 h-4" /></span>
               EarlySafe Command Centre
             </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="es-heading-hero mb-6 font-bold tracking-tight text-[#01AEE4]"
          >
            Command Centre
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 font-medium mb-10 leading-relaxed max-w-lg"
          >
EarlySafe Command Centre transforms how institutions execute early warning responses — converting signals into structured workflows with ownership, timelines, and accountability.          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button className="bg-[#1677FF] hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-md transition-colors shadow-sm">
              Book Demo
            </button>
          </motion.div>
        </div>

        {/* Right UI Visual Mockup */}
       <div className="">
        <img src="/Command-centerHero.svg " alt="Command Center" width={550} height={550} />
       </div>

      </div>
    </section>
  );
}
