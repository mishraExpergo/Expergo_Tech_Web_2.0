import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPreviewSanityClient } from '../../../../sanity/lib/client'

export async function GET(request: Request) {
  const clientWithToken = getPreviewSanityClient()
  
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
