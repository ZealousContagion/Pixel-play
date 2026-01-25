"use client"

import React, { useState } from "react"
import { SplitPane } from "@/components/projects/split-pane"
import { ViewportRenderer } from "@/components/projects/viewport-renderer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProjectControls } from "@/components/projects/project-controls"
import { ExternalLink, Github } from "lucide-react"

interface ProjectClientWrapperProps {
  project: any
}

export function ProjectClientWrapper({ project }: ProjectClientWrapperProps) {
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const progress = target.scrollTop / (target.scrollHeight - target.clientHeight)
    setScrollProgress(progress)
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] overflow-hidden">
      <SplitPane>
        <div className="flex flex-col h-full">
            <ProjectControls />
            <div 
                className="flex-1 p-6 sm:p-8 pb-20 overflow-y-auto custom-scrollbar"
                onScroll={handleScroll}
            >
                <div className="mb-8 space-y-6">
                    <div className="space-y-2">
                        <Badge variant="outline" className="text-primary border-primary/20 uppercase tracking-widest text-[10px]">
                            {project.meta.category}.sys
                        </Badge>
                        <h1 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase italic">
                            {project.meta.title}
                        </h1>
                        <p className="text-muted-foreground text-lg font-medium">
                            {project.meta.role}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {project.meta.tools.map((tool: string) => (
                            <Badge key={tool} variant="secondary" className="bg-secondary/50 backdrop-blur-sm text-[11px]">
                                {tool}
                            </Badge>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                        {project.meta.demoUrl && (
                            <Button asChild size="sm" className="gap-2 rounded-full font-bold">
                                <a href={project.meta.demoUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    Launch System
                                </a>
                            </Button>
                        )}
                        {project.meta.repoUrl && (
                            <Button asChild variant="outline" size="sm" className="gap-2 rounded-full font-bold">
                                <a href={project.meta.repoUrl} target="_blank" rel="noopener noreferrer">
                                    <Github className="w-3.5 h-3.5" />
                                    Source Code
                                </a>
                            </Button>
                        )}
                    </div>

                    {project.meta.metrics && project.meta.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 py-6 border-y border-border/40">
                            {project.meta.metrics.map((metric: any) => (
                                <div key={metric.label} className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                                        {metric.label}
                                    </p>
                                    <p className="text-2xl font-bold tracking-tight text-primary">
                                        {metric.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className="prose prose-zinc dark:prose-invert max-w-none prose-h2:uppercase prose-h2:tracking-widest prose-h2:text-sm prose-h2:font-bold prose-h2:text-muted-foreground">
                    {project.content}
                </div>
            </div>
        </div>

        <ViewportRenderer 
            type={project.meta.viewport.type} 
            src={project.meta.viewport.src} 
            model={project.meta.viewport.model} 
            scrollProgress={scrollProgress}
        />
      </SplitPane>
    </div>
  )
}
