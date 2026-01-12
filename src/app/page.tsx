import { BentoGrid } from "@/components/home/bento-grid"
import { getAllProjects } from "@/lib/mdx"
import { HomeHero } from "@/components/home/home-hero"
import { TechStackSection } from "@/components/about/tech-stack-section"
import { Separator } from "@/components/ui/separator"

export default async function Home() {
  const projects = await getAllProjects()

  return (
    <div className="flex flex-col gap-20">
      <HomeHero />

      <section className="container py-12" id="projects-grid">
        <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-4 uppercase">Selected Works</h2>
            <p className="text-muted-foreground max-w-[600px] text-lg">
                A collection of deployed systems, visual identities, and interactive experiences.
            </p>
        </div>
        <BentoGrid projects={projects as any} />
      </section>

      <Separator className="max-w-5xl mx-auto opacity-50" />

      <section className="container py-20 bg-muted/5 rounded-3xl border border-border/20">
         <TechStackSection />
      </section>
    </div>
  )
}