import WithBundleAnalyzer from '@next/bundle-analyzer'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'
import createMdx from '@next/mdx'
import { remarkTableOfContents, type IRemarkTableOfContentsOptions as remarkTableOfContentsOptionsType } from 'remark-table-of-contents'
import rehypeAutolinkHeadings, { type Options as rehypeAutolinkHeadingsOptionsType } from 'rehype-autolink-headings'
import { type ElementContent } from 'hast'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import { toString as hastToString } from 'mdast-util-to-string'
import rehypeSlug from 'rehype-slug'
import remarkGfm, { type Options as remarkGfmOptionsType } from 'remark-gfm'
import { rehypeGithubAlerts, type DefaultBuildType as rehypeGithubAlertsDefaultBuildType, type IOptions as rehypeGithubAlertsOptionsType } from 'rehype-github-alerts'
import rehypeMDXImportMedia from 'rehype-mdx-import-media'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { rehypePrettyCode, type Options as rehypePrettyCodeOptionsType } from 'rehype-pretty-code'
import { transformerNotationDiff } from '@shikijs/transformers'
import { NextConfig } from 'next'

const nextConfig = (phase: string) => {

  const withBundleAnalyzer = WithBundleAnalyzer({
    enabled: phase === PHASE_DEVELOPMENT_SERVER,
    openAnalyzer: false,
    })

    // https://rehype-pretty-code.netlify.app/
    const rehypePrettyCodeOptions: rehypePrettyCodeOptionsType = {
        // VSCode "SynthWave '84" theme
        theme: 'synthwave-84',
        // Keep the background or use a custom background color?
        keepBackground: true,
        tokensMap: {
            function: 'entity.name.function',
            string: 'string',
            key: '.meta.object-literal.key',
        },
        defaultLang: {
            block: 'tsx',
            inline: 'shell',
        },
        transformers: [transformerNotationDiff({
            matchAlgorithm: 'v3',
        })],
    }

    // https://github.com/chrisweb/remark-table-of-contents#options
    const remarkTableOfContentsOptions: remarkTableOfContentsOptionsType = {
        containerAttributes: {
            id: 'articleToc',
        },
        navAttributes: {
            'aria-label': 'table of contents'
        },
        maxDepth: 3,
    }

    // https://github.com/rehypejs/rehype-autolink-headings#api
    const rehypeAutolinkHeadingsOptions: rehypeAutolinkHeadingsOptionsType = {
        behavior: 'append',
        properties: (node) => {
            //console.log(node)
            const headingText = hastToString(node.children[0])
            return {
                'class': 'headingAnchor',
                'aria-label': 'Heading permalink for: ' + headingText,
                'title': 'Heading permalink for: ' + headingText,
            }
        },
        content: fromHtmlIsomorphic(
            '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" class="icon iconLink" aria-hidden="true"><path d="M11 17H7q-2.075 0-3.537-1.463Q2 14.075 2 12t1.463-3.538Q4.925 7 7 7h4v2H7q-1.25 0-2.125.875T4 12q0 1.25.875 2.125T7 15h4Zm-3-4v-2h8v2Zm5 4v-2h4q1.25 0 2.125-.875T20 12q0-1.25-.875-2.125T17 9h-4V7h4q2.075 0 3.538 1.462Q22 9.925 22 12q0 2.075-1.462 3.537Q19.075 17 17 17Z"/></svg>',
            { fragment: true }
        ).children as ElementContent[],
    }

    // https://github.com/remarkjs/remark-gfm
    const remarkGfmOptions: remarkGfmOptionsType = {
        singleTilde: false,
    }

    // https://github.com/chrisweb/rehype-github-alerts
    const myGithubAlertBuild: rehypeGithubAlertsDefaultBuildType = (alertOptions, originalChildren) => {

        const alert = {
            type: 'element',
            tagName: 'div',
            properties: {
                className: [
                    'markdown-alert',
                    `markdown-alert-${alertOptions.keyword.toLowerCase()}`,
                ],
            },
            children: [
                {
                    type: 'element',
                    tagName: 'div',
                    properties: {
                        className: [
                            'markdown-alert-fake-border',
                        ],
                    },
                    children: [
                        {
                            type: 'element',
                            tagName: 'div',
                            properties: {
                                className: [
                                    'markdown-alert-header'
                                ]
                            },
                            children: [
                                {
                                    type: 'text',
                                    value: alertOptions.title
                                }
                            ],
                        },
                        {
                            type: 'element',
                            tagName: 'div',
                            properties: {
                                className: [
                                    'markdown-alert-body'
                                ]
                            },
                            children: [
                                ...originalChildren
                            ],
                        },
                    ],
                },
            ],
        }

        return alert as ElementContent

    }

    // https://github.com/chrisweb/rehype-github-alerts#options
    const rehypeGithubAlertsOptions: rehypeGithubAlertsOptionsType = {
        supportLegacy: false,
        build: myGithubAlertBuild,
        alerts: [
            {
                keyword: 'NOTE',
                icon: '',
                title: 'Note',
            },
            {
                keyword: 'TIP',
                icon: '',
                title: 'Tip',
            },
            {
                keyword: 'MORE',
                icon: '',
                title: 'Read more',
            },
            {
                keyword: 'WARN',
                icon: '',
                title: 'Warning',
            },
        ],
    }

    const withMDX = createMdx({
        options: {
            remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, [remarkTableOfContents, remarkTableOfContentsOptions], [remarkGfm, remarkGfmOptions]],
            rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions], rehypeSlug, rehypeMDXImportMedia, [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions], [rehypeGithubAlerts, rehypeGithubAlertsOptions]],
        },
    })

    const nextConfigOptions: NextConfig = {
        reactStrictMode: true,
        poweredByHeader: false,
        //experimental: {
            //mdxRs: false,
            // React compiler
            //reactCompiler: true,
            // experimental partial prerendering
            // https://nextjs.org/docs/messages/ppr-preview
            //ppr: true,
            // experimental typescript "statically typed links"
            // https://nextjs.org/docs/app/api-reference/next-config-js/typedRoutes
            //typedRoutes: true,
            // https://nextjs.org/blog/next-15-2#react-view-transitions-experimental
            //viewTransition: true,
        //},
        // hit or skip data cache logging (dev server)
        // https://nextjs.org/docs/app/api-reference/next-config-js/logging
        logging: {
            fetches: {
                fullUrl: true,
            },
        },
        // file formats for next/image
        images: {
            formats: ['image/avif', 'image/webp'],
            deviceSizes: [240, 336, 480, 704, 1080, 1408, 1920, 2112, 3840],
        },
        // Configure pageExtensions to include md and mdx
        pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
        headers: async () => {
            return [
                {
                    source: '/(.*)',
                    headers: securityHeadersConfig(phase)
                },
                {
                    source: '/(.*).(cur|webm|mp4|ogg|mp3)',
                    headers: [
                        {
                            key: 'Cache-Control',
                            value: 'public, max-age=315360000, immutable',
                        },
                    ],
                },
                {
                    source: '/assets/images/animated/(.*).(webp|avif)',
                    headers: [
                        {
                            key: 'Cache-Control',
                            value: 'public, max-age=315360000, immutable',
                        },
                    ],
                },
            ]
        }
    }
  return withBundleAnalyzer(withMDX(nextConfigOptions))
}

