import { isSitePageRoute } from '../constants/sitePageRoutes'

type ResolvePreviewPathInput = {
  documentType: string
  slug?: string
  route?: string
}

const SITE_PAGE_PATHS: Record<string, string> = {
  home: '/',
  platform: '/platform',
  capabilities: '/capabilities',
  'capabilities-lighthouse': '/capabilities/lighthouse',
  'capabilities-regulas': '/capabilities/regulas',
  'capabilities-command-center': '/capabilities/command-center',
  'capabilities-bureau-360': '/capabilities/bureau-360',
  outcomes: '/outcomes',
  'use-cases': '/use-cases',
  insights: '/insights',
}

function pathForRoute(route?: string): string {
  if (!route || !isSitePageRoute(route)) return '/'
  return SITE_PAGE_PATHS[route] ?? '/'
}

export function resolvePreviewPath(input: ResolvePreviewPathInput): string {
  const slug = input.slug?.trim()
  switch (input.documentType) {
    case 'post':
    case 'blogPost':
      return slug ? `/insights/${slug}` : '/insights'
    case 'sitePage':
    case 'servicePage':
    case 'landingPage':
    case 'seoPage':
      return pathForRoute(input.route)
    case 'caseStudyPage':
      // No dynamic /use-cases/[slug] route yet — preview parent page.
      return '/use-cases'
    default:
      return '/'
  }
}
