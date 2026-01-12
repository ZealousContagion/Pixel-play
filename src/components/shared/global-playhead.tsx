"use client"

import * as React from "react"
import { Settings2, Play, Pause, Monitor, Sparkles, Layers, Terminal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useAppStore } from "@/store"
import { cn } from "@/lib/utils"

export function GlobalPlayhead() {
  const { quality, setQuality, editMode, setEditMode, setChatOpen, consoleOpen, setConsoleOpen } = useAppStore()

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full border border-border/40 bg-background/80 p-1 backdrop-blur-md shadow-2xl supports-[backdrop-filter]:bg-background/40 max-w-[95vw]">
      <div className="flex items-center gap-0.5 sm:gap-1">
        <Button
          variant={consoleOpen ? "default" : "ghost"}
          size="icon"
          className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
          onClick={() => setConsoleOpen(!consoleOpen)}
          title="Toggle Terminal Console"
        >
          <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>

        <div className="h-4 w-px bg-border/50 mx-0.5 sm:mx-1" />

        <Button
          variant={editMode ? "default" : "ghost"}
          size="icon"
          className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
          onClick={() => setEditMode(!editMode)}
          title="Toggle Edit Mode"
        >
          <Layers className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>

        <div className="h-4 w-px bg-border/50 mx-0.5 sm:mx-1" />

        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
          onClick={() => {
             const next = quality === 'low' ? 'medium' : quality === 'medium' ? 'high' : 'low';
             setQuality(next);
          }}
          title={`Quality: ${quality}`}
        >
          <Monitor className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4", quality === 'high' && "text-primary")} />
        </Button>

        <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
            onClick={() => setChatOpen(true)}
            title="AI Assistant"
        >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>

        <div className="h-4 w-px bg-border/50 mx-0.5 sm:mx-1" />

        <div className="flex items-center px-1.5 sm:px-2 text-[10px] sm:text-xs font-mono text-muted-foreground whitespace-nowrap">
             <span>00:00:00</span>
        </div>
      </div>
    </div>
  )
}
