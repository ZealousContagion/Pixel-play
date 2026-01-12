import { BentoGrid } from "@/components/home/bento-grid"
import { getAllProjects } from "@/lib/mdx"
import { HomeHero } from "@/components/home/home-hero"

export default async function Home() {
  const projects = await getAllProjects()

  return (
    <div className="flex flex-col gap-12">
      <HomeHero />

      <section className="container py-12">
        <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Selected Works</h2>
            <p className="text-muted-foreground max-w-[600px]">
                A collection of deployed systems, visual identities, and interactive experiences.
            </p>
        </div>
        <BentoGrid projects={projects as any} />
      </section>
    </div>
  )
}