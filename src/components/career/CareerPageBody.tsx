"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BriefcaseBusiness } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import CareerHeroVisual from "@/components/career/CareerHeroVisual";

const values = [
  {
    number: "01",
    title: "Precision over speed",
    description:
      "In financial services, accuracy is non-negotiable. We take the time to get things right - in code, in data models, in client communications. Speed matters, but not at the cost of correctness.",
  },
  {
    number: "02",
    title: "Depth over surface",
    description:
      "We do not build for demos. We build for the edge cases, the audit trails, the regulatory examinations that will come. Depth of understanding is a competitive advantage we protect deliberately.",
  },
  {
    number: "03",
    title: "Transparency by default",
    description:
      "We share context, not just conclusions. Whether it is a product decision, a performance conversation, or a business challenge - the people closest to the work deserve the full picture.",
  },
  {
    number: "04",
    title: "Accountability without blame",
    description:
      "When things go wrong - and in complex systems, they sometimes do - we focus on understanding and fixing, not on assigning fault. Learning requires safety. Safety requires trust.",
  },
  {
    number: "05",
    title: "Raise the standard",
    description:
      "Every person who joins Expergo should make the team measurably better. Not just by delivering their own work, but by elevating the quality of thinking, execution, and culture around them.",
  },
  {
    number: "06",
    title: "Long-term thinking",
    description:
      "We are building infrastructure for institutions that operate across decades. The decisions we make today about architecture, compliance, and culture have consequences that outlast any product cycle.",
  },
];

const openings = [
  { title: "Senior Backend Engineer", team: "Core Platform" },
  { title: "Lead Engineer", team: "Data Infrastructure" },
  { title: "Product Manager", team: "Risk & Compliance" },
  { title: "Senior Data Scientist", team: "Portfolio Analytics" },
  { title: "Risk Analyst", team: "Market Risk" },
  { title: "Frontend Engineer", team: "Dashboard & Reporting" },
  { title: "Enterprise Account Executive", team: "Revenue" },
  { title: "UX Designer", team: "Financial Workflows" },
];

