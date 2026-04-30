/** Legacy documents may lack `status` until migration; treat as published. New docs always set status (default draft). */
const PUBLISHED_WORKFLOW_FILTER =
  '(!defined(status) || status == "published") && (!defined(scheduledPublishAt) || scheduledPublishAt <= now())'

const BLOG_TYPES_FILTER = '_type in ["post", "blogPost"]'
const PAGE_TYPES_FILTER = '_type in ["sitePage", "servicePage", "landingPage", "seoPage"]'

export const postsForCarouselQuery = /* groq */ `
  *[${BLOG_TYPES_FILTER} && defined(slug.current) && ${PUBLISHED_WORKFLOW_FILTER}] | order(coalesce(publishedAt, _updatedAt) desc) [0...10] {
    "slug": slug.current,
    title,
    excerpt,
    mainImage
  }
`

export const postsForListingQuery = /* groq */ `
  *[${BLOG_TYPES_FILTER} && defined(slug.current) && ${PUBLISHED_WORKFLOW_FILTER}] | order(coalesce(publishedAt, _updatedAt) desc) {
    "slug": slug.current,
    title,
    excerpt,
    publishedAt,
    mainImage
  }
`

export const postBySlugQuery = /* groq */ `
  *[${BLOG_TYPES_FILTER} && slug.current == $slug && ${PUBLISHED_WORKFLOW_FILTER}][0] {
    title,
    publishedAt,
    excerpt,
    mainImage,
    executiveSummary,
    pdf {
      asset->{
        url,
        originalFilename
      }
    },
    body
  }
`

export const postSlugsQuery = /* groq */ `
  *[${BLOG_TYPES_FILTER} && defined(slug.current) && ${PUBLISHED_WORKFLOW_FILTER}].slug.current
`

export const relatedPostsQuery = /* groq */ `
  *[${BLOG_TYPES_FILTER} && defined(slug.current) && slug.current != $slug && ${PUBLISHED_WORKFLOW_FILTER}] | order(coalesce(publishedAt, _updatedAt) desc) [0...4] {
    "slug": slug.current,
    title,
    excerpt,
    mainImage
  }
`

export const sitePageByRouteQuery = /* groq */ `
  *[${PAGE_TYPES_FILTER} && route == $route && ${PUBLISHED_WORKFLOW_FILTER}] | order(_updatedAt desc) [0]
`

export const previewPostsForCarouselQuery = /* groq */ `
  *[${BLOG_TYPES_FILTER} && defined(slug.current)] | order(coalesce(publishedAt, _updatedAt) desc) [0...10] {
    "slug": slug.current,
    title,
    excerpt,
    mainImage
  }
`

export const previewPostsForListingQuery = /* groq */ `
  *[${BLOG_TYPES_FILTER} && defined(slug.current)] | order(coalesce(publishedAt, _updatedAt) desc) {
    "slug": slug.current,
    title,
    excerpt,
    publishedAt,
    mainImage
  }
`

export const previewPostBySlugQuery = /* groq */ `
  *[${BLOG_TYPES_FILTER} && slug.current == $slug][0] {
    title,
    publishedAt,
    excerpt,
    mainImage,
    executiveSummary,
    pdf {
      asset->{
        url,
        originalFilename
      }
    },
    body
  }
`

export const previewPostSlugsQuery = /* groq */ `
  *[${BLOG_TYPES_FILTER} && defined(slug.current)].slug.current
`

export const previewRelatedPostsQuery = /* groq */ `
  *[${BLOG_TYPES_FILTER} && defined(slug.current) && slug.current != $slug] | order(coalesce(publishedAt, _updatedAt) desc) [0...4] {
    "slug": slug.current,
    title,
    excerpt,
    mainImage
  }
`

export const previewSitePageByRouteQuery = /* groq */ `
  *[${PAGE_TYPES_FILTER} && route == $route] | order(_updatedAt desc) [0]
`
