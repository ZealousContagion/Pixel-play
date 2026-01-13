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
            <div className="flex-1 p-6 sm:p-8 pb-20 overflow-y-auto custom-scrollbar">
                <div className="mb-8 space-y-6">
                    <div className="space-y-2">
                        <Badge variant="outline" className="text-primary border-primary/20 uppercase tracking-widest text-[10px]">
                            {project.meta.category}.sys
                        </Badge>
                        <h1 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase italic">
                            {project.meta.title}
                        </h1>
                        <p className="text-muted-foreground text-lg font-medium">
                            {project.meta.role}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {project.meta.tools.map((tool) => (
                            <Badge key={tool} variant="secondary" className="bg-secondary/50 backdrop-blur-sm text-[11px]">
                                {tool}
                            </Badge>
                        ))}
                    </div>

                    {project.meta.metrics && project.meta.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 py-6 border-y border-border/40">
                            {project.meta.metrics.map((metric) => (
                                <div key={metric.label} className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                                        {metric.label}
                                    </p>
                                    <p className="text-2xl font-bold tracking-tight text-primary">
                                        {metric.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className="prose prose-zinc dark:prose-invert max-w-none prose-h2:uppercase prose-h2:tracking-widest prose-h2:text-sm prose-h2:font-bold prose-h2:text-muted-foreground">
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
