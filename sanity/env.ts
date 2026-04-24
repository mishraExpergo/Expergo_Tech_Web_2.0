export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || '2024-04-22'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const useCdn = false

function assertValue(v: string | undefined, errorMessage: string): string {
  const trimmed = v?.trim()
  if (!trimmed) {
    throw new Error(errorMessage)
  }

  return trimmed
}
