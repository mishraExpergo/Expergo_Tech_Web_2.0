import type { SitePageOutcomeDetailCard, SitePageStakeholderCard } from '@sanity/lib/getSitePage'

export const DEFAULT_OUTCOMES_META = {
  title: 'Outcomes — EXPERGO',
  description:
    'Measurable portfolio outcomes for CRO, Collections, CEO, and Board—capital stability, earlier intervention, and governance transparency with EarlySafe.',
} as const

export const DEFAULT_OUTCOMES_HERO = {
  prefix: 'Measurable Portfolio',
  accent: 'Outcomes',
  paragraph:
    'EarlySafe is designed to influence portfolio trajectory not simply observe delinquency. Structured controls produce measurable institutional impact.',
} as const

export const DEFAULT_OUTCOMES_STAKEHOLDER_CARDS: SitePageStakeholderCard[] = [
  { title: 'For CRO', body: 'Capital stability, early intervention.' },
  { title: 'For Head of Collections', body: 'Capacity optimization, better prioritisation.' },
  { title: 'For CEO', body: 'Predictable growth, risk-adjusted expansion.' },
  { title: 'For Board / Audit', body: 'Governance transparency and defensibility.' },
]

export const DEFAULT_OUTCOMES_DETAIL_CARDS: SitePageOutcomeDetailCard[] = [
  {
    title: 'Early Identification of Deterioration',
    body: 'Stress rarely appears first in DPD. By detecting behavioural deviations and migration momentum early, institutions gain time to intervene before slippage compounds.',
    bullets: ['Reduced surprise deterioration', 'Improved vintage stability', 'Greater forward visibility'],
  },
  {
    title: 'Reduced Flow-Forward Volatility',
    body: 'Migration between buckets is rarely random. By modelling risk acceleration and concentration patterns, institutions stabilize forward movement across cohorts.',
    bullets: ['Lower roll-rate volatility', 'Reduced Stage migration', 'More predictable portfolio behaviour'],
  },
  {
    title: 'Improved Allocation of Capacity',
    body: 'Collections bandwidth is finite. By prioritising exposure based on trajectory and concentration risk, institutions allocate effort where capital impact is highest.',
    bullets: ['Higher intervention efficiency', 'Lower avoidable slippage', 'Improved recovery focus'],
  },
]

export const DEFAULT_OUTCOMES_CTA = {
  kicker: 'Institutionalize Control',
  title: 'Capital resilience requires structural discipline.',
  body: 'Institutions that manage risk formation early preserve stability and unlock measured growth. EarlySafe. Continuous Portfolio Risk Control.',
} as const
