import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import LighthouseHero from "@/components/capabilities/lighthouse/LighthouseHero";
import DashboardPreview from "@/components/capabilities/lighthouse/DashboardPreview";
import WhatIsLighthouse from "@/components/capabilities/lighthouse/WhatIsLighthouse";
import ProblemSolved from "@/components/capabilities/lighthouse/ProblemSolved";
import CoreCapabilitiesList from "@/components/capabilities/lighthouse/CoreCapabilitiesList";
import BusinessOutcomeBox from "@/components/capabilities/lighthouse/BusinessOutcomeBox";
import LighthouseCTA from "@/components/capabilities/lighthouse/LighthouseCTA";
import { BlogCarousel } from "@/components/BlogCarousel";

export const metadata: Metadata = {
  title: "Lighthouse Dashboard — EXPERGO",
  description: "The Risk Dashboard Lighthouse acts as the analytical control post for multi-tiered event monitoring.",
};

export default function LighthousePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <Header />
      <main className="flex-1 w-full overflow-hidden bg-white">
        <div className="relative isolate">
          <LighthouseHero />
          <DashboardPreview />
        </div>
        <WhatIsLighthouse />
        <ProblemSolved />
        <CoreCapabilitiesList />
        <BusinessOutcomeBox />
        <LighthouseCTA />
        <BlogCarousel theme="light" align="center" />
      </main>
      <Footer variant="capabilities" />
    </div>
  );
}