const securityHeadersConfig = (phase: string) => {

    const cspReportOnly = false
    const reportingUrl = ''
    const reportingDomainWildcard = ''
    const isDev = phase === PHASE_DEVELOPMENT_SERVER

    const cspHeader = () => {

        const upgradeInsecure = (!isDev && !cspReportOnly) ? 'upgrade-insecure-requests;' : ''

        // report directive to be added at the end
        // with Reporting API fallback
        /*const reportCSPViolations = `
            report-uri ${reportingUrl};
            report-to default
        `*/

        // reporting uri (CSP v1)
        const reportCSPViolations = `report-uri ${reportingUrl};`

        // I wanted to add the trusted-types directive to the defaultCSPDirectives:
        // require-trusted-types-for 'script';
        // unfortunately because of fontawesome this is not possible (yet)
        // https://github.com/FortAwesome/Font-Awesome/issues/20001
        // I think that even if fontawesome would support it
        // it would not work with the current version of next.js

        const defaultCSPDirectives = `
          default-src 'self';
          script-src 'self' 'unsafe-eval' 'unsafe-inline' *.supabase.co googleapis.com;
          style-src 'self' 'unsafe-inline';
          img-src * blob: data:;
          media-src *.supabase.co 'self';
          connect-src *;
          font-src 'self' googleapis.com;
          frame-src *.supabase.co;
          object-src 'none';
          base-uri 'self';
          form-action 'self';
          worker-src 'self' blob:;
          child-src 'self' blob:;
          manifest-src 'self';
          ${upgradeInsecure}
        `

        // for production environment white-list vitals.vercel-insights
        // based on: https://vercel.com/docs/speed-insights#content-security-policy
        if (process.env.VERCEL_ENV === 'production') {
            return `
                ${defaultCSPDirectives}
                font-src 'self';
                style-src 'self' 'unsafe-inline';
                script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval';
                connect-src 'self' https://vitals.vercel-insights.com ${reportingDomainWildcard};
                img-src 'self' data:;
                frame-src 'none';
                ${reportCSPViolations}
            `
        }

        // when environment is preview enable unsafe-inline scripts for vercel preview feedback/comments feature
        // and whitelist vercel's domains based on:
        // https://vercel.com/docs/workflow-collaboration/comments/specialized-usage#using-a-content-security-policy
        // and white-list vitals.vercel-insights
        // based on: https://vercel.com/docs/speed-insights#content-security-policy
        if (process.env.VERCEL_ENV === 'preview') {
            return `
                ${defaultCSPDirectives}
                font-src 'self' https://vercel.live/ https://assets.vercel.com https://fonts.gstatic.com;
                style-src 'self' 'unsafe-inline' https://vercel.live/fonts;
                script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://vercel.live/;
                connect-src 'self' https://vercel.live/ https://vitals.vercel-insights.com https://*.pusher.com/ wss://*.pusher.com/ ${reportingDomainWildcard};
                img-src 'self' data: https://vercel.com/ https://vercel.live/;
                frame-src 'self' https://vercel.live/;
                ${reportCSPViolations}
            `
        }

        // for dev environment enable unsafe-eval for hot-reload
        return `
            ${defaultCSPDirectives}
            font-src 'self' https://fonts.gstatic.com;
            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com;
            connect-src 'self';
            img-src 'self' data:;
            frame-src 'none';
        `

    }

    // security headers for preview & production
    const extraSecurityHeaders = []

    if (!isDev) {
        extraSecurityHeaders.push(
            {
                key: 'Strict-Transport-Security',
                value: 'max-age=31536000', // 1 year
            },
        )
    }

    const headers = [
        ...extraSecurityHeaders,
        {
            key: cspReportOnly ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy',
            value: cspHeader().replace(/\n/g, ''),
        },
        // reporting API v0
        /*{
            key: 'Report-To',
            value: `{"group":"default","max_age":10886400,"endpoints":[{"url":"${reportUrl}"}],"include_subdomains":true}`,
        },*/
        // reporting API v1
        /*{
            key: 'Reporting-Endpoints',
            value: `default="${reportUrl}"`,
        },*/
        {
            key: 'Referrer-Policy',
            value: 'same-origin',
        },
        {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
        },
        {
            key: 'X-Frame-Options',
            value: 'DENY'
        },
    ]

    return headers

}

export default nextConfig