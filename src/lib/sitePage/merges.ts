import type { Metadata } from 'next'

import type { SitePageView, SitePageZigzagRowSerialized } from '@sanity/lib/getSitePage'

import {
  DEFAULT_CAPABILITIES_CTA,
  DEFAULT_CAPABILITIES_INTRO,
  DEFAULT_CAPABILITIES_META,
  DEFAULT_CAPABILITIES_ZIGZAG,
} from '@/lib/sitePage/defaults/capabilitiesDefaults'
import {
  DEFAULT_BUREAU_HERO,
  DEFAULT_BUREAU_META,
  DEFAULT_BUREAU_TAGS,
} from '@/lib/sitePage/defaults/bureauDefaults'
import {
  DEFAULT_COMMAND_HERO,
  DEFAULT_COMMAND_META,
} from '@/lib/sitePage/defaults/commandDefaults'
import { DEFAULT_HOME_HERO, DEFAULT_HOME_META } from '@/lib/sitePage/defaults/homeDefaults'
import {
  DEFAULT_INSIGHTS_LIST_COPY,
  DEFAULT_INSIGHTS_LIST_META,
} from '@/lib/sitePage/defaults/insightsListDefaults'
import {
  DEFAULT_LIGHTHOUSE_HERO,
  DEFAULT_LIGHTHOUSE_META,
  DEFAULT_LIGHTHOUSE_STATS,
} from '@/lib/sitePage/defaults/lighthouseDefaults'
import {
  DEFAULT_OUTCOMES_CTA,
  DEFAULT_OUTCOMES_DETAIL_CARDS,
  DEFAULT_OUTCOMES_HERO,
  DEFAULT_OUTCOMES_META,
  DEFAULT_OUTCOMES_STAKEHOLDER_CARDS,
} from '@/lib/sitePage/defaults/outcomesDefaults'
import { DEFAULT_PLATFORM_HERO, DEFAULT_PLATFORM_META } from '@/lib/sitePage/defaults/platformDefaults'
import { DEFAULT_REGULUS_HERO, DEFAULT_REGULUS_META } from '@/lib/sitePage/defaults/regulusDefaults'
import {
  DEFAULT_USE_CASES_CARDS,
  DEFAULT_USE_CASES_HERO,
  DEFAULT_USE_CASES_META,
} from '@/lib/sitePage/defaults/useCasesDefaults'

export type CapabilityZigzagPanelRow = {
  title: string
  reversed: boolean
  route: string
  image?: string
  graphic?: 'compliance-hub'
  items: { heading: string; body: string }[]
}

function zigzagToPanelRow(r: SitePageZigzagRowSerialized): CapabilityZigzagPanelRow {
  return {
    title: r.title,
    reversed: r.reversed,
    route: r.linkPath,
    graphic: r.useComplianceHubGraphic ? 'compliance-hub' : undefined,
    image: r.useComplianceHubGraphic ? undefined : r.rowImageUrl ?? undefined,
    items: r.items,
  }
}

export function mergeCapabilitiesPage(s: SitePageView | null) {
  const meta = {
    title: s?.metaTitle ?? DEFAULT_CAPABILITIES_META.title,
    description: s?.metaDescription ?? DEFAULT_CAPABILITIES_META.description,
    ogImageUrl: s?.ogImageUrl ?? null,
  }
  const intro = {
    line1: s?.capabilitiesIntroTitle ?? DEFAULT_CAPABILITIES_INTRO.line1,
    accent: s?.capabilitiesIntroAccent ?? DEFAULT_CAPABILITIES_INTRO.accent,
    body: s?.capabilitiesIntroBody ?? DEFAULT_CAPABILITIES_INTRO.body,
  }
  const zigzagRows: CapabilityZigzagPanelRow[] =
    s?.capabilitiesRows?.length && s.capabilitiesRows.every((r) => r.title && r.linkPath)
      ? s.capabilitiesRows.map(zigzagToPanelRow)
      : DEFAULT_CAPABILITIES_ZIGZAG.map(zigzagToPanelRow)
  const cta = {
    kicker: s?.capabilitiesCtaKicker ?? DEFAULT_CAPABILITIES_CTA.kicker,
    title: s?.capabilitiesCtaTitle ?? DEFAULT_CAPABILITIES_CTA.title,
    body: s?.capabilitiesCtaBody ?? DEFAULT_CAPABILITIES_CTA.body,
  }
  return { meta, intro, zigzagRows, cta }
}

export type MergedHomeHero = {
  eyebrow: string
  titleLine1: string
  titleAccent: string
  bullets: [string, string, string]
  ctaLabel: string
  heroImageUrl: string | null
  heroImageAlt: string
}

