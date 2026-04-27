/** Sanity `sitePage.route` values — single source for schema + app. */
export const SITE_PAGE_ROUTES = [
  'home',
  'platform',
  'capabilities',
  'capabilities-lighthouse',
  'capabilities-regulas',
  'capabilities-command-center',
  'capabilities-bureau-360',
  'outcomes',
  'use-cases',
  'insights',
] as const

export type SitePageRoute = (typeof SITE_PAGE_ROUTES)[number]

export function isSitePageRoute(s: string): s is SitePageRoute {
  return (SITE_PAGE_ROUTES as readonly string[]).includes(s)
}
