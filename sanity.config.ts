import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'

import { dataset, projectId } from './sanity/env'
import { schema } from './sanity/schema'
import { resolveWorkflowActions } from './sanity/studio/documentActions'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  // document: {
  //   actions: resolveWorkflowActions,
  // },
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: '/api/draft',
        },
      },
    }),
  ],
})
