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
import { isDraftModeEnabled } from "@/lib/preview/isDraftModeEnabled";
import { buildOpenGraphMetadata, mergeBureauPage } from "@/lib/sitePage/merges";
import { getSitePageByRoute } from "@sanity/lib/getSitePage";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const preview = await isDraftModeEnabled();
  const raw = await getSitePageByRoute("capabilities-bureau-360", { preview });
  const { meta } = mergeBureauPage(raw);
  return {
    title: meta.title,
    description: meta.description,
    ...buildOpenGraphMetadata(meta.ogImageUrl),
  };
}

export default async function BureauPage() {
  const preview = await isDraftModeEnabled();
  const raw = await getSitePageByRoute("capabilities-bureau-360", { preview });
  const { hero } = mergeBureauPage(raw);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 w-full overflow-hidden">
        <BureauHero hero={hero} />
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
