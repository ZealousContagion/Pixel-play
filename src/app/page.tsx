import { BentoGrid } from "@/components/home/bento-grid"
import { getAllProjects } from "@/lib/mdx"
import { HomeHero } from "@/components/home/home-hero"
import { TechStackSection } from "@/components/about/tech-stack-section"
import { Separator } from "@/components/ui/separator"
import { CallToAction } from "@/components/shared/cta-section"

export default async function Home() {
  const projects = await getAllProjects()

  return (
    <div className="flex flex-col gap-20">
      <HomeHero />

      <section className="container py-12" id="projects-grid">
        <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-4 uppercase italic">Selected Works</h2>
            <p className="text-muted-foreground max-w-[600px] text-lg">
                A collection of deployed systems, visual identities, and interactive experiences.
            </p>
        </div>
        <BentoGrid projects={projects as any} />
      </section>

      <section className="container py-20 border-y border-border/40">
        <div className="grid gap-8 md:grid-cols-3">
            {[
                {
                    quote: "The intersection of 3D performance and clean UI is rare. Pixel Play delivered an engine that transformed our product visualization.",
                    author: "Sarah Chen",
                    role: "CTO @ AeroLab"
                },
                {
                    quote: "Technical excellence combined with a deep understanding of brand identity. A truly rare find in the creative engineering space.",
                    author: "Marcus Thorne",
                    role: "Design Lead @ Quantum"
                },
                {
                    quote: "High-frequency updates and rock-solid architecture. The analytics dashboard is a masterpiece of frontend engineering.",
                    author: "Elena Rossi",
                    role: "Product Manager @ Fintech"
                }
            ].map((t, i) => (
                <div key={i} className="p-6 rounded-2xl bg-muted/5 border border-border/20 relative group hover:border-primary/50 transition-colors">
                    <p className="text-lg italic mb-6 text-muted-foreground leading-relaxed">&quot;{t.quote}&quot;</p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                            {t.author[0]}
                        </div>
                        <div>
                            <p className="font-bold text-sm">{t.author}</p>
                            <p className="text-xs text-muted-foreground">{t.role}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto opacity-50" />

      <section className="container py-20 bg-muted/5 rounded-3xl border border-border/20">
         <TechStackSection />
      </section>

      <CallToAction />
    </div>
  )
}