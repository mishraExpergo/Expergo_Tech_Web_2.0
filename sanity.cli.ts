import { defineCliConfig } from 'sanity/cli'

/**
 * Returns the studio **slug** for `https://<slug>.sanity.studio`.
 *
 * `sanity deploy` only uploads tarballs to Sanity-hosted studios. If
 * `SANITY_STUDIO_HOSTNAME` is a marketing domain (e.g. www.example.com), deploy fails with:
 * "External applications cannot upload tarballs".
 *
 * Set `SANITY_STUDIO_HOSTNAME=expergo` (slug only), or `https://expergo.sanity.studio` — not your Next.js site URL.
 * Optional: `SANITY_STUDIO_APP_ID` from manage.sanity.io → Studio.
 */
function normalizeStudioHost(raw: string): string {
  const trimmed = raw.trim()
  const withoutProto = trimmed.replace(/^https?:\/\//i, '')
  const host = withoutProto.split('/')[0]?.toLowerCase() ?? ''

  if (host.endsWith('.sanity.studio')) {
    return host.replace(/\.sanity\.studio$/i, '')
  }

  // Slug only, no dots (e.g. "expergo")
  if (host && !host.includes('.')) {
    return host
  }

  throw new Error(
    `[sanity.cli] Invalid SANITY_STUDIO_HOSTNAME="${raw}". ` +
      `Use the Sanity Studio slug only (e.g. expergo → https://expergo.sanity.studio), ` +
      `not a public website domain. Embedded Studio at /studio does not require sanity deploy unless you also use hosted studio.`,
  )
}

const studioHostEnv = process.env.SANITY_STUDIO_HOSTNAME?.trim()

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  project: {
    basePath: '/studio',
  },
  ...(studioHostEnv ? { studioHost: normalizeStudioHost(studioHostEnv) } : {}),
  // autoUpdates requires @sanity/vision in package.json (same major as sanity) for version checks.
  // This project embeds Studio without Vision — keep autoUpdates off to avoid deploy build errors.
  ...(process.env.SANITY_STUDIO_APP_ID
    ? { deployment: { appId: process.env.SANITY_STUDIO_APP_ID, autoUpdates: false } }
    : {}),
})
