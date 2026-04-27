import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { OutcomesPageContent } from "@/components/outcomes/OutcomesPageContent";
import { buildOpenGraphMetadata, mergeOutcomesPage } from "@/lib/sitePage/merges";
import { getSitePageByRoute } from "@sanity/lib/getSitePage";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const raw = await getSitePageByRoute("outcomes");
  const { meta } = mergeOutcomesPage(raw);
  return {
    title: meta.title,
    description: meta.description,
    ...buildOpenGraphMetadata(meta.ogImageUrl),
  };
}

export default async function OutcomesPage() {
  const raw = await getSitePageByRoute("outcomes");
  const merged = mergeOutcomesPage(raw);

  return (
    <>
      <Header />
      <OutcomesPageContent
        hero={merged.hero}
        stakeholderCards={merged.stakeholderCards}
        outcomeDetailCards={merged.outcomeDetailCards}
        cta={merged.cta}
      />
    </>
  );
}
