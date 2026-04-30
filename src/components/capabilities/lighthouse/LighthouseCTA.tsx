"use client";

import { motion } from "framer-motion";
import { BookDemoButton } from "@/components/book-demo/BookDemoProvider";

export default function LighthouseCTA() {
  return (
    <section className="py-32 bg-[#F9FAFB] text-center border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6 md:my-0 my-[-90px]">
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="es-heading-hero mb-6 font-black tracking-tight text-gray-900"
        >
          Ready to illuminate your <br className="hidden md:block" /> portfolio risk?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 mb-12 text-sm max-w-xl mx-auto font-medium"
        >
          Get the complete data overview you need without any blind-spots impacting operational efficiency or risk models.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-4"
        >
          <BookDemoButton className="bg-[#1677FF] hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-md transition-colors shadow-sm">
          Request Executive Brief
          </BookDemoButton>
        </motion.div>
        
      </div>
    </section>
  );
}
