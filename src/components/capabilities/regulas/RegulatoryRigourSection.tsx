"use client";

import { motion } from "framer-motion";
import { Settings, Shield, Layers, Users, Target, MapPin, FileText, Search } from "lucide-react";

const rigours = [
  { icon: Settings, text: "Centralised statutory Early Warning Register" },
  { icon: Shield, text: "Signal-level regulatory SOP mapping " },
  { icon: Layers, text: "Evidence-linked compliance documentation " },
  { icon: Users, text: "Ownership and accountability tracking " },
  { icon: Target, text: "Regulatory ageing and timeline monitoring " },
  { icon: MapPin, text: "Risk acceptance and approval records " },
  { icon: FileText, text: "Board pack and inspection pack generation" },
  { icon: Search, text: "Complete audit trail for supervisory review" },
];

export default function RegulatoryRigourSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="es-small-heading mb-2 tracking-wide text-[#1677FF]"
          >
            Functional Features
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="es-heading-hero font-semibold text-gray-900"
          >
            Built for <span className="text-[#01AEE4]">regulatory rigour.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rigours.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:border-cyan-200 border-t-4 border-t-cyan-400 group flex flex-col justify-between min-h-[140px]"
            >
              <div className="mb-4">
                <item.icon className="w-6 h-6 text-cyan-500 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-gray-800 font-semibold text-sm leading-snug">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
