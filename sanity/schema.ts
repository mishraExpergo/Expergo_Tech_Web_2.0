import { type SchemaTypeDefinition } from 'sanity'

import { careerPage } from './schemaTypes/careerPage'
import { post } from './schemaTypes/post'
import { seoPage } from './schemaTypes/seoPage'
import { servicePage } from './schemaTypes/servicePage'
import { sitePage } from './schemaTypes/sitePage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, sitePage, careerPage],
}