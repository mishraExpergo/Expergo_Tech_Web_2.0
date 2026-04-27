import { NextResponse } from 'next/server'

export const revalidate = 60

/**
 * Load Sanity only when this handler runs (not at module init). That way a missing
 * `NEXT_PUBLIC_SANITY_*` on Vercel cannot break the build during "Collecting page data".
 */
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
