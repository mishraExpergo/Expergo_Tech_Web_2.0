import type { ReactNode } from "react";

import type { TocItem } from "@/lib/insights/toc";

type Props = {
  items: TocItem[];
  showExecutiveSummary: boolean;
};

function TocLink({ href, children, pad }: { href: string; children: ReactNode; pad: string }) {
  return (
    <a
      href={href}
      className={`block rounded-md text-xs font-semibold uppercase tracking-[0.12em] text-white/90 transition hover:bg-white/10 hover:text-white ${pad}`}
    >
      {children}
    </a>
  );
}

function TocList({
  showExecutiveSummary,
  items,
  className,
}: {
  showExecutiveSummary: boolean;
  items: TocItem[];
  className?: string;
}) {
  return (
    <ul className={`space-y-1 ${className ?? ""}`}>
      {showExecutiveSummary ? (
        <li>
          <TocLink href="#executive-summary" pad="px-3 py-2">
            Executive summary
          </TocLink>
        </li>
      ) : null}
      {items.map((item) => (
        <li key={item.id}>
          <TocLink href={`#${item.id}`} pad={item.level === 3 ? "px-3 py-2 pl-5 text-[0.65rem]" : "px-3 py-2"}>
            {item.label}
          </TocLink>
        </li>
      ))}
    </ul>
  );
}

export function InsightToc({ items, showExecutiveSummary }: Props) {
  const hasNav = showExecutiveSummary || items.length > 0;
  if (!hasNav) {
    return null;
  }

  return (
    <>
      <div className="mb-8 lg:hidden">
        <details className="group rounded-xl border border-[#E4E7EC] bg-[#F8FAFC] p-1">
          <summary className="cursor-pointer list-none rounded-lg px-4 py-3 text-sm font-semibold text-[#1E293B] [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-2">
              On this page
              <span className="text-[#64748B] transition group-open:rotate-180">▼</span>
            </span>
          </summary>
          <nav
            className="border-t border-[#E4E7EC] bg-[#0a4a52] px-2 py-3"
            aria-label="On this page"
          >
            <TocList showExecutiveSummary={showExecutiveSummary} items={items} />
          </nav>
        </details>
      </div>

      <aside className="hidden lg:block">
        <nav
          aria-label="On this page"
          className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-xl bg-[#0a4a52] px-3 py-5 shadow-sm"
        >
          <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
            Contents
          </p>
          <TocList showExecutiveSummary={showExecutiveSummary} items={items} />
        </nav>
      </aside>
    </>
  );
}
