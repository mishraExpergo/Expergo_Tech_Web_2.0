import { defineCliConfig } from 'sanity/cli'

/**
 * CLI deploy (`npm run sanity:deploy`) must target a ***.sanity.studio** hostname.
 * If you pick `https://www.expergo.tech/` at the prompt, deploy fails with:
 * "External applications cannot upload tarballs" — that URL is your Next.js site,
 * not Sanity-hosted storage for the tarball.
 *
 * Set `SANITY_STUDIO_HOSTNAME` to a unique slug (e.g. `expergo`) so deploy goes to
 * `https://<slug>.sanity.studio` without choosing the marketing domain.
 * Optional: `SANITY_STUDIO_APP_ID` from the first successful deploy or manage.sanity.io → Studio.
 */
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  project: {
    basePath: '/studio',
  },
  ...(process.env.SANITY_STUDIO_HOSTNAME
    ? { studioHost: process.env.SANITY_STUDIO_HOSTNAME }
    : {}),
  ...(process.env.SANITY_STUDIO_APP_ID
    ? { deployment: { appId: process.env.SANITY_STUDIO_APP_ID } }
    : {}),
})
