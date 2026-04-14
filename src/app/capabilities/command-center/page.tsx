import type { Metadata } from "next";
import { Header } from "@/components/Header";
import CommandHero from "@/components/capabilities/command-center/CommandHero";
import ExecutionEngineSection from "@/components/capabilities/command-center/ExecutionEngineSection";
import ActionNoiseSection from "@/components/capabilities/command-center/ActionNoiseSection";
import EverythingYouNeedGrid from "@/components/capabilities/command-center/EverythingYouNeedGrid";
import EngineeredPrecisionTab from "@/components/capabilities/command-center/EngineeredPrecisionTab";
import CommandImpactTimeline from "@/components/capabilities/command-center/CommandImpactTimeline";
import CommandCTA from "@/components/capabilities/command-center/CommandCTA";
import { BlogCarousel } from "@/components/BlogCarousel";

export const metadata: Metadata = {
  title: "Command Centre — EXPERGO",
  description: "The EarlySafe Command Centre translates millions of data points into a steady, unified dashboard.",
};

export default function CommandCenterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 w-full overflow-hidden">
        <CommandHero />
        <ExecutionEngineSection />
        <ActionNoiseSection />
        <EverythingYouNeedGrid />
        <EngineeredPrecisionTab />
        <CommandImpactTimeline />
        <CommandCTA />
        <BlogCarousel theme="light" align="center" />
      </main>
    </div>
  );
}
