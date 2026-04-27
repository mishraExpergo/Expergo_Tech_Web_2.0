import type { SitePageUseCaseCard } from '@sanity/lib/getSitePage'

export const DEFAULT_USE_CASES_META = {
  title: 'Use Cases — Secured Lending Portfolios | EXPERGO',
  description:
    'EarlySafe for residential mortgage, CRE, auto, equipment, inventory, and project finance—structured risk control across secured lending portfolios.',
} as const

export const DEFAULT_USE_CASES_HERO = {
  prefix: 'Secured ',
  accent: 'Lending Portfolios',
  paragraph:
    'EarlySafe supports structured risk control across asset-backed lending portfolios where collateral value, cash-flow stability, and migration discipline determine capital resilience.',
} as const

export const DEFAULT_USE_CASES_CARDS: SitePageUseCaseCard[] = [
  {
    title: 'Residential Mortgage Loans',
    description:
      'Loans secured by residential property. Risk drivers extend beyond payment behaviour.',
    tracks: ['LTV movement', 'Delinquency progression', 'Property valuation shifts', 'Localised market stress'],
    outcome: 'Earlier identification of deterioration regimes before collateral stress.',
  },
  {
    title: 'Commercial Real Estate (CRE)',
    description:
      'Loans secured by income-generating property. Risk concentration forms through occupancy decline.',
    tracks: ['Occupancy & rent roll', 'DSCR shifts', 'Cap rate movements', 'Valuation stress signals'],
    outcome: 'Structured monitoring of income-based collateral before capital volatility.',
  },
  {
    title: 'Auto Finance',
    description: 'Loans secured by vehicles. Asset depreciation and behavioural shift intersect.',
    tracks: ['Payment irregularities', 'Vehicle depreciation curves', 'Credit event indicators', 'Migration velocity'],
    outcome: 'Reduced flow-forward acceleration in high-volume secured portfolios.',
  },
  {
    title: 'Equipment Financing',
    description:
      'Loans secured by machinery. Operational utilisation influences credit stability.',
    tracks: ['Maintenance indicators', 'Resale value trends', 'Business exposure signals'],
    outcome: 'Improved early stress detection in asset-backed business lending.',
  },
  {
    title: 'Inventory & Working Capital',
    description: 'Collateral value fluctuates with turnover and seasonality.',
    tracks: ['Inventory ageing', 'Seasonal demand patterns', 'Receivable concentration'],
    outcome: 'Better anticipation of liquidity-driven migration risk.',
  },
  {
    title: 'Project & Construction Finance',
    description:
      'Exposure secured by project assets. Completion risk often precedes payment disruption.',
    tracks: ['Milestone deviation signals', 'Cost overrun indicators', 'Cash flow shortfalls'],
    outcome: 'Forward visibility into execution risk before structural impairment.',
  },
]
