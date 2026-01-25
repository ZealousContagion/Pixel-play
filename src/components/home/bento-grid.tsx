"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Code, Box, PenTool, LayoutGrid } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { HolographicCard } from "@/components/ui/holographic-card"

// Types matching our MDX frontmatter roughly
interface Project {
  slug: string
  meta: {
    title: string
    category: 'web' | 'design' | '3d'
    description?: string 
    role: string
    tools: string[]
    thumbnail?: string
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
                "relative flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-300",
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
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {cat.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* The Grid */}
      <motion.div 
        layout 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.slug}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "group relative h-full",
                // Make the first project span 2 cols if it's "all" view for visual variety, but only on sm+
                activeCategory === 'all' && projects.indexOf(project) === 0 ? "sm:col-span-2" : "col-span-1"
              )}
            >
              <Link href={`/projects/${project.slug}`} className="block h-full">
                <HolographicCard className="h-full rounded-none border-border/40">
                    <div className="p-4 sm:p-5 h-full flex flex-col">
                        <div className="flex justify-between items-start mb-3">
                            <Badge variant="outline" className="bg-background/50 backdrop-blur-md uppercase tracking-[0.2em] text-[9px] border-primary/20 rounded-none font-mono">
                                {project.meta.category}.sys
                            </Badge>
                            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        
                        <div className="flex-1 space-y-2 sm:space-y-3">
                            <h3 className="text-lg sm:text-xl font-black tracking-tighter uppercase italic group-hover:text-primary transition-colors leading-none">
                                {project.meta.title}
                            </h3>
                            <p className="text-[11px] sm:text-[12px] text-muted-foreground leading-snug line-clamp-2">
                                {project.meta.role}
                            </p>
                            
                            <div className="w-full h-24 sm:h-28 rounded-none bg-muted/10 border border-border/20 overflow-hidden relative mt-2">
                                {project.meta.thumbnail ? (
                                    <Image 
                                        src={project.meta.thumbnail} 
                                        alt={project.meta.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <>
                                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                                    </>
                                )}
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-2 left-2 flex gap-1">
                                     <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                                     <div className="w-1 h-1 rounded-full bg-secondary animate-pulse delay-75" />
                                     <div className="w-1 h-1 rounded-full bg-accent animate-pulse delay-150" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 sm:mt-6 pt-4 border-t border-border/40 flex flex-wrap gap-2">
                            {project.meta.tools.slice(0, 4).map((tool) => (
                                <span key={tool} className="text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-tighter">
                                    #{tool}
                                </span>
                            ))}
                        </div>
                    </div>
                </HolographicCard>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}