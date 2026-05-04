import type { Image } from 'sanity'
import type { PortableTextBlock } from '@portabletext/types'

import { draftMode } from 'next/headers'
import { getSanityClient } from './client'
import { token } from '../env'
import {
  postBySlugQuery,
  postSlugsQuery,
  postsForCarouselQuery,
  postsForListingQuery,
  relatedPostsQuery,
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

export type SanityPostPdf = {
  asset: {
    url: string | null
    originalFilename: string | null
  } | null
} | null

export type SanityPostDetail = {
  title: string
  publishedAt: string | null
  excerpt: string | null
  mainImage: Image | null
  executiveSummary?: PortableTextBlock[] | null
  pdf?: SanityPostPdf
  body: PortableTextBlock[] | null
}

export async function getPostsForCarousel(): Promise<SanityPostCard[]> {
  const isDraftMode = (await draftMode()).isEnabled
  const client = getSanityClient({ isDraftMode, token })
  if (!client) return []
  return client.fetch(postsForCarouselQuery)
}

export async function getPostsForListing(): Promise<SanityPostListItem[]> {
  const isDraftMode = (await draftMode()).isEnabled
  const client = getSanityClient({ isDraftMode, token })
  if (!client) return []
  return client.fetch(postsForListingQuery)
}

export async function getPostBySlug(slug: string): Promise<SanityPostDetail | null> {
  const isDraftMode = (await draftMode()).isEnabled
  const client = getSanityClient({ isDraftMode, token })
  if (!client) return null
  return client.fetch(postBySlugQuery, { slug })
}

export async function getPostSlugs(): Promise<string[]> {
  const isDraftMode = (await draftMode()).isEnabled
  const client = getSanityClient({ isDraftMode, token })
  if (!client) return []
  return client.fetch(postSlugsQuery)
}

export async function getRelatedPostsForInsight(slug: string): Promise<SanityPostCard[]> {
  const isDraftMode = (await draftMode()).isEnabled
  const client = getSanityClient({ isDraftMode, token })
  if (!client) return []
  return client.fetch(relatedPostsQuery, { slug })
}
