import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

import { sanitizePreviewPath } from '@/lib/preview/draftMode'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const requestedPath = sanitizePreviewPath(url.searchParams.get('path'))
  const destination = requestedPath ?? '/'
  const draft = await draftMode()
  draft.disable()
  return NextResponse.redirect(new URL(destination, url.origin))
}
