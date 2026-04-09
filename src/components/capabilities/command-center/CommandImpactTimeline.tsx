"use client";

import { motion } from "framer-motion";
import { Zap, Shield, FileText, CheckSquare, Target, Activity } from "lucide-react";

export default function CommandImpactTimeline() {
  const elements = [
    { title: "Faster Threat Response", desc: "Instantly routes validated external risks entirely eliminating manual queue limits.", icon: Zap, side: "left" },
    { title: "Reduced Risk Fallout", desc: "Automating rapid limits based on variables ensures early damage control natively.", icon: Shield, side: "right" },
    { title: "Manual Review Cuts", desc: "Directly filters thousands of noisy variables down to purely actionable paths.", icon: FileText, side: "left" },
    { title: "False Positive Clarity", desc: "Validates incoming triggers mathematically against historical benchmarks silently.", icon: Target, side: "right" },
    { title: "Error Free Process", desc: "Removes human translation dependencies perfectly securing evaluation pipelines.", icon: CheckSquare, side: "left" },
    { title: "Performance Visibility", desc: "Autonomously archives and scores logic validations for full compliance history.", icon: Activity, side: "right" },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-24">
          <motion.div
             initial={{ opacity: 0, textShadow: "0px 0px 0px rgba(0,0,0,0)" }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="mb-4"
          >
             <span className="text-[#1677FF] font-semibold text-xs tracking-widest uppercase px-3 py-1 bg-[#1677FF]/10 rounded-full border border-[#1677FF]/20">
                MEASURABLE IMPACT
             </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="es-heading-section font-bold text-gray-900"
          >
            <span className="text-[#1677FF]">Measurable</span> Impact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 font-medium text-sm mt-4 tracking-wide"
          >
            Directly translating operational integrations into guaranteed efficiency shifts.
          </motion.p>
        </div>

        <div className="relative">
           {/* Center Flow Line */}
           <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-100 via-blue-200 to-transparent -translate-x-1/2 ml-0" />

           {elements.map((item, idx) => (
             <div key={idx} className={`relative flex items-center mb-16 md:mb-12 ${item.side === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}>
                
                {/* Connector Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#1677FF] bg-white z-10 hidden md:block" />
                
                {/* Connecting Line from dot to card */}
                <div 
                   className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[1px] bg-cyan-200 w-16
                   ${item.side === 'left' ? 'right-1/2 mr-2' : 'left-1/2 ml-2'}`}
                />

                {/* Card Container */}
                <div className={`w-full md:w-1/2 ${item.side === 'left' ? 'md:pr-16 pl-10 md:pl-0' : 'md:pl-16 pl-10'}`}>
                   <motion.div
                     initial={{ opacity: 0, x: item.side === 'left' ? -30 : 30 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ duration: 0.5, type: "spring", stiffness: 60 }}
                     className="bg-white border border-[#01AEE4]/20 rounded-xl p-6 shadow-[0_4px_20px_rgba(1,174,228,0.05)] hover:shadow-[0_8px_30px_rgba(1,174,228,0.1)] transition-all"
                   >
                     <div className="bg-[#E8F2FA] w-10 h-10 rounded-full flex items-center justify-center text-[#01AEE4] mb-4">
                        <item.icon className="w-5 h-5" />
                     </div>
                     <h3 className="font-bold text-gray-900 text-sm mb-2 uppercase tracking-wide">{item.title}</h3>
                     <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                   </motion.div>
                </div>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
}
