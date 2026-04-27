import type { Metadata } from "next";

import { Header } from "@/components/Header";
import Home from "@/components/Homepage/Home";
import { buildOpenGraphMetadata, mergeHomePage } from "@/lib/sitePage/merges";
import { getSitePageByRoute } from "@sanity/lib/getSitePage";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const raw = await getSitePageByRoute("home");
  const { meta } = mergeHomePage(raw);
  return {
    title: meta.title,
    description: meta.description,
    ...buildOpenGraphMetadata(meta.ogImageUrl),
  };
}

export default async function HomePage() {
  const raw = await getSitePageByRoute("home");
  const { hero } = mergeHomePage(raw);

  return (
    <>
      <Header />
      <Home hero={hero} />
    </>
  );
}
