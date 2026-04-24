import { createClient, type SanityClient } from 'next-sanity'

import { apiVersion, dataset, isSanityConfigured, projectId, useCdn } from '../env'

let clientInstance: SanityClient | null = null

/**
 * Returns a configured Sanity client, or null when public env vars are missing
 * (e.g. Vercel build without NEXT_PUBLIC_SANITY_* — avoids failing the build).
 */
export function getSanityClient(): SanityClient | null {
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
  return clientInstance
}
