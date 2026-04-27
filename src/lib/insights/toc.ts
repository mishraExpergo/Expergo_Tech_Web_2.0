import type { PortableTextBlock } from '@portabletext/types'

function blockPlainText(block: PortableTextBlock): string {
  if (block._type !== 'block' || !('children' in block) || !Array.isArray(block.children)) {
    return ''
  }
  return block.children
    .map((c) => {
      if (c && typeof c === 'object' && '_type' in c && c._type === 'span' && 'text' in c) {
        return typeof c.text === 'string' ? c.text : ''
      }
      return ''
    })
    .join('')
}

export function slugifyHeading(text: string): string {
  const s = text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
  return (s.slice(0, 80) || 'section').replace(/^-|-$/g, '')
}

export type TocLevel = 2 | 3

export type TocItem = {
  id: string
  label: string
  level: TocLevel
}

export function buildTocAndHeadingIds(
  blocks: PortableTextBlock[] | null | undefined,
): { toc: TocItem[]; headingIdByKey: Record<string, string> } {
  if (!blocks?.length) {
    return { toc: [], headingIdByKey: {} }
  }

  const headingIdByKey: Record<string, string> = {}
  const toc: TocItem[] = []
  const usedIds = new Set<string>()
  let fallback = 0

  for (const block of blocks) {
    if (block._type !== 'block') continue
    const style = 'style' in block ? block.style : undefined
    if (style !== 'h2' && style !== 'h3') continue

    const label = blockPlainText(block).trim()
    if (!label) continue

    const blockKey =
      '_key' in block && typeof block._key === 'string' && block._key
        ? block._key
        : `heading-${fallback++}`

    let base = slugifyHeading(label)
    let id = base
    let n = 2
    while (usedIds.has(id)) {
      id = `${base}-${n++}`
    }
    usedIds.add(id)
    headingIdByKey[blockKey] = id
    toc.push({ id, label, level: style === 'h2' ? 2 : 3 })
  }

  return { toc, headingIdByKey }
}
