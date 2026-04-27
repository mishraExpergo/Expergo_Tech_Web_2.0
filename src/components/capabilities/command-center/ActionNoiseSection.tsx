"use client";

import { motion } from "framer-motion";

const slideEase = [0.22, 1, 0.36, 1] as const;

const inView = { once: true, margin: "-80px 0px -40px 0px", amount: 0.25 } as const;

export default function ActionNoiseSection() {
  const points = [
    "Signals are detected but not acted upon consistently",
    "Ownership of cases remains unclear",
    "Actions are delayed due to manual coordination",
    "SLAs are defined but not enforced",
    "Escalations occur late or inconsistently",
    "Early stress silently progresses into delinquency",
  ];

  return (
    <section className="md:py-24 py-[-30px] bg-white relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ duration: 0.5, ease: slideEase }}
            className="mb-4"
          >
            <span className="es-small-heading px-3 py-1 tracking-widest text-[#1677FF]">
              PROBLEM
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.55, delay: 0.1, ease: slideEase }}
            className="text-[36px] mb-6 font-bold text-gray-900"
          >
            Warning Without <span className="text-[#1677FF]">Action</span>
            <br /> Is Just Noise
          </motion.h2>
        </div>

        <div className="mx-auto flex max-w-2xl flex-col gap-3 sm:gap-3.5">
          {points.map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -44 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inView}
              transition={{ duration: 0.5, ease: slideEase, delay: idx * 0.07 }}
              className="flex items-center gap-5 rounded-xl border border-slate-200 bg-[#F8FAFC] px-5 py-4 shadow-md shadow-slate-200/60 transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-300/50 sm:gap-6 sm:px-6 sm:py-[1.125rem]"
            >
              <span
                className="shrink-0 select-none text-5xl font-semibold leading-none tracking-tight text-transparent tabular-nums sm:text-6xl"
                style={{ WebkitTextStroke: "1.5px #2DD4BF" }}
                aria-hidden
              >
                {idx + 1}
              </span>
              <p className="min-w-0 flex-1 text-sm font-normal leading-snug text-[#1E293B] sm:text-[15px] sm:leading-relaxed">
                {point}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
