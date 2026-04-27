import type { Image } from 'sanity'

import { urlForImage } from './image'

const FALLBACK =
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80'

export function postImageUrl(
  source: Image | null | undefined,
  width = 800
): string {
  if (!source?.asset) {
    return FALLBACK
  }
  try {
    const url = urlForImage(source)?.width(width).height(Math.round((width * 5) / 8)).url()
    return url ?? FALLBACK
  } catch {
    return FALLBACK
  }
}
