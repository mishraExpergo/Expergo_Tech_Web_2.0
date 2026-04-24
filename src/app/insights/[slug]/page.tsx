import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleBody } from "@/components/insights/ArticleBody";
import { Header } from "@/components/Header";
import { getPostBySlug, getPostSlugs } from "@sanity/lib/getPosts";
import { postImageUrl } from "@sanity/lib/postImage";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "Article | EXPERGO" };
  }
  return {
    title: `${post.title} | EXPERGO`,
    description: post.excerpt ?? undefined,
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      <Header />
      <article className="bg-white px-6 pb-24 pt-12 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/insights"
            className="text-sm font-medium text-[#15B5C1] hover:underline"
          >
            ← All insights
          </Link>
          {date ? (
            <time
              dateTime={post.publishedAt ?? undefined}
              className="mt-6 block text-sm text-[#64748B]"
            >
              {date}
            </time>
          ) : null}
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#1E293B] md:text-4xl">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="mt-4 text-lg text-[#64748B]">{post.excerpt}</p>
          ) : null}
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#E4E7EC] bg-[#F8FAFC]">
            <Image
              src={postImageUrl(post.mainImage ?? undefined)}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
          <ArticleBody value={post.body} />
        </div>
      </article>
    </>
  );
}
