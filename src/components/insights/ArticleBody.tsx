import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

function createArticleComponents(headingIdByKey?: Record<string, string>): PortableTextComponents {
  return {
    block: {
      h2: ({ children, value }) => {
        const key = value && typeof value === 'object' && '_key' in value ? String(value._key) : ''
        const id = key && headingIdByKey?.[key]
        return (
          <h2
            id={id}
            className="mt-12 scroll-mt-28 text-2xl font-bold tracking-tight text-[#1E293B] first:mt-0"
          >
            {children}
          </h2>
        )
      },
      h3: ({ children, value }) => {
        const key = value && typeof value === 'object' && '_key' in value ? String(value._key) : ''
        const id = key && headingIdByKey?.[key]
        return (
          <h3 id={id} className="mt-10 scroll-mt-28 text-xl font-semibold text-[#1E293B]">
            {children}
          </h3>
        )
      },
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
}

type ArticleBodyProps = {
  value: PortableTextBlock[] | null | undefined
  headingIdByKey?: Record<string, string>
}

export function ArticleBody({ value, headingIdByKey }: ArticleBodyProps) {
  if (!value?.length) {
    return null
  }

  const components = createArticleComponents(headingIdByKey)

  return (
    <div className="insight-article-body max-w-none">
      <PortableText value={value} components={components} />
    </div>
  )
}
