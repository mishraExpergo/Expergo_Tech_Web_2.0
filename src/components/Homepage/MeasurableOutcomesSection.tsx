"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const items = [
  {
    num: "01",
    title: "Earlier stress visibility",
    description: "Identify deterioration regimes before they surface in DPD reporting.",
  },
  {
    num: "02",
    title: "Reduced flow-forward %",
    description: "Model and contain forward migration before momentum accelerates.",
  },
  {
    num: "03",
    title: "Improved collections allocation efficiency",
    description: "Direct finite collections capacity where recovery probability is highest.",
  },
  {
    num: "04",
    title: "Better capital stability",
    description: "Proactive provisioning aligned with trajectory intelligence reduces capital volatility.",
  },
  {
    num: "05",
    title: "Regulatory defensibility",
    description: "Auditable, traceable risk classification strengthens regulatory posture.",
  },
] as const;

export function MeasurableOutcomesSection() {
  return (
    <section
      className="font-heading bg-white px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24"
      aria-labelledby="measurable-outcomes-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.p
          className="es-small-heading text-center text-[#1D68D5] tracking-[0.2em]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease }}
        >
          Outcomes
        </motion.p>

        <motion.h2
          id="measurable-outcomes-heading"
          className="es-heading-hero mt-4 text-center font-bold text-brand-ink"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.05, ease }}
        >
          Measurable institutional{" "}
          <span className="text-[#16B2C3]">outcomes.</span>
        </motion.h2>

        <motion.p
          className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-brand-muted md:text-lg"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.1, ease }}
        >
          EarlySafe is designed to influence portfolio trajectory — not merely observe delinquency. CRO language. No
          AI hype.
        </motion.p>

        <ul className="mx-auto mt-12 max-w-5xl space-y-4 md:mt-14 md:space-y-5">
          {items.map((item, i) => (
            <motion.li
              key={item.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-24px" }}
              transition={{ duration: 0.4, delay: i * 0.06, ease }}
            >
              <article className="flex gap-5 rounded-xl border border-[#E4E7EC] bg-white p-5 shadow-sm md:gap-8 md:p-6 md:pl-8 lg:gap-10">
                <span
                  className="w-14 shrink-0 select-none text-left text-4xl font-bold tabular-nums text-[#16B2C3]/20 md:w-16 md:text-5xl"
                  aria-hidden
                >
                  {item.num}
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <h3 className="text-base font-bold text-brand-ink md:text-lg">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-brand-muted md:text-[15px] md:leading-[1.55]">
                    {item.description}
                  </p>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
