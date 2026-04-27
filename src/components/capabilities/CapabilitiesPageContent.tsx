"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BlogCarousel } from "@/components/BlogCarousel";
import { BookDemoButton } from "@/components/book-demo/BookDemoProvider";
import { ComplianceHubAssemble } from "@/components/capabilities/ComplianceHubAssemble";
import Image from "next/image";

import type { CapabilityZigzagPanelRow } from "@/lib/sitePage/merges";

const ease = [0.22, 1, 0.36, 1] as const;

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
  items: { heading: string; body: string }[];
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
        "flex w-full flex-col gap-5 overflow-hidden rounded-lg border border-[#000000]/15 bg-[#F8FBFC] p-4 sm:gap-6 sm:p-5 md:items-center md:gap-8 lg:gap-10",
        reversed ? "flex-col-reverse md:flex-row-reverse" : "md:flex-row",
      ].join(" ")}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px", amount: 0.2 }}
      transition={{ duration: 0.5, ease, delay: index * 0.05 }}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="px-1 py-1 sm:px-3 sm:py-3">
          {items.map((item, itemIndex) => (
            <div
              key={item.heading}
              className={`py-3 ${
                itemIndex !== items.length - 1
                  ? "border-b border-[#D9E7EA] sm:border-b-0"
                  : ""
              }`}
            >
              <h3 className="text-[20px] font-semibold leading-snug text-[#1497A8] sm:text-[22px] lg:text-[24px]">
                {item.heading}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-[#5D6B78] sm:text-[15.5px]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-3 rounded-lg bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <span className="text-[24px] font-bold leading-tight text-[#15B5C1] sm:text-[28px]">
            {title}
          </span>
          <Link
            href={route}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#15B5C1] px-4 py-3 text-[12px] font-semibold text-white transition hover:bg-[#13adbc] sm:w-auto"
          >
            Explore
          </Link>
        </div>
      </div>
      <div className="relative mx-auto flex w-full shrink-0 justify-center self-center md:mx-0 md:w-auto">
        {graphic === "compliance-hub" ? (
          <div className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-none">
            <ComplianceHubAssemble />
          </div>
        ) : image ? (
          <Image
            src={image}
            width={400}
            height={400}
            alt={`${title} illustration`}
            className="mx-auto h-auto w-full max-w-[260px] object-contain sm:max-w-[340px] md:h-[360px] md:w-[360px] md:max-w-none lg:h-[400px] lg:w-[400px]"
          />
        ) : null}
      </div>
    </motion.div>
  );
}

type CapabilitiesPageContentProps = {
  intro: { line1: string; accent: string; body: string };
  zigzagRows: CapabilityZigzagPanelRow[];
  cta: { kicker: string; title: string; body: string };
};

export function CapabilitiesPageContent({ intro, zigzagRows, cta }: CapabilitiesPageContentProps) {
  const reduceMotion = useReducedMotion();
  const reduce = Boolean(reduceMotion);

  return (
    <main className="bg-white text-brand-ink">
      <section
        className="px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-14 lg:px-8"
        aria-labelledby="capabilities-heading"
      >
        <div className="mx-auto max-w-6xl text-left">
          <motion.h1
            id="capabilities-heading"
            className="font-heading mt-3 text-balance text-[40px] font-bold leading-tight tracking-tight text-brand-ink sm:text-[52px] lg:text-site-sub"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.605, ease, delay: 0.04 }}
          >
            {intro.line1}
            <span className="text-[#14BACB]">{intro.accent}</span>
          </motion.h1>
          <motion.p
            className="mt-4 max-w-3xl text-pretty text-[15px] leading-[1.65] text-brand-muted sm:text-base"
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.605, ease, delay: 0.12 }}
          >
            {intro.body}
          </motion.p>
        </div>
      </section>

      <section
        className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8"
        aria-label="Product capabilities"
      >
        <div className="mx-auto max-w-6xl">
          {zigzagRows.map((row, i) => (
            <div key={row.title} className="mb-5 last:mb-0 sm:mb-6">
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
        className="border-y border-[#E4E7EC] bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="outcomes-cta-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[13px] font-semibold uppercase tracking-widest text-[#0B64F4] sm:text-[16px]">
            {cta.kicker}
          </p>
          <h2
            id="outcomes-cta-heading"
            className="mt-4 text-[28px] font-semibold leading-tight text-[#1F1F1F] sm:text-[36px]"
          >
            {cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-[#1F1F1F] sm:text-[16px] sm:tracking-wider">
            {cta.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:mt-10">
            <BookDemoButton className="inline-flex min-h-11 w-full max-w-xs items-center justify-center rounded-lg bg-[#1D68D5] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:bg-[#5F98F3] active:scale-[0.98] sm:w-auto sm:min-w-[220px]">
              Book  Demo
            </BookDemoButton>
          </div>
        </div>
      </section>

      <BlogCarousel align="center" />
    </main>
  );
}
