import type { Metadata } from "next";

import { Header } from "@/components/Header";
import RegulusHero from "@/components/capabilities/regulas/RegulusHero";
import ComplianceSection from "@/components/capabilities/regulas/ComplianceSection";
import DetectionSection from "@/components/capabilities/regulas/DetectionSection";
import InspectionQuestionsSection from "@/components/capabilities/regulas/InspectionQuestionsSection";
import SevenPillarsSection from "@/components/capabilities/regulas/SevenPillarsSection";
import RegulatoryRigourSection from "@/components/capabilities/regulas/RegulatoryRigourSection";
import InspectionReadySection from "@/components/capabilities/regulas/InspectionReadySection";
import CallToActionSection from "@/components/capabilities/regulas/CallToActionSection";
import { BlogCarousel } from "@/components/BlogCarousel";
import { isDraftModeEnabled } from "@/lib/preview/isDraftModeEnabled";
import { buildOpenGraphMetadata, mergeRegulusPage } from "@/lib/sitePage/merges";
import { getSitePageByRoute } from "@sanity/lib/getSitePage";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const preview = await isDraftModeEnabled();
  const raw = await getSitePageByRoute("capabilities-regulas", { preview });
  const { meta } = mergeRegulusPage(raw);
  return {
    title: meta.title,
    description: meta.description,
    ...buildOpenGraphMetadata(meta.ogImageUrl),
  };
}

export default async function RegulusPage() {
  const preview = await isDraftModeEnabled();
  const raw = await getSitePageByRoute("capabilities-regulas", { preview });
  const { hero } = mergeRegulusPage(raw);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 w-full  pb-16 overflow-hidden">
        <RegulusHero hero={hero} />
        <ComplianceSection />
        <DetectionSection />
        <InspectionQuestionsSection />
        <SevenPillarsSection />
        <RegulatoryRigourSection />
        <InspectionReadySection />
        <CallToActionSection />
        <BlogCarousel theme="light" align="center" />
      </main>
    </div>
  );
}
