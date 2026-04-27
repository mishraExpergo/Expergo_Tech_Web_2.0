import type { SitePageStatPair } from '@sanity/lib/getSitePage'

export const DEFAULT_LIGHTHOUSE_META = {
  title: 'Lighthouse Dashboard — EXPERGO',
  description:
    'The Risk Dashboard Lighthouse acts as the analytical control post for multi-tiered event monitoring.',
} as const

export const DEFAULT_LIGHTHOUSE_HERO = {
  titleLine1: 'Risk Dashboard ',
  titleAccent: 'Lighthouse',
  subtitle:
    'Transforms how institutions monitor and control portfolio risk. A risk control dashboard that reveals how stress forms,moves,and is acted upon across the credit life cycle.',
  ctaLabel: 'Book Demo',
  illustrationUrl: null as string | null,
  illustrationAlt: 'Lighthouse',
} as const

export const DEFAULT_LIGHTHOUSE_STATS: SitePageStatPair[] = [
  { value: '500+', label: 'risk and control views' },
  { value: '50+', label: 'risk signal  ' },
  { value: 'Real Time', label: 'STRESS MONITORING' },
]
