/**
 * Carousel insights JSON for the marketing site. Sanity is loaded lazily so
 * missing env at build time does not fail static analysis of this route.
 */
import { NextResponse } from 'next/server'

export const revalidate = 60

export async function GET() {
  try {
    const [{ getPostsForCarousel }, { postImageUrl }] = await Promise.all([
      import('@sanity/lib/getPosts'),
      import('@sanity/lib/postImage'),
    ])
    const rows = await getPostsForCarousel()
    const posts = rows.map((p) => ({
      slug: p.slug,
      title: p.title,
      tag: 'INSIGHTS',
      image: postImageUrl(p.mainImage ?? undefined),
    }))
    return NextResponse.json({ posts })
  } catch (err) {
    console.error('[api/insights]', err)
    return NextResponse.json({ posts: [] })
  }
}
