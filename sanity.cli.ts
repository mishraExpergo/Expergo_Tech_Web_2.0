import { defineCliConfig } from 'sanity/cli'

/**
 * Returns the studio **slug** for `https://<slug>.sanity.studio`.
 *
 * When `sanity deploy` uploads a build to Sanity hosting, their API rejects requests that mix
 * "external application" registrations with tarball uploads (`400 External applications cannot upload tarballs`).
 * Typical fixes:
 *
 * - Set `SANITY_STUDIO_HOSTNAME` to your **hosted** slug only (e.g. `expergo`) or
 *   `https://expergo.sanity.studio` — never your public Next.js URL (marketing domain).
 * - If Studio is embedded at `/studio` only, skip `sanity deploy` entirely and deploy Next.js instead;
 *   use `npm run sanity:schema:deploy` for schema.
 * - If you use `SANITY_STUDIO_APP_ID` for embedding but tarball deploy fails, set
 *   `SANITY_CLI_OMIT_DEPLOYMENT_APP_ID=true` so the CLI skips `deployment.appId` during deploy only.
 *
 * Optional: `SANITY_STUDIO_APP_ID` from manage.sanity.io → Studio.
 */
function normalizeStudioHost(raw: string): string {
  const trimmed = raw.trim()
  const withoutProto = trimmed.replace(/^https?:\/\//i, '')
  const host = withoutProto.split('/')[0]?.toLowerCase() ?? ''

  // Reject `sanity.studio` / `.sanity.studio` (would yield an empty or invalid slug).
  if (host.endsWith('.sanity.studio')) {
    const slug = host.replace(/\.sanity\.studio$/i, '')
    if (!slug || slug.includes('.')) {
      throw new Error(
        `[sanity.cli] Invalid SANITY_STUDIO_HOSTNAME="${raw}". ` +
          `Use a subdomain before .sanity.studio (e.g. https://expergo.sanity.studio) ` +
          `or the slug only (e.g. expergo).`,
      )
    }
    return slug
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
const omitDeploymentAppId =
  process.env.SANITY_CLI_OMIT_DEPLOYMENT_APP_ID?.toLowerCase() === 'true'

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
  ...(process.env.SANITY_STUDIO_APP_ID && !omitDeploymentAppId
    ? { deployment: { appId: process.env.SANITY_STUDIO_APP_ID, autoUpdates: false } }
    : {}),
})
