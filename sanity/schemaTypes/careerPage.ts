import { defineField, defineType } from 'sanity'

const heroCta = {
  type: 'object' as const,
  name: 'careerHeroCta',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      description: 'Anchor (e.g. #open-roles) or full URL.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
}

const careerPrinciple = {
  type: 'object' as const,
  name: 'careerPrinciple',
  fields: [
    defineField({
      name: 'number',
      title: 'Index label',
      description: 'Shown as a small numeral (e.g. 01).',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],
}

const careerOpening = {
  type: 'object' as const,
  name: 'careerOpening',
  fields: [
    defineField({
      name: 'title',
      title: 'Role title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'team',
      title: 'Team / department',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'arrangement',
      title: 'Work arrangement',
      description: 'e.g. Remote · Full-time',
      type: 'string',
      initialValue: 'Remote · Full-time',
    }),
    defineField({
      name: 'applicationSubject',
      title: 'Email subject override',
      description: 'If empty, the page default is used.',
      type: 'string',
    }),
  ],
}

const hiringProcessStep = {
  type: 'object' as const,
  name: 'hiringProcessStep',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],
}

/** Singleton-style document for `/career` — query `*[_type == "careerPage"][0]`. */
export const careerPage = defineType({
  name: 'careerPage',
  title: 'Careers page',
  type: 'document',
  groups: [
    { name: 'meta', title: 'SEO' },
    { name: 'hero', title: 'Hero' },
    { name: 'principles', title: 'Principles' },
    { name: 'roles', title: 'Open roles' },
    { name: 'process', title: 'Hiring process' },
    { name: 'applyAnyway', title: 'Apply anyway' },
    { name: 'heroVisual', title: 'Hero visual (labels)' },
  ],
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      group: 'meta',
      initialValue: 'Careers | Expergo',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
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
      name: 'heroTitleLine1',
      title: 'Hero title (first line)',
      type: 'string',
      group: 'hero',
      initialValue: 'Build the future of',
    }),
    defineField({
      name: 'heroTitleHighlight',
      title: 'Hero title (accent line)',
      type: 'string',
      group: 'hero',
      initialValue: 'financial intelligence.',
    }),
    defineField({
      name: 'heroIntro',
      title: 'Hero intro',
      type: 'text',
      rows: 5,
      group: 'hero',
    }),
    defineField({
      name: 'heroCtas',
      title: 'Hero CTAs',
      type: 'array',
      group: 'hero',
      of: [heroCta],
      validation: (Rule) => Rule.max(4),
    }),

    defineField({
      name: 'principlesEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'principles',
      initialValue: 'OUR PRINCIPLES',
    }),
    defineField({
      name: 'principlesHeading',
      title: 'Heading',
      type: 'string',
      group: 'principles',
      initialValue: 'What we hold ourselves to.',
    }),
    defineField({
      name: 'principlesIntro',
      title: 'Intro',
      type: 'text',
      rows: 3,
      group: 'principles',
    }),
    defineField({
      name: 'principles',
      title: 'Principles',
      type: 'array',
      group: 'principles',
      of: [careerPrinciple],
    }),

    defineField({
      name: 'rolesEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'roles',
      initialValue: 'OPEN POSITIONS',
    }),
    defineField({
      name: 'rolesHeading',
      title: 'Heading',
      type: 'string',
      group: 'roles',
      initialValue: 'Find your role at Expergo.',
    }),
    defineField({
      name: 'careersContactEmail',
      title: 'Careers email',
      description: 'mailto target for listings and apply-anyway CTA.',
      type: 'string',
      group: 'roles',
      initialValue: 'careers@expergo.tech',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'roleApplicationSubject',
      title: 'Default application email subject',
      type: 'string',
      group: 'roles',
      initialValue: 'Application for role',
    }),
    defineField({
      name: 'openings',
      title: 'Open roles',
      type: 'array',
      group: 'roles',
      of: [careerOpening],
    }),

    defineField({
      name: 'hiringProcessEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'process',
      initialValue: 'Our hiring process',
    }),
    defineField({
      name: 'hiringProcessHeadingPrefix',
      title: 'Heading (before accent)',
      type: 'string',
      group: 'process',
      initialValue: 'Straight forward.',
    }),
    defineField({
      name: 'hiringProcessHeadingAccent',
      title: 'Heading (accent)',
      type: 'string',
      group: 'process',
      initialValue: 'No surprises',
    }),
    defineField({
      name: 'hiringProcessHint',
      title: 'Interaction hint',
      type: 'text',
      rows: 2,
      group: 'process',
      initialValue:
        'Hover or tap a step to explore. Use arrow keys when a step is focused.',
    }),
    defineField({
      name: 'hiringProcessSteps',
      title: 'Steps',
      type: 'array',
      group: 'process',
      of: [hiringProcessStep],
    }),

    defineField({
      name: 'applyAnywayHeading',
      title: 'Heading',
      type: 'string',
      group: 'applyAnyway',
      initialValue: 'Do not see your role? Apply anyway.',
    }),
    defineField({
      name: 'applyAnywayBody',
      title: 'Body',
      type: 'text',
      rows: 5,
      group: 'applyAnyway',
    }),
    defineField({
      name: 'applyAnywayCtaLabel',
      title: 'CTA label',
      type: 'string',
      group: 'applyAnyway',
      initialValue: 'Apply Anyway',
    }),
    defineField({
      name: 'applyAnywaySubject',
      title: 'Email subject',
      type: 'string',
      group: 'applyAnyway',
      initialValue: 'General Application',
    }),

    defineField({
      name: 'heroVisualChartTitle',
      title: 'Card title',
      description: 'Label above the demo chart (CareerHeroVisual).',
      type: 'string',
      group: 'heroVisual',
      initialValue: 'Portfolio performance',
    }),
    defineField({
      name: 'heroVisualAllocationHeading',
      title: 'Allocation panel heading',
      type: 'string',
      group: 'heroVisual',
      initialValue: 'Allocation',
    }),
    defineField({
      name: 'heroVisualRiskHeading',
      title: 'Risk panel heading',
      type: 'string',
      group: 'heroVisual',
      initialValue: 'Risk',
    }),
    defineField({
      name: 'heroVisualStatusLine',
      title: 'Status pill',
      type: 'string',
      group: 'heroVisual',
      initialValue: 'Settled · T+0',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Careers page', subtitle: '/career' }
    },
  },
})
