import Link from "next/link";
import { BookDemoButton } from "@/components/book-demo/BookDemoProvider";
import { MotionSection } from "./MotionSection";

export function CTASection() {
  return (
    <MotionSection
      id="demo"
      variant="fade-up"
      className="px-4 py-20 sm:px-6 lg:px-8"
    >
       <section
        id="briefing"
        className=" bg-white px-4 md:py-20 py-0 sm:px-6 lg:px-8"
        aria-labelledby="outcomes-cta-heading"
      >
        <div className="mx-auto max-w-3xl md:my-0 my-[-70px] text-center">
          <p className="text-[16px] uppercase  text-[#0B64F4]">
            Institutionalize Control
          </p>
          <h2     
            id="outcomes-cta-heading"
            className="es-heading-hero mt-4 font-semibold tracking-wider text-[#1F1F1F]"
          >
            Capital resilience requires structural discipline.
          </h2>
          <p className="mx-auto text-[16px] mt-5 max-w-2xl tracking-wider text-base font-poppins  leading-relaxed text-[#1F1F1F] ">
            Institutions that manage risk formation early preserve stability and unlock measured growth. EarlySafe.
            Continuous Portfolio Risk Control.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BookDemoButton className="inline-flex min-w-[220px] items-center justify-center rounded-lg bg-[#1D68D5] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:bg-[#5F98F3] active:scale-[0.98]">
            Request Executive Brief
            </BookDemoButton>
           
          </div>
        </div>
        </section>
    </MotionSection>
  );
}