export function mergeHomePage(s: SitePageView | null): { meta: { title: string; description: string; ogImageUrl: string | null }; hero: MergedHomeHero } {
  const meta = {
    title: s?.metaTitle ?? DEFAULT_HOME_META.title,
    description: s?.metaDescription ?? DEFAULT_HOME_META.description,
    ogImageUrl: s?.ogImageUrl ?? null,
  }
  const bulletsRaw = s?.homeValueBullets?.length ? s.homeValueBullets : [...DEFAULT_HOME_HERO.bullets]
  const bullets = [bulletsRaw[0] ?? '', bulletsRaw[1] ?? '', bulletsRaw[2] ?? ''] as [string, string, string]
  const hero = {
    eyebrow: s?.heroEyebrow ?? DEFAULT_HOME_HERO.eyebrow,
    titleLine1: s?.heroTitle ?? DEFAULT_HOME_HERO.titleLine1,
    titleAccent: s?.heroTitleHighlight ?? DEFAULT_HOME_HERO.titleAccent,
    bullets,
    ctaLabel: s?.heroCtaLabel ?? DEFAULT_HOME_HERO.ctaLabel,
    heroImageUrl: s?.heroIllustrationUrl ?? DEFAULT_HOME_HERO.heroImageUrl,
    heroImageAlt: s?.heroIllustrationAlt ?? DEFAULT_HOME_HERO.heroImageAlt,
  }
  return { meta, hero }
}

export function mergePlatformPage(s: SitePageView | null) {
  return {
    meta: {
      title: s?.metaTitle ?? DEFAULT_PLATFORM_META.title,
      description: s?.metaDescription ?? DEFAULT_PLATFORM_META.description,
      ogImageUrl: s?.ogImageUrl ?? null,
    },
    hero: {
      titleLine1: s?.heroTitle ?? DEFAULT_PLATFORM_HERO.titleLine1,
      titleAccent: s?.heroTitleHighlight ?? DEFAULT_PLATFORM_HERO.titleAccent,
      subtitle: s?.heroSubtitle ?? DEFAULT_PLATFORM_HERO.subtitle,
      ctaLabel: s?.heroCtaLabel ?? DEFAULT_PLATFORM_HERO.ctaLabel,
    },
  }
}

export function mergeOutcomesPage(s: SitePageView | null) {
  return {
    meta: {
      title: s?.metaTitle ?? DEFAULT_OUTCOMES_META.title,
      description: s?.metaDescription ?? DEFAULT_OUTCOMES_META.description,
      ogImageUrl: s?.ogImageUrl ?? null,
    },
    hero: {
      prefix: s?.outcomesHeroPrefix ?? DEFAULT_OUTCOMES_HERO.prefix,
      accent: s?.outcomesHeroAccent ?? DEFAULT_OUTCOMES_HERO.accent,
      paragraph: s?.outcomesHeroParagraph ?? DEFAULT_OUTCOMES_HERO.paragraph,
    },
    stakeholderCards: s?.outcomesStakeholderCards?.length
      ? s.outcomesStakeholderCards
      : DEFAULT_OUTCOMES_STAKEHOLDER_CARDS,
    outcomeDetailCards: s?.outcomesDetailCards?.length
      ? s.outcomesDetailCards
      : DEFAULT_OUTCOMES_DETAIL_CARDS,
    cta: {
      kicker: s?.outcomesCtaKicker ?? DEFAULT_OUTCOMES_CTA.kicker,
      title: s?.outcomesCtaTitle ?? DEFAULT_OUTCOMES_CTA.title,
      body: s?.outcomesCtaBody ?? DEFAULT_OUTCOMES_CTA.body,
    },
  }
}

export function mergeUseCasesPage(s: SitePageView | null) {
  return {
    meta: {
      title: s?.metaTitle ?? DEFAULT_USE_CASES_META.title,
      description: s?.metaDescription ?? DEFAULT_USE_CASES_META.description,
      ogImageUrl: s?.ogImageUrl ?? null,
    },
    hero: {
      prefix: s?.useCasesHeroPrefix ?? DEFAULT_USE_CASES_HERO.prefix,
      accent: s?.useCasesHeroAccent ?? DEFAULT_USE_CASES_HERO.accent,
      paragraph: s?.useCasesHeroParagraph ?? DEFAULT_USE_CASES_HERO.paragraph,
    },
    cards: s?.useCasesCards?.length ? s.useCasesCards : DEFAULT_USE_CASES_CARDS,
  }
}

