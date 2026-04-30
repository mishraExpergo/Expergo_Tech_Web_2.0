import {
  useDocumentOperation,
  type DocumentActionComponent,
  type DocumentActionsContext,
} from 'sanity'

import {
  CONTENT_WORKFLOW_STATUS_TITLES,
  type ContentWorkflowStatus,
} from '../constants/contentWorkflow'
import { resolvePreviewPath } from '../lib/resolvePreviewPath'

const EDITOR_ROLES = new Set(['administrator', 'editor', 'developer'])
const APPROVER_ROLES = new Set(['administrator', 'approver', 'developer'])
const WORKFLOW_DOCUMENT_TYPES = new Set([
  'post',
  'blogPost',
  'sitePage',
  'servicePage',
  'landingPage',
  'caseStudyPage',
  'seoPage',
])

type ActionProps = Parameters<DocumentActionComponent>[0] & {
  currentUser?: {
    name?: string
    email?: string
    roles?: { name?: string }[]
  }
  draft?: {
    _type?: string
    slug?: { current?: string }
    route?: string
    status?: ContentWorkflowStatus
    reviewerNotes?: string
    rejectionNotes?: string
    approvalHistory?: unknown[]
  } | null
  published?: {
    _type?: string
    slug?: { current?: string }
    route?: string
    status?: ContentWorkflowStatus
    reviewerNotes?: string
    rejectionNotes?: string
    approvalHistory?: unknown[]
  } | null
}

function getRoleNames(user: ActionProps['currentUser']): string[] {
  return (user?.roles ?? []).map((role) => role.name || '').filter(Boolean)
}

function canEdit(user: ActionProps['currentUser']) {
  const roles = getRoleNames(user)
  return roles.some((role) => EDITOR_ROLES.has(role))
}

function canApprove(user: ActionProps['currentUser']) {
  const roles = getRoleNames(user)
  return roles.some((role) => APPROVER_ROLES.has(role))
}

function appendHistory(
  props: ActionProps,
  status: ContentWorkflowStatus,
  note: string | undefined,
) {
  const document = props.draft ?? props.published
  const changedBy =
    props.currentUser?.name || props.currentUser?.email || getRoleNames(props.currentUser)[0] || 'system'

  return [
    ...((document?.approvalHistory as Record<string, unknown>[] | undefined) ?? []),
    {
      _type: 'approvalHistoryItem',
      status,
      note,
      changedBy,
      changedAt: new Date().toISOString(),
    },
  ]
}

function useTransitionAction(props: ActionProps, nextStatus: ContentWorkflowStatus, title: string) {
  const { patch } = useDocumentOperation(props.id, props.type)
  const doc = props.draft ?? props.published
  const currentStatus = (doc?.status as ContentWorkflowStatus | undefined) ?? 'draft'
  const disabled = patch.disabled

  const applyTransition = (note?: string, includePrompt = false) => {
    if (disabled) return

    const derivedNote = includePrompt ? window.prompt('Add note (optional)') || undefined : note
    const history = appendHistory(props, nextStatus, derivedNote)
    const nextPatch: Record<string, unknown> = {
      status: nextStatus,
      approvalHistory: history,
    }

    if (nextStatus === 'approved') {
      nextPatch.approvedAt = new Date().toISOString()
      nextPatch.approvedBy =
        props.currentUser?.email || props.currentUser?.name || getRoleNames(props.currentUser)[0] || 'unknown'
    }

    if (nextStatus === 'rejected') {
      const note = String(derivedNote || doc?.rejectionNotes || '').trim()
      if (!note) {
        window.alert('Rejection note is required to reject content.')
        return
      }
      nextPatch.rejectionNotes = note
    } else {
      nextPatch.rejectionNotes = ''
    }

    patch.execute([{ set: nextPatch }])
    props.onComplete()
  }

  return {
    disabled,
    currentStatus,
    applyTransition,
    title,
  }
}

const SubmitForReviewAction: DocumentActionComponent = (props) => {
  const action = useTransitionAction(props as ActionProps, 'pendingReview', 'Submit for review')
  const document = (props as ActionProps).draft ?? (props as ActionProps).published

  if (!canEdit((props as ActionProps).currentUser)) return null
  if (!document) return null
  if (!['draft', 'rejected'].includes(action.currentStatus)) return null

  return {
    label: action.title,
    onHandle: () => action.applyTransition(),
    disabled: action.disabled,
  }
}

