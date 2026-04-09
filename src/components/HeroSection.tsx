"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="bg-white  md:py-17">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex  flex-col items-start text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-[52px] font-semibold text-[#101828]">
            Continuous Portfolio <span className="text-[#26b9c1]">Risk Control</span>
          </h1>
          <p className="mt-2 text-base w-2/3 leading-relaxed text-[#101828] sm:text-[20px]">
            Detect emerging stress, model trajectory, and guide disciplined intervention before
            deterioration accelerates.
          </p>
          <Link
            href="mailto:info@earlysafe.com?subject=Executive%20briefing%20request"
            className="mt-10 inline-flex items-center justify-center rounded-lg bg-[#15B5C1] px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Request Executive Briefing
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
