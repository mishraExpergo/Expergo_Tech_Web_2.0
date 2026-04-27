import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/Header";
import { buildOpenGraphMetadata, mergeInsightsListPage } from "@/lib/sitePage/merges";
import { getPostsForListing } from "@sanity/lib/getPosts";
import { getSitePageByRoute } from "@sanity/lib/getSitePage";
import { postImageUrl } from "@sanity/lib/postImage";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const raw = await getSitePageByRoute("insights");
  const { meta } = mergeInsightsListPage(raw);
  return {
    title: meta.title,
    description: meta.description,
    ...buildOpenGraphMetadata(meta.ogImageUrl),
  };
}

export default async function InsightsPage() {
  const [posts, raw] = await Promise.all([getPostsForListing(), getSitePageByRoute("insights")]);
  const { list } = mergeInsightsListPage(raw);

  return (
    <>
      <Header />
      <main className="bg-white px-6 pb-24 pt-16 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#15B5C1]">{list.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#1E293B] md:text-4xl">{list.title}</h1>
          {posts.length === 0 ? (
            <p className="mt-8 text-[#64748B]">{list.emptyMessage}</p>
          ) : (
            <ul className="mt-12 grid gap-10 sm:grid-cols-2">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/insights/${post.slug}`} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#E4E7EC] bg-[#F8FAFC]">
                      <Image
                        src={postImageUrl(post.mainImage ?? undefined)}
                        alt=""
                        fill
                        className="object-cover transition duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <h2 className="mt-4 text-lg font-semibold text-[#1E293B] group-hover:text-[#15B5C1]">
                      {post.title}
                    </h2>
                    {post.excerpt ? (
                      <p className="mt-2 line-clamp-2 text-sm text-[#64748B]">{post.excerpt}</p>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
