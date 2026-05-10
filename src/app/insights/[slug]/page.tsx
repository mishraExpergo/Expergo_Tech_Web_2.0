import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleBody } from "@/components/insights/ArticleBody";
import { InsightDetailHero } from "@/components/insights/detail/InsightDetailHero";
import { InsightExecutiveSummary } from "@/components/insights/detail/InsightExecutiveSummary";
import { InsightRelatedPosts } from "@/components/insights/detail/InsightRelatedPosts";
import { InsightToc } from "@/components/insights/detail/InsightToc";
import { Header } from "@/components/Header";
import { buildTocAndHeadingIds } from "@/lib/insights/toc";
import { isDraftModeEnabled } from "@/lib/preview/isDraftModeEnabled";
import { getPostBySlug, getPostSlugs, getRelatedPostsForInsight } from "@sanity/lib/getPosts";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const preview = await isDraftModeEnabled();
  const post = await getPostBySlug(slug, { preview });
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
  const preview = await isDraftModeEnabled();
  const [post, relatedPosts] = await Promise.all([
    getPostBySlug(slug, { preview }),
    getRelatedPostsForInsight(slug, { preview }),
  ]);

  if (!post) {
    notFound();
  }

  const dateLabel = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const { toc, headingIdByKey } = buildTocAndHeadingIds(post.body ?? undefined);

  const pdfUrl = post.pdf?.asset?.url ?? null;
  const pdfFilename = post.pdf?.asset?.originalFilename ?? null;

  const showExecutiveSummarySection = Boolean(post.executiveSummary?.length) || Boolean(pdfUrl);

  return (
    <>
      <Header />
      <main>
        <InsightDetailHero title={post.title} excerpt={post.excerpt} publishedLabel={dateLabel} />
        <InsightExecutiveSummary
          executiveSummary={post.executiveSummary}
          pdfUrl={pdfUrl}
          pdfFilename={pdfFilename}
        />
        <article className="bg-white px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-12">
          <div className="mx-auto max-w-6xl">
            <div className="lg:grid lg:grid-cols-[minmax(200px,260px)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
              <InsightToc items={toc} showExecutiveSummary={showExecutiveSummarySection} />
              <div className="min-w-0 max-w-3xl border-t border-[#E4E7EC] pt-10 lg:border-t-0 lg:pt-0">
                <ArticleBody value={post.body} headingIdByKey={headingIdByKey} />
              </div>
            </div>
          </div>
        </article>
        <InsightRelatedPosts posts={relatedPosts} />
      </main>
    </>
  );
}
