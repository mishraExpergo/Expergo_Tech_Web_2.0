import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { AegisPageContent } from "@/components/aegis/AegisPageContent";

export const metadata: Metadata = {
  title: "Aegis | Expergo",
  description:
    "Aegis converts early portfolio signals into clear risk trajectories, actionable priorities, and measurable outcomes.",
};

export default function AegisPage() {
  return (
    <>
      <Header />
      <AegisPageContent />
    </>
  );
}
