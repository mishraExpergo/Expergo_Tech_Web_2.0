import Image from "next/image";
import Link from "next/link";

import type { SanityPostCard } from "@sanity/lib/getPosts";
import { postImageUrl } from "@sanity/lib/postImage";

type Props = {
  posts: SanityPostCard[];
};

export function InsightRelatedPosts({ posts }: Props) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-[#E4E7EC] bg-[#F8FAFC] py-16 sm:py-20" aria-labelledby="related-insights-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="related-insights-heading"
          className="text-xs font-bold uppercase tracking-[0.2em] text-[#15B5C1]"
        >
          Explore other insights
        </h2>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/insights/${post.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-sm">
                  <Image
                    src={postImageUrl(post.mainImage ?? undefined)}
                    alt=""
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <h3 className="mt-4 line-clamp-2 text-base font-semibold leading-snug text-[#1E293B] group-hover:text-[#15B5C1]">
                  {post.title}
                </h3>
                <span className="mt-2 inline-block text-sm font-medium text-[#15B5C1] underline-offset-2 group-hover:underline">
                  Read more
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
