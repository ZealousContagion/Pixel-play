import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

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

        {/* Skills Section */}
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Tech Stack</h2>
            
            <Card className="bg-muted/10 border-primary/10">
                <CardHeader>
                    <CardTitle className="text-lg">Core</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {["TypeScript", "React", "Next.js", "Node.js", "Python", "Rust"].map(s => (
                        <Badge key={s} variant="secondary">{s}</Badge>
                    ))}
                </CardContent>
            </Card>

            <Card className="bg-muted/10 border-primary/10">
                <CardHeader>
                    <CardTitle className="text-lg">Creative & 3D</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {["Three.js", "React Three Fiber", "GLSL", "Blender", "Framer Motion", "GSAP"].map(s => (
                        <Badge key={s} variant="outline" className="border-primary/50 text-primary">{s}</Badge>
                    ))}
                </CardContent>
            </Card>

            <Card className="bg-muted/10 border-primary/10">
                <CardHeader>
                    <CardTitle className="text-lg">Tools & DevOps</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {["Git", "Docker", "AWS", "Vercel", "Figma", "Adobe CC"].map(s => (
                        <Badge key={s} variant="secondary">{s}</Badge>
                    ))}
                </CardContent>
            </Card>
        </div>
      </section>
    </div>
  )
}
