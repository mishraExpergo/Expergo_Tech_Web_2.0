"use client";

import { motion } from "framer-motion";
import { BookDemoButton } from "@/components/book-demo/BookDemoProvider";

export default function CallToActionSection() {
  return (
    <section className="py-24 bg-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[36px] mb-4 font-semibold text-gray-900"
        >
          Ready to illuminate your portfolio risk?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 mb-10"
        >
          Statutory Early Warning Register for regulated lenders under RBI & NHB supervision.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-4"
        >
          <BookDemoButton className="bg-[#1677FF] hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-md transition-colors shadow-sm tracking-wide">
            Book demo
          </BookDemoButton>
          {/* <button className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-medium px-8 py-3 rounded-md transition-all shadow-sm">
            Request Executive Briefing 
          </button> */}
        </motion.div>
      </div>
    </section>
  );
}
