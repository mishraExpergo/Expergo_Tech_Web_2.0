import type { Metadata } from "next";

import { Header } from "@/components/Header";
import LighthouseHero from "@/components/capabilities/lighthouse/LighthouseHero";
import DashboardPreview from "@/components/capabilities/lighthouse/DashboardPreview";
import WhatIsLighthouse from "@/components/capabilities/lighthouse/WhatIsLighthouse";
import ProblemSolved from "@/components/capabilities/lighthouse/ProblemSolved";
import CoreCapabilitiesList from "@/components/capabilities/lighthouse/CoreCapabilitiesList";
import BusinessOutcomeBox from "@/components/capabilities/lighthouse/BusinessOutcomeBox";
import LighthouseCTA from "@/components/capabilities/lighthouse/LighthouseCTA";
import { BlogCarousel } from "@/components/BlogCarousel";
import { buildOpenGraphMetadata, mergeLighthousePage } from "@/lib/sitePage/merges";
import { getSitePageByRoute } from "@sanity/lib/getSitePage";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const raw = await getSitePageByRoute("capabilities-lighthouse");
  const { meta } = mergeLighthousePage(raw);
  return {
    title: meta.title,
    description: meta.description,
    ...buildOpenGraphMetadata(meta.ogImageUrl),
  };
}

export default async function LighthousePage() {
  const raw = await getSitePageByRoute("capabilities-lighthouse");
  const { hero, stats } = mergeLighthousePage(raw);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <Header />
      <main className="flex-1 w-full overflow-hidden bg-white">
        <div className="relative isolate">
          <LighthouseHero hero={hero} stats={stats} />
          <DashboardPreview />
        </div>
        <WhatIsLighthouse />
        <ProblemSolved />
        <CoreCapabilitiesList />
        <BusinessOutcomeBox />
        <LighthouseCTA />
        <BlogCarousel theme="light" align="center" />
      </main>
    </div>
  );
}
