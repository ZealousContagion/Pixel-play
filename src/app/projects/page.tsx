import { BentoGrid } from "@/components/home/bento-grid"
import { getAllProjects } from "@/lib/mdx"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Projects | Pixel Play",
  description: "Explore the full gallery of creative engineering projects, from 3D experiences to high-performance web applications.",
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <div className="container py-20 px-4 space-y-16">
      {/* Header */}
      <section className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
        <Badge variant="outline" className="text-primary border-primary/20 uppercase tracking-[0.3em] text-[10px]">
            Archive_Gallery
        </Badge>
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase italic leading-none">
          Selected <span className="text-primary">Systems</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A deep dive into the experimental and production-ready modules built with the Pixel Play Creative Engine.
        </p>
      </section>

      {/* Grid */}
      <BentoGrid projects={projects as any} />

      {/* Footer Note */}
      <section className="pt-20 border-t border-border/20 text-center">
        <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
            End_of_Archive — More coming soon
        </p>
      </section>
    </div>
  )
}
