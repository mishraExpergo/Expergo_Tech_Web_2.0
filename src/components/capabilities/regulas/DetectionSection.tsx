"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Target, Layers, FileCheck2 } from "lucide-react";

const detectionFeatures = [

  {
    icon: Layers,
    title: "Scattered Evidence",
    desc: "Evidence is scattered across emails, spreadsheets, and systems  ",
  },
  {
    icon: FileCheck2,
    title: "Inconsistent Ownership",
    desc: "Ownership and review timelines are inconsistently recorded  ",
  },

  {
    icon: FileCheck2,
    title: "Unstructured Approval",
    desc: "Risk acceptance and approvals lack structured documentation ",
  },
  {
    icon: FileCheck2,
    title: "Manual Compilation",
    desc: "Inspection preparation requires manual compilation of records  ",
  },
];

export default function DetectionSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center  border-gray-200 py-16">
        <motion.h4
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[16px] mb-2 tracking-wide text-[#1677FF]"
        >
          PROBLEM
        </motion.h4>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[36px] mb-4 font-bold text-gray-900"
        >
          Detection isn&apos;t{" "}
          <span className="text-[#01AEE4]">compliance</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 max-w-2xl mx-auto text-lg mb-4"
        >
          Most institutions detect Early Warning Signals but struggle to
          maintain structured compliance records.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-[16px] font-medium uppercase tracking-widest mb-12"
        >
          Common Failures
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
          {detectionFeatures.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
              className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow hover:border-cyan-200"
            >
              <div className="w-12 h-12 bg-cyan-50 rounded-full flex items-center justify-center mb-4">
                <feat.icon
                  className="w-6 h-6 text-cyan-500"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-2">
                {feat.title}
              </h3>
              <p className="text-gray-500 text-xs">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
