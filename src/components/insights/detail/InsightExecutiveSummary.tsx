import type { PortableTextBlock } from "@portabletext/types";

import { ExecutiveSummaryBody } from "@/components/insights/ExecutiveSummaryBody";

type Props = {
  executiveSummary: PortableTextBlock[] | null | undefined;
  pdfUrl: string | null;
  pdfFilename: string | null;
};

export function InsightExecutiveSummary({
  executiveSummary,
  pdfUrl,
  pdfFilename,
}: Props) {
  const hasBlocks = Boolean(executiveSummary?.length);
  const showSection = hasBlocks || Boolean(pdfUrl);

  if (!showSection) {
    return null;
  }

  return (
    <section
      id="executive-summary"
      className="border-b border-[#E4E7EC] bg-white scroll-mt-28"
      aria-labelledby="executive-summary-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <h2
          id="executive-summary-heading"
          className="text-xl font-bold tracking-tight text-[#1E293B] sm:text-2xl"
        >
          Executive summary
        </h2>
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-[#475569]">
          {hasBlocks ? <ExecutiveSummaryBody value={executiveSummary} /> : null}
          {!hasBlocks && pdfUrl ? (
            <p className="text-[#64748B]">Download the PDF for the full briefing.</p>
          ) : null}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="min-h-[48px] flex-1 rounded-lg border border-[#E4E7EC] bg-[#F8FAFC] px-4 py-3 text-sm text-[#64748B]">
            Use the table of contents to jump to a section.
          </div>
          {pdfUrl ? (
            <a
              href={pdfUrl}
              {...(pdfFilename ? { download: pdfFilename } : {})}
              rel="noopener noreferrer"
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-lg bg-[#15B5C1] px-6 text-sm font-semibold text-white transition hover:bg-[#129aa8]"
            >
              Download PDF
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
