import type { Metadata } from "next";
import { Header } from "@/components/Header";
import BureauHero from "@/components/capabilities/bureau-360/BureauHero";
import ExternalSignalsFlow from "@/components/capabilities/bureau-360/ExternalSignalsFlow";
import DataPipelineSection from "@/components/capabilities/bureau-360/DataPipelineSection";
import BetterMonitoringSection from "@/components/capabilities/bureau-360/BetterMonitoringSection";
import CoreCapabilitiesGrid from "@/components/capabilities/bureau-360/CoreCapabilitiesGrid";
import MeasurableImpactSection from "@/components/capabilities/bureau-360/MeasurableImpactSection";
import BureauCTA from "@/components/capabilities/bureau-360/BureauCTA";
import { BlogCarousel } from "@/components/BlogCarousel";

export const metadata: Metadata = {
  title: "Bureau 360° — EXPERGO",
  description: "BUREAU 360° is a credit bureau aggregator and analysis engine",
};

export default function BureauPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 w-full overflow-hidden">
        <BureauHero />
        <ExternalSignalsFlow />
        <DataPipelineSection />
        <BetterMonitoringSection />
        <CoreCapabilitiesGrid />
        <MeasurableImpactSection />
        <BureauCTA />
        <BlogCarousel theme="light" align="center" />
      </main>
    </div>
  );
}
