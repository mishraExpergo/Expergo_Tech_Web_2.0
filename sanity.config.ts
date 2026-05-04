import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schema'
import { resolveWorkflowActions } from './sanity/studio/documentActions'
import { structure } from './sanity/studio/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  document: {
    actions: resolveWorkflowActions,
  },
  plugins: [
    structureTool({ structure }),
  ],
})
