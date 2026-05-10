import type { Metadata } from 'next'

/** Shared Open Graph / Twitter card metadata when Sanity provides an OG image URL. */
export function buildOpenGraphMetadata(ogImageUrl: string | null): Pick<Metadata, 'openGraph' | 'twitter'> {
  if (!ogImageUrl) return {}
  return {
    openGraph: { images: [{ url: ogImageUrl }] },
    twitter: { card: 'summary_large_image', images: [ogImageUrl] },
  }
}
