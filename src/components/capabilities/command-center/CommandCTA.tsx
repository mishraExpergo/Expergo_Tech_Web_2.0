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
           <span className="es-small-heading px-3 py-1 tracking-widest text-[#1677FF] bg-[#1677FF]/10 rounded-full border border-[#1677FF]/20">
              NEXT STEPS
           </span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="es-heading-hero mb-6 font-bold tracking-tight text-gray-900"
        >
          Turn Warnings Into <span className="text-[#1677FF]">Results</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 mb-12 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Connect EarlySafe data directly to actionable pathways. Stop losing time on manual reviews 
          and ensure that every signal triggers a documented, controlled response.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-4 border-t border-gray-100 pt-10"
        >
          <BookDemoButton className="bg-[#1677FF] hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-md transition-colors shadow-sm tracking-wide">
            Book a demo
          </BookDemoButton>
          <button className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-medium px-8 py-3 rounded-md transition-all shadow-sm">
            Request Personalized Pricing
          </button>
        </motion.div>
      </div>
    </section>
  );
}
