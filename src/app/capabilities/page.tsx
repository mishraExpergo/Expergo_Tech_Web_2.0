import type { Metadata } from "next";

import { CapabilitiesPageContent } from "@/components/capabilities/CapabilitiesPageContent";
import { Header } from "@/components/Header";
import { isDraftModeEnabled } from "@/lib/preview/isDraftModeEnabled";
import { buildOpenGraphMetadata, mergeCapabilitiesPage } from "@/lib/sitePage/merges";
import { getSitePageByRoute } from "@sanity/lib/getSitePage";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const preview = await isDraftModeEnabled();
  const raw = await getSitePageByRoute("capabilities", { preview });
  const { meta } = mergeCapabilitiesPage(raw);
  return {
    title: meta.title,
    description: meta.description,
    ...buildOpenGraphMetadata(meta.ogImageUrl),
  };
}

export default async function CapabilitiesPage() {
  const preview = await isDraftModeEnabled();
  const raw = await getSitePageByRoute("capabilities", { preview });
  const merged = mergeCapabilitiesPage(raw);

  return (
    <>
      <Header />
      <CapabilitiesPageContent intro={merged.intro} zigzagRows={merged.zigzagRows} cta={merged.cta} />
    </>
  );
}
