import { Header } from "@/components/Header";
import Link from "next/link";

export function BlogUnderConstruction() {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center bg-white px-6 py-20">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#15B5C1]">Blog</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1E293B] md:text-4xl">
            Page under construction
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#64748B]">
            We are preparing new articles and insights. This section will be available soon.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex items-center justify-center rounded-lg bg-[#15B5C1] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#13adbc]"
          >
            Back to home
          </Link>
        </div>
      </main>
    </>
  );
}
