export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || '2024-04-22'

/** Trimmed dataset from env, or empty string if unset (e.g. Vercel preview without env). */
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ?? ''

/** Trimmed project id from env, or empty string if unset. */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ?? ''

export const useCdn = false

/** True when both public Sanity env vars are set — required for API and /insights. */
export const isSanityConfigured = dataset.length > 0 && projectId.length > 0