const processSteps = [
  {
    title: "Application review",
    description:
      "We review every application. You will hear back within five business days - not five weeks.",
  },
  {
    title: "Introductory call",
    description:
      "30 minutes with the hiring manager. We share context about the role, your work, and what to expect.",
  },
  {
    title: "Technical or domain assessment",
    description:
      "A focused exercise relevant to the role. Designed to take no more than two hours of your time.",
  },
  {
    title: "Panel interview",
    description:
      "Meet the team and discuss collaboration, execution style, and real scenarios.",
  },
  {
    title: "Offer",
    description:
      "A written offer with full compensation detail - salary, equity, and benefits.",
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function CareerPageBody() {
  const reduceMotion = useReducedMotion();
  const [processHoveredIndex, setProcessHoveredIndex] = useState<number | null>(null);
  const [processSelectedIndex, setProcessSelectedIndex] = useState(0);

  const processActiveIndex =
    processHoveredIndex !== null ? processHoveredIndex : processSelectedIndex;

  const processProgress =
    processSteps.length <= 1 ? 1 : processActiveIndex / (processSteps.length - 1);

  const onProcessKeyDown = useCallback((e: React.KeyboardEvent, idx: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setProcessSelectedIndex(Math.min(processSteps.length - 1, idx + 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setProcessSelectedIndex(Math.max(0, idx - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setProcessSelectedIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setProcessSelectedIndex(processSteps.length - 1);
    }
  }, []);

  const fadeUp = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
      };

  const staggerParent = reduceMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.07, delayChildren: 0.06 },
        },
      };

  const cardLift = reduceMotion
    ? {}
    : {
        whileHover: {
          y: -6,
          scale: 1.012,
          transition: { type: "spring", stiffness: 420, damping: 28 },
        },
        whileTap: { scale: 0.992 },
      };

  const jobRowVariants = reduceMotion
    ? { rest: {}, hover: {} }
    : {
        rest: { x: 0 },
        hover: {
          x: 10,
          transition: { type: "spring" as const, stiffness: 380, damping: 26 },
        },
      };

  const processStepHover = reduceMotion
    ? {}
    : {
        whileHover: {
          y: -8,
          transition: { type: "spring" as const, stiffness: 380, damping: 24 },
        },
      };

  const processCardInactive =
    "border border-transparent bg-transparent shadow-none hover:border-brand-teal/25 hover:bg-white/60 hover:shadow-[0_12px_36px_-20px_rgba(15,23,42,0.12)]";

  const processCardActive =
    "border border-brand-teal/40 bg-[linear-gradient(165deg,rgba(22,178,195,0.14)_0%,rgba(255,255,255,0.92)_42%,rgba(241,248,250,0.95)_100%)] shadow-[0_20px_56px_-24px_rgba(22,178,195,0.42),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-brand-teal/25";

  return (
    <motion.main
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: easeOut }}
      className="bg-background pb-12 pt-8 sm:pb-16 sm:pt-12"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerParent}
          className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12"
        >
          <motion.div variants={fadeUp} className="will-change-transform">
            <h1 className="mt-2 max-w-[528px] text-[38px] font-semibold leading-[1.2] tracking-[-0.03em] text-brand-footer sm:mt-3 sm:text-[46px] lg:[font-size:var(--text-site-display)] lg:leading-[1.21] lg:tracking-[-0.035em]">
              Build the future of
              <br />
              <motion.span
                className="inline-block text-brand-blue"
                initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.45, ease: easeOut }}
              >
                financial intelligence.
              </motion.span>
            </h1>
            <p className="es-paragraph mt-4 max-w-[528px] text-brand-muted sm:mt-5">
              Expergo sits at the intersection of technology and financial services. We are building the infrastructure
              that helps institutions move faster, make smarter decisions, and serve clients better. We are looking for
              people who want to do the same.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { href: "#open-roles", label: "Browse open roles" },
                { href: "#hiring-process", label: "Our hiring process" },
              ].map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  whileHover={reduceMotion ? undefined : { scale: 1.04, y: -1 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 450, damping: 28 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-border bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-ink shadow-sm transition-colors hover:border-brand-blue/40 hover:bg-brand-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/35"
                >
                  {item.label}
                  <ArrowRight className="h-3 w-3 text-brand-blue" aria-hidden />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="will-change-transform">
            <CareerHeroVisual />
          </motion.div>
        </motion.section>

        <motion.section
          className="mt-8 pb-8 sm:mt-10 sm:pb-10 lg:mt-12 lg:pb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerParent}
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
            OUR PRINCIPLES
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="md:mt-2 mt-6 [font-size:var(--text-site-sub)] font-bold leading-[1.12] tracking-tight text-brand-footer"
          >
            What we hold ourselves to.
          </motion.h2>
          <motion.p variants={fadeUp} className="md:es-paragraph text-md mt-2 max-w-[62ch] text-brand-muted">
            Six principles that shape how we build, how we hire, and how we make decisions every single day.
          </motion.p>
          <motion.div
            variants={staggerParent}
            className="md:mt-6 mt-10 grid gap-3 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-3.5"
          >
            {values.map((value) => (    
              <motion.article
                key={value.title}
                variants={fadeUp}
                {...cardLift} 
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#E1E7EF] bg-[linear-gradient(180deg,rgba(13,162,231,0.06)_0%,rgba(13,162,231,0.02)_100%)] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-[4px] transition-[border-color,box-shadow] duration-300 hover:border-brand-blue/35 hover:shadow-[0_16px_48px_-16px_rgba(13,162,231,0.28)] sm:min-h-[148px] sm:px-5"
              >
                <span
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-blue/[0.12] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <p className="relative text-[11px] font-semibold leading-none tracking-[0.08em] text-muted-foreground transition-colors duration-300 group-hover:text-brand-blue">
                  {value.number}
                </p>
                <h3 className="relative mt-2 text-[15px] font-semibold leading-[1.25] text-brand-footer transition-colors duration-300 group-hover:text-brand-ink">
                  {value.title}
                </h3>
                <p className="relative mt-1.5 text-sm leading-[1.5] text-brand-muted">{value.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="open-roles"
          className="mt-14 sm:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerParent}
        >
          <motion.p variants={fadeUp} className="es-small-heading text-brand-blue">
            OPEN POSITIONS
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-2 [font-size:var(--text-site-sub)] font-semibold leading-[1.1] tracking-tight text-brand-footer"
          >
            Find your role at Expergo.
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="mt-5 overflow-hidden rounded-[20px] border border-brand-border bg-white shadow-[0_8px_24px_-12px_rgba(19,23,32,0.08)] transition-shadow duration-300 hover:shadow-[0_16px_40px_-14px_rgba(13,162,231,0.18)]"
          >
            {openings.map((opening, idx) => (
              <motion.div
                key={opening.title}
                initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04, duration: 0.35, ease: easeOut }}
                className={idx < openings.length - 1 ? "border-b border-brand-border" : ""}
              >
                <motion.div
                  variants={jobRowVariants}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="w-full"
                >
                  <Link
                    href="mailto:careers@expergo.tech?subject=Application%20for%20role"
                    className="group/role relative flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-[linear-gradient(90deg,rgba(13,162,231,0.07)_0%,transparent_55%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-blue/35 sm:px-6"
                  >
                    <span
                      className="absolute bottom-0 left-0 top-0 w-[3px] origin-bottom scale-y-0 bg-brand-blue transition-transform duration-200 ease-out group-hover/role:scale-y-100"
                      aria-hidden
                    />
                    <div className="flex min-w-0 items-center gap-3">
                      <motion.span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-border bg-brand-surface text-brand-muted shadow-sm transition-colors duration-200 group-hover/role:border-brand-blue/25 group-hover/role:bg-white group-hover/role:text-brand-blue"
                        whileHover={reduceMotion ? undefined : { rotate: [0, -6, 6, 0] }}
                        transition={{ duration: 0.45 }}
                      >
                        <BriefcaseBusiness className="h-4 w-4" />
                      </motion.span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold leading-5 text-brand-ink transition-colors group-hover/role:text-brand-footer sm:text-base">
                          {opening.title}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-brand-muted">{opening.team}</p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="hidden text-xs font-medium text-brand-muted transition-colors group-hover/role:text-brand-ink sm:inline">
                        Remote · Full-time
                      </span>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-border bg-brand-surface text-muted-foreground shadow-sm transition-all duration-200 group-hover/role:border-brand-blue/30 group-hover/role:bg-brand-blue group-hover/role:text-white">
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/role:-translate-y-0.5 group-hover/role:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="hiring-process"
          className="mt-14 sm:mt-16 py-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={staggerParent}
        >
          <motion.p variants={fadeUp} className="text-center text-sm font-semibold tracking-[0.08em] text-brand-blue sm:text-base">
            Our hiring process
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-2 text-center [font-size:var(--text-site-sub)] font-semibold leading-[1.12] tracking-tight text-brand-footer"
          >
            Straight forward. <span className="text-brand-blue">No surprises</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-[52ch] text-center text-sm text-brand-muted sm:text-[15px]"
          >
            Hover or tap a step to explore. Use arrow keys when a step is focused.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="relative mt-8 overflow-hidden rounded-[28px] border border-brand-border/90 bg-[linear-gradient(165deg,rgba(13,162,231,0.06)_0%,rgba(22,178,195,0.08)_38%,rgba(248,250,252,0.97)_100%)] shadow-[0_24px_80px_-48px_rgba(22,178,195,0.55),inset_0_1px_0_rgba(255,255,255,0.85)] sm:mt-10"
          >
            <span
              className="pointer-events-none absolute -left-24 top-1/2 h-[min(420px,55vw)] w-[min(420px,55vw)] -translate-y-1/2 rounded-full bg-brand-teal/[0.09] blur-3xl"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute -right-16 -top-28 h-72 w-72 rounded-full bg-brand-blue/[0.06] blur-3xl"
              aria-hidden
            />

            <motion.ol
              className="relative hidden list-none flex-row items-start justify-between gap-3 px-4 pb-10 pt-12 sm:px-6 lg:flex"
              aria-label="Hiring process steps"
            >
              <li
                className="pointer-events-none absolute inset-x-[9%] top-[calc(3rem+0.75rem+1.375rem-2.5px)] z-0 list-none sm:inset-x-[10%]"
                aria-hidden
              >
                <span className="absolute inset-0 h-[5px] rounded-full bg-border/90 shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)]" />
                <motion.span
                  className="absolute left-0 top-0 h-[5px] rounded-full bg-gradient-to-r from-brand-teal via-[#2dd4bf] to-brand-teal shadow-[0_0_24px_rgba(45,212,191,0.55),0_2px_12px_-2px_rgba(22,178,195,0.45)]"
                  initial={false}
                  animate={{
                    width: `${processProgress * 100}%`,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.48,
                    ease: easeOut,
                  }}
                />
              </li>
              {processSteps.map((step, idx) => {
                const isActive = processActiveIndex === idx;
                return (
                  <motion.li
                    key={step.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.07, duration: 0.4, ease: easeOut }}
                    className="relative z-[1] w-[19%] list-none text-center"
                  >
                    <motion.button
                      type="button"
                      {...processStepHover}
                      onMouseEnter={() => setProcessHoveredIndex(idx)}
                      onMouseLeave={() => setProcessHoveredIndex(null)}
                      onFocus={() => setProcessHoveredIndex(idx)}
                      onBlur={() => setProcessHoveredIndex(null)}
                      onClick={() => setProcessSelectedIndex(idx)}
                      onKeyDown={(e) => onProcessKeyDown(e, idx)}
                      aria-current={isActive ? "step" : undefined}
                      aria-label={`Step ${idx + 1} of ${processSteps.length}: ${step.title}`}
                      className="group/step relative w-full px-2 pt-3 text-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(248,250,252,0.97)]"
                    >
                      <motion.span
                        whileInView={reduceMotion ? undefined : { scale: [0.92, 1], transition: { duration: 0.35 } }}
                        viewport={{ once: true }}
                        animate={
                          reduceMotion ? {} : isActive ? { scale: 1.07, y: -1 } : { scale: 1, y: 0 }
                        }
                        transition={{ type: "spring", stiffness: 420, damping: 22 }}
                        whileHover={reduceMotion ? undefined : { scale: isActive ? 1.1 : 1.07 }}
                        className={`relative mx-auto flex h-11 w-11 items-center justify-center rounded-full text-[13px] font-bold tracking-[0.02em] text-white transition-[filter,box-shadow] duration-300 ${
                          isActive
                            ? "bg-gradient-to-br from-[#2dd4bf] via-brand-teal to-[#0e9aa8] shadow-[0_12px_36px_-8px_rgba(45,212,191,0.55),0_4px_14px_-4px_rgba(22,178,195,0.45)] ring-[3px] ring-white ring-offset-2 ring-offset-[#e8f8fa]"
                            : "bg-gradient-to-br from-brand-teal/90 to-[#12929e] shadow-md shadow-brand-teal/20 ring-2 ring-white/40 hover:shadow-lg hover:ring-brand-teal/25"
                        }`}
                      >
                        {(idx + 1).toString().padStart(2, "0")}
                      </motion.span>
                      <div
                        className={`relative mt-4 overflow-hidden rounded-2xl px-2 pb-4 pt-3 transition-all duration-300 ${
                          isActive ? processCardActive : processCardInactive
                        }`}
                      >
                        {!isActive ? (
                          <span
                            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/step:opacity-100"
                            aria-hidden
                          >
                            <span className="absolute -right-8 top-0 h-28 w-28 rounded-full bg-brand-teal/[0.07] blur-2xl" />
                          </span>
                        ) : (
                          <span
                            className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-brand-teal/[0.18] blur-2xl"
                            aria-hidden
                          />
                        )}
                        <p
                          className={`relative mx-auto max-w-[19ch] text-sm leading-[1.3] transition-colors duration-300 ${
                            isActive
                              ? "font-bold text-brand-footer"
                              : "font-semibold text-brand-footer/85 group-hover/step:text-brand-footer"
                          }`}
                        >
                          {step.title}
                        </p>
                        <p
                          className={`relative mx-auto mt-2 max-w-[24ch] text-sm leading-[1.55] transition-colors duration-300 ${
                            isActive ? "text-brand-ink/90" : "text-brand-muted/80 group-hover/step:text-brand-muted"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </motion.button>
                  </motion.li>
                );
              })}
            </motion.ol>

            <motion.ul
              className="relative grid list-none gap-3 px-4 pb-8 pt-2 sm:grid-cols-2 sm:gap-4 sm:px-6 lg:hidden"
              aria-label="Hiring process steps"
            >
              {processSteps.map((step, idx) => {
                const isActive = processActiveIndex === idx;
                return (
                  <motion.li
                    key={step.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.38, ease: easeOut }}
                    className="list-none"
                  >
                    <motion.button
                      type="button"
                      {...cardLift}
                      onClick={() => setProcessSelectedIndex(idx)}
                      onKeyDown={(e) => onProcessKeyDown(e, idx)}
                      aria-current={isActive ? "step" : undefined}
                      aria-label={`Step ${idx + 1} of ${processSteps.length}: ${step.title}`}
                      className={`group/m relative w-full cursor-pointer overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/55 focus-visible:ring-offset-2 ${
                        isActive ? processCardActive : `${processCardInactive} border-brand-border/90 bg-white/90`
                      }`}
                    >
                      {isActive ? (
                        <span
                          className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_100%_0%,rgba(45,212,191,0.12),transparent_45%)]"
                          aria-hidden
                        />
                      ) : null}
                      <div className="relative flex items-start gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-md transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-br from-[#2dd4bf] via-brand-teal to-[#0e9aa8] ring-2 ring-white/80 ring-offset-2 ring-offset-transparent shadow-brand-teal/35"
                              : "bg-gradient-to-br from-brand-teal/88 to-[#12929e] ring-1 ring-white/50"
                          }`}
                        >
                          {(idx + 1).toString().padStart(2, "0")}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-sm font-semibold leading-snug transition-colors ${
                              isActive ? "text-brand-footer" : "text-brand-ink/90 group-hover/m:text-brand-footer"
                            }`}
                          >
                            {step.title}
                          </p>
                          <p
                            className={`mt-2 text-xs leading-5 transition-colors ${
                              isActive ? "text-brand-ink/85" : "text-brand-muted/85 group-hover/m:text-brand-muted"
                            }`}
                          >
                            {step.description}
                          </p>
                          {isActive ? (
                            <span className="mt-3 inline-flex rounded-full bg-brand-teal/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-teal">
                              Current step
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </motion.button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        </motion.section>

        <motion.section
          className="mt-14 text-center sm:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={staggerParent}
        >
          <motion.h2
            variants={fadeUp}
            className="[font-size:var(--text-site-sub)] font-semibold leading-[1.12] tracking-tight text-brand-footer"
          >
            Do not see your role? Apply anyway.
          </motion.h2>
          <motion.p variants={fadeUp} className="es-paragraph mx-auto mt-5 max-w-[92ch] text-brand-muted">
            We keep a strong pipeline of talented people for roles that may not be listed yet. If you believe you can
            raise the standard at Expergo, send us a note. We read every speculative application and respond to those
            that stand out.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-7 flex justify-center">
            <motion.a
              href="mailto:careers@expergo.tech?subject=General%20Application"
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      scale: 1.04,
                      boxShadow: "0 14px 36px -10px rgba(13, 162, 231, 0.45)",
                    }
              }
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
              className="group/cta relative inline-flex min-w-[220px] items-center justify-center gap-2 overflow-hidden rounded-lg bg-brand-blue px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_-4px_rgba(13,162,231,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 focus-visible:ring-offset-2"
            >
              <span
                className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/cta:translate-x-[100%]"
                aria-hidden
              />
              <span className="relative">Apply Anyway</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-1" aria-hidden />
            </motion.a>
          </motion.div>
        </motion.section>
      </div>
    </motion.main>
  );
}
