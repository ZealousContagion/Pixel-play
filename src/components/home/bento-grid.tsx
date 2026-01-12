import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "Neon Horizon",
    category: "3D Animation",
    description: "Cyberpunk city flythrough with reactive audio.",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "E-Commerce Dash",
    category: "Web Development",
    description: "Next.js dashboard with real-time analytics.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Brand Identity",
    category: "Graphic Design",
    description: "Minimalist branding for a tech startup.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Product Showcase",
    category: "3D / Web",
    description: "Interactive 3D product configurator.",
    className: "md:col-span-2 md:row-span-1",
  },
]

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-3 h-[800px] w-full max-w-7xl mx-auto p-4">
      {projects.map((project, i) => (
        <Card key={i} className={cn("group relative overflow-hidden transition-all hover:scale-[1.02]", project.className)}>
            <div className="absolute inset-0 bg-muted/20 transition-colors group-hover:bg-muted/30" />
            <CardHeader className="relative z-10">
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.category}</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
                <p className="text-sm text-muted-foreground">{project.description}</p>
            </CardContent>
        </Card>
      ))}
    </div>
  )
}
