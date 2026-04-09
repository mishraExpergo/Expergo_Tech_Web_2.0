"use client";

import { motion } from "framer-motion";
import { ArrowLeftRight, Activity, Network, LineChart, FileSearch, ShieldAlert, BookOpenCheck } from "lucide-react";

const capabilities = [
  { icon: ArrowLeftRight, title: "Bureau Abstraction Engine", text: "Unified API bridging seamlessly standardizes divergent formats across Equifax, Experian, and TransUnion into single logic paths." },
  { icon: Activity, title: "Bureau Analysis Engine", text: "Applies deep analytics to historical traces transforming raw scores into active chronological momentum flags." },
  { icon: Network, title: "Demographic Level Logic Rules", text: "Combines micro behaviour shifts with macro geographic constraints to pinpoint the earliest formations of underlying distress." },
  { icon: LineChart, title: "Unified Risk Management Engine", text: "Translates diverse data schemas into operational decisions seamlessly integrated with primary evaluation processes." },
  { icon: FileSearch, title: "Aggregation Analytics Models", text: "Employs advanced models to benchmark individual behaviours against aggregate portfolio performance in real time." },
  { icon: ShieldAlert, title: "Logic Based Event Generation", text: "Instantly triggers alert operations routing automated actions directly based on predefined logic bounds without manual scanning." },
  { icon: BookOpenCheck, title: "Behavioural Benchmarking Rules", text: "Creates real-time dashboard signals that continuously map emerging threat dynamics safely mapped against standard internal expectations." },
];

export default function CoreCapabilitiesGrid() {
  return (
    <section className="py-24 bg-gray-50 border-y border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="es-heading-section font-bold text-gray-900"
          >
            Core <span className="text-[#01AEE4]">Capabilities</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Staggered Grid Layout */}
          
          {/* Row 1: 2 Cards */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-6">
            {capabilities.slice(0, 2).map((cap, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="bg-white border border-[#01AEE4]/20 shadow-[0_4px_20px_rgba(1,174,228,0.05)] rounded-2xl p-8 w-full md:w-[400px] hover:shadow-[0_8px_30px_rgba(1,174,228,0.1)] transition-shadow"
              >
                 <div className="flex items-start gap-4">
                    <div className="bg-[#01AEE4]/10 p-2 rounded-lg shrink-0 text-[#01AEE4]">
                       <cap.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm mb-2 uppercase tracking-wide">{cap.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{cap.text}</p>
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>

          {/* Row 2: 3 Cards */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-6">
            {capabilities.slice(2, 5).map((cap, idx) => (
              <motion.div
                key={idx + 2}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 0.4 }}
                className="bg-white border border-[#01AEE4]/20 shadow-[0_4px_20px_rgba(1,174,228,0.05)] rounded-2xl p-8 w-full md:w-[400px] hover:shadow-[0_8px_30px_rgba(1,174,228,0.1)] transition-shadow"
              >
                 <div className="flex items-start gap-4">
                    <div className="bg-[#01AEE4]/10 p-2 rounded-lg shrink-0 text-[#01AEE4]">
                       <cap.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm mb-2 uppercase tracking-wide">{cap.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{cap.text}</p>
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>

          {/* Row 3: 2 Cards */}
          <div className="flex flex-col md:flex-row justify-center gap-6">
            {capabilities.slice(5, 7).map((cap, idx) => (
              <motion.div
                key={idx + 5}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.5 + idx * 0.1, duration: 0.4 }}
                className="bg-white border border-[#01AEE4]/20 shadow-[0_4px_20px_rgba(1,174,228,0.05)] rounded-2xl p-8 w-full md:w-[400px] hover:shadow-[0_8px_30px_rgba(1,174,228,0.1)] transition-shadow"
              >
                 <div className="flex items-start gap-4">
                    <div className="bg-[#01AEE4]/10 p-2 rounded-lg shrink-0 text-[#01AEE4]">
                       <cap.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm mb-2 uppercase tracking-wide">{cap.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{cap.text}</p>
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
