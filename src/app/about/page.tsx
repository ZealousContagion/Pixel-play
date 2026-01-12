import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TechStackSection } from "@/components/about/tech-stack-section"

export default function AboutPage() {
  return (
    <div className="container py-12 space-y-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
          The Engineer
        </h1>
        <p className="text-xl text-muted-foreground">
          Obsessed with performance, interactivity, and the perfect pixel. I build digital engines that power modern experiences.
        </p>
      </section>

      <Separator />

      {/* Experience Section */}
      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Experience</h2>
          <div className="space-y-8">
            <div className="relative pl-8 border-l border-primary/20">
                <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary" />
                <h3 className="text-xl font-bold">Senior Creative Developer</h3>
                <p className="text-sm text-muted-foreground">TechCorp Inc. | 2023 - Present</p>
                <p className="mt-2 text-muted-foreground">
                    Leading the frontend architecture for high-traffic marketing campaigns. Implemented R3F for immersive product showcases.
                </p>
            </div>
            <div className="relative pl-8 border-l border-primary/20">
                <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-secondary" />
                <h3 className="text-xl font-bold">Frontend Engineer</h3>
                <p className="text-sm text-muted-foreground">StartUp Lab | 2020 - 2023</p>
                <p className="mt-2 text-muted-foreground">
                    Developed the core SaaS dashboard using Next.js and TypeScript. Reduced load times by 40% via code-splitting strategies.
                </p>
            </div>
             <div className="relative pl-8 border-l border-primary/20">
                <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-muted-foreground" />
                <h3 className="text-xl font-bold">Freelance Designer</h3>
                <p className="text-sm text-muted-foreground">Remote | 2018 - 2020</p>
                <p className="mt-2 text-muted-foreground">
                    Delivered branding and web design packages for early-stage startups.
                </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-muted/5 rounded-xl border border-border/40 p-12 overflow-hidden relative">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
             <div className="text-center relative z-10">
                <h3 className="text-sm font-mono text-primary mb-2 tracking-widest uppercase">Engineer_Identity</h3>
                <p className="text-4xl font-bold tracking-tighter">0X_CORE</p>
             </div>
        </div>
      </section>

      <Separator />

      {/* 3D Tech Orbit */}
      <TechStackSection />
    </div>
  )
}
