"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function DashboardPreview() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.32"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [64, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.985, 1]);

  return (
    <motion.section
      ref={ref}
      style={
        reduceMotion
          ? undefined
          : {
              y,
              scale,
            }
      }
      className="relative z-10 -mt-16 overflow-hidden rounded-t-[1.75rem] bg-[#F9FAFB] py-16 shadow-[0_-20px_50px_-18px_rgba(15,23,42,0.14)] ring-1 ring-black/[0.04] lg:-mt-24 lg:rounded-t-[2rem] lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-[36px] font-bold text-gray-900"
          >
            Dashboard <span className="text-[#01AEE4]">Lighthouse</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full"
        >
          <img
            src="/4.svg"
            alt="Dashboard Preview"
            width={1000}
            height={1000}
            className="h-auto w-full"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
