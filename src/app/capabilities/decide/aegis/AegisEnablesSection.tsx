"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Figma linear gradient: #15B5C1 → #666666 */
const FIGMA = {
  teal: "#15B5C1",
  gray: "#666666",
  gradient: "linear-gradient(180deg, #15B5C1 0%, #666666 100%)",
  ink: "#101828",
  labelBlue: "#1D70F2",
  body: "#667085",
  cardBorder: "#E4E7EC",
} as const;

const gradientTextStyle = {
  backgroundImage: FIGMA.gradient,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

const cards = [
  {
    num: "01",
    title: "Unify Signals",
    description:
      "Bring repayment, bureau, collections, HUMINT and structural signals into one unified view.",
  },
  {
    num: "02",
    title: "Interpret Behaviour",
    description: "Understand how borrower behaviour evolves over time.",
  },
  {
    num: "03",
    title: "Identify Patterns",
    description: "Detect meaningful combinations of signals across accounts and segments.",
  },
  {
    num: "04",
    title: "Enable Better Decisions",
    description:
      "Give teams a shared understanding before prioritisation, prediction or action.",
  },
] as const;

const headerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const cardsContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease },
  },
};

/** Overlap borders by 1px so flush cards keep individual rounded corners (Figma). */
function cardOverlapClass(index: number) {
  if (index === 0) return "relative z-0 min-w-0 flex-1";
  return [
    "relative z-0 min-w-0 flex-1",
    "-mt-px",
    index % 2 === 1 ? "sm:-ml-px sm:mt-0" : "sm:mt-0",
    index >= 2 ? "sm:-mt-px" : "",
    "lg:-ml-px lg:mt-0",
  ].join(" ");
}

export default function AegisEnablesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-white px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24"
      aria-labelledby="aegis-enables-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[min(420px,55vh)] w-[min(640px,70vw)] translate-x-[12%] translate-y-[18%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(21,181,193,0.1)_0%,transparent_68%)]"
      />

      <div className="relative mx-auto max-w-[1475px]">
        <motion.header
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={headerVariants}
        >
          <p
            className="font-sans text-sm font-semibold uppercase tracking-[0.16em]"
            style={{ color: FIGMA.labelBlue }}
          >
            WHAT AEGIS ENABLES
          </p>
          <h2
            id="aegis-enables-heading"
            className="mt-4 font-heading text-[32px] font-bold leading-[1.15] tracking-tight sm:text-[36px] md:text-[44px]"
          >
            <span style={gradientTextStyle}>From Signals</span>
            <span style={{ color: FIGMA.ink }}> to Structured Understanding</span>
          </h2>
          <p
            className="mx-auto mt-5 max-w-2xl text-pretty font-sans text-base font-normal leading-[1.6] sm:text-lg"
            style={{ color: FIGMA.body }}
          >
            Aegis organises internal, external and human signals into a coherent view of borrower
            behaviour enabling teams to make decisions with greater clarity, consistency and
            confidence.
          </p>
        </motion.header>

        <motion.ul
          className="mt-12 flex list-none flex-col gap-0 p-0 sm:mt-14 sm:grid sm:grid-cols-2 lg:mt-16 lg:flex lg:flex-row"
          role="list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={reduceMotion ? undefined : cardsContainerVariants}
        >
          {cards.map((card, index) => (
            <motion.li
              key={card.num}
              role="listitem"
              variants={reduceMotion ? undefined : cardVariants}
              className={`${cardOverlapClass(index)} hover:z-20`}
            >
              <motion.article
                className="group flex h-full min-h-[200px] cursor-default flex-col rounded-2xl border bg-white px-6 py-8 transition-[border-color,box-shadow,background-color] duration-300 ease-out sm:min-h-[220px] sm:px-7 sm:py-9"
                style={{ borderColor: FIGMA.cardBorder }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        borderColor: FIGMA.teal,
                        backgroundColor: "#FFFFFF",
                        boxShadow:
                          "0 0 0 1px #15B5C1, 0 12px 32px rgba(21, 181, 193, 0.22)",
                      }
                }
                transition={{ duration: 0.28, ease }}
              >
                <span
                  className="select-none font-serif text-[48px] font-normal leading-none tracking-tight text-[#E5E7EB] transition-all duration-300 group-hover:bg-[linear-gradient(180deg,#15B5C1_0%,#666666_100%)] group-hover:bg-clip-text group-hover:text-transparent sm:text-[52px]"
                  aria-hidden
                >
                  {card.num}
                </span>
                <h3 className="mt-6 font-heading text-base font-bold leading-snug text-[#101828] transition-all duration-300 group-hover:bg-[linear-gradient(180deg,#15B5C1_0%,#666666_100%)] group-hover:bg-clip-text group-hover:text-transparent sm:mt-7 sm:text-lg">
                  {card.title}
                </h3>
                <p
                  className="mt-2.5 flex-1 font-sans text-sm font-normal leading-[1.6] sm:mt-3 sm:text-[15px]"
                  style={{ color: FIGMA.body }}
                >
                  {card.description}
                </p>
              </motion.article>
            </motion.li>
          ))}
        </motion.ul>

  
      </div>
    </section>
  );
}
 