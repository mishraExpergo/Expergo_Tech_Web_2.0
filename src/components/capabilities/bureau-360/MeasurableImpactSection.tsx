"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function MeasurableImpactSection() {
   const points = [
      "Clearer visibility into borrower behaviour across lenders",
      "Improved understanding of external leverage and exposure patterns",
      "Stronger portfolio monitoring through structured bureau intelligence",
      "Better segmentation of borrowers based on behaviour patterns.",
      "Enhanced collections prioritisation and borrower engagement planning.",
      "Improved credit policy evaluation through behaviour-based insights",
      "Greater leadership visibility into evolving portfolio dynamics"
   ];

   return (
      <section className="py-24 bg-white overflow-hidden">
         <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start">

               {/* Left Column Stats */}
               <div className="flex-1 w-full max-w-xl">
                  <motion.div
                     initial={{ opacity: 0, textShadow: "0px 0px 0px rgba(0,0,0,0)" }}
                     whileInView={{ opacity: 1 }}
                     viewport={{ once: true }}
                     className="mb-4"
                  >
                     <span className="text-[#1677FF] font-semibold text-[16px] uppercase px-3 py-1 border rounded-full bg-[#0DA2E7]/21">
                        Business Outcomes
                     </span>
                  </motion.div>

                  <motion.h2
                     initial={{ opacity: 0, y: 10 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.1 }}
                     className="text-[36px] mb-6 font-bold leading-tight text-gray-900"
                  >
                     Measurable Impact on Portfolio Monitoring
                  </motion.h2>

                  <motion.p
                     initial={{ opacity: 0, y: 10 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.2 }}
                     className="text-gray-600 font-medium mb-10"
                  >
                     BUREAU 360° drives tangible improvements across
                     credit risk management, collections strategy, and
                     governance — turning bureau data into a strategic
                     asset.
                  </motion.p>

                  <div className="grid grid-cols-2 gap-4">
                     <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-[#F0F7FF] border border-[#E0EFFF] rounded-xl p-6 "
                     >
                        <h3 className="text-[37px] mb-2  text-[#15B5C1]">360° </h3>
                        <p className="text-xs font-semibold text-gray-700 uppercase">Bureau Signal Coverage</p>
                     </motion.div>
                     <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="bg-[#F4F6F8] border border-gray-200 rounded-xl p-6"
                     >
                        <h3 className="text-[37px] mb-2 font-bold tracking-tight text-gray-900">7+</h3>
                        <p className="text-xs font-semibold text-gray-500 uppercase">Intelligence Dimensions</p>
                     </motion.div>
                  </div>
               </div>

               {/* Right Column Checklist */}
               <div className="flex-1 w-full flex items-center">
                  <div className="flex flex-col gap-6">
                     {points.map((point, idx) => (
                        <motion.div
                           key={idx}
                           initial={{ opacity: 0, x: 20 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true, margin: "-50px" }}
                           transition={{ duration: 0.4, delay: idx * 0.1 }}
                           className="flex items-start gap-4 group"
                        >
                           <CheckCircle className="w-6 h-6 text-[#01AEE4] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                           <span className="text-sm font-medium text-gray-700 leading-relaxed max-w-sm">
                              {point}
                           </span>
                        </motion.div>
                     ))}
                  </div>
               </div>

            </div>
         </div>
      </section>
   );
}
