import Link from "next/link";

type Props = {
  title: string;
  excerpt: string | null;
  publishedLabel: string | null;
};

export function InsightDetailHero({ title, excerpt, publishedLabel }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-[#0a4a52] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a4a52] via-[#0d5c66] to-[#0a3d44]" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <Link
          href="/insights"
          className="inline-flex text-sm font-medium text-white/80 transition hover:text-white"
        >
          ← All insights
        </Link>
        {publishedLabel ? (
          <p className="mt-6 text-sm font-medium uppercase tracking-[0.16em] text-white/60">
            {publishedLabel}
          </p>
        ) : null}
        <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
          {title}
        </h1>
        {excerpt ? (
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/85 sm:text-xl">{excerpt}</p>
        ) : null}
      </div>
    </section>
  );
}
