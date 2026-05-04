import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { UseCasesPageContent } from "@/components/use-cases/UseCasesPageContent";
import { isDraftModeEnabled } from "@/lib/preview/isDraftModeEnabled";
import { buildOpenGraphMetadata, mergeUseCasesPage } from "@/lib/sitePage/merges";
import { getSitePageByRoute } from "@sanity/lib/getSitePage";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const raw = await getSitePageByRoute("use-cases");
  const { meta } = mergeUseCasesPage(raw);
  return {
    title: meta.title,
    description: meta.description,
    ...buildOpenGraphMetadata(meta.ogImageUrl),
  };
}

export default async function UseCasesPage() {
  const preview = await isDraftModeEnabled();
  const raw = await getSitePageByRoute("use-cases", { preview });
  const merged = mergeUseCasesPage(raw);

  return (
    <>
      <Header />
      <UseCasesPageContent hero={merged.hero} cards={merged.cards} />
    </>
  );
}
