import { type SchemaTypeDefinition } from 'sanity'

import { post } from './schemaTypes/post'
import { sitePage } from './schemaTypes/sitePage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, sitePage],
}