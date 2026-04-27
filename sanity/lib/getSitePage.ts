import type { Image } from 'sanity'

import type { SitePageRoute } from '../constants/sitePageRoutes'
import { getSanityClient } from './client'
import { urlForImage } from './image'
import { sitePageByRouteQuery } from './queries'

function imageUrl(source: Image | null | undefined, width = 1600): string | null {
  if (!source?.asset) return null
  try {
    return urlForImage(source)?.width(width).fit('max').auto('format').url() ?? null
  } catch {
    return null
  }
}

export type SitePageZigzagRowSerialized = {
  title: string
  reversed: boolean
  linkPath: string
  useComplianceHubGraphic: boolean
  rowImageUrl: string | null
  items: { heading: string; body: string }[]
}

export type SitePageStakeholderCard = { title: string; body: string }
export type SitePageOutcomeDetailCard = { title: string; body: string; bullets: string[] }
export type SitePageUseCaseCard = {
  title: string
  description: string
  tracks: string[]
  outcome: string
}

export type SitePageStatPair = { value: string; label: string }

/** Flattened, JSON-serializable site page for Next.js props. */
export type SitePageView = {
  route: SitePageRoute
  metaTitle: string | null
  metaDescription: string | null
  ogImageUrl: string | null
  heroEyebrow: string | null
  heroTitle: string | null
  heroTitleHighlight: string | null
  heroSubtitle: string | null
  heroSupportingText: string | null
  heroCtaLabel: string | null
  heroIllustrationUrl: string | null
  heroIllustrationAlt: string | null
  homeValueBullets: string[] | null
  lighthouseStats: SitePageStatPair[] | null
  bureauHeroTags: string[] | null
  capabilitiesIntroTitle: string | null
  capabilitiesIntroAccent: string | null
  capabilitiesIntroBody: string | null
  capabilitiesRows: SitePageZigzagRowSerialized[] | null
  capabilitiesCtaKicker: string | null
  capabilitiesCtaTitle: string | null
  capabilitiesCtaBody: string | null
  outcomesHeroPrefix: string | null
  outcomesHeroAccent: string | null
  outcomesHeroParagraph: string | null
  outcomesStakeholderCards: SitePageStakeholderCard[] | null
  outcomesDetailCards: SitePageOutcomeDetailCard[] | null
  outcomesCtaKicker: string | null
  outcomesCtaTitle: string | null
  outcomesCtaBody: string | null
  useCasesHeroPrefix: string | null
  useCasesHeroAccent: string | null
  useCasesHeroParagraph: string | null
  useCasesCards: SitePageUseCaseCard[] | null
  insightsListEyebrow: string | null
  insightsListTitle: string | null
  insightsListEmptyMessage: string | null
}

type RawZigzag = {
  title?: string
  reversed?: boolean
  linkPath?: string
  useComplianceHubGraphic?: boolean
  rowImage?: Image | null
  items?: { heading?: string; body?: string }[] | null
}

