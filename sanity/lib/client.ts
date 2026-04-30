import { createClient, type SanityClient } from 'next-sanity'

import { apiVersion, dataset, isSanityConfigured, projectId, useCdn } from '../env'

let publishedClientInstance: SanityClient | null = null
let previewClientInstance: SanityClient | null = null

function baseClientConfig() {
  return {
    apiVersion,
    dataset,
    projectId,
  }
}

export type SanityClientMode = 'published' | 'preview'

/**
 * Returns a configured Sanity client, or null when public env vars are missing
 * (e.g. Vercel build without NEXT_PUBLIC_SANITY_* — avoids failing the build).
 */
export function getPublishedSanityClient(): SanityClient | null {
  if (!isSanityConfigured) {
    return null
  }
  if (!publishedClientInstance) {
    publishedClientInstance = createClient({
      ...baseClientConfig(),
      useCdn,
      perspective: 'published',
    })
  }
  return publishedClientInstance
}

export function getPreviewSanityClient(): SanityClient | null {
  if (!isSanityConfigured) {
    return null
  }

  const token = process.env.SANITY_API_READ_TOKEN?.trim()
  if (!token) {
    return null
  }

  if (!previewClientInstance) {
    previewClientInstance = createClient({
      ...baseClientConfig(),
      useCdn: false,
      token,
      perspective: 'drafts',
      stega: false,
    })
  }

  return previewClientInstance
}

export function getSanityClient(mode: SanityClientMode = 'published'): SanityClient | null {
  return mode === 'preview' ? getPreviewSanityClient() : getPublishedSanityClient()
}
