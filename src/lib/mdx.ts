import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'

const projectsDirectory = path.join(process.cwd(), 'src/content/projects')

export type ProjectFrontmatter = {
  title: string
  category: 'web' | 'design' | '3d'
  role: string
  tools: string[]
  metrics?: { label: string; value: string }[]
  featured: boolean
  thumbnail: string
  demoUrl?: string
  repoUrl?: string
  viewport: {
    type: 'iframe' | 'canvas' | 'webgl'
    src?: string
    model?: string
  }
}

export type Project = {
  slug: string
  meta: ProjectFrontmatter
  content: React.ReactNode
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const realSlug = slug.replace(/\.mdx$/, '')
  const filePath = path.join(projectsDirectory, `${realSlug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return undefined
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')

  const { frontmatter, content } = await compileMDX<ProjectFrontmatter>({
    source: fileContent,
    options: { parseFrontmatter: true },
  })

  return {
    slug: realSlug,
    meta: frontmatter,
    content,
  }
}

export async function getAllProjects(): Promise<Omit<Project, 'content'>[]> {
  const files = fs.readdirSync(projectsDirectory)

  const projects = await Promise.all(
    files.map(async (file) => {
      const { meta } = (await getProjectBySlug(file))!
      return {
        slug: file.replace(/\.mdx$/, ''),
        meta,
      }
    })
  )

  return projects
}
