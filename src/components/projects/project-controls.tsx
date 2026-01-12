"use client"

import { Button } from "@/components/ui/button"
import { Box, Layers, Share2, Info } from "lucide-react"
import { useAppStore } from "@/store"
import { cn } from "@/lib/utils"

export function ProjectControls() {
  const { blueprintMode, setBlueprintMode } = useAppStore()

  return (
    <div className="flex items-center gap-2 p-4 border-b border-border/40 bg-muted/10 backdrop-blur-md">
      <Button
        variant={blueprintMode ? "default" : "outline"}
        size="sm"
        className="h-8 gap-2"
        onClick={() => setBlueprintMode(!blueprintMode)}
      >
        <Layers className="w-4 h-4" />
        {blueprintMode ? "Blueprint: ON" : "Blueprint: OFF"}
      </Button>
      
      <div className="h-4 w-px bg-border/40 mx-2" />
      
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Info className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Share2 className="w-4 h-4" />
      </Button>
    </div>
  )
}
