import { defineField, defineType } from 'sanity'

import { SERVICE_PAGE_ROUTES } from '../constants/contentRoutes'
import { getContentWorkflowStatusTitle } from '../constants/contentWorkflow'
import { CONTENT_WORKFLOW_FIELDS } from './workflowFields'

const serviceRouteOptions = SERVICE_PAGE_ROUTES.map((value) => ({ title: value, value }))

export const servicePage = defineType({
  name: 'servicePage',
  title: 'Service page',
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
      options: { list: serviceRouteOptions, layout: 'dropdown' },
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
      name: 'heroIllustration',
      title: 'Hero illustration',
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
      name: 'lighthouseStats',
      title: 'Stats',
      type: 'array',
      group: 'content',
      of: [
        defineField({
          name: 'statPair',
          type: 'object',
          fields: [
            defineField({ name: 'value', type: 'string', title: 'Value' }),
            defineField({ name: 'label', type: 'string', title: 'Label' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'bureauHeroTags',
      title: 'Tag pills',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'capabilitiesIntroTitle',
      title: 'Capabilities intro title',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'capabilitiesIntroAccent',
      title: 'Capabilities intro accent',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'capabilitiesIntroBody',
      title: 'Capabilities intro body',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
  ],
  preview: {
    select: { route: 'route', metaTitle: 'metaTitle', status: 'status' },
    prepare({ route, metaTitle, status }) {
      return {
        title: metaTitle || route || 'Service page',
        subtitle: `${route ?? 'No route'} • ${getContentWorkflowStatusTitle(status)}`,
      }
    },
  },
})
