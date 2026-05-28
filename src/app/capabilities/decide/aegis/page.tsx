import type { Metadata } from "next";

import { Header } from "@/components/Header";
import AegisHero from "@/app/capabilities/decide/aegis/AegisHero";
import AegisEnablesSection from "@/app/capabilities/decide/aegis/AegisEnablesSection";
import AegisCoreCapabilities from "@/app/capabilities/decide/aegis/AegisCoreCapabilities";
import AegisCapabilitiesAcrossFunctions from "@/app/capabilities/decide/aegis/AegisCapabilitiesAcrossFunctions";
import AegisOutcomesSection from "@/app/capabilities/decide/aegis/AegisOutcomesSection";
import AegisHowItFitsSection from "@/app/capabilities/decide/aegis/AegisHowItFitsSection";
import AegisThinkSection from "@/app/capabilities/decide/aegis/AegisThinkSection";
import { BlogCarousel } from "@/components/BlogCarousel";

export const metadata: Metadata = {
  title: "Aegis | Expergo",
  description:
    "Most portfolios don't fail from lack of data—they fail when signals aren't interpreted and actions don't move outcomes. Aegis fixes this at the source.",
};

export default function AegisPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 w-full min-w-0 overflow-x-hidden bg-white">
        <AegisHero />
        <AegisEnablesSection />
        <AegisCoreCapabilities />
        <AegisCapabilitiesAcrossFunctions />
        <AegisOutcomesSection />
        <AegisHowItFitsSection />
        <AegisThinkSection />
        <BlogCarousel theme="light" align="center" />
      </main>
    </div>
  );
}
