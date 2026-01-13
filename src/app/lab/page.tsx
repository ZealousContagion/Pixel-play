import { Badge } from "@/components/ui/badge"
import { HolographicCard } from "@/components/ui/holographic-card"
import { Terminal, Zap, Cpu, Beaker } from "lucide-react"

const EXPERIMENTS = [
    {
        id: "shader-01",
        title: "Perlin Noise Flow",
        description: "A custom GLSL shader simulating organic fluid movement using 3D simplex noise.",
        tech: "GLSL / Three.js",
        status: "STABLE"
    },
    {
        id: "phys-02",
        title: "Deterministic Collision",
        description: "High-frequency physics simulation using Rapier.js with cross-browser state sync.",
        tech: "Rapier / Rust",
        status: "EXPERIMENTAL"
    },
    {
        id: "ui-03",
        title: "Neural UI Core",
        description: "Adaptive interface components that react to simulated biometric data streams.",
        tech: "Framer Motion",
        status: "PROTOTYPE"
    },
    {
        id: "geo-04",
        title: "L-System Growth",
        description: "Recursive procedural generation of plant-like structures using L-Systems.",
        tech: "TypeScript / Canvas",
        status: "STABLE"
    }
]

export default function LabPage() {
  return (
    <div className="container py-20 px-4 space-y-12">
      <header className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
        <div className="w-16 h-16 rounded-none border border-primary/20 flex items-center justify-center bg-primary/5">
            <Beaker className="w-8 h-8 text-primary" />
        </div>
        <div className="space-y-2">
            <Badge variant="outline" className="text-primary border-primary/20 uppercase tracking-[0.3em] text-[10px]">
                Technical_Laboratory
            </Badge>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase italic leading-none">
                The <span className="text-primary">Lab</span>
            </h1>
        </div>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Experimental modules, shader tests, and raw engineering prototypes. Not all systems are stable.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {EXPERIMENTS.map((exp) => (
            <HolographicCard key={exp.id} className="rounded-none">
                <div className="p-6 space-y-4 flex flex-col h-full">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono text-primary">{exp.id}</span>
                        <Badge className="text-[8px] rounded-none font-mono tracking-tighter">
                            {exp.status}
                        </Badge>
                    </div>
                    <h3 className="text-lg font-black uppercase italic leading-tight">{exp.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                        {exp.description}
                    </p>
                    <div className="pt-4 border-t border-border/20 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-muted-foreground">{exp.tech}</span>
                        <Zap className="w-3 h-3 text-secondary" />
                    </div>
                </div>
            </HolographicCard>
        ))}
      </div>

      <footer className="pt-20 border-t border-border/20 text-center">
         <div className="inline-flex items-center gap-2 p-2 bg-muted/5 border border-border/40 rounded-none text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            <Terminal className="w-3 h-3" />
            Terminal Access Enabled: Use "`" to interrogate systems.
         </div>
      </footer>
    </div>
  )
}
