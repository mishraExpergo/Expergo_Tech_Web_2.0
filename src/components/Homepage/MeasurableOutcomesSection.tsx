"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const items = [
  {
    num: "01",
    title: "Earlier identification of emerging stress",
    description: "Surface deterioration before it reflects in DPD, enabling intervention while outcomes remain controllable.",
  },
  {
    num: "02",
    title: "Lower flow-forward across delinquency buckets",
    description: "Arrest migration early by acting on direction and velocity of risk—not just current position.",
  },
  {
    num: "03",
    title: "Higher productivity of collections capacity",
    description: "Allocate finite resources to accounts where intervention has the highest marginal impact on recovery.",
  },
  {
    num: "04",
    title: "Improved stability of portfolio performance",
    description: "Align actions and provisioning to forward risk trajectory, reducing volatility in credit costs.",
  },
  {
    num: "05",
    title: "Stronger control and auditability of risk actions",
    description: "Ensure all risk signals, decisions, and interventions are traceable, attributable, and defensible",
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
          Trajectory-led portfolio  {" "}
          <span className="text-[#16B2C3]">outcomes.</span>
        </motion.h2>

        {/* <motion.p
          className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-brand-muted md:text-lg"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.1, ease }}
        >
          EarlySafe is designed to influence portfolio trajectory — not merely observe delinquency. CRO language
        </motion.p> */}

        <ul className="mx-auto mt-12 max-w-5xl space-y-4 md:mt-14 md:space-y-5">
          {items.map((item, i) => (
            <motion.li
              key={item.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-24px" }}
              transition={{ duration: 0.4, delay: i * 0.06, ease }}
            >
              <article className="flex gap-5  border-b-2 border-[#E4E7EC] bg-white p-5  md:gap-8 md:p-6 md:pl-8 lg:gap-10">
                <span
                  className="w-14 shrink-0 select-none text-left text-4xl font-bold tabular-nums text-[#16B2C3]/20 md:w-16 md:text-5xl"
                  aria-hidden
                >
                  {item.num}
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <h3 className="text-[20px] font-semibold text-brand-ink md:text-[20px]">{item.title}</h3>
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
