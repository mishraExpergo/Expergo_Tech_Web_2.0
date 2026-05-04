import type { Metadata } from "next";

import { CapabilitiesPageContent } from "@/components/capabilities/CapabilitiesPageContent";
import { Header } from "@/components/Header";
import { buildOpenGraphMetadata, mergeCapabilitiesPage } from "@/lib/sitePage/merges";
import { getSitePageByRoute } from "@sanity/lib/getSitePage";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const raw = await getSitePageByRoute("capabilities");
  const { meta } = mergeCapabilitiesPage(raw);
  return {
    title: meta.title,
    description: meta.description,
    ...buildOpenGraphMetadata(meta.ogImageUrl),
  };
}

export default async function CapabilitiesPage() {
  const raw = await getSitePageByRoute("capabilities");
  const merged = mergeCapabilitiesPage(raw);

  return (
    <>
      <Header />
      <CapabilitiesPageContent intro={merged.intro} zigzagRows={merged.zigzagRows} cta={merged.cta} />
    </>
  );
}
