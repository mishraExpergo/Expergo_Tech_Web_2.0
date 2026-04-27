"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const questions = [
  {
    id: 1,
    title: "Structured Evidence",
    content: "A compliance control system that converts every risk signal into a time-bound, accountable record.It ensures every action is tracked and backed with verifiable evidence.",
  },
  {
    id: 2,
    title: "Defined Accountability",
    content: "Every signal is assigned to a clear owner with responsibility and timelines.No ambiguity — ownership is visible and enforced.",
  },
  {
    id: 3,
    title: "Structured Approvals",
    content: "Risk acceptance and approvals are recorded with full documentation and audit trail. Every decision is traceable, verifiable, and defensible.",
  },
  {
    id: 4,
    title: "Automated Compliance Packs ",
    content: "Board Packs and Inspection Packs are generated instantly from the system.No manual compilation — compliance is always ready.",
  },
  {
    id: 5,
    title: "What outcomes does REGULUS deliver?",
    content: "It ensures timely action, clear visibility of exposure, and structured compliance. Compliance is not explained later — it is proven in real time.",
  },
];

export default function InspectionQuestionsSection() {
  const [openIds, setOpenIds] = useState<Set<number>>(
    () => new Set(questions.map((q) => q.id))
  );

  const toggleOpen = (id: number) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="md:py-24 py-[-40px] bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-site-sub mb-4 font-bold text-gray-900"
          >
           Turning Detection into <span className="text-[#01AEE4]">Compliance</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            REGULUS converts fragmented signals into structured, accountable, and inspection-ready compliance records.
          </motion.p>
        </div>

        <div className="space-y-4">
          {questions.map((q, idx) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="border-b border-gray-200 pb-4"
            >
              <button
                onClick={() => toggleOpen(q.id)}
                className="w-full flex items-center justify-between text-left py-4 hover:text-[#01AEE4] transition-colors group"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold transition-colors ${openIds.has(q.id) ? 'bg-[#1677FF] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-cyan-50 group-hover:text-[#01AEE4]'}`}>
                    {q.id}.
                  </div>
                  <span className={`text-xl font-medium ${openIds.has(q.id) ? 'text-[#01AEE4]' : 'text-gray-900 group-hover:text-[#01AEE4]'}`}>
                    {q.title}
                  </span>
                </div>
                {/* <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openIds.has(q.id) ? 'rotate-180 text-[#01AEE4]' : ''}`} /> */}
              </button>
              <AnimatePresence>
                {openIds.has(q.id) && (
                  <motion.div
                    key={q.id}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pl-16 pr-4 pb-4 text-gray-600 leading-relaxed">
                      {q.content}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
          REGULUS ensures compliance is not recreated later — it is captured in real time.
          </p>
        </div>
      </div>
    </section>
  );
}
