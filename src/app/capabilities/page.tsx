import type { Metadata } from "next";
import { CapabilitiesPageContent } from "@/components/capabilities/CapabilitiesPageContent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BlogCarousel } from "@/components/BlogCarousel";

export const metadata: Metadata = {
  title: "Capabilities — EXPERGO",
  description:
    "Explore Lighthouse, Regulus, Command Center, and Bureau 360°—the EarlySafe capabilities stack for continuous portfolio risk control.",
};

export default function CapabilitiesPage() {
  return (
    <>
      <Header />
      <CapabilitiesPageContent />
      <Footer variant="capabilities" />
    </>
  );
}
