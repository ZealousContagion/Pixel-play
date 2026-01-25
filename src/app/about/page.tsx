import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TechStackSection } from "@/components/about/tech-stack-section"
import Image from "next/image"

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
      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Experience</h2>
          <div className="space-y-4">
            <div className="relative pl-6 border-l border-primary/20 py-1">
                <span className="absolute -left-1.5 top-2.5 h-3 w-3 rounded-none bg-primary" />
                <h3 className="text-lg font-bold uppercase italic">Senior Creative Developer</h3>
                <p className="text-[10px] font-mono text-muted-foreground">TechCorp Inc. | 2023 - Present</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Leading the frontend architecture for high-traffic marketing campaigns. Implemented R3F for immersive product showcases.
                </p>
            </div>
            <div className="relative pl-6 border-l border-primary/20 py-1">
                <span className="absolute -left-1.5 top-2.5 h-3 w-3 rounded-none bg-secondary" />
                <h3 className="text-lg font-bold uppercase italic">Frontend Engineer</h3>
                <p className="text-[10px] font-mono text-muted-foreground">StartUp Lab | 2020 - 2023</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Developed the core SaaS dashboard using Next.js and TypeScript. Reduced load times by 40% via code-splitting.
                </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-muted/5 rounded-none border border-border/40 p-8 overflow-hidden relative">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />
             <div className="text-center relative z-10">
                <h3 className="text-[10px] font-mono text-primary mb-1 tracking-widest uppercase">Engineer_Identity</h3>
                <p className="text-3xl font-black tracking-tighter italic">0X_CORE</p>
             </div>
        </div>
      </section>

      <Separator />

      {/* Philosophy & Approach */}
      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Design Philosophy</h2>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              I believe that great digital experiences are born at the intersection of rigorous engineering and intuitive design. My approach is rooted in the &quot;Creative Engine&quot; concept.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 pt-2">
             <div className="p-3 rounded-none border border-border/40 bg-muted/5">
                <h4 className="font-bold text-primary mb-1 text-xs uppercase">Integrity</h4>
                <p className="text-[10px] text-muted-foreground">Clean code that scales and remains maintainable.</p>
             </div>
             <div className="p-3 rounded-none border border-border/40 bg-muted/5">
                <h4 className="font-bold text-secondary mb-1 text-xs uppercase">Interactivity</h4>
                <p className="text-[10px] text-muted-foreground">Tactile digital interfaces that respond to the human touch.</p>
             </div>
          </div>
        </div>

        <div className="relative aspect-video md:aspect-auto rounded-none overflow-hidden border border-border/40 group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 z-0" />
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center space-y-2">
                    <div className="w-24 h-24 rounded-full bg-background border-4 border-primary/20 mx-auto flex items-center justify-center overflow-hidden">
                         <Image src="/logo.svg" alt="Branding" width={48} height={48} className="opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Engineer_Face_Scan.png</p>
                </div>
            </div>
            {/* Decorative Scanner */}
            <div className="absolute inset-0 pointer-events-none z-20">
                <div className="scanner-line opacity-10" />
            </div>
        </div>
      </section>

      <Separator />

      {/* 3D Tech Orbit */}
      <TechStackSection />
    </div>
  )
}