export function mergeInsightsListPage(s: SitePageView | null) {
  return {
    meta: {
      title: s?.metaTitle ?? DEFAULT_INSIGHTS_LIST_META.title,
      description: s?.metaDescription ?? DEFAULT_INSIGHTS_LIST_META.description,
      ogImageUrl: s?.ogImageUrl ?? null,
    },
    list: {
      eyebrow: s?.insightsListEyebrow ?? DEFAULT_INSIGHTS_LIST_COPY.eyebrow,
      title: s?.insightsListTitle ?? DEFAULT_INSIGHTS_LIST_COPY.title,
      emptyMessage: s?.insightsListEmptyMessage ?? DEFAULT_INSIGHTS_LIST_COPY.emptyMessage,
    },
  }
}

export function mergeLighthousePage(s: SitePageView | null) {
  return {
    meta: {
      title: s?.metaTitle ?? DEFAULT_LIGHTHOUSE_META.title,
      description: s?.metaDescription ?? DEFAULT_LIGHTHOUSE_META.description,
      ogImageUrl: s?.ogImageUrl ?? null,
    },
    hero: {
      titleLine1: s?.heroTitle ?? DEFAULT_LIGHTHOUSE_HERO.titleLine1,
      titleAccent: s?.heroTitleHighlight ?? DEFAULT_LIGHTHOUSE_HERO.titleAccent,
      subtitle: s?.heroSubtitle ?? DEFAULT_LIGHTHOUSE_HERO.subtitle,
      ctaLabel: s?.heroCtaLabel ?? DEFAULT_LIGHTHOUSE_HERO.ctaLabel,
      illustrationUrl: s?.heroIllustrationUrl ?? DEFAULT_LIGHTHOUSE_HERO.illustrationUrl,
      illustrationAlt: s?.heroIllustrationAlt ?? DEFAULT_LIGHTHOUSE_HERO.illustrationAlt,
    },
    stats: s?.lighthouseStats?.length ? s.lighthouseStats : DEFAULT_LIGHTHOUSE_STATS,
  }
}

export function mergeRegulusPage(s: SitePageView | null) {
  return {
    meta: {
      title: s?.metaTitle ?? DEFAULT_REGULUS_META.title,
      description: s?.metaDescription ?? DEFAULT_REGULUS_META.description,
      ogImageUrl: s?.ogImageUrl ?? null,
    },
    hero: {
      title: s?.heroTitle ?? DEFAULT_REGULUS_HERO.title,
      subtitle: s?.heroSubtitle ?? DEFAULT_REGULUS_HERO.subtitle,
      supporting: s?.heroSupportingText ?? DEFAULT_REGULUS_HERO.supporting,
      ctaLabel: s?.heroCtaLabel ?? DEFAULT_REGULUS_HERO.ctaLabel,
    },
  }
}

export function mergeCommandPage(s: SitePageView | null) {
  return {
    meta: {
      title: s?.metaTitle ?? DEFAULT_COMMAND_META.title,
      description: s?.metaDescription ?? DEFAULT_COMMAND_META.description,
      ogImageUrl: s?.ogImageUrl ?? null,
    },
    hero: {
      title: s?.heroTitle ?? DEFAULT_COMMAND_HERO.title,
      subtitle: s?.heroSubtitle ?? DEFAULT_COMMAND_HERO.subtitle,
      ctaLabel: s?.heroCtaLabel ?? DEFAULT_COMMAND_HERO.ctaLabel,
      sideImageUrl: s?.heroIllustrationUrl ?? DEFAULT_COMMAND_HERO.sideImageUrl,
      sideImageAlt: s?.heroIllustrationAlt ?? DEFAULT_COMMAND_HERO.sideImageAlt,
    },
  }
}

export function mergeBureauPage(s: SitePageView | null) {
  const tags = s?.bureauHeroTags?.length ? s.bureauHeroTags : [...DEFAULT_BUREAU_TAGS]
  return {
    meta: {
      title: s?.metaTitle ?? DEFAULT_BUREAU_META.title,
      description: s?.metaDescription ?? DEFAULT_BUREAU_META.description,
      ogImageUrl: s?.ogImageUrl ?? null,
    },
    hero: {
      title: s?.heroTitle ?? DEFAULT_BUREAU_HERO.title,
      subtitle: s?.heroSubtitle ?? DEFAULT_BUREAU_HERO.subtitle,
      ctaLabel: s?.heroCtaLabel ?? DEFAULT_BUREAU_HERO.ctaLabel,
      tags,
    },
  }
}

export function buildOpenGraphMetadata(ogImageUrl: string | null): Pick<Metadata, 'openGraph' | 'twitter'> {
  if (!ogImageUrl) return {}
  return {
    openGraph: { images: [{ url: ogImageUrl }] },
    twitter: { card: 'summary_large_image', images: [ogImageUrl] },
  }
}

