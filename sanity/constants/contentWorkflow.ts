export const CONTENT_WORKFLOW_STATUSES = [
  'draft',
  'pendingReview',
  'pendingApproval',
  'approved',
  'published',
  'rejected',
] as const

export type ContentWorkflowStatus = (typeof CONTENT_WORKFLOW_STATUSES)[number]

export const CONTENT_WORKFLOW_STATUS_TITLES: Record<ContentWorkflowStatus, string> = {
  draft: 'Draft',
  pendingReview: 'Pending Review',
  pendingApproval: 'Pending Approval',
  approved: 'Approved',
  published: 'Published',
  rejected: 'Rejected',
}

export const CONTENT_WORKFLOW_STATUS_LIST = CONTENT_WORKFLOW_STATUSES.map((value) => ({
  value,
  title: CONTENT_WORKFLOW_STATUS_TITLES[value],
}))

export function getContentWorkflowStatusTitle(status: string | undefined): string {
  if (!status) return CONTENT_WORKFLOW_STATUS_TITLES.draft
  return (
    CONTENT_WORKFLOW_STATUS_TITLES[status as ContentWorkflowStatus] ??
    CONTENT_WORKFLOW_STATUS_TITLES.draft
  )
}
