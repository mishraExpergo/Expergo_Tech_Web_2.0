import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-[#1E293B]">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-semibold text-[#1E293B]">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mt-4 text-base leading-relaxed text-[#475569]">{children}</p>
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

type ArticleBodyProps = {
  value: PortableTextBlock[] | null | undefined
}

export function ArticleBody({ value }: ArticleBodyProps) {
  if (!value?.length) {
    return null
  }

  return (
    <div className="mt-10 max-w-3xl">
      <PortableText value={value} components={components} />
    </div>
  )
}
