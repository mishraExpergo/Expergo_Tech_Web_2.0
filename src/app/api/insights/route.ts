import { NextResponse } from 'next/server'

import { getPostsForCarousel } from '@sanity/lib/getPosts'
import { postImageUrl } from '@sanity/lib/postImage'

export const revalidate = 60

export async function GET() {
  try {
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
