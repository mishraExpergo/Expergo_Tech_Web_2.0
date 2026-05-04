import { defineField, defineType } from 'sanity'

import { getContentWorkflowStatusTitle } from '../constants/contentWorkflow'
import { SITE_PAGE_ROUTES } from '../constants/sitePageRoutes'
import { CONTENT_WORKFLOW_FIELDS } from './workflowFields'

const routeOptions = SITE_PAGE_ROUTES.map((value) => ({ title: value, value }))

const statPair = defineField({
  name: 'lighthouseStats',
  title: 'Lighthouse-style stat pairs',
  type: 'array',
  of: [
    {
      type: 'object',
      name: 'statPair',
      fields: [
        { name: 'value', type: 'string', title: 'Value' },
        { name: 'label', type: 'string', title: 'Label' },
      ],
    },
  ],
})

const zigzagItem = {
  type: 'object' as const,
  name: 'capabilitiesZigzagRow',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Product name' }),
    defineField({ name: 'reversed', type: 'boolean', title: 'Reverse layout (image left)' }),
    defineField({
      name: 'linkPath',
      type: 'string',
      title: 'Explore button path',
      description: 'e.g. /capabilities/lighthouse',
    }),
    defineField({
      name: 'useComplianceHubGraphic',
      type: 'boolean',
      title: 'Use Regulus compliance hub animation',
      initialValue: false,
    }),
    defineField({
      name: 'rowImage',
      type: 'image',
      title: 'Panel image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Text items',
      of: [
        {
          type: 'object',
          name: 'zigzagItemBlock',
          fields: [
            { name: 'heading', type: 'string' },
            { name: 'body', type: 'text' },
          ],
        },
      ],
    }),
  ],
}

const stakeholderCard = {
  type: 'object' as const,
  name: 'outcomesStakeholderCard',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'body', type: 'text' },
  ],
}

const outcomeDetailCard = {
  type: 'object' as const,
  name: 'outcomesDetailCard',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'body', type: 'text' },
    {
      name: 'bullets',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
}

const useCaseCard = {
  type: 'object' as const,
  name: 'useCaseCard',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'tracks', type: 'array', of: [{ type: 'string' }], title: 'EarlySafe tracks' },
    { name: 'outcome', type: 'text', title: 'Outcome line' },
  ],
}

export const sitePage = defineType({
  name: 'sitePage',
  title: 'Site page (Legacy)',
  type: 'document',
  groups: [
    { name: 'meta', title: 'SEO & route' },
    { name: 'hero', title: 'Hero & media' },
    { name: 'blocks', title: 'Structured content' },
  ],
  fields: [
    ...CONTENT_WORKFLOW_FIELDS,
    defineField({
      name: 'route',
      title: 'Page route',
      type: 'string',
      group: 'meta',
      options: { list: routeOptions, layout: 'dropdown' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      group: 'meta',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 4,
      group: 'meta',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph image',
      type: 'image',
      group: 'meta',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero eyebrow / badge',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero main title (line 1 or full title)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitleHighlight',
      title: 'Hero title accent (span)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero subtitle / paragraph',
      type: 'text',
      rows: 5,
      group: 'hero',
    }),
    defineField({
      name: 'heroSupportingText',
      title: 'Hero supporting line (e.g. Regulus tagline)',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'heroCtaLabel',
      title: 'Primary CTA label',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroIllustration',
      title: 'Hero illustration (replaces default art when set)',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroIllustrationAlt',
      title: 'Hero illustration alt',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'homeValueBullets',
      title: 'Home: value bullets (one per line)',
      type: 'array',
      group: 'blocks',
      of: [{ type: 'string' }],
    }),
    statPair,
    defineField({
      name: 'bureauHeroTags',
      title: 'Bureau 360: tag pills',
      type: 'array',
      group: 'blocks',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'capabilitiesIntroTitle',
      title: 'Capabilities index: H1 before accent',
      type: 'string',
      group: 'blocks',
    }),
    defineField({
      name: 'capabilitiesIntroAccent',
      title: 'Capabilities index: H1 accent',
      type: 'string',
      group: 'blocks',
    }),
    defineField({
      name: 'capabilitiesIntroBody',
      title: 'Capabilities index: intro paragraph',
      type: 'text',
      rows: 4,
      group: 'blocks',
    }),
    defineField({
      name: 'capabilitiesRows',
      title: 'Capabilities index: zig-zag rows',
      type: 'array',
      group: 'blocks',
      of: [zigzagItem],
    }),
    defineField({
      name: 'capabilitiesCtaKicker',
      type: 'string',
      group: 'blocks',
    }),
    defineField({
      name: 'capabilitiesCtaTitle',
      type: 'string',
      group: 'blocks',
    }),
    defineField({
      name: 'capabilitiesCtaBody',
      type: 'text',
      rows: 4,
      group: 'blocks',
    }),
    defineField({
      name: 'outcomesHeroPrefix',
      title: 'Outcomes: H1 prefix',
      type: 'string',
      group: 'blocks',
    }),
    defineField({
      name: 'outcomesHeroAccent',
      title: 'Outcomes: H1 accent',
      type: 'string',
      group: 'blocks',
    }),
    defineField({
      name: 'outcomesHeroParagraph',
      title: 'Outcomes: hero paragraph',
      type: 'text',
      rows: 4,
      group: 'blocks',
    }),
    defineField({
      name: 'outcomesStakeholderCards',
      type: 'array',
      group: 'blocks',
      of: [stakeholderCard],
    }),
    defineField({
      name: 'outcomesDetailCards',
      type: 'array',
      group: 'blocks',
      of: [outcomeDetailCard],
    }),
    defineField({ name: 'outcomesCtaKicker', type: 'string', group: 'blocks' }),
    defineField({ name: 'outcomesCtaTitle', type: 'string', group: 'blocks' }),
    defineField({ name: 'outcomesCtaBody', type: 'text', rows: 4, group: 'blocks' }),
    defineField({
      name: 'useCasesHeroPrefix',
      title: 'Use cases: H1 prefix',
      type: 'string',
      group: 'blocks',
    }),
    defineField({
      name: 'useCasesHeroAccent',
      title: 'Use cases: H1 accent',
      type: 'string',
      group: 'blocks',
    }),
    defineField({
      name: 'useCasesHeroParagraph',
      type: 'text',
      rows: 4,
      group: 'blocks',
    }),
    defineField({
      name: 'useCasesCards',
      type: 'array',
      group: 'blocks',
      of: [useCaseCard],
    }),
    defineField({
      name: 'insightsListEyebrow',
      type: 'string',
      group: 'blocks',
    }),
    defineField({
      name: 'insightsListTitle',
      type: 'string',
      group: 'blocks',
    }),
    defineField({
      name: 'insightsListEmptyMessage',
      type: 'text',
      rows: 2,
      group: 'blocks',
    }),
  ],
  preview: {
    select: { route: 'route', metaTitle: 'metaTitle', status: 'status' },
    prepare({ route, metaTitle, status }) {
      return {
        title: metaTitle || route || 'Site page',
        subtitle: `${route ?? 'No route'} • ${getContentWorkflowStatusTitle(status)}`,
      }
    },
  },
})
