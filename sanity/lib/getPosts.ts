import type { Image } from 'sanity'
import type { PortableTextBlock } from '@portabletext/types'

import { client } from './client'
import {
  postBySlugQuery,
  postSlugsQuery,
  postsForCarouselQuery,
  postsForListingQuery,
} from './queries'

export type SanityPostCard = {
  slug: string
  title: string
  excerpt: string | null
  mainImage: Image | null
}

export type SanityPostListItem = SanityPostCard & {
  publishedAt: string | null
}

export type SanityPostDetail = {
  title: string
  publishedAt: string | null
  excerpt: string | null
  mainImage: Image | null
  body: PortableTextBlock[] | null
}

export async function getPostsForCarousel(): Promise<SanityPostCard[]> {
  return client.fetch(postsForCarouselQuery)
}

export async function getPostsForListing(): Promise<SanityPostListItem[]> {
  return client.fetch(postsForListingQuery)
}

export async function getPostBySlug(slug: string): Promise<SanityPostDetail | null> {
  return client.fetch(postBySlugQuery, { slug })
}

export async function getPostSlugs(): Promise<string[]> {
  return client.fetch(postSlugsQuery)
}
