"use client";

import { motion } from "framer-motion";
import { BookDemoButton } from "@/components/book-demo/BookDemoProvider";

export default function CommandCTA() {
  return (
    <section className="py-32 bg-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, textShadow: "0px 0px 0px rgba(0,0,0,0)" }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="mb-4"
        >
           <span className="text-[16px] px-3 py-1  text-[#1677FF] ">
              NEXT STEPS
           </span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="es-heading-hero mb-6 font-bold tracking-tight text-gray-900"
        >
          Turn Warnings Into <span className="text-[#15B5C1]">Results</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-600  text-lg max-w-2xl mx-auto leading-relaxed"
        >
          EarlySafe Command Centre brings discipline, coordination, and measurable outcomes to risk resolution. See it in action.
 
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-4  pt-10"
        >
          <BookDemoButton className="bg-[#1677FF] hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-md transition-colors shadow-sm tracking-wide">
            Book a demo
          </BookDemoButton>
        </motion.div>
      </div>
    </section>
  );
}
