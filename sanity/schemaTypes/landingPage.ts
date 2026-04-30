import { defineField, defineType } from 'sanity'

import { LANDING_PAGE_ROUTES } from '../constants/contentRoutes'
import { getContentWorkflowStatusTitle } from '../constants/contentWorkflow'
import { CONTENT_WORKFLOW_FIELDS } from './workflowFields'

const landingRouteOptions = LANDING_PAGE_ROUTES.map((value) => ({ title: value, value }))

export const landingPage = defineType({
  name: 'landingPage',
  title: 'Landing page',
  type: 'document',
  groups: [
    { name: 'meta', title: 'SEO & route' },
    { name: 'hero', title: 'Hero' },
    { name: 'content', title: 'Content' },
  ],
  fields: [
    ...CONTENT_WORKFLOW_FIELDS,
    defineField({
      name: 'route',
      title: 'Page route',
      type: 'string',
      group: 'meta',
      options: { list: landingRouteOptions, layout: 'dropdown' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'metaTitle', title: 'Meta title', type: 'string', group: 'meta' }),
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
    defineField({ name: 'heroEyebrow', title: 'Hero eyebrow', type: 'string', group: 'hero' }),
    defineField({ name: 'heroTitle', title: 'Hero title', type: 'string', group: 'hero' }),
    defineField({
      name: 'heroTitleHighlight',
      title: 'Hero title highlight',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero subtitle',
      type: 'text',
      rows: 5,
      group: 'hero',
    }),
    defineField({ name: 'heroCtaLabel', title: 'CTA label', type: 'string', group: 'hero' }),
    defineField({
      name: 'homeValueBullets',
      title: 'Value bullets',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'outcomesHeroPrefix',
      title: 'Outcomes heading prefix',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'outcomesHeroAccent',
      title: 'Outcomes heading accent',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'outcomesHeroParagraph',
      title: 'Outcomes paragraph',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'useCasesHeroPrefix',
      title: 'Use cases heading prefix',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'useCasesHeroAccent',
      title: 'Use cases heading accent',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'useCasesHeroParagraph',
      title: 'Use cases paragraph',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
  ],
  preview: {
    select: { route: 'route', metaTitle: 'metaTitle', status: 'status' },
    prepare({ route, metaTitle, status }) {
      return {
        title: metaTitle || route || 'Landing page',
        subtitle: `${route ?? 'No route'} • ${getContentWorkflowStatusTitle(status)}`,
      }
    },
  },
})
