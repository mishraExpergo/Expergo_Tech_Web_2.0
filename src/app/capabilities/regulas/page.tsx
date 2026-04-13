import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
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

export const metadata: Metadata = {
  title: "Regulus — EXPERGO",
  description: "The Statutory Early Warning Register for RBI & NHB regulated lenders.",
};

export default function RegulusPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 w-full pt-24 pb-16 overflow-hidden">
        <RegulusHero />
        <ComplianceSection />
        <DetectionSection />
        <InspectionQuestionsSection />
        <SevenPillarsSection />
        <RegulatoryRigourSection />
        <InspectionReadySection />
        <CallToActionSection />
        <BlogCarousel align="center" />
      </main>
      <Footer variant="capabilities" />
    </div>
  );
}
