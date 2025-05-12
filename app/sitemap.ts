import type { MetadataRoute } from 'next'
import path from 'node:path'
import fs from 'node:fs'
import { glob } from 'glob'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'

declare module 'vfile' {
    interface DataMap {
        matter: {
            modified?: string
            permalink?: string
        }
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const defaultDate = 'May 21, 2025'

    const siteMap: MetadataRoute.Sitemap = [{
        url: 'https://opencloudmap.com',
        lastModified: new Date(defaultDate),
        changeFrequency: 'weekly',
        priority: 1,
    }]

    const mainPages = await glob('app/**/page.mdx', { maxDepth: 3 })

    mainPages.map((page) => {

        const pagePath = path.join(process.cwd(), page)
        const pageContent = fs.readFileSync(pagePath, 'utf8')
        const vfile = new VFile(pageContent)

        matter(vfile, { strip: true })

        const frontmatter = vfile.data.matter
        const url = 'https://opencloudmap.com' + page.replace('app', '').replaceAll('\\', '/').replace('/page.mdx', '')

        siteMap.push({
            url: url,
            lastModified: frontmatter?.modified ? new Date(frontmatter.modified) : new Date(defaultDate),
            changeFrequency: 'weekly',
            priority: 0.9,
        })
    })

    const docPages = await glob('app/docs/**/page.mdx', { maxDepth: 5 })

    docPages.map((page) => {

        const pagePath = path.join(process.cwd(), page)
        const pageContent = fs.readFileSync(pagePath, 'utf8')
        const vfile = new VFile(pageContent)

        matter(vfile)

        const frontmatter = vfile.data.matter
        const url = 'https://opencloudmap.com' + page.replace('app', '').replaceAll('\\', '/').replace('/page.mdx', '')

        siteMap.push({
            url: url,
            lastModified: frontmatter?.modified ? new Date(frontmatter.modified) : new Date(defaultDate),
            changeFrequency: 'weekly',
            priority: 0.8,
        })
    })

    const blogPages = await glob('app/blog/**/page.mdx', { maxDepth: 6 })

    blogPages.map((page) => {

        const pagePath = path.join(process.cwd(), page)
        const pageContent = fs.readFileSync(pagePath, 'utf8')
        const vfile = new VFile(pageContent)

        matter(vfile)

        const frontmatter = vfile.data.matter
        const url = 'https://opencloudmap.com' + page.replace('app', '').replaceAll('\\', '/').replace('/page.mdx', '')

        siteMap.push({
            url: url,
            lastModified: frontmatter?.modified ? new Date(frontmatter.modified) : new Date(defaultDate),
            changeFrequency: 'weekly',
            priority: 0.8,
        })
    })

    const guidePages = await glob('app/guides/**/page.mdx', { maxDepth: 6 })

    guidePages.map((page) => {

        const pagePath = path.join(process.cwd(), page)
        const pageContent = fs.readFileSync(pagePath, 'utf8')
        const vfile = new VFile(pageContent)

        matter(vfile)

        const frontmatter = vfile.data.matter
        const url = 'https://opencloudmap.com' + page.replace('app', '').replaceAll('\\', '/').replace('/page.mdx', '')

        siteMap.push({
            url: url,
            lastModified: frontmatter?.modified ? new Date(frontmatter.modified) : new Date(defaultDate),
            changeFrequency: 'weekly',
            priority: 0.8,
        })
    })

    const paperPages = await glob('app/papers/**/page.mdx', { maxDepth: 6 })

    paperPages.map((page) => {

        const pagePath = path.join(process.cwd(), page)
        const pageContent = fs.readFileSync(pagePath, 'utf8')
        const vfile = new VFile(pageContent)

        matter(vfile)

        const frontmatter = vfile.data.matter
        const url = 'https://opencloudmap.com' + page.replace('app', '').replaceAll('\\', '/').replace('/page.mdx', '')

        siteMap.push({
            url: url,
            lastModified: frontmatter?.modified ? new Date(frontmatter.modified) : new Date(defaultDate),
            changeFrequency: 'weekly',
            priority: 0.8,
        })
    })

  return sitemap
}