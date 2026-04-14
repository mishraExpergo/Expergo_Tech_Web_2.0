"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BlogCarousel } from "@/components/BlogCarousel";
import { BookDemoButton } from "@/components/book-demo/BookDemoProvider";
import { ComplianceHubAssemble } from "@/components/capabilities/ComplianceHubAssemble";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as const;

const zigzagRows = [
  {
    title: "Lighthouse",
    reversed: false,
     route:"/capabilities/lighthouse",
    image: "/tr-removebg-preview (1).png",
    items: [
      {
        heading: "Early Stress Detection",
        body: "Surface early warning signals across behavioural shifts, bureau movement, and emerging portfolio stress.",
       
      },
      {
        heading: "Portfolio Concentration Impact",
        body: "Track vintage, segment, and geographic concentration to understand capital at risk build up",
        
      },
    ],
  },
  {
    title: "Regulus",
    reversed: true,
    route: "/capabilities/regulas",
    graphic: "compliance-hub" as const,
    items: [
      {
        heading: "Governance & Regulatory Alignment",
        body: "Ensure structured, traceable, and defensible compliance aligned with regulatory expectations.",
      },
      {
        heading: "Early Warning Signal Governance",
        body: "Map signals to actions with clear ownership, timelines, and audit-ready documentation.",
      },
    ],
  },
  {
    title: "Command Center",
    reversed: false,
      route:"/capabilities/command-center",
      image: "/1 1.png",
    items: [
      {
        heading: "Operational Risk Control",
        body: "Translate insights into action through structured prioritisation, escalation, and execution workflows.",
      },
      {
        heading: "Resolution & Escalation Control",
        body: "Drive disciplined follow-through with SLA tracking, ownership clarity, and controlled case closure.",
      },
    ],
  },
  {
    title: "Bureau 360°",
    reversed: true,
    route:"/capabilities/bureau-360",
    image: "/Frame 3033 (1).svg",
    items: [
      {
        heading: "External Risk Signals",
        body: "Identify anomalies, exposure shifts, and emerging external signals across borrower profiles.",
      },
      {
        heading: "Exposure & Behaviour Tracking",
        body: "Monitor credit exposure, leverage patterns, enquiry activity, and cross-lender risk across segments.",
      },
    ],
  },
] as const;

function CapabilityPanel({
  title,
  items,
  reduce,
  index,
  route,
  image,
  graphic,
  reversed,
}: {
  title: string;
  items: readonly { heading: string; body: string }[];
  reduce: boolean;
  index: number;
  route: string;
  image?: string;
  graphic?: "compliance-hub";
  reversed: boolean;
}) {
  return (
    <motion.div
      className={[
        "flex w-full flex-col gap-5 rounded-xl border border-[#000000]/21 bg-[#F8FBFC] p-4 sm:gap-6 sm:p-5 md:items-center md:gap-8 lg:gap-10",
        reversed ? "flex-col-reverse md:flex-row-reverse" : "md:flex-row",
      ].join(" ")}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px", amount: 0.2 }}
      transition={{ duration: 0.5, ease, delay: index * 0.05 }}
    >
      <div className="flex min-w-0 flex-1 flex-col ">
        <div className="rounded-lg px-4 py-3 sm:px-5">
          {items.map((item, itemIndex) => (
            <div
              key={item.heading}
              className={`py-3 ${itemIndex !== items.length - 1 ? "" : ""}`}
            >
              <h3 className="text-[24px] font-semibold leading-snug text-[#1497A8]">
                {item.heading}
              </h3>
              <p className="mt-1.5 text-[16px] leading-[1.45] text-[#5D6B78] sm:text-[15.5px]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between bg-white rounded-lg px-4 py-3.5 sm:px-5">
          <span className="text-[28px] font-bold text-[#15B5C1]">
            {title}
          </span>
          <Link
            href={route}
            className="inline-flex items-center rounded-md bg-[#15B5C1] px-3 py-3 text-[11px] font-semibold text-white transition hover:bg-[#13adbc]"
          >
            Explore Product
          </Link>
        </div>
      </div>
      <div className="relative mx-auto flex shrink-0 justify-center self-center md:mx-0">
        {graphic === "compliance-hub" ? (
          <ComplianceHubAssemble />
        ) : image ? (
          <Image
            src={image}
            width={400}
            height={400}
            alt={`${title} illustration`}
            className="h-[400px] w-[400px] object-contain"
          />
        ) : null}
      </div>
    </motion.div>
  );
}

export function CapabilitiesPageContent() {
  const reduceMotion = useReducedMotion();
  const reduce = Boolean(reduceMotion);

  return (
    <main className="bg-white text-brand-ink">
      <section
        className=" px-4 pb-10 pt-12 sm:px-6 sm:pt-14 lg:px-8"
        aria-labelledby="capabilities-heading"
      >
        <div className="mx-auto max-w-6xl text-left">
          <motion.h1
            id="capabilities-heading"
            className="es-heading-hero mt-3 text-balance font-bold leading-tight tracking-tight text-brand-ink"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.605, ease, delay: 0.04 }}
          >
            Portfolio Risk <span className="text-[#14BACB]">Capabilities</span>
          </motion.h1>
          <motion.p
            className="mt-4 max-w-3xl text-pretty text-sm leading-[1.55] text-brand-muted sm:text-[15px]"
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.605, ease, delay: 0.12 }}
          >
            EarlySafe provides an integrated framework for detecting, modelling,
            and controlling portfolio risk across regulated lending
            environments. Each capability operates within a unified risk
            architecture — not as isolated modules.
          </motion.p>
        </div>
      </section>

      <section
        className="px-4 py-6 sm:px-6 lg:px-8"
        aria-label="Product capabilities"
      >
        <div className="mx-auto max-w-6xl">
          {zigzagRows.map((row, i) => (
            <div key={row.title} className="mb-4 last:mb-0">
              <CapabilityPanel
                title={row.title}
                items={row.items}
                reduce={reduce}
                index={i}
                route={row.route}
                image={"image" in row ? row.image : undefined}
                graphic={"graphic" in row ? row.graphic : undefined}
                reversed={row.reversed}
              />
            </div>
          ))}
        </div>
      </section>

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
            className="text-[36px] mt-4 font-semibold text-[#1F1F1F]"
          >
            Capital resilience requires structural discipline.
          </h2>
          <p className="mx-auto text-[16px] mt-5 max-w-2xl tracking-wider text-base font-poppins  leading-relaxed text-[#1F1F1F] ">
            Institutions that manage risk formation early preserve stability and unlock measured growth. EarlySafe.
            Continuous Portfolio Risk Control.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BookDemoButton className="inline-flex min-w-[220px] items-center justify-center rounded-lg bg-[#1D68D5] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:bg-[#5F98F3] active:scale-[0.98]">
              Book  Demo
            </BookDemoButton>
          </div>
        </div>
      </section>

      <BlogCarousel align="center" />
    </main>
  );
}
