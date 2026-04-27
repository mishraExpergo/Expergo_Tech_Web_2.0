import { NextResponse } from 'next/server'

import { isSanityConfigured } from '@sanity/env'

export const dynamic = 'force-dynamic'

/**
 * Safe diagnostics: booleans only (no project id or dataset values).
 * Use on Vercel to verify env is visible to the server at request time.
 */
export async function GET() {
  const hasProjectId = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim())
  const hasDataset = Boolean(process.env.NEXT_PUBLIC_SANITY_DATASET?.trim())

  return NextResponse.json({
    isSanityConfigured,
    hasProjectId,
    hasDataset,
  })
}
