import { defineField } from 'sanity'

import { CONTENT_WORKFLOW_STATUS_LIST } from '../constants/contentWorkflow'

export const workflowStatusField = defineField({
  name: 'status',
  title: 'Workflow status',
  type: 'string',
  initialValue: 'draft',
  readOnly: true,
  options: {
    list: CONTENT_WORKFLOW_STATUS_LIST,
    layout: 'dropdown',
  },
  validation: (Rule) => Rule.required(),
})

export const reviewerNotesField = defineField({
  name: 'reviewerNotes',
  title: 'Reviewer notes',
  type: 'text',
  rows: 3,
  description: 'Optional notes from reviewer to author before approval.',
})

export const rejectionNotesField = defineField({
  name: 'rejectionNotes',
  title: 'Rejection notes',
  type: 'text',
  rows: 3,
  description: 'Required when rejecting content.',
  hidden: ({ document }) => document?.status !== 'rejected',
  validation: (Rule) =>
    Rule.custom((value, context) => {
      const status = context.document?.status
      if (status === 'rejected' && !String(value || '').trim()) {
        return 'Rejection notes are required when status is Rejected.'
      }
      return true
    }),
})

export const approvedAtField = defineField({
  name: 'approvedAt',
  title: 'Approved at',
  type: 'datetime',
  readOnly: true,
})

export const approvedByField = defineField({
  name: 'approvedBy',
  title: 'Approved by',
  type: 'string',
  readOnly: true,
})

export const scheduledPublishAtField = defineField({
  name: 'scheduledPublishAt',
  title: 'Scheduled publish at',
  type: 'datetime',
  description: 'Optional date/time for release after approval.',
  validation: (Rule) =>
    Rule.custom((value, context) => {
      if (!value) return true
      const status = context.document?.status
      if (status !== 'approved' && status !== 'published') {
        return 'Scheduling is allowed only for Approved or Published content.'
      }
      return true
    }),
})

const workflowHistoryItem = defineField({
  name: 'approvalHistoryItem',
  title: 'Approval history item',
  type: 'object',
  fields: [
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: CONTENT_WORKFLOW_STATUS_LIST },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'changedBy',
      title: 'Changed by',
      type: 'string',
    }),
    defineField({
      name: 'changedAt',
      title: 'Changed at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
})

export const approvalHistoryField = defineField({
  name: 'approvalHistory',
  title: 'Approval history',
  type: 'array',
  of: [workflowHistoryItem],
  readOnly: true,
})

export const CONTENT_WORKFLOW_FIELDS = [
  workflowStatusField,
  reviewerNotesField,
  rejectionNotesField,
  approvedAtField,
  approvedByField,
  scheduledPublishAtField,
  approvalHistoryField,
]
