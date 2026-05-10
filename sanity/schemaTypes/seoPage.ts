import { defineField, defineType } from 'sanity'

import { SEO_PAGE_ROUTES } from '../constants/contentRoutes'
import { getContentWorkflowStatusTitle } from '../constants/contentWorkflow'
import { CONTENT_WORKFLOW_FIELDS } from './workflowFields'

const seoRouteOptions = SEO_PAGE_ROUTES.map((value) => ({ title: value, value }))

export const seoPage = defineType({
  name: 'seoPage',
  title: 'SEO page',
  type: 'document',
  fields: [
    ...CONTENT_WORKFLOW_FIELDS,
    defineField({
      name: 'route',
      title: 'Page route',
      type: 'string',
      options: { list: seoRouteOptions, layout: 'dropdown' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
    }),
    defineField({
      name: 'noIndex',
      title: 'No index',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'insightsListEyebrow',
      title: 'Insights list eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'insightsListTitle',
      title: 'Insights list title',
      type: 'string',
    }),
    defineField({
      name: 'insightsListEmptyMessage',
      title: 'Insights list empty message',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { route: 'route', metaTitle: 'metaTitle', status: 'status' },
    prepare({ route, metaTitle, status }) {
      return {
        title: metaTitle || route || 'SEO page',
        subtitle: `${route ?? 'No route'} • ${getContentWorkflowStatusTitle(status)}`,
      }
    },
  },
})
