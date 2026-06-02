"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BookDemoButton } from "@/components/book-demo/BookDemoProvider";

const FIGMA = {
  kicker: "#0B64F4",
  ink: "#101828",
  body: "#667085",
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

export default function AegisThinkSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="bg-white px-6 pt-16 pb-8 sm:px-10 sm:pt-20 sm:pb-8 lg:px-14 lg:pt-24 lg:pb-8"
      aria-labelledby="aegis-think-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          className="font-sans text-regular uppercase tracking-[0.16em]"
          style={{ color: FIGMA.kicker }}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease }}
        >
          How to Think About Aegis
        </motion.p>

        <motion.h2
          id="aegis-think-heading"
          className="mt-4 font-heading text-[1.75rem] font-semibold leading-[1.15] tracking-tight sm:mt-5 sm:text-[2rem] md:text-[2.25rem] lg:text-[36px] lg:leading-[1.12]"
          style={{ color: FIGMA.ink }}
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.06, ease }}
        >
          Understanding intelligence that strengthens every decision
        </motion.h2>

        <motion.p
          className="mx-auto mt-5 max-w-2xl text-pretty font-sans text-base font-normal leading-[1.6] sm:mt-6 sm:text-[16px]"
          style={{ color: FIGMA.body }}
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.1, ease }}
        >
          Aegis organises internal, external and human signals into a coherent view of borrower
          behaviour enabling teams to make decisions with greater clarity, consistency and
          confidence.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-8 pt-8"
        >
          <BookDemoButton mode="brief"  className="bg-[#1677FF] hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-md transition-colors shadow-sm">
          Request Executive Brief
          </BookDemoButton>
        </motion.div>
      </div>
    </section>
  );
}
