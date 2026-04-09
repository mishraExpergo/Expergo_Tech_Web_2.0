"use client";

import { motion } from "framer-motion";
import { AlignLeft, Activity, RefreshCw, BarChart3, Database, Key, ShieldCheck } from "lucide-react";

export default function BetterMonitoringSection() {
  return (
    <section className="relative bg-white py-24 overflow-hidden">
      
      {/* Background Shapes mapping to the visual provided */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Top Dark Background */}
        <div className="absolute top-0 left-0 w-full h-[60%] bg-[#202938]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }} />
        {/* Bottom Dark Background */}
        <div className="absolute bottom-0 right-0 w-full md:w-[60%] h-[50%] bg-[#202938]" style={{ clipPath: 'polygon(0 15%, 100% 0, 100% 100%, 0 100%)', borderTopLeftRadius: '100% 30%' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Top Row Split */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
           
           {/* Left Dark Text */}
           <div className="lg:col-span-5 text-white">
              <motion.div
                initial={{ opacity: 0, textShadow: "0px 0px 0px rgba(0,0,0,0)" }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-4"
              >
                <span className="text-[#1677FF] font-semibold text-xs tracking-widest uppercase bg-[#1677FF]/10 px-3 py-1 rounded-full border border-[#1677FF]/20">
                  Feature
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="es-heading-section mb-6 font-bold leading-tight"
              >
                Better <span className="text-[#01AEE4]">Portfolio Monitoring</span> with External Signals
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 font-medium text-lg max-w-md"
              >
                Rapid intelligence on an individual, aggregate and demographic level combining
                multi-bureau telemetry for unprecedented early detection capabilities extending across the final 
                mile to your existing risk processes.
              </motion.p>
           </div>
           
           {/* Right Light Grid */}
           <div className="lg:col-span-7 bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-gray-100 ml-0 lg:ml-12 relative overflow-hidden">
             
             {/* Small visual accent */}
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#01AEE4]/5 rounded-full pointer-events-none" />

             <div className="grid sm:grid-cols-2 gap-8 lg:gap-12 relative z-10">
               <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                 <div className="flex items-start gap-4">
                   <AlignLeft className="w-6 h-6 text-[#1677FF] mt-1 shrink-0" />
                   <div>
                     <h3 className="font-semibold text-gray-900 text-sm mb-1">Portfolio Trend Indexing</h3>
                     <p className="text-xs text-gray-500">Continuous historical logging captures underlying pattern migrations.</p>
                   </div>
                 </div>
               </motion.div>
               <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                 <div className="flex items-start gap-4">
                   <Activity className="w-6 h-6 text-[#1677FF] mt-1 shrink-0" />
                   <div>
                     <h3 className="font-semibold text-gray-900 text-sm mb-1">Actionable Intelligence</h3>
                     <p className="text-xs text-gray-500">Transform abstract variable arrays into immediate processing actions.</p>
                   </div>
                 </div>
               </motion.div>
               <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                 <div className="flex items-start gap-4">
                   <RefreshCw className="w-6 h-6 text-[#1677FF] mt-1 shrink-0" />
                   <div>
                     <h3 className="font-semibold text-gray-900 text-sm mb-1">Standardized Logic Application</h3>
                     <p className="text-xs text-gray-500">Map multiple bureau languages into one centralized semantic portfolio engine.</p>
                   </div>
                 </div>
               </motion.div>
               <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                 <div className="flex items-start gap-4">
                   <BarChart3 className="w-6 h-6 text-[#1677FF] mt-1 shrink-0" />
                   <div>
                     <h3 className="font-semibold text-gray-900 text-sm mb-1">Advanced Pattern Analysis</h3>
                     <p className="text-xs text-gray-500">Utilize broad macro demographic shifts alongside micro behavioural changes.</p>
                   </div>
                 </div>
               </motion.div>
             </div>
           </div>

        </div>

        {/* Bottom Row Split */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mt-12 bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-100 z-20 relative">
           <div className="lg:col-span-8 flex flex-col md:flex-row gap-8 lg:gap-12">
             <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
               <div className="flex items-start gap-4">
                 <ShieldCheck className="w-6 h-6 text-[#1677FF] mt-1 shrink-0" />
                 <div>
                   <h3 className="font-semibold text-gray-900 text-sm mb-1">No additional Front-end UI Needed</h3>
                   <p className="text-xs text-gray-500">Embeds precisely into existing processing boundaries.</p>
                 </div>
               </div>
             </motion.div>
             <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
               <div className="flex items-start gap-4">
                 <Database className="w-6 h-6 text-[#1677FF] mt-1 shrink-0" />
                 <div>
                   <h3 className="font-semibold text-gray-900 text-sm mb-1">Multiple API Source Normalization</h3>
                   <p className="text-xs text-gray-500">Unifies separate data structures securely and rapidly.</p>
                 </div>
               </div>
             </motion.div>
           </div>
           
           <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-gray-200 pt-6 lg:pt-0 lg:pl-8">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <p className="text-sm font-semibold text-gray-900 leading-relaxed">
                  {`"Our network of multi-bureau signals ensures a complete view, replacing narrow static checkpoints with expansive demographic risk context, instantly integrated into your native origination and servicing environments."`}
                </p>
                <p className="text-xs text-gray-400 mt-4 font-bold uppercase tracking-widest">
                  Bureau Abstraction Layer
                </p>
              </motion.div>
           </div>
        </div>

      </div>
    </section>
  );
}
