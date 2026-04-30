# Content Workflow Operations

## Required Environment Variables

- `SANITY_PREVIEW_SECRET` - Server-side secret for `/api/draft-mode`.
- `SANITY_STUDIO_PREVIEW_SECRET` - Optional; if unset, the Studio **Open preview** action uses `SANITY_PREVIEW_SECRET` (set both to the same value in production).
- `SANITY_API_READ_TOKEN` - Read token used for draft preview perspective.

## Publishing Rules

- Public frontend queries only return documents where:
  - `status` is unset (legacy, pre-migration) **or** `status == "published"`
  - `scheduledPublishAt` is empty or already in the past
- After running the backfill migration, all documents should have an explicit `status`; new content defaults to `draft` in the CMS.
- Editors can move content to review states.
- Approvers can move content to approved/published states.

## Preview Flow

1. Editor opens a document in Studio.
2. Clicks **Open preview** document action.
3. Studio opens `/api/draft-mode` with secret and resolved path.
4. Next.js enables Draft Mode cookie and redirects to real frontend route.
5. Data layer switches to preview client (`perspective: drafts`) for that session.

## Regression Checklist

- [ ] `/`, `/platform`, `/capabilities`, `/capabilities/lighthouse`, `/capabilities/regulas`, `/capabilities/command-center`, `/capabilities/bureau-360`, `/outcomes`, `/use-cases`, `/insights` render published content only in normal sessions.
- [ ] `/insights/[slug]` returns 404 for non-published entries in normal sessions.
- [ ] Preview route opens unpublished/draft content only after valid secret flow.
- [ ] Publishing is disabled for non-approver roles.
- [ ] Rejection status requires rejection notes.

## Backfill Existing Content

Run migration after deploying schemas:

```bash
npx sanity migration run sanity/migrations/backfillWorkflowStatus.ts
```

This sets missing `status` values to `published` for existing content.
