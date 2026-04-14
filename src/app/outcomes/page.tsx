import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { OutcomesPageContent } from "@/components/outcomes/OutcomesPageContent";

export const metadata: Metadata = {
  title: "Outcomes — EXPERGO",
  description:
    "Measurable portfolio outcomes for CRO, Collections, CEO, and Board—capital stability, earlier intervention, and governance transparency with EarlySafe.",
};

export default function OutcomesPage() {
  return (
    <>
      <Header />
      <OutcomesPageContent />
    </>
  );
}
