import { createClient, type SanityClient } from 'next-sanity'

import { apiVersion, dataset, isSanityConfigured, projectId, useCdn } from '../env'

let clientInstance: SanityClient | null = null

/**
 * Returns a configured Sanity client, or null when public env vars are missing
 * (e.g. Vercel build without NEXT_PUBLIC_SANITY_* — avoids failing the build).
 */
export function getSanityClient(preview?: { isDraftMode: boolean; token?: string }): SanityClient | null {
  if (!isSanityConfigured) {
    return null
  }
  if (!clientInstance) {
    clientInstance = createClient({
      apiVersion,
      dataset,
      projectId,
      useCdn,
    })
  }

  if (preview?.isDraftMode && preview?.token) {
    return clientInstance.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: 'previewDrafts',
    })
  }

  return clientInstance
}
