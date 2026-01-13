"use client"

import React, { useEffect, useState } from "react"
import { useAppStore } from "@/store"
import { motion, AnimatePresence } from "framer-motion"
import { Cpu, Activity, Layout, Box } from "lucide-react"

export function DebugOverlay() {
  const { debugMode, fps, theme } = useAppStore()
  const [nodes, setNodes] = useState(0)

  useEffect(() => {
    if (!debugMode) return
    const updateNodes = () => setNodes(document.querySelectorAll('*').length)
    updateNodes()
    const timer = setInterval(updateNodes, 2000)
    return () => clearInterval(timer)
  }, [debugMode])

  if (!debugMode) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[90] overflow-hidden">
      {/* Top Left Stats */}
      <div className="absolute top-16 left-6 space-y-1">
        <Stat label="DOM_NODES" value={nodes} />
        <Stat label="RENDER_FPS" value={fps} />
        <Stat label="ACTIVE_THEME" value={theme.toUpperCase()} />
      </div>

      {/* Top Right Stats */}
      <div className="absolute top-16 right-6 text-right space-y-1">
        <Stat label="VIEWPORT_W" value={typeof window !== 'undefined' ? window.innerWidth : 0} />
        <Stat label="VIEWPORT_H" value={typeof window !== 'undefined' ? window.innerHeight : 0} />
        <Stat label="ENGINE_STATE" value="DEBUG_ACTIVE" color="text-primary" />
      </div>

      {/* Center Crosshair */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-20 h-[1px] bg-primary" />
        <div className="h-20 w-[1px] bg-primary absolute" />
      </div>

      {/* Bottom Labels */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-12 text-[8px] font-mono text-primary/40 uppercase tracking-[0.5em]">
        <span>Grid_System: Enabled</span>
        <span>Wireframe_Overlay: Active</span>
        <span>Memory_Tracking: Live</span>
      </div>
    </div>
  )
}

function Stat({ label, value, color = "text-muted-foreground" }: { label: string, value: string | number, color?: string }) {
    return (
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-tighter">
            <span className="opacity-40">{label}:</span>
            <span className={color}>{value}</span>
        </div>
    )
}
