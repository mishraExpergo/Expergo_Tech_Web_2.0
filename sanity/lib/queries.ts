export const postsForCarouselQuery = /* groq */ `
  *[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _updatedAt) desc) [0...10] {
    "slug": slug.current,
    title,
    excerpt,
    mainImage
  }
`

export const postsForListingQuery = /* groq */ `
  *[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _updatedAt) desc) {
    "slug": slug.current,
    title,
    excerpt,
    publishedAt,
    mainImage
  }
`

export const postBySlugQuery = /* groq */ `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    publishedAt,
    excerpt,
    mainImage,
    body
  }
`

export const postSlugsQuery = /* groq */ `
  *[_type == "post" && defined(slug.current)].slug.current
`
