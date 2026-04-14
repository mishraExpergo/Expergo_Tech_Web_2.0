import type { Metadata } from "next";
import { Header } from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { ComparisonSection } from "@/components/ComparisonSection";
import ScrollNarrative from "@/components/ControlSection";
import HeatmapSection from "@/components/HeatmapSection";
import { InfrastructureSection } from "@/components/InfrastructureSection";
import { CTASection } from "@/components/CTASection";
import { BlogCarousel } from "@/components/BlogCarousel";

export const metadata: Metadata = {
  title: "EXPERGO — Continuous Portfolio Risk Control",
  description:
    "EarlySafe by Expergo: detect risk early, influence portfolio outcomes, and quantify trajectory for NBFCs, HFCs, and banks.",
};

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <ComparisonSection />
      <ScrollNarrative />
      <HeatmapSection />
      <InfrastructureSection />
      <CTASection />
      <BlogCarousel align="center" />
    </>
  );
}
