import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { UseCasesPageContent } from "@/components/use-cases/UseCasesPageContent";

export const metadata: Metadata = {
  title: "Use Cases — Secured Lending Portfolios | EXPERGO",
  description:
    "EarlySafe for residential mortgage, CRE, auto, equipment, inventory, and project finance—structured risk control across secured lending portfolios.",
};

export default function UseCasesPage() {
  return (
    <>
      <Header />
      <UseCasesPageContent />
      <Footer variant="useCases" />
    </>
  );
}
