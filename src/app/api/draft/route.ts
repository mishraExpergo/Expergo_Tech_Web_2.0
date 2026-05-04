import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getSanityClient } from '../../../../sanity/lib/client'
import { token } from '../../../../sanity/env'

export async function GET(request: Request) {
  const clientWithToken = getSanityClient({ isDraftMode: true, token })
  
  if (!clientWithToken) {
    return new Response('Missing environment variables for Sanity', { status: 500 })
  }

  const { isValid, redirectTo = '/' } = await validatePreviewUrl(clientWithToken, request.url)
  
  if (!isValid) {
    return new Response('Invalid secret', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(redirectTo)
}
