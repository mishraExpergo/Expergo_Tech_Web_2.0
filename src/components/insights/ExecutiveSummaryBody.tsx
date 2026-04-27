import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h3 className="mt-8 text-lg font-semibold text-[#1E293B] first:mt-0">{children}</h3>
    ),
    h3: ({ children }) => (
      <h4 className="mt-6 text-base font-semibold text-[#1E293B]">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mt-4 text-base leading-relaxed text-[#475569] first:mt-0">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-[#475569]">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-[#475569]">{children}</ol>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href = typeof value?.href === 'string' ? value.href : '#'
      const rel = !href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a
          href={href}
          rel={rel}
          target={href.startsWith('/') ? undefined : '_blank'}
          className="font-medium text-[#15B5C1] underline decoration-[#15B5C1]/30 underline-offset-2 hover:decoration-[#15B5C1]"
        >
          {children}
        </a>
      )
    },
  },
}

type Props = {
  value: PortableTextBlock[] | null | undefined
}

export function ExecutiveSummaryBody({ value }: Props) {
  if (!value?.length) {
    return null
  }

  return <PortableText value={value} components={components} />
}
