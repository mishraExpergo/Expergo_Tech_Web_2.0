import type { SitePageZigzagRowSerialized } from '@sanity/lib/getSitePage'

export const DEFAULT_CAPABILITIES_META = {
  title: 'Capabilities — EXPERGO',
  description:
    'Explore Lighthouse, Regulus, Command Center, and Bureau 360°—the EarlySafe capabilities stack for continuous portfolio risk control.',
} as const

export const DEFAULT_CAPABILITIES_INTRO = {
  line1: 'Portfolio Risk ',
  accent: 'Capabilities',
  body: 'EarlySafe provides an integrated framework for detecting, modelling, and controlling portfolio risk across regulated lending environments. Each capability operates within a unified risk architecture — not as isolated modules.',
} as const

export const DEFAULT_CAPABILITIES_CTA = {
  kicker: 'Institutionalize Control',
  title: 'Capital resilience requires structural discipline.',
  body: 'Institutions that manage risk formation early preserve stability and unlock measured growth. EarlySafe. Continuous Portfolio Risk Control.',
} as const

export const DEFAULT_CAPABILITIES_ZIGZAG: SitePageZigzagRowSerialized[] = [
  {
    title: 'Lighthouse',
    reversed: false,
    linkPath: '/capabilities/lighthouse',
    useComplianceHubGraphic: false,
    rowImageUrl: '/tr-removebg-preview (1).png',
    items: [
      {
        heading: 'Early Stress Detection',
        body: 'Surface early warning signals across behavioural shifts, bureau movement, and emerging portfolio stress.',
      },
      {
        heading: 'Portfolio Concentration Impact',
        body: 'Track vintage, segment, and geographic concentration to understand capital at risk build up',
      },
    ],
  },
  {
    title: 'Regulus',
    reversed: true,
    linkPath: '/capabilities/regulas',
    useComplianceHubGraphic: true,
    rowImageUrl: null,
    items: [
      {
        heading: 'Governance & Regulatory Alignment',
        body: 'Ensure structured, traceable, and defensible compliance aligned with regulatory expectations.',
      },
      {
        heading: 'Early Warning Signal Governance',
        body: 'Map signals to actions with clear ownership, timelines, and audit-ready documentation.',
      },
    ],
  },
  {
    title: 'Command Center',
    reversed: false,
    linkPath: '/capabilities/command-center',
    useComplianceHubGraphic: false,
    rowImageUrl: '/1 1.png',
    items: [
      {
        heading: 'Operational Risk Control',
        body: 'Translate insights into action through structured prioritisation, escalation, and execution workflows.',
      },
      {
        heading: 'Resolution & Escalation Control',
        body: 'Drive disciplined follow-through with SLA tracking, ownership clarity, and controlled case closure.',
      },
    ],
  },
  {
    title: 'Bureau 360°',
    reversed: true,
    linkPath: '/capabilities/bureau-360',
    useComplianceHubGraphic: false,
    rowImageUrl: '/Frame 3033 (1).svg',
    items: [
      {
        heading: 'External Risk Signals',
        body: 'Identify anomalies, exposure shifts, and emerging external signals across borrower profiles.',
      },
      {
        heading: 'Exposure & Behaviour Tracking',
        body: 'Monitor credit exposure, leverage patterns, enquiry activity, and cross-lender risk across segments.',
      },
    ],
  },
]
