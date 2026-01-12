"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Code, Box, PenTool, LayoutGrid } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Types matching our MDX frontmatter roughly
interface Project {
  slug: string
  meta: {
    title: string
    category: 'web' | 'design' | '3d'
    description?: string // We might need to add this to frontmatter or derive it
    role: string
    tools: string[]
  }
}

interface BentoGridProps {
  projects: Project[]
}

const CATEGORIES = [
  { id: 'all', label: 'All Systems', icon: LayoutGrid },
  { id: 'web', label: 'Web Architect', icon: Code },
  { id: '3d', label: '3D Engine', icon: Box },
  { id: 'design', label: 'Visuals', icon: PenTool },
]

export function BentoGrid({ projects }: BentoGridProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.meta.category === activeCategory)

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Control Panel (Filter Tabs) */}
      <div className="flex flex-wrap items-center gap-2 p-1 bg-muted/30 rounded-lg backdrop-blur-sm border border-border/50 w-fit mx-auto">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-300",
                isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-md shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {cat.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* The Grid */}
      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "group relative h-full",
                // Make the first project span 2 cols if it's "all" view for visual variety
                activeCategory === 'all' && projects.indexOf(project) === 0 ? "md:col-span-2" : "col-span-1"
              )}
            >
              <Link href={`/projects/${project.slug}`}>
                <Card className="h-full overflow-hidden border-border/50 bg-card/50 hover:bg-card/80 transition-colors duration-300 backdrop-blur-sm hover:border-primary/50 group-hover:shadow-[0_0_30px_-10px_var(--primary)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                            <Badge variant="outline" className="bg-background/50 backdrop-blur-md uppercase tracking-wider text-[10px]">
                                {project.meta.category}
                            </Badge>
                            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {project.meta.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                            {project.meta.role}
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                        {/* Placeholder for visual - in real app we'd use project.meta.thumbnail */}
                        <div className="w-full h-32 rounded-md bg-muted/50 overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500">
                           <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                           {/* Decorative generic pattern */}
                           <div className="w-full h-full opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-background to-background" />
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            {project.meta.tools.slice(0, 3).map((tool) => (
                                <Badge key={tool} variant="secondary" className="text-[10px]">
                                    {tool}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}