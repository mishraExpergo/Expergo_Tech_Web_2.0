"use client";

import { motion } from "framer-motion";
import { BookDemoButton } from "@/components/book-demo/BookDemoProvider";

export default function BureauCTA() {
  return (
    <section className="py-32 bg-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="es-heading-hero mb-6 font-bold tracking-tight text-gray-900"
        >
          Turn Bureau Data Into <br/>
          <span className="text-[#01AEE4]">Portfolio Intelligence</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 mb-12 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Built specifically for high velocity origination and risk operations, EXPERGO BUREAU 360
          is equipped to handle the complex demands of regulatory logic instantly.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-4"
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
