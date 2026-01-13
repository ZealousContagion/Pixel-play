import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Download, ExternalLink, Mail, Phone, MapPin, Linkedin, Github } from "lucide-react"

export default function ResumePage() {
  return (
    <div className="container max-w-4xl py-20 px-4">
      {/* Header / Contact Info */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
          <Badge variant="outline" className="text-primary border-primary/20 uppercase tracking-widest text-[10px]">
            Senior Creative Engineer
          </Badge>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase italic leading-none">
            Pixel<br />Play
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-mono uppercase tracking-tight">
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> engine@pixelplay.dev</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Remote / Global</span>
            <span className="flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5" /> linkedin.com/in/pixelplay</span>
          </div>
        </div>
        
        <Button className="rounded-full h-12 px-8 font-bold gap-2 group">
          <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          Download PDF.src
        </Button>
      </header>

      <Separator className="mb-12" />

      <div className="grid gap-12 md:grid-cols-[1fr_250px]">
        {/* Main Content */}
        <div className="space-y-12">
          {/* Experience */}
          <section className="space-y-8">
            <h2 className="text-xs font-mono font-black uppercase tracking-[0.3em] text-primary">Work_History</h2>
            
            <div className="space-y-8">
                <div className="space-y-2">
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold uppercase italic">Senior Creative Developer</h3>
                        <span className="text-xs font-mono text-muted-foreground pt-1">2023 — PRESENT</span>
                    </div>
                    <p className="text-sm font-bold text-primary/80 uppercase">TechCorp Inc.</p>
                    <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside marker:text-primary">
                        <li>Architected high-performance 3D visualization tools using React Three Fiber.</li>
                        <li>Reduced frontend bundle sizes by 35% through advanced tree-shaking and dynamic imports.</li>
                        <li>Led a team of 4 developers to deliver award-winning interactive marketing campaigns.</li>
                    </ul>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold uppercase italic">Frontend Engineer</h3>
                        <span className="text-xs font-mono text-muted-foreground pt-1">2020 — 2023</span>
                    </div>
                    <p className="text-sm font-bold text-primary/80 uppercase">StartUp Lab</p>
                    <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside marker:text-primary">
                        <li>Developed the core UI components for a real-time SaaS analytics dashboard.</li>
                        <li>Implemented complex data visualizations using D3.js and Canvas API.</li>
                        <li>Collaborated with design teams to establish a robust design system with Tailwind CSS.</li>
                    </ul>
                </div>
            </div>
          </section>

          {/* Education */}
          <section className="space-y-6">
            <h2 className="text-xs font-mono font-black uppercase tracking-[0.3em] text-primary">Academic_Core</h2>
            <div className="space-y-2">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold uppercase italic">B.Sc. Computer Science</h3>
                    <span className="text-xs font-mono text-muted-foreground pt-1">2016 — 2020</span>
                </div>
                <p className="text-sm font-bold text-primary/80 uppercase">University of Digital Arts</p>
                <p className="text-sm text-muted-foreground">Specialization in Computer Graphics and Human-Computer Interaction.</p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-12">
            <section className="space-y-4">
                <h2 className="text-xs font-mono font-black uppercase tracking-[0.3em] text-primary text-center">Tech_Stack</h2>
                <div className="flex flex-wrap gap-2 justify-center">
                    {['Next.js', 'React', 'Three.js', 'TypeScript', 'GLSL', 'Rust', 'Tailwind', 'Node.js', 'PostgreSQL'].map(skill => (
                        <Badge key={skill} variant="secondary" className="text-[10px] font-mono tracking-tighter">{skill}</Badge>
                    ))}
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xs font-mono font-black uppercase tracking-[0.3em] text-primary text-center">Creative_Modules</h2>
                <div className="flex flex-wrap gap-2 justify-center">
                    {['Graphic Design', '3D Modeling', 'Branding', 'UI/UX Strategy', 'Motion Graphics', 'Typography'].map(skill => (
                        <Badge key={skill} variant="outline" className="text-[10px] font-mono tracking-tighter">{skill}</Badge>
                    ))}
                </div>
            </section>

            <div className="p-4 rounded-xl border border-dashed border-border/60 bg-muted/5 text-center">
                <p className="text-[10px] font-mono text-muted-foreground leading-tight">
                    This document is digitally signed and encrypted. 
                    <br />
                    REF: PX-882-SYS
                </p>
            </div>
        </aside>
      </div>
    </div>
  )
}
