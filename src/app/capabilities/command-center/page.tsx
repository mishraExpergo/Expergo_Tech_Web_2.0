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
import { isDraftModeEnabled } from "@/lib/preview/isDraftModeEnabled";
import { buildOpenGraphMetadata, mergeCommandPage } from "@/lib/sitePage/merges";
import { getSitePageByRoute } from "@sanity/lib/getSitePage";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const preview = await isDraftModeEnabled();
  const raw = await getSitePageByRoute("capabilities-command-center", { preview });
  const { meta } = mergeCommandPage(raw);
  return {
    title: meta.title,
    description: meta.description,
    ...buildOpenGraphMetadata(meta.ogImageUrl),
  };
}

export default async function CommandCenterPage() {
  const preview = await isDraftModeEnabled();
  const raw = await getSitePageByRoute("capabilities-command-center", { preview });
  const { hero } = mergeCommandPage(raw);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 w-full overflow-hidden">
        <CommandHero hero={hero} />
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
