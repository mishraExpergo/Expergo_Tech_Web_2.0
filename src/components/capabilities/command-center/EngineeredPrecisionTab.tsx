"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Activity, Database, GitMerge, Zap, ShieldCheck } from "lucide-react";
import { CgController } from "react-icons/cg";
import { PiTreeStructureDuotone } from "react-icons/pi";



const features = [
  { id: "01", title: "Signal-to-Action Conversion ", icon: Server, desc: "Every qualifying early warning signal is automatically converted into an actionable case, ensuring no critical trigger remains unattended." },

  { id: "02", title: "Ownership & Accountability", icon: Activity, desc: "Each case is assigned to a clearly defined role or function, ensuring responsibility is established at every stage of the resolution process." },

  { id: "03", title: "SLA-Driven Execution", icon: Database, desc: "Actions are governed by defined timelines, with delays tracked in real time and escalated automatically when thresholds are breached.." },

  { id: "04", title: "Parallelised Processing", icon: GitMerge, desc: "Distributes logical verifications concurrently allowing millions of evaluations simultaneously without bottlenecking." },

  { id: "05", title: "Role-Based Workflows", icon: Zap, desc: "Cases move through structured workflows across multiple teams — Operations, Credit, Legal, Technical, and Collections." },

  { id: "06", title: "Decision-Based Routing", icon: ShieldCheck, desc: "Cases are classified based on borrower behaviour — behavioural vs intentional stress allowing workflows to adjust accordingly." },

  { id: "07", title: "Escalation & Control", icon: CgController, desc: "High-risk cases and SLA breaches trigger automatic escalation, providing management visibility and immediate control." },
  
  { id: "08", title: "Structured Resolution", icon: PiTreeStructureDuotone, desc: "Every case is closed with a defined outcome, documented rationale, and a complete action history for governance review." }
];

export default function EngineeredPrecisionTab() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <motion.div
             initial={{ opacity: 0, textShadow: "0px 0px 0px rgba(0,0,0,0)" }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="mb-4"
          >
             <span className="text-[#1677FF] font-semibold text-[16px] tracking-widest uppercase px-3 py-1 ">
                CORE CAPABILITIES
             </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[36px] mb-6 font-bold text-gray-900"
          >
            Engineered for <span className="text-[#01AEE4]">Precision</span>
          </motion.h2>
        </div>

        {/* Tab Interface container */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           className="bg-[#1D2534] rounded-2xl   overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#1e2a3c]"
        >
           
           {/* Left Section List */}
           <div className="w-full md:w-1/2 bg-[#171d29] border-b md:border-b-0 md:border-r border-[#2d3a50] p-6">
              <ul className="flex flex-col gap-2">
                 {features.map((feat, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() => setActiveTab(idx)}
                        className={`w-full text-left px-4 py-3 rounded-md text-sm font-semibold transition-colors flex items-center gap-3
                          ${activeTab === idx ? "bg-[#1D2534] text-white border border-[#2d3a50]" : "text-gray-400 hover:text-gray-200 hover:bg-[#1f2838] border border-transparent"}
                        `}
                      >
                        <feat.icon className={`w-4 h-4 ${activeTab === idx ? "text-[#01AEE4]" : "text-gray-500"}`} />
                        {feat.id}. {feat.title}
                      </button>
                    </li>
                 ))}
              </ul>
           </div>

           {/* Right display side */}
           <div className="w-full md:w-2/3 p-10 md:p-16 relative flex flex-col justify-center min-h-[400px]">
              
              {/* Subtle visual lines */}
              <div className="absolute top-10 left-10 w-16 h-[2px] bg-[#01AEE4]/50" />
              
              <AnimatePresence mode="wait">
                 <motion.div
                   key={activeTab}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -10 }}
                   transition={{ duration: 0.3 }}
                   className="relative z-10"
                 >
                    <div className="text-[#01AEE4] mb-4">
                       {(() => {
                         const Icon = features[activeTab].icon;
                         return <Icon className="w-8 h-8" />;
                       })()}
                    </div>
                    <h3 className="es-heading-section mb-4 font-bold text-white">
                      {features[activeTab].title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed max-w-lg">
                      {features[activeTab].desc}
                    </p>
                 </motion.div>
              </AnimatePresence>

              {/* Giant number indicator */}
              <div className="absolute bottom-6 right-6 text-[120px] leading-none font-bold text-white/5 pointer-events-none select-none tracking-tighter">
                 {features[activeTab].id}
              </div>
           </div>

        </motion.div>

      </div>
    </section>
  );
}