function serializeZigzag(rows: RawZigzag[] | null | undefined): SitePageZigzagRowSerialized[] | null {
  if (!rows?.length) return null
  return rows.map((row) => ({
    title: row.title ?? '',
    reversed: Boolean(row.reversed),
    linkPath: row.linkPath ?? '',
    useComplianceHubGraphic: Boolean(row.useComplianceHubGraphic),
    rowImageUrl: imageUrl(row.rowImage ?? undefined, 900),
    items: (row.items ?? [])
      .filter(Boolean)
      .map((it) => ({
        heading: it.heading ?? '',
        body: it.body ?? '',
      })),
  }))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function serializeSitePageDoc(doc: any): SitePageView {
  const route = doc.route as SitePageRoute
  return {
    route,
    metaTitle: doc.metaTitle ?? null,
    metaDescription: doc.metaDescription ?? null,
    ogImageUrl: imageUrl(doc.ogImage),
    heroEyebrow: doc.heroEyebrow ?? null,
    heroTitle: doc.heroTitle ?? null,
    heroTitleHighlight: doc.heroTitleHighlight ?? null,
    heroSubtitle: doc.heroSubtitle ?? null,
    heroSupportingText: doc.heroSupportingText ?? null,
    heroCtaLabel: doc.heroCtaLabel ?? null,
    heroIllustrationUrl: imageUrl(doc.heroIllustration, 1400),
    heroIllustrationAlt: doc.heroIllustrationAlt ?? null,
    homeValueBullets: Array.isArray(doc.homeValueBullets) ? doc.homeValueBullets.filter(Boolean) : null,
    lighthouseStats: Array.isArray(doc.lighthouseStats)
      ? doc.lighthouseStats
          .filter(Boolean)
          .map((s: { value?: string; label?: string }) => ({
            value: s.value ?? '',
            label: s.label ?? '',
          }))
      : null,
    bureauHeroTags: Array.isArray(doc.bureauHeroTags) ? doc.bureauHeroTags.filter(Boolean) : null,
    capabilitiesIntroTitle: doc.capabilitiesIntroTitle ?? null,
    capabilitiesIntroAccent: doc.capabilitiesIntroAccent ?? null,
    capabilitiesIntroBody: doc.capabilitiesIntroBody ?? null,
    capabilitiesRows: serializeZigzag(doc.capabilitiesRows),
    capabilitiesCtaKicker: doc.capabilitiesCtaKicker ?? null,
    capabilitiesCtaTitle: doc.capabilitiesCtaTitle ?? null,
    capabilitiesCtaBody: doc.capabilitiesCtaBody ?? null,
    outcomesHeroPrefix: doc.outcomesHeroPrefix ?? null,
    outcomesHeroAccent: doc.outcomesHeroAccent ?? null,
    outcomesHeroParagraph: doc.outcomesHeroParagraph ?? null,
    outcomesStakeholderCards: Array.isArray(doc.outcomesStakeholderCards)
      ? doc.outcomesStakeholderCards.map((c: { title?: string; body?: string }) => ({
          title: c.title ?? '',
          body: c.body ?? '',
        }))
      : null,
    outcomesDetailCards: Array.isArray(doc.outcomesDetailCards)
      ? doc.outcomesDetailCards.map((c: { title?: string; body?: string; bullets?: string[] }) => ({
          title: c.title ?? '',
          body: c.body ?? '',
          bullets: Array.isArray(c.bullets) ? c.bullets.filter(Boolean) : [],
        }))
      : null,
    outcomesCtaKicker: doc.outcomesCtaKicker ?? null,
    outcomesCtaTitle: doc.outcomesCtaTitle ?? null,
    outcomesCtaBody: doc.outcomesCtaBody ?? null,
    useCasesHeroPrefix: doc.useCasesHeroPrefix ?? null,
    useCasesHeroAccent: doc.useCasesHeroAccent ?? null,
    useCasesHeroParagraph: doc.useCasesHeroParagraph ?? null,
    useCasesCards: Array.isArray(doc.useCasesCards)
      ? doc.useCasesCards.map(
          (c: {
            title?: string
            description?: string
            tracks?: string[]
            outcome?: string
          }) => ({
            title: c.title ?? '',
            description: c.description ?? '',
            tracks: Array.isArray(c.tracks) ? c.tracks.filter(Boolean) : [],
            outcome: c.outcome ?? '',
          }),
        )
      : null,
    insightsListEyebrow: doc.insightsListEyebrow ?? null,
    insightsListTitle: doc.insightsListTitle ?? null,
    insightsListEmptyMessage: doc.insightsListEmptyMessage ?? null,
  }
}

export async function getSitePageByRoute(route: SitePageRoute): Promise<SitePageView | null> {
  const client = getSanityClient()
  if (!client) return null
  const doc = await client.fetch(sitePageByRouteQuery, { route })
  if (!doc) return null
  return serializeSitePageDoc(doc)
}
