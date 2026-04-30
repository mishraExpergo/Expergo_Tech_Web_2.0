import type { StructureResolver } from 'sanity/structure'

/**
 * Enterprise-oriented desk: workflow document types first, then legacy `post` / `sitePage`.
 * List item previews show workflow status via each schema’s `preview.subtitle`.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('blogPost').title('Blog posts'),
      S.documentTypeListItem('servicePage').title('Service pages'),
      S.documentTypeListItem('landingPage').title('Landing pages'),
      S.documentTypeListItem('seoPage').title('SEO pages'),
      S.documentTypeListItem('caseStudyPage').title('Case studies'),
      S.divider(),
      S.documentTypeListItem('post').title('Posts (legacy)'),
      S.documentTypeListItem('sitePage').title('Site pages (legacy)'),
    ])
