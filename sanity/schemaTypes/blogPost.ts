import { defineField, defineType } from 'sanity'

import { getContentWorkflowStatusTitle } from '../constants/contentWorkflow'
import { CONTENT_WORKFLOW_FIELDS } from './workflowFields'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog post',
  type: 'document',
  fields: [
    ...CONTENT_WORKFLOW_FIELDS,
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'executiveSummary',
      title: 'Executive summary',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'pdf',
      title: 'PDF download',
      type: 'file',
      options: { accept: 'application/pdf' },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'mainImage', status: 'status' },
    prepare({ title, media, status }) {
      return {
        title: title || 'Untitled',
        subtitle: getContentWorkflowStatusTitle(status),
        media,
      }
    },
  },
})
