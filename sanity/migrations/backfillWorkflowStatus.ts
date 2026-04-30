import { at, defineMigration, setIfMissing } from 'sanity/migrate'

const WORKFLOW_DOC_TYPES = [
  'post',
  'blogPost',
  'sitePage',
  'servicePage',
  'landingPage',
  'caseStudyPage',
  'seoPage',
]

export default defineMigration({
  title: 'Backfill workflow status for existing content',
  documentTypes: WORKFLOW_DOC_TYPES,
  migrate: {
    document(doc) {
      const status = doc.status || 'published'

      return [
        at('status', setIfMissing(status)),
        at('approvalHistory', setIfMissing([])),
        at('reviewerNotes', setIfMissing('')),
        at('rejectionNotes', setIfMissing('')),
      ]
    },
  },
})
