"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BlogCarousel } from "@/components/BlogCarousel";
import { BookDemoButton } from "@/components/book-demo/BookDemoProvider";

const ease = [0.22, 1, 0.36, 1] as const;

const stakeholderCards = [
  {
    title: "For CRO",
    body: "Capital stability, early intervention.",
  },
  {
    title: "For Head of Collections",
    body: "Capacity optimization, better prioritisation.",
  },
  {
    title: "For CEO",
    body: "Predictable growth, risk-adjusted expansion.",
  },
  {
    title: "For Board / Audit",
    body: "Governance transparency and defensibility.",
  },
] as const;

const outcomeDetailCards = [
  {
    title: "Early Identification of Deterioration",
    body: "Stress rarely appears first in DPD. By detecting behavioural deviations and migration momentum early, institutions gain time to intervene before slippage compounds.",
    bullets: [
      "Reduced surprise deterioration",
      "Improved vintage stability",
      "Greater forward visibility",
    ],
  },
  {
    title: "Reduced Flow-Forward Volatility",
    body: "Migration between buckets is rarely random. By modelling risk acceleration and concentration patterns, institutions stabilize forward movement across cohorts.",
    bullets: [
      "Lower roll-rate volatility",
      "Reduced Stage migration",
      "More predictable portfolio behaviour",
    ],
  },
  {
    title: "Improved Allocation of Capacity",
    body: "Collections bandwidth is finite. By prioritising exposure based on trajectory and concentration risk, institutions allocate effort where capital impact is highest.",
    bullets: [
      "Higher intervention efficiency",
      "Lower avoidable slippage",
      "Improved recovery focus",
    ],
  },
] as const;

const listViewport = {
  once: true,
  margin: "-10% 0px",
  amount: 0.22,
} as const;

const outcomeBulletContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.145, delayChildren: 0.085 },
  },
};

const outcomeBulletItem = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.455, ease },
  },
};

function OutcomeBulletList({
  bullets,
  reduce,
}: {
  bullets: readonly string[];
  reduce: boolean;
}) {
  if (reduce) {
    return (
      <ul className="mt-3  text-sm leading-relaxed text-[#101828]">
        {bullets.map((b) => (
          <li key={b} className="flex ">
            <span className="text-[#1D68D5]" aria-hidden>
              •
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <motion.ul
      className="mt-3  text-sm leading-relaxed text-[#101828]"
      variants={outcomeBulletContainer}
      initial="hidden"
      whileInView="visible"
      viewport={listViewport}
    >
      {bullets.map((b) => (
        <motion.li key={b} variants={outcomeBulletItem} className="flex gap-2">
          <span className="text-[#080914]" aria-hidden>
            •
          </span>
          <span>{b}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

export function OutcomesPageContent() {
  const reduceMotion = useReducedMotion();
  const reduce = Boolean(reduceMotion);

  return (
    <main className="bg-white text-[#101828]">
      {/* Hero */}
      <section
        className=" px-4 pb-16 pt-14 sm:px-6 lg:px-8"
        aria-labelledby="outcomes-hero-heading"
      >
        <div className="mx-auto max-w-6xl text-left">
          <h1
            id="outcomes-hero-heading"
            className="text-[52px] font-semibold "
          >
            Measurable Portfolio{" "}
            <span className="text-[#15B5C1]">Outcomes</span>
          </h1>
          <p className="mt-6 max-w-4xl text-[20px] leading-relaxed text-[#101828] sm:text-xl">
            EarlySafe is designed to influence portfolio trajectory not simply observe delinquency. Structured
            controls produce measurable institutional impact.
          </p>
        </div>
      </section>

      {/* Stakeholder row */}
      <section className="px-4 py-14 sm:px-6 lg:px-8" aria-label="Stakeholder outcomes">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stakeholderCards.map((card) => (
              <article
                key={card.title}
                className="rounded-xl border flex flex-col justify-center items-center text-center  border-[#16B2C3]/35 bg-white px-5 py-6 shadow-sm"
              >
                <h2 className="text-[24px] font-semibold text-[#16B2C3]">{card.title}</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-[#1F1F1F]">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Detail outcome cards */}
      <section className="border-t  border-[#E4E7EC] px-4 py-16 sm:px-6 lg:px-8" aria-label="Detailed outcomes">
        <div className="mx-auto max-w-6xl">
          <div className="flex  gap-4">
            {outcomeDetailCards.map((card) => (
              <article
                key={card.title}
                className="flex flex-col overflow-hidden rounded-xl border border-[#000000]/21 bg-[#F8FBFC] shadow-sm"
              >
                <div className="flex flex-1 flex-col p-6 pb-5 ">
                  <h2 className="text-[24px] font-poppins font-medium leading-snug text-[#16B2C3]">
                    {card.title}
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-[#101828]">{card.body}</p>
                </div>
                <div className="border-t  border-[#C5EEF3]/80 bg-[#D6EDF2] m-4 rounded-[12px] px-6 py-5">
                  <p className="text-[14px] font-medium uppercase tracking-[0.18em] text-[#637083]">
                    OUTCOME
                  </p>
                  <OutcomeBulletList bullets={card.bullets} reduce={reduce} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — centered */}
      <section
        id="briefing"
        className="border-y border-[#E4E7EC] bg-white px-4 py-20 sm:px-6 lg:px-8"
        aria-labelledby="outcomes-cta-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[16px] uppercase text-[#0B64F4]">
            Institutionalize Control
          </p>
          <h2
            id="outcomes-cta-heading"
            className="text-[36px]  font-semibold  text-[#1F1F1F]"
          >
            Capital resilience requires structural discipline.
          </h2>
          <p className="mx-auto text-[16px] mt-5 max-w-2xl tracking-wider text-base font-poppins  leading-relaxed text-[#1F1F1F] ">
            Institutions that manage risk formation early preserve stability and unlock measured growth. EarlySafe.
            Continuous Portfolio Risk Control.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BookDemoButton className="inline-flex min-w-[220px] items-center justify-center rounded-lg bg-[#1D68D5] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:bg-[#5F98F3] active:scale-[0.98]">
              Book {" "} Demo
            </BookDemoButton>
           
          </div>
        </div>
      </section>

      <BlogCarousel  align="center"/>
    </main>
  );
}
