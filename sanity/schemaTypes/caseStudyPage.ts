import { defineField, defineType } from 'sanity'

import { CASE_STUDY_PAGE_ROUTES } from '../constants/contentRoutes'
import { getContentWorkflowStatusTitle } from '../constants/contentWorkflow'
import { CONTENT_WORKFLOW_FIELDS } from './workflowFields'

const caseStudyRouteOptions = CASE_STUDY_PAGE_ROUTES.map((value) => ({ title: value, value }))

export const caseStudyPage = defineType({
  name: 'caseStudyPage',
  title: 'Case study page',
  type: 'document',
  groups: [
    { name: 'meta', title: 'SEO & routing' },
    { name: 'content', title: 'Case study content' },
  ],
  fields: [
    ...CONTENT_WORKFLOW_FIELDS,
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'meta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'meta',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'route',
      title: 'Parent route',
      type: 'string',
      group: 'meta',
      options: { list: caseStudyRouteOptions, layout: 'dropdown' },
      initialValue: 'use-cases',
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
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'impact',
      title: 'Impact',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'industry', status: 'status' },
    prepare({ title, subtitle, status }) {
      const baseSubtitle = subtitle ? `${subtitle} • ` : ''
      return {
        title: title || 'Case study',
        subtitle: `${baseSubtitle}${getContentWorkflowStatusTitle(status)}`,
      }
    },
  },
})
