"use client";

import { motion } from "framer-motion";

export default function CoreCapabilitiesList() {
  const items = [
    { 
      number: "1", title: "Portfolio-wide risk visibility", 
      desc: " Get a unified view of risk across all delinquency buckets, segments, and sourcing channels beyond just overdue numbers.",
       pillLabel: "1. Risk Visibility", pillSide: "right"
    },
    { 
      number: "2", title: "Structured Risk Signal Framework", 
      desc: "Track measurable risk triggers derived from payment behaviour, bureau changes, and operational indicators. ",
      pillLabel: "2. Risk Signals", pillSide: "left"
    },
    { 
      number: "3", title: "Migration & Watchlist Monitoring", 
      desc: "Monitor how accounts move across buckets and track watchlist inflow, outflow, and progression over time.",
      pillLabel: "3. MIGRATION TRACKING", pillSide: "right"
    },
    { 
      number: "4", title: "Case Ownership & Control Tracking", 
      desc: "Ensure every risk signal is assigned, tracked, and managed with clear ownership, ageing visibility, and escalation flow. ",
      pillLabel: "4.Case Ownership", pillSide: "left"
    },
    { 
      number: "5", title: "Resolution & Outcome Measurement", 
      desc: "Measure how effectively cases are resolved, track repeat stress, and evaluate operational response quality.",
      pillLabel: "5.RESOLUTION QUALITY", pillSide: "right"
    }
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-16 md:my-0 my-[-90px]">
          <motion.div
             initial={{ opacity: 0, textShadow: "0px 0px 0px rgba(0,0,0,0)" }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="mb-4"
          >
             <span className=" px-3 py-1 text-blue-500">
                CAPABILITIES
             </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className=" text-[36px] text-[#1F1F1F] mb-6 font-bold text-gray-900"
          >
            What we <span className="text-[#01AEE4]">Deliver</span>
          </motion.h2>
        </div>

        <div className="flex flex-col gap-6 w-full items-center relative">
           
           {/* Center faint line connecting them all (optional but helps ground it) */}
           <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gray-200 -translate-x-1/2 -z-10" />

           {items.map((item, idx) => (
              <motion.div
                 key={idx}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ duration: 0.5, delay: idx * 0.1 }}
                 className="relative w-full md:w-5/6 bg-white border-2 border-[#1677FF]/40 rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md hover:border-[#1677FF] transition-all group"
              >
                 <h3 className="text-[28px] text-[#1F1F1F] mb-2 font-bold text-gray-900">
                    {item.number}. {item.title}
                 </h3>
                 <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
                    {item.desc}
                 </p>

                 {/* The Floating Pill */}
                 <div 
                   className={`hidden md:flex absolute top-1/2 -translate-y-1/2 items-center 
                     ${item.pillSide === 'left' ? '-left-6 -translate-x-full' : '-right-6 translate-x-full'}`}
                 >
                    {item.pillSide === 'right' && (
                       <svg className="w-6 h-1 mt-1 text-[#1677FF] mr-2" fill="none" viewBox="0 0 24 4"><path d="M0 2h24" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2"/></svg>
                    )}
                    <div className="bg-[#1677FF] text-white text-xs font-bold uppercase tracking-wider py-2 px-4 rounded-full shadow-lg whitespace-nowrap shadow-blue-500/20 group-hover:scale-105 transition-transform">
                       {item.pillLabel}
                    </div>
                    {item.pillSide === 'left' && (
                       <svg className="w-6 h-1 mt-1 text-[#1677FF] ml-2" fill="none" viewBox="0 0 24 4"><path d="M0 2h24" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2"/></svg>
                    )}
                 </div>
              </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
}
