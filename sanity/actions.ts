import type { DocumentActionComponent, DocumentActionProps } from 'sanity'
import { useDocumentOperation } from 'sanity'

export function resolveDocumentActions(
  prev: DocumentActionComponent[],
  context: any
): DocumentActionComponent[] {
  const { currentUser } = context

  const isAdmin = currentUser?.roles?.some((r: any) => r.name === 'administrator')

  // Find the default publish action
  const originalPublishAction = prev.find((a) => a.action === 'publish')

  const actions = prev.map((originalAction) => {
    if (originalAction.action === 'publish') {
      return function CustomPublishAction(props: DocumentActionProps) {
        const { patch } = useDocumentOperation(props.id, props.type)
        // If not admin, they cannot publish.
        if (!isAdmin) {
          return null
        }
        
        const result = originalAction(props)
        if (!result) return null

        return {
          ...result,
          label: 'Approve & Publish',
          onHandle: () => {
            // When published, reset workflow state to published
            patch.execute([{ set: { workflowState: 'published' } }])
            if (result.onHandle) {
              result.onHandle()
            }
          }
        }
      } as DocumentActionComponent
    }
    return originalAction
  })

  // Add the "Submit for Review" action for non-admins
  if (!isAdmin) {
    const SubmitForReviewAction = function(props: DocumentActionProps) {
      const { patch } = useDocumentOperation(props.id, props.type)

      return {
        label: 'Submit for Review',
        onHandle: () => {
          patch.execute([{ set: { workflowState: 'inReview' } }])
          props.onComplete()
          window.alert('Document submitted for review!')
        },
        // Disable if no draft exists (meaning it's already published and unmodified)
        disabled: !props.draft,
      }
    }

    actions.unshift(SubmitForReviewAction as unknown as DocumentActionComponent)
  }

  return actions
}
