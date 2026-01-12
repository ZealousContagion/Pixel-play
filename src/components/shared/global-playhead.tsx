"use client"

import * as React from "react"
import { Settings2, Play, Pause, Monitor, Sparkles, Layers } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useAppStore } from "@/store"
import { cn } from "@/lib/utils"

export function GlobalPlayhead() {
  const { quality, setQuality, editMode, setEditMode, setChatOpen } = useAppStore()

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-border/40 bg-background/80 p-1 backdrop-blur-md shadow-2xl supports-[backdrop-filter]:bg-background/40">
      <div className="flex items-center gap-1">
        <Button
          variant={editMode ? "default" : "ghost"}
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => setEditMode(!editMode)}
          title="Toggle Edit Mode"
        >
          <Layers className="h-4 w-4" />
        </Button>

        <div className="h-4 w-px bg-border/50 mx-1" />

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => {
             const next = quality === 'low' ? 'medium' : quality === 'medium' ? 'high' : 'low';
             setQuality(next);
          }}
          title={`Quality: ${quality}`}
        >
          <Monitor className={cn("h-4 w-4", quality === 'high' && "text-primary")} />
        </Button>

        <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => setChatOpen(true)}
            title="AI Assistant"
        >
            <Sparkles className="h-4 w-4" />
        </Button>

        <div className="h-4 w-px bg-border/50 mx-1" />

        <div className="flex items-center px-2 text-xs font-mono text-muted-foreground">
             <span>00:00:00</span>
        </div>
      </div>
    </div>
  )
}
