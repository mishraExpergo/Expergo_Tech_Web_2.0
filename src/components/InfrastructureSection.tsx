import {
  Building2,
  Layers,
  LineChart,
  Shield,
} from "lucide-react";
import { MotionSection } from "./MotionSection";

const cards = [
  {
    icon: Building2,
    title: "Integrates with existing lending systems",
    body: "API-based data integration with core banking, LOS, and collections platforms.",
  },
  {
    icon: Shield,
    title: "Designed for regulated institutions",
    body: "Aligned with Early Warning and Fraud Risk governance expectations.",
  },
  {
    icon: LineChart,
    title: "Scales across high-volume portfolios",
    body: "Built for processing millions of accounts with real-time signal ingestion.",
  },
  {
    icon: Layers,
    title: "Preserves audit traceability",
    body: "Full decision lineage and intervention tracking for compliance reporting.",
  },
];

export function InfrastructureSection() {
  return (
    <MotionSection
      id="company"
      variant="fade"
      className="bg-white px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:my-0 my-[-60px] items-center">
          <p className="text-[16px] uppercase  text-[#1D68D5]">
            Infrastructure
          </p>
          <h2 className="md:text-[36px] text-[24px]  text-center md:text-center  mt-3 md:w-[50vw] w-full font-semibold">
            Built for institutional risk environments
          </h2>
          <p className="mt-4 text-center max-w-3xl text-base leading-relaxed text-[#667085]">
          EarlySafe strengthens institutional risk discipline without replacing existing credit models.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="rounded-2xl border border-[#000000]/10 bg-[#F9FAFB] p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 shadow-[#2EC2B3]/25"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#1D68D5] shadow-sm ring-1 ring-[#E4E7EC]">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold text-[#101828]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#667085]">
                {body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
