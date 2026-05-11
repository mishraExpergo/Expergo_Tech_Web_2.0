import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { BookDemoButton } from "@/components/book-demo/BookDemoProvider";
import AthenaControlLoop from "@/app/capabilities/decide/athena/AthenaControlLoop";
import AthenaPredictiveIntelligenceSection from "@/app/capabilities/decide/athena/AthenaPredictiveIntelligenceSection";
import AthenaIntelligenceSection from "@/app/capabilities/decide/athena/AthenaIntelligenceSection";
import AthenaMeasuredImprovementSection from "@/app/capabilities/decide/athena/AthenaMeasuredImprovementSection";
import AthenaTeamOutcomesSection from "@/app/capabilities/decide/athena/AthenaTeamOutcomesSection";

export const metadata: Metadata = {
  title: "Athena | Expergo",
  description:
    "Athena helps lending teams anticipate borrower behavior, prioritize action, and improve portfolio outcomes.",
};

export default function AthenaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-surface">
      <Header />
      <main className="flex-1 w-full min-w-0 overflow-x-hidden bg-background">
        <section className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14 pt-20 sm:pt-24 lg:pt-10 pb-20 sm:pb-24">
          <div className="max-w-2xl">
            <h1 className="font-heading max-w-xl text-[30px] font-bold leading-[1.1] tracking-tight text-brand-ink sm:text-4xl md:text-[52px]">
                   Predict how your{" "}
              <span className="text-brand-teal">portfolio will move</span>{" "}
              and act early
            </h1>

            <p className="mt-8 es-body max-w-xl">
              Athena enables lending teams to anticipate borrower behaviour,
              prioritise action, and improve portfolio outcomes with
              forward-looking intelligence.
            </p>

            <p className="mt-6 pl-4 border-l-2 border-brand-border es-caption max-w-xl">
              Built for Risk, Collections, Credit and Underwriting leaders who
              need clarity on what will happen next — and how to respond.
            </p>

            <BookDemoButton
              mode="demo"
              className="mt-10 inline-flex items-center justify-center rounded-xl bg-brand-blue px-8 py-3 text-sm sm:text-base font-semibold text-white transition-opacity hover:opacity-95 active:scale-[0.98]"
            >
              Book a Demo
            </BookDemoButton>
          </div>
        </section>
        <AthenaControlLoop />
        <AthenaPredictiveIntelligenceSection />
        <AthenaTeamOutcomesSection />
        <AthenaMeasuredImprovementSection />
        <AthenaIntelligenceSection />
      </main>
    </div>
  );
}
