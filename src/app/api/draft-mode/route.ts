import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

import { isValidPreviewSecret, resolveSafePreviewPath } from '@/lib/preview/draftMode'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const secret = url.searchParams.get('secret')
  const configuredSecret = process.env.SANITY_PREVIEW_SECRET?.trim()

  if (!configuredSecret || !isValidPreviewSecret(secret, configuredSecret)) {
    return NextResponse.json({ error: 'Invalid preview secret.' }, { status: 401 })
  }

  const destination = resolveSafePreviewPath({
    path: url.searchParams.get('path'),
    type: url.searchParams.get('type'),
    slug: url.searchParams.get('slug'),
    route: url.searchParams.get('route'),
  })

  const draft = await draftMode()
  draft.enable()

  return NextResponse.redirect(new URL(destination, url.origin))
}
