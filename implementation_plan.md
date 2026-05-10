# Implement Sanity Preview System and Approval Workflow

This plan details the steps to implement Next.js Draft Mode for live previews and a custom Document Action workflow in Sanity to require admin approval before publishing.

## User Review Required

> [!IMPORTANT]
> The Approval Workflow relies on Sanity's `currentUser` roles. We will restrict the "Publish" button to users with the `administrator` role. Standard users will instead see a "Submit for Review" button. Please confirm this matches your intended role setup.

> [!WARNING]
> To use Draft Mode, you will need to create a new **API Viewer Token** in your Sanity project dashboard (manage.sanity.io) and add it to your environment variables as `SANITY_API_READ_TOKEN`.

## Proposed Changes

### Preview System (Next.js Draft Mode)

#### [MODIFY] [sanity.config.ts](file:///c:/Users/ADMIN/Expergo_Tech_Web_2.0/sanity.config.ts)
- Import and configure `presentationTool` from `sanity/presentation`.
- Set up the preview URL to point to the `/api/draft` Next.js API route.

#### [MODIFY] [sanity/env.ts](file:///c:/Users/ADMIN/Expergo_Tech_Web_2.0/sanity/env.ts)
- Add a new exported `token` variable mapping to `process.env.SANITY_API_READ_TOKEN`.

#### [MODIFY] [sanity/lib/client.ts](file:///c:/Users/ADMIN/Expergo_Tech_Web_2.0/sanity/lib/client.ts)
- Update the client export or create a new fetch helper that checks `draftMode().isEnabled` from Next.js. If enabled, the client will use the token and the `previewDrafts` perspective.

#### [NEW] [src/app/api/draft/route.ts](file:///c:/Users/ADMIN/Expergo_Tech_Web_2.0/src/app/api/draft/route.ts)
- API endpoint to securely validate the Sanity request, invoke Next.js `draftMode().enable()`, and redirect to the previewed page.

#### [NEW] [src/app/api/disable-draft/route.ts](file:///c:/Users/ADMIN/Expergo_Tech_Web_2.0/src/app/api/disable-draft/route.ts)
- API endpoint to disable draft mode.

#### [MODIFY] [src/app/layout.tsx](file:///c:/Users/ADMIN/Expergo_Tech_Web_2.0/src/app/layout.tsx)
- Conditionally render the `<VisualEditing />` component from `next-sanity` when draft mode is active. This adds the interactive "Live Preview" layer.

---

### Approval Workflow

#### [NEW] [sanity/actions.ts](file:///c:/Users/ADMIN/Expergo_Tech_Web_2.0/sanity/actions.ts)
- Create a custom document action `SubmitForReviewAction` that updates a document's hidden `workflowState` field to `inReview`.
- Create a wrapper logic for the default `PublishAction` that only renders if `currentUser.roles` includes `administrator`.

#### [MODIFY] [sanity.config.ts](file:///c:/Users/ADMIN/Expergo_Tech_Web_2.0/sanity.config.ts)
- Override the `document.actions` array to inject our custom approval logic, replacing the default "Publish" button for non-admins.

#### [MODIFY] [sanity/schemaTypes/post.ts](file:///c:/Users/ADMIN/Expergo_Tech_Web_2.0/sanity/schemaTypes/post.ts) & [sanity/schemaTypes/sitePage.ts](file:///c:/Users/ADMIN/Expergo_Tech_Web_2.0/sanity/schemaTypes/sitePage.ts)
- Add a hidden `workflowState` string field (e.g., "draft", "inReview", "published") to track the document's review status over time.

## Verification Plan

### Manual Verification
1. Create a `SANITY_API_READ_TOKEN` on manage.sanity.io and add it to your `.env.local`.
2. Open the embedded Sanity Studio (`/studio`), edit a document, and verify the Presentation tool shows live split-pane updates without publishing.
3. Log in as a non-admin editor and verify that the "Publish" button is hidden and replaced by "Submit for Review".
4. Log in as an admin, see the document marked as "In Review", and verify you can approve and publish it.
