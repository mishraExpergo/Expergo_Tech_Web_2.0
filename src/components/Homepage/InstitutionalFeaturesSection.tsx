"use client";

import { motion } from "framer-motion";
import { Cloud, Eye, FilePenLine, Lock, Plug, Scale } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  { icon: Cloud, label: "Cloud-native" },
  { icon: Plug, label: "API-first" },
  { icon: Scale, label: "Scalable architecture" },
  { icon: Eye, label: "Model governance ready" },
  { icon: FilePenLine, label: "Explainability framework" },
  { icon: Lock, label: "Audit traceability" },
] as const;

export function InstitutionalFeaturesSection() {
  return (
    <section
      className="font-heading bg-white px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24"
      aria-labelledby="institutional-features-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2
          id="institutional-features-heading"
          className="es-heading-hero text-center font-bold text-[#111827]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease }}
        >
          Built for <span className="text-[#14B8A6]">Institutional</span> Environments
        </motion.h2>

        <motion.p
          className="mx-auto mt-4 max-w-3xl text-center text-base text-[#6B7280] md:text-lg"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.06, ease }}
        >
          Designed for regulated NBFCs, HFCs, SFBs and structured lending environments.
        </motion.p>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: i * 0.05, ease }}
              >
                <article className="flex h-full min-h-[9.5rem] flex-col items-center justify-center rounded-2xl bg-[#F3F4F6] px-6 py-10 text-center md:min-h-[10.5rem] md:px-8 md:py-12">
                  <Icon className="h-9 w-9 shrink-0 text-[#2563EB]" strokeWidth={1.5} aria-hidden />
                  <h3 className="mt-5 text-base font-bold text-[#111827] md:text-lg">{item.label}</h3>
                </article>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
