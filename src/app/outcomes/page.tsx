import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { OutcomesPageContent } from "@/components/outcomes/OutcomesPageContent";
import { isDraftModeEnabled } from "@/lib/preview/isDraftModeEnabled";
import { buildOpenGraphMetadata, mergeOutcomesPage } from "@/lib/sitePage/merges";
import { getSitePageByRoute } from "@sanity/lib/getSitePage";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const preview = await isDraftModeEnabled();
  const raw = await getSitePageByRoute("outcomes", { preview });
  const { meta } = mergeOutcomesPage(raw);
  return {
    title: meta.title,
    description: meta.description,
    ...buildOpenGraphMetadata(meta.ogImageUrl),
  };
}

export default async function OutcomesPage() {
  const preview = await isDraftModeEnabled();
  const raw = await getSitePageByRoute("outcomes", { preview });
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
