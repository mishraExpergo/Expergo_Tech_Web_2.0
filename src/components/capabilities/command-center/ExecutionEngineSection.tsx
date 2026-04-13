"use client";

import { motion } from "framer-motion";
import { Zap, Users, Hexagon } from "lucide-react";

export default function ExecutionEngineSection() {
  const cards = [
    {
      icon: Zap,
      title: "Signal to Action",
      desc: "Early Warning Signals are converted into actionable cases with defined ownership and SLA-driven timelines."
    },
    {
      icon: Users,
      title: "Cross-Team Coordination",
      desc: "Actions coordinated across Credit, Operations, Legal, Technical, and Collections teams seamlessly."
    },
    {
      icon: Hexagon,
      title: "Structured Framework",
      desc: "Every signal triggers clear action, escalation, and closure replacing informal follow-ups entirely."
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">  
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
             initial={{ opacity: 0, textShadow: "0px 0px 0px rgba(0,0,0,0)" }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="mb-4"
          >
             <span className="text-[#1677FF] font-semibold text-site-kicker tracking-widest uppercase px-3 py-1 ">
                OVERVIEW
             </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[36px] font-bold text-gray-900"
          >
            The Execution Engine <br/>
            Behind <span className="text-[#1677FF]">EarlySafe</span>
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm"
          >
            EarlySafe Command Centre ensures that early stage risk is managed consistently and efficiently transforming detection into disciplined, accountable resolution across your entire institution.
          </motion.p>
        </div>

        {/* 3 Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.5, delay: idx * 0.15 }}
               className="bg-white border border-[#E0EFFF] rounded-xl p-8 shadow-sm hover:shadow-md hover:border-[#01AEE4]/50 transition-all flex flex-col items-center text-center group"
             >
                <div className="bg-[#E8F2FA] rounded-full p-3 mb-6 text-[#01AEE4] group-hover:scale-110 transition-transform">
                   <card.icon className="w-6 h-6" />
                </div>
                <h3 className="text-[24px]  mb-3 font-bold text-gray-900">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
             </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
