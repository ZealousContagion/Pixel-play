"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"
import { Badge } from "@/components/ui/badge"
import { HolographicCard } from "@/components/ui/holographic-card"
import { Terminal, Zap, Cpu, Beaker, Monitor, Activity, ShieldCheck } from "lucide-react"
import { GLBInspector } from "@/components/lab/glb-inspector"
import { PixelGrid } from "@/components/lab/pixel-grid"
import { useAppStore } from "@/store"

const View = dynamic(() => import("@react-three/drei").then((mod) => mod.View), {
  ssr: false,
})

const ProjectViewer = dynamic(() => import("@/components/canvas/project-viewer").then((mod) => mod.ProjectViewer), {
  ssr: false,
})

const EngineCore = dynamic(() => import("@/components/shared/engine-loader").then((mod) => mod.EngineCore), {
  ssr: false,
})

export default function LabPage() {
  const [customModel, setCustomModel] = useState<string | undefined>(undefined)
  const { fps, performanceMode, theme } = useAppStore()

  return (
    <div className="container py-12 px-4 space-y-8">
      <header className="flex flex-col md:flex-row items-end justify-between gap-6 pb-8 border-b border-border/20">
        <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-none border border-primary/20 flex items-center justify-center bg-primary/5">
                    <Beaker className="w-5 h-5 text-primary" />
                </div>
                <Badge variant="outline" className="text-primary border-primary/20 uppercase tracking-[0.3em] text-[9px] rounded-none">
                    ENGINE_BUILD_LAB_V1
                </Badge>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase italic leading-none">
                TECHNICAL <br /><span className="text-primary">LABORATORY</span>
            </h1>
        </div>
        <div className="hidden md:block text-right">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest max-w-[250px] leading-relaxed">
                Authorized access only. Experimental modules may cause system instability or GPU thermal throttle.
            </p>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1fr_350px]">
        {/* Primary Workspace: 3D Engine Viewport */}
        <div className="space-y-4">
            <div className="h-[500px] w-full bg-muted/5 border border-border/40 relative group overflow-hidden">
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    <div className="flex items-center gap-2 p-2 bg-background/80 backdrop-blur-md border border-border/40 text-[9px] font-mono uppercase tracking-tighter">
                        <Activity className="w-3 h-3 text-secondary animate-pulse" />
                        Viewport_Active: 1920x1080_RES
                    </div>
                    {customModel && (
                        <div className="flex items-center gap-2 p-2 bg-primary/10 backdrop-blur-md border border-primary/20 text-[9px] font-mono uppercase tracking-tighter text-primary">
                            <ShieldCheck className="w-3 h-3" />
                            External_Asset_Injection: SUCCESS
                        </div>
                    )}
                </div>

                <View className="h-full w-full">
                    <React.Suspense fallback={<EngineCore />}>
                        <ProjectViewer model={customModel} />
                    </React.Suspense>
                </View>

                {/* Grid Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "Core_Clock", value: "4.2GHz", icon: Cpu },
                    { label: "Render_FPS", value: fps, icon: Monitor },
                    { label: "GPU_Load", value: performanceMode === 'turbo' ? "88%" : "22%", icon: Zap },
                    { label: "Sync_Status", value: "ONLINE", icon: Activity },
                ].map((stat) => (
                    <div key={stat.label} className="p-4 border border-border/40 bg-muted/5 flex flex-col gap-1">
                        <stat.icon className="w-3 h-3 text-primary mb-1" />
                        <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">{stat.label}</span>
                        <span className="text-xl font-black italic tracking-tighter uppercase">{stat.value}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Sidebar: Control Tools */}
        <div className="space-y-4">
            <HolographicCard className="rounded-none h-[250px]">
                <GLBInspector onModelLoad={(url) => setCustomModel(url)} />
            </HolographicCard>

            <div className="p-6 border border-border/40 bg-muted/5 space-y-6">
                <PixelGrid />
            </div>

            <div className="p-6 border border-border/40 bg-muted/5 space-y-6">
                <div className="space-y-2">
                    <h3 className="text-xs font-black uppercase italic tracking-widest text-primary flex items-center gap-2">
                        <Terminal className="w-3 h-3" />
                        System_Commands
                    </h3>
                    <p className="text-[10px] text-muted-foreground uppercase leading-relaxed">
                        Execute raw engine instructions via the internal shell.
                    </p>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-mono pb-2 border-b border-border/20">
                        <span className="text-muted-foreground uppercase">Memory_Dump</span>
                        <span className="text-primary">0x882...F2</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono pb-2 border-b border-border/20">
                        <span className="text-muted-foreground uppercase">Cache_Hit</span>
                        <span className="text-secondary">99.2%</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono pb-2 border-b border-border/20">
                        <span className="text-muted-foreground uppercase">Thread_Lock</span>
                        <span className="text-accent">DISABLED</span>
                    </div>
                </div>

                <button 
                    onClick={() => {
                        setCustomModel(undefined)
                        // Trigger a fake re-init
                    }}
                    className="w-full h-10 border border-primary/40 bg-primary/5 hover:bg-primary/10 text-primary text-[10px] font-mono uppercase tracking-widest transition-colors"
                >
                    RESET_ENGINE_INSTANCE
                </button>
            </div>

            <div className="p-4 rounded-none border border-dashed border-border/60 text-center">
                <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-tighter">
                    LAB_REF: PX-LAB-INT-04
                </p>
            </div>
        </div>
      </div>
    </div>
  )
}