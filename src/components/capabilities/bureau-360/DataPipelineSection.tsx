"use client";

import { motion } from "framer-motion";

const steps = [
  { id: 1, title: "Ingestion", desc: "Automated macro data capture." },
  { id: 2, title: "Mapping", desc: "Aligning Bureau variables onto standard risk definitions." },
  { id: 3, title: "Loading", desc: "Pushing arrays into logical parameters." },
  { id: 4, title: "Consolidation", desc: "Tying single markers to cumulative metrics." },
  { id: 5, title: "Delivery", desc: "Targeted push events directly into core system dashboards." },
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
        <div className="flex-1 w-full pl-0 md:pl-12 flex flex-col gap-6">
           {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, type: "spring", stiffness: 60 }}
                className={`relative pl-8 ${idx !== steps.length - 1 ? 'pb-8' : ''}`}
              >
                 {idx !== steps.length - 1 && (
                   <div className="absolute left-6 top-8 bottom-0 w-px bg-cyan-100/50" />
                 )}
                 <div className="absolute left-0 top-1 text-5xl font-bold text-gray-100 leading-none -ml-4 z-0 pointer-events-none">
                   {step.id}
                 </div>
                 
                 <div className="relative z-10 flex flex-col pt-2">
                   <h3 className="es-small-heading mb-1 inline-block w-fit border-b border-cyan-100 pb-1 tracking-wide text-[#01AEE4]">
                     {step.title}
                   </h3>
                   <p className="text-gray-500 font-medium text-sm">
                     {step.desc}
                   </p>
                 </div>
                 
                 {/* Connection horizontal line */}
                 <div className="absolute -left-12 top-6 w-16 h-px bg-gradient-to-r from-transparent to-cyan-100 pointer-events-none" />
              </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
}