const RequestApprovalAction: DocumentActionComponent = (props) => {
  const action = useTransitionAction(props as ActionProps, 'pendingApproval', 'Request approval')
  const document = (props as ActionProps).draft ?? (props as ActionProps).published

  if (!canEdit((props as ActionProps).currentUser)) return null
  if (!document) return null
  if (action.currentStatus !== 'pendingReview') return null

  return {
    label: action.title,
    onHandle: () => action.applyTransition((props as ActionProps).draft?.reviewerNotes),
    disabled: action.disabled,
  }
}

const ApproveAction: DocumentActionComponent = (props) => {
  const action = useTransitionAction(props as ActionProps, 'approved', 'Approve content')
  const document = (props as ActionProps).draft ?? (props as ActionProps).published

  if (!canApprove((props as ActionProps).currentUser)) return null
  if (!document) return null
  if (action.currentStatus !== 'pendingApproval') return null

  return {
    label: action.title,
    onHandle: () => action.applyTransition(),
    disabled: action.disabled,
  }
}

const RejectAction: DocumentActionComponent = (props) => {
  const action = useTransitionAction(props as ActionProps, 'rejected', 'Reject content')
  const document = (props as ActionProps).draft ?? (props as ActionProps).published

  if (!canApprove((props as ActionProps).currentUser)) return null
  if (!document) return null
  if (!['pendingReview', 'pendingApproval'].includes(action.currentStatus)) return null

  return {
    label: action.title,
    tone: 'critical',
    onHandle: () => {
      const reason = window.prompt('Rejection reason (required)')
      if (!reason || !reason.trim()) {
        window.alert('Rejection note is required to reject content.')
        props.onComplete()
        return
      }
      action.applyTransition(reason.trim(), false)
    },
    disabled: action.disabled,
  }
}

const OpenPreviewAction: DocumentActionComponent = (props) => {
  const document = (props as ActionProps).draft ?? (props as ActionProps).published
  const user = (props as ActionProps).currentUser
  if (!canEdit(user) && !canApprove(user)) return null
  if (!document) return null

  const secret = process.env.SANITY_STUDIO_PREVIEW_SECRET || process.env.SANITY_PREVIEW_SECRET
  if (!secret) {
    return {
      label: 'Preview unavailable (missing SANITY_STUDIO_PREVIEW_SECRET)',
      disabled: true,
      onHandle: () => props.onComplete(),
    }
  }

  return {
    label: 'Open preview',
    onHandle: () => {
      const path = resolvePreviewPath({
        documentType: document._type || props.type,
        slug: document.slug?.current,
        route: document.route,
      })
      const params = new URLSearchParams({
        secret,
        path,
        type: document._type || props.type,
      })
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      window.open(`${origin}/api/draft-mode?${params.toString()}`, '_blank', 'noopener,noreferrer')
      props.onComplete()
    },
  }
}

const WorkflowPublishAction: DocumentActionComponent = (props) => {
  const { publish, patch } = useDocumentOperation(props.id, props.type)
  const document = (props as ActionProps).draft ?? (props as ActionProps).published
  const status = (document?.status as ContentWorkflowStatus | undefined) ?? 'draft'
  const isApprover = canApprove((props as ActionProps).currentUser)
  const schedule = document?.scheduledPublishAt ? new Date(document.scheduledPublishAt) : null
  const scheduleBlocked = Boolean(schedule && schedule.getTime() > Date.now())

  if (!document) return null

  return {
    label: 'Publish',
    disabled:
      publish.disabled ||
      !isApprover ||
      status !== 'approved' ||
      scheduleBlocked,
    title: !isApprover
      ? 'Only approvers can publish.'
      : status !== 'approved'
        ? `Content must be ${CONTENT_WORKFLOW_STATUS_TITLES.approved} before publishing.`
        : scheduleBlocked
          ? 'Scheduled publish date has not been reached yet.'
          : undefined,
    onHandle: () => {
      if (publish.disabled || !isApprover || status !== 'approved' || scheduleBlocked) {
        props.onComplete()
        return
      }

      patch.execute([
        {
          set: {
            status: 'published',
            publishedAt: new Date().toISOString(),
            scheduledPublishAt: null,
            approvalHistory: appendHistory(props as ActionProps, 'published', 'Published'),
          },
        },
      ])
      publish.execute()
      props.onComplete()
    },
  }
}

export function resolveWorkflowActions(
  prev: DocumentActionComponent[],
  context: DocumentActionsContext,
) {
  if (!WORKFLOW_DOCUMENT_TYPES.has(context.schemaType)) {
    return prev
  }

  return prev
    .filter((action) => action.action !== 'publish')
    .concat([SubmitForReviewAction, RequestApprovalAction, ApproveAction, RejectAction, OpenPreviewAction, WorkflowPublishAction])
}
