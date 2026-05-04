import type { Image } from 'sanity'
import type { PortableTextBlock } from '@portabletext/types'

import { getSanityClient } from './client'
import {
  postBySlugQuery,
  postSlugsQuery,
  previewPostBySlugQuery,
  previewPostSlugsQuery,
  previewPostsForCarouselQuery,
  previewPostsForListingQuery,
  previewRelatedPostsQuery,
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

type FetchPostsOptions = {
  preview?: boolean
}

/** Draft-mode preview when token is configured; otherwise published client + queries. */
function resolvePreviewClient(wantsPreview: boolean): {
  client: ReturnType<typeof getSanityClient>
  usePreviewQueries: boolean
} {
  const token = process.env.SANITY_API_READ_TOKEN?.trim()
  if (wantsPreview && token) {
    const previewClient = getSanityClient('preview')
    if (previewClient) {
      return { client: previewClient, usePreviewQueries: true }
    }
  }
  return { client: getSanityClient('published'), usePreviewQueries: false }
}

export async function getPostsForCarousel(options: FetchPostsOptions = {}): Promise<SanityPostCard[]> {
  const { client, usePreviewQueries } = resolvePreviewClient(options.preview === true)
  if (!client) return []
  return client.fetch(usePreviewQueries ? previewPostsForCarouselQuery : postsForCarouselQuery)
}

export async function getPostsForListing(options: FetchPostsOptions = {}): Promise<SanityPostListItem[]> {
  const { client, usePreviewQueries } = resolvePreviewClient(options.preview === true)
  if (!client) return []
  return client.fetch(usePreviewQueries ? previewPostsForListingQuery : postsForListingQuery)
}

export async function getPostBySlug(
  slug: string,
  options: FetchPostsOptions = {},
): Promise<SanityPostDetail | null> {
  const { client, usePreviewQueries } = resolvePreviewClient(options.preview === true)
  if (!client) return null
  return client.fetch(usePreviewQueries ? previewPostBySlugQuery : postBySlugQuery, { slug })
}

export async function getPostSlugs(options: FetchPostsOptions = {}): Promise<string[]> {
  const { client, usePreviewQueries } = resolvePreviewClient(options.preview === true)
  if (!client) return []
  return client.fetch(usePreviewQueries ? previewPostSlugsQuery : postSlugsQuery)
}

export async function getRelatedPostsForInsight(
  slug: string,
  options: FetchPostsOptions = {},
): Promise<SanityPostCard[]> {
  const { client, usePreviewQueries } = resolvePreviewClient(options.preview === true)
  if (!client) return []
  return client.fetch(usePreviewQueries ? previewRelatedPostsQuery : relatedPostsQuery, { slug })
}
