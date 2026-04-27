import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
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
      description: 'Short subhead under the hero title on the insight page.',
    }),
    defineField({
      name: 'executiveSummary',
      title: 'Executive summary',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Optional intro copy above the main article (separate from body).',
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
    select: { title: 'title', media: 'mainImage' },
    prepare({ title, media }) {
      return { title: title || 'Untitled', media }
    },
  },
})
