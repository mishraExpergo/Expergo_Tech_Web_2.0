"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const questions = [
  {
    id: 1,
    title: "Was the signal identified?",
    content: "Our real-time event logs give inspectors unquestionable proof of procedure, accessible instantly upon request without manual compilation.",
  },
  {
    id: 2,
    title: "Was the correct action taken?",
    content: "Automated checks against standard operating procedures track staff actions directly to required mandates to ensure absolute adherence.",
  },
  {
    id: 3,
    title: "Was ownership defined?",
    content: "All clinical and governance actions are tracked passively during workflow execution, ensuring documentation is consistently up-to-date.",
  },
  {
    id: 4,
    title: "Were timelines followed? ",
    content: "Generate tamper-proof, time-stamped reporting of all risk events and responses mapped specifically to individual portfolios with a single click.",
  },
  {
    id: 5,
    title: "Is evidence complete and verifiable?",
    content: "Every decision, from identification to remediation, is tied to specific user identities, timestamps, and the rationale provided at the moment of action.",
  },
];

export default function InspectionQuestionsSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleOpen = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[36px] mb-4 font-bold text-gray-900"
          >
            Inspection <span className="text-[#01AEE4]">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            During regulatory inspections, institutions must prove — click each question to explore, 
            then toggle the view:
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
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold transition-colors ${openId === q.id ? 'bg-[#1677FF] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-cyan-50 group-hover:text-[#01AEE4]'}`}>
                    {q.id}.
                  </div>
                  <span className={`text-xl font-medium ${openId === q.id ? 'text-[#01AEE4]' : 'text-gray-900 group-hover:text-[#01AEE4]'}`}>
                    {q.title}
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openId === q.id ? 'rotate-180 text-[#01AEE4]' : ''}`} />
              </button>
              <AnimatePresence>
                {openId === q.id && (
                  <motion.div
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
          REGULUS solves this by creating a centralised statutory register that 
          captures compliance at the moment risk appears.
          </p>
        </div>
      </div>
    </section>
  );
}
