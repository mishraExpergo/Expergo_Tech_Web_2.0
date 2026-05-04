import type { Metadata } from "next";

import { Header } from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { ComparisonSection } from "@/components/ComparisonSection";
import ScrollNarrative from "@/components/ControlSection";
import HeatmapSection from "@/components/HeatmapSection";
import { InfrastructureSection } from "@/components/InfrastructureSection";
import { CTASection } from "@/components/CTASection";
import { BlogCarousel } from "@/components/BlogCarousel";
import { buildOpenGraphMetadata, mergePlatformPage } from "@/lib/sitePage/merges";
import { getSitePageByRoute } from "@sanity/lib/getSitePage";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const raw = await getSitePageByRoute("platform");
  const { meta } = mergePlatformPage(raw);
  return {
    title: meta.title,
    description: meta.description,
    ...buildOpenGraphMetadata(meta.ogImageUrl),
  };
}

export default async function PlatformPage() {
  const raw = await getSitePageByRoute("platform");
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
