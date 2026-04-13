"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BlogCarousel } from "@/components/BlogCarousel";

const ease = [0.22, 1, 0.36, 1] as const;

const useCaseCards = [
  {
    title: "Residential Mortgage Loans",
    description:
      "Loans secured by residential property. Risk drivers extend beyond payment behaviour.",
    tracks: [
      "LTV movement",
      "Delinquency progression",
      "Property valuation shifts",
      "Localised market stress",
    ],
    outcome: "Earlier identification of deterioration regimes before collateral stress.",
  },
  {
    title: "Commercial Real Estate (CRE)",
    description:
      "Loans secured by income-generating property. Risk concentration forms through occupancy decline.",
    tracks: [
      "Occupancy & rent roll",
      "DSCR shifts",
      "Cap rate movements",
      "Valuation stress signals",
    ],
    outcome: "Structured monitoring of income-based collateral before capital volatility.",
  },
  {
    title: "Auto Finance",
    description:
      "Loans secured by vehicles. Asset depreciation and behavioural shift intersect.",
    tracks: [
      "Payment irregularities",
      "Vehicle depreciation curves",
      "Credit event indicators",
      "Migration velocity",
    ],
    outcome: "Reduced flow-forward acceleration in high-volume secured portfolios.",
  },
  {
    title: "Equipment Financing",
    description:
      "Loans secured by machinery. Operational utilisation influences credit stability.",
    tracks: ["Maintenance indicators", "Resale value trends", "Business exposure signals"],
    outcome: "Improved early stress detection in asset-backed business lending.",
  },
  {
    title: "Inventory & Working Capital",
    description: "Collateral value fluctuates with turnover and seasonality.",
    tracks: ["Inventory ageing", "Seasonal demand patterns", "Receivable concentration"],
    outcome: "Better anticipation of liquidity-driven migration risk.",
  },
  {
    title: "Project & Construction Finance",
    description:
      "Exposure secured by project assets. Completion risk often precedes payment disruption.",
    tracks: [
      "Milestone deviation signals",
      "Cost overrun indicators",
      "Cash flow shortfalls",
    ],
    outcome: "Forward visibility into execution risk before structural impairment.",
  },
] as const;

const listViewport = {
  once: true,
  margin: "-8% 0px",
  amount: 0.15,
} as const;

const tracksContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const tracksItem = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.455, ease },
  },
};

function TracksList({
  items,
  reduce,
}: {
  items: readonly string[];
  reduce: boolean;
}) {
  if (reduce) {
    return (
      <ul className="mt-3 space-y-2 text-sm text-[#101828]">
        {items.map((t) => (
          <li key={t} className="flex gap-2 pl-0.5">
            <span className="text-[#1D68D5]" aria-hidden>
              •
            </span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <motion.ul
      className="mt-3 space-y-2 text-sm text-[#101828]"
      variants={tracksContainer}
      initial="hidden"
      whileInView="visible"
      viewport={listViewport}
    >
      {items.map((t) => (
        <motion.li key={t} variants={tracksItem} className="flex gap-2 pl-0.5">
          <span className="text-[#1D68D5]" aria-hidden>
            •
          </span>
          <span>{t}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

export function UseCasesPageContent() {
  const reduceMotion = useReducedMotion();
  const reduce = Boolean(reduceMotion);

  return (
    <main className="bg-white text-[#101828]">
      <section
        className=" px-4 pb-16 pt-14 sm:px-6 lg:px-8"
        aria-labelledby="use-cases-hero-heading"
      >
        <div className="mx-auto max-w-6xl text-left">
          
          <h1
            id="use-cases-hero-heading"
            className="text-[52px] mt-4 font-semibold "
          >
            Secured <span className="text-[#16B2C3]">Lending Portfolios</span>
          </h1>
          <p className="mt-2 max-w-4xl text-lg leading-relaxed text-[#667085] sm:text-xl">
            EarlySafe supports structured risk control across asset-backed lending portfolios where
            collateral value, cash-flow stability, and migration discipline determine capital
            resilience.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8" aria-label="Secured lending use cases">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {useCaseCards.map((card) => (
              <article
                key={card.title}
                className="flex flex-col z-10 p-2   overflow-hidden rounded-2xl border border-[#E4E7EC] relative"
                >
                <div className="flex flex-1 flex-col  relative p-6">
                  <h2 className="text-[20px] font-semibold text-[#16B2C3]">{card.title}</h2>
                  <p className="mt-3 text-[14px]leading-relaxed text-[#101828]">{card.description}</p>
                  <p className="mt-5 text-sm font-semibold text-[#637083]">EarlySafe Tracks:</p>
                  <TracksList items={card.tracks} reduce={reduce} />
                </div>
                <div className=" border-[#C5EEF3]/80 bg-[#D6EDF2] px-6 py-4 m-4 rounded-lg">
                  <p className="text-sm font-medium flex flex-col leading-relaxed text-[#101828]">
                    <span className="font-semibold text-[#637083] text-[14px] uppercase">Outcome</span>
                    <span className="text-brand-ink text-[12px] tracking-wider font-medium">{card.outcome}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="briefing"
        className="border-y border-[#E4E7EC] bg-white px-4 py-20 sm:px-6 lg:px-8"
        aria-labelledby="use-cases-cta-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[16px] uppercase text-[#0B64F4]">
            Institutionalize Control
          </p>
          <h2
            id="use-cases-cta-heading"
            className="es-heading-hero mt-4 font-bold tracking-tight text-[#101828]"
          >
            Capital resilience requires structural discipline.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#101828] sm:text-lg">
            Institutions that manage risk formation early preserve stability and unlock measured growth.
            EarlySafe. Continuous Portfolio Risk Control.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="mailto:info@earlysafe.com?subject=Executive%20briefing%20request"
              className="inline-flex min-w-[220px] items-center justify-center rounded-lg bg-[#1D68D5] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] hover:bg-[#1557b8] active:scale-[0.98]"
            >
              Request Executive Brief
            </Link>
           
          </div>
        </div>
      </section>

      <BlogCarousel align="center" />
    </main>
  );
}
