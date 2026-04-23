"use client";

import { motion } from "framer-motion";
import { Activity, Eye, Users, BarChart3, Scale, Zap, ShieldCheck } from "lucide-react";

const capabilities = [
  {
    icon: Activity,
    title: "Bureau Behaviour Monitoring",
    text: "Tracks key bureau indicators including score migration, enquiry velocity, trade line changes, off- us delinquency, and exposure patterns.",
    span: "col-span-12 lg:col-span-7",
    bg: "bg-[#EBF4FA]",
  },
  {
    icon: Eye,
    title: "Cross-Lender Exposure Visibility",
    text: "Provides a unified view of borrower exposure across the lending ecosystem, enabling identification of concentration and leverage trends.",
    span: "col-span-12 lg:col-span-5",
    bg: "bg-[#F0F2F5]",
  },
  {
    icon: Users,
    title: "Borrower Behaviour Segmentation",
    text: "Segments borrowers based on bureau-driven behaviour patterns, supporting targeted monitoring and differentiated risk strategies.",
    span: "col-span-12 lg:col-span-4",
    bg: "bg-[#EBF4FA]",
  },
  {
    icon: BarChart3,
    title: "Portfolio-Level Bureau Intelligence",
    text: "Aggregates borrower-level bureau signals into portfolio-level intelligence, enabling structured monitoring and trend analysis.",
    span: "col-span-12 lg:col-span-4",
    bg: "bg-[#F0F2F5]",
  },
  {
    icon: Scale,
    title: "Exposure & Leverage Analysis",
    text: "Monitors external leverage build-up and exposure concentration to identify emerging risks before they impact internal portfolios.",
    span: "col-span-12 lg:col-span-4",
    bg: "bg-[#F0F2F5]",
  },
  {
    icon: Zap,
    title: "Structured Signal Interpretation",
    text: "Transforms raw bureau data points into structured, interpretable signals that drive informed portfolio decisions.",
    span: "col-span-12 lg:col-span-4",
    bg: "bg-[#F0F2F5]",
  },
  {
    icon: ShieldCheck,
    title: "Leadership Monitoring & Governance",
    text: "Delivers governance-ready views of portfolio bureau dynamics for leadership review, board reporting, and risk oversight.",
    span: "col-span-12 lg:col-span-8",
    bg: "bg-[#EBF4FA]",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function CoreCapabilitiesGrid() {
  return (
    <section className="py-24 bg-white overflow-hidden font-sans">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-[#1E293B]"
          >
            Core <span className="text-[#01AEE4]">Capabilities</span>
          </motion.h2>
        </div>

        {/* Grid Layout */}
        <motion.div 
          className="grid grid-cols-12 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {capabilities.map((cap, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`${cap.span} ${cap.bg} rounded-3xl p-8 lg:p-10 flex flex-col sm:flex-row gap-6 shadow-sm hover:shadow-sm cursor-pointer hover:shadow-[#1A6EF5] transition-shadow`}
            >
              {/* Icon Container */}
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-gray-100/50">
                <cap.icon className="w-6 h-6 text-[#01AEE4]" />
              </div>
              
              {/* Text Content */}
              <div className="flex-1 mt-1">
                <h3 className="font-bold text-[#1E293B] text-[17px] mb-2 leading-tight">
                  {cap.title}
                </h3>
                <p className="text-[#64748B] text-[14px] leading-relaxed font-medium">
                  {cap.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
