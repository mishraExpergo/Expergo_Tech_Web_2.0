import type { Metadata } from "next";

import { Header } from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { ComparisonSection } from "@/components/ComparisonSection";
import ScrollNarrative from "@/components/ControlSection";
import HeatmapSection from "@/components/HeatmapSection";
import { InfrastructureSection } from "@/components/InfrastructureSection";
import { CTASection } from "@/components/CTASection";
import { BlogCarousel } from "@/components/BlogCarousel";
import { isDraftModeEnabled } from "@/lib/preview/isDraftModeEnabled";
import { buildOpenGraphMetadata, mergePlatformPage } from "@/lib/sitePage/merges";
import { getSitePageByRoute } from "@sanity/lib/getSitePage";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const preview = await isDraftModeEnabled();
  const raw = await getSitePageByRoute("platform", { preview });
  const { meta } = mergePlatformPage(raw);
  return {
    title: meta.title,
    description: meta.description,
    ...buildOpenGraphMetadata(meta.ogImageUrl),
  };
}

export default async function PlatformPage() {
  const preview = await isDraftModeEnabled();
  const raw = await getSitePageByRoute("platform", { preview });
  const { hero } = mergePlatformPage(raw);

  return (
    <>
      <Header />
      <HeroSection copy={hero} />
      <ComparisonSection />
      <ScrollNarrative />
      <HeatmapSection />
      <InfrastructureSection />
      <CTASection />
      <BlogCarousel align="center" />
    </>
  );
}
