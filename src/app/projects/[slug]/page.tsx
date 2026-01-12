import { notFound } from "next/navigation"
import { getProjectBySlug, getAllProjects } from "@/lib/mdx"
import { SplitPane } from "@/components/projects/split-pane"
import { ViewportRenderer } from "@/components/projects/viewport-renderer"
import { Badge } from "@/components/ui/badge"
import { ProjectControls } from "@/components/projects/project-controls"

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] overflow-hidden">
      <SplitPane>
        <div className="flex flex-col h-full">
            <ProjectControls />
            <div className="flex-1 p-8 pb-20 overflow-y-auto">
                <div className="mb-6 space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">{project.meta.title}</h1>
                    <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{project.meta.category}</Badge>
                    {project.meta.tools.map((tool) => (
                        <Badge key={tool} variant="outline">{tool}</Badge>
                    ))}
                    </div>
                </div>
                
                <div className="prose prose-zinc dark:prose-invert max-w-none">
                    {project.content}
                </div>
            </div>
        </div>

        <ViewportRenderer 
            type={project.meta.viewport.type} 
            src={project.meta.viewport.src} 
            model={project.meta.viewport.model} 
        />
      </SplitPane>
    </div>
  )
}
