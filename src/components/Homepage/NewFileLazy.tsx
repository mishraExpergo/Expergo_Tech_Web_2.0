"use client";

import dynamic from "next/dynamic";

/**
 * Defer Recharts + heavy dashboard UI off the main bundle until after first paint.
 */
const NewFile = dynamic(() => import("./NewFile"), {
  ssr: false,
  loading: () => (
    <section
      className="flex min-h-[min(480px,70vh)] w-full items-center justify-center bg-gray-50/50 py-24"
      aria-busy="true"
      aria-label="Loading dashboard preview"
    >
      <div className="mx-4 h-40 w-full max-w-4xl animate-pulse rounded-2xl bg-gray-200/70" />
    </section>
  ),
});

export default function NewFileLazy() {
  return <NewFile />;
}
