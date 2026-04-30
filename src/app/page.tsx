import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { isDraftModeEnabled } from "@/lib/preview/isDraftModeEnabled";
import Home from "@/components/Homepage/Home";
import { buildOpenGraphMetadata, mergeHomePage } from "@/lib/sitePage/merges";
import { getSitePageByRoute } from "@sanity/lib/getSitePage";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const preview = await isDraftModeEnabled();
  const raw = await getSitePageByRoute("home", { preview });
  const { meta } = mergeHomePage(raw);
  return {
    title: meta.title,
    description: meta.description,
    ...buildOpenGraphMetadata(meta.ogImageUrl),
  };
}

export default async function HomePage() {
  const preview = await isDraftModeEnabled();
  const raw = await getSitePageByRoute("home", { preview });
  const { hero } = mergeHomePage(raw);

  return (
    <>
      <Header />
      <Home hero={hero} />
    </>
  );
}
