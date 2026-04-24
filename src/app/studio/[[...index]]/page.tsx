'use client'

import dynamic from 'next/dynamic'
import { isSanityConfigured } from '@sanity/env'

const StudioInner = dynamic(() => import('./StudioInner'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-[#101112] text-white">
      <p className="text-sm text-white/70">Loading Studio…</p>
    </div>
  ),
})

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#101112] px-6 text-center text-white">
        <h1 className="text-xl font-semibold">Sanity Studio needs configuration</h1>
        <p className="mt-4 max-w-md text-sm text-white/70">
          Set <code className="rounded bg-white/10 px-1">NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{' '}
          <code className="rounded bg-white/10 px-1">NEXT_PUBLIC_SANITY_DATASET</code> on your host
          (for example Vercel → Environment Variables), then redeploy. Public env vars are baked in at
          build time.
        </p>
      </div>
    )
  }

  return <StudioInner />
}
