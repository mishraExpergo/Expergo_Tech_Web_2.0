import { type SchemaTypeDefinition } from 'sanity'

import { blogPost } from './schemaTypes/blogPost'
import { caseStudyPage } from './schemaTypes/caseStudyPage'
import { landingPage } from './schemaTypes/landingPage'
import { post } from './schemaTypes/post'
import { seoPage } from './schemaTypes/seoPage'
import { servicePage } from './schemaTypes/servicePage'
import { sitePage } from './schemaTypes/sitePage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blogPost, sitePage, servicePage, landingPage, caseStudyPage, seoPage],
}