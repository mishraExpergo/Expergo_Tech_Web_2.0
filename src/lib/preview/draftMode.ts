import crypto from 'node:crypto'

import { resolvePreviewPath } from '@sanity/lib/resolvePreviewPath'

type PreviewRouteParams = {
  path?: string | null
  type?: string | null
  slug?: string | null
  route?: string | null
}

export function isValidPreviewSecret(input: string | null, expectedSecret: string): boolean {
  if (!input) return false
  const inputBuffer = Buffer.from(input)
  const expectedBuffer = Buffer.from(expectedSecret)
  if (inputBuffer.length !== expectedBuffer.length) return false
  return crypto.timingSafeEqual(inputBuffer, expectedBuffer)
}

export function sanitizePreviewPath(path: string | null | undefined): string | null {
  if (!path) return null
  if (!path.startsWith('/')) return null
  if (path.startsWith('//')) return null
  if (path.includes('://')) return null
  return path
}

export function resolveSafePreviewPath(params: PreviewRouteParams): string {
  const explicitPath = sanitizePreviewPath(params.path)
  if (explicitPath) return explicitPath

  return sanitizePreviewPath(
    resolvePreviewPath({
      documentType: params.type ?? '',
      slug: params.slug ?? undefined,
      route: params.route ?? undefined,
    }),
  ) ?? '/'
}
