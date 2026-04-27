"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import { SignalFabricCard } from "@/components/Homepage/SignalFabricCard";
import { RiskInterpretationCard } from "@/components/Homepage/RiskInterpretationCard";
import { PortfolioIntelligenceCard } from "@/components/Homepage/PortfolioIntelligenceCard";
import { GovernanceAuditCard } from "@/components/Homepage/GovernanceAuditCard";
import { ControlOrchestrationCard } from "@/components/Homepage/ControlOrchestrationCard";
import { PredictiveTrajectoryCard } from "@/components/Homepage/PredictiveTrajectoryCard";
import { DetectDecideControlSection } from "@/components/Homepage/DetectDecideControlSection";
import { MeasurableOutcomesSection } from "@/components/Homepage/MeasurableOutcomesSection";
import { InstitutionalFeaturesSection } from "@/components/Homepage/InstitutionalFeaturesSection";
const BlogCarousel = dynamic(
  () => import("@/components/BlogCarousel").then((m) => ({ default: m.BlogCarousel })),
  {
    loading: () => (
      <div className="mx-auto mt-16 h-56 w-full max-w-6xl animate-pulse rounded-xl bg-gray-100/80" aria-hidden />
    ),
    ssr: true,
  },
);
import { CTASection } from "@/components/CTASection";
import { RiskMonitorControlSection } from "@/components/Homepage/RiskMonitorControlSection";
import { Hero } from "@/components/Homepage/Hero";
import type { MergedHomeHero } from "@/lib/sitePage/merges";

const Index = ({ hero }: { hero: MergedHomeHero }) => {
  return (
    <div className="min-h-screen">
      <Hero copy={hero} />
        <RiskMonitorControlSection />
        <DetectDecideControlSection />
      <div className="bg-background  mx-24">
      <div className=" max-w-full">

        <motion.div
          className="mb-12 mt-24 text-center mx-auto max-w-7xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="es-small-heading text-[var(--color-platform-accent)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Platform
          </motion.span>
          <h1 className="es-heading-hero mt-2 font-bold text-foreground">
            A unified portfolio Control{" "}
            <span className="text-[var(--color-platform-accent)]">risk platform.</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-[var(--color-brand-muted)]">
            Each layer performs a defined institutional function. Together, they form a unified portfolio risk
            discipline.
          </p>
        </motion.div>

        {/*
          Bento (lg+): matches reference — row1: three tiles; row2: Governance (2 cols) + Control (tall right);
          row3: Predictive wide (2 cols) + Control continues.
        */}
        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:items-stretch lg:gap-5">
          <div className="lg:col-start-1 lg:row-start-1 lg:h-full lg:min-h-0">
            <SignalFabricCard />
          </div>
          <div className="lg:col-start-2 lg:row-start-1 lg:h-full lg:min-h-0">
            <RiskInterpretationCard />
          </div>
          <div className="lg:col-start-3 lg:row-start-1 lg:h-full lg:min-h-0">
            <PortfolioIntelligenceCard />
          </div>

          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:h-full lg:min-h-0">
            {/* <GovernanceAuditCard /> */}
            <PredictiveTrajectoryCard />
          </div>
          <div className="lg:col-start-3 lg:row-span-2 lg:row-start-2 lg:h-full lg:min-h-[28rem]">
            <ControlOrchestrationCard />
          </div>

          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-3 lg:h-full lg:min-h-0">
              <GovernanceAuditCard />

          </div>
        </div>
      </div>
      </div>


      <MeasurableOutcomesSection />

      <InstitutionalFeaturesSection />

      <CTASection />

      <BlogCarousel align="center" />
    </div>
  );
};

export default Index;
