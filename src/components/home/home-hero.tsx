"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ContactDialog } from "@/components/shared/contact-dialog"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/store"
import { Activity, Zap, Cpu } from "lucide-react"

const View = dynamic(() => import("@react-three/drei").then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-muted/5">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

const HeroScene = dynamic(() => import("@/components/canvas/hero-scene").then((mod) => mod.HeroScene), {
  ssr: false,
})

const EngineCore = dynamic(() => import("@/components/shared/engine-loader").then((mod) => mod.EngineCore), {
  ssr: false,
})

export function HomeHero() {
  const { 
    fps, 
    performanceMode, 
    setPerformanceMode, 
    autoScale, 
    setAutoScale, 
    consoleOpen, 
    setConsoleOpen,
    addLog 
  } = useAppStore()
  
  const scrollToProjects = () => {
    const grid = document.getElementById('projects-grid')
    grid?.scrollIntoView({ behavior: 'smooth' })
  }

  const togglePerformance = () => {
    const nextMode = performanceMode === 'turbo' ? 'eco' : 'turbo'
    setPerformanceMode(nextMode)
    addLog(`MANUAL_OVERRIDE: Performance set to ${nextMode.toUpperCase()}`, 'warn')
  }

  const toggleAutoScale = () => {
    setAutoScale(!autoScale)
    addLog(`SYSTEM_POLICY_UPDATED: Auto-Scaling ${!autoScale ? 'ENABLED' : 'DISABLED'}`, 'sys')
  }

  return (
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden border-b border-border/40 bg-muted/5">
        <div className="absolute inset-0 z-0 opacity-60">
          <View className="h-full w-full">
            <React.Suspense fallback={<EngineCore />}>
                <HeroScene />
            </React.Suspense>
          </View>
        </div>

        {/* Decorative Scanner Line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
             <div className="scanner-line opacity-20" />
        </div>
        
        <div className="container relative z-10 flex flex-col items-center gap-6 sm:gap-8 text-center px-4">
          <div className="space-y-3 sm:space-y-4">
            <Badge variant="outline" className="px-3 py-0.5 sm:px-4 sm:py-1 border-primary/30 text-primary bg-primary/5 animate-pulse text-[10px] sm:text-xs">
                v1.0.2_STABLE
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 leading-tight">
                Creative Engine
            </h1>
            <p className="max-w-[800px] text-muted-foreground text-base sm:text-xl md:text-2xl font-light px-2">
                High-performance digital architecture bridging the gap between <span className="text-primary font-medium">code</span> and <span className="text-secondary font-medium">motion</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
            <Button 
                size="lg" 
                className="h-11 sm:h-12 px-6 sm:px-8 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-sm sm:text-base font-bold shadow-lg shadow-primary/20 w-full sm:w-auto"
                onClick={scrollToProjects}
            >
              Initialize Exploration <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            
            <ContactDialog>
                <Button variant="outline" size="lg" className="h-11 sm:h-12 px-6 sm:px-8 rounded-full border-border/60 backdrop-blur-md w-full sm:w-auto">
                Establish Link
                </Button>
            </ContactDialog>
          </div>

          {/* New Engine Dashboard Component */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-3xl mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/20">
             <button 
                onClick={() => addLog("SYSTEM_RESYNC: Latency stabilized", "sys")}
                className="flex flex-col items-center p-3 sm:p-4 bg-background/40 backdrop-blur-md rounded-xl border border-border/40 group hover:border-primary/50 transition-all hover:scale-[1.02] active:scale-95"
             >
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-1 sm:mb-2 group-hover:animate-pulse" />
                <span className="text-[8px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Core_Latency</span>
                <span className="text-base sm:text-xl font-bold font-mono text-foreground">24ms</span>
             </button>

             <button 
                onClick={toggleAutoScale}
                className={cn(
                    "flex flex-col items-center p-3 sm:p-4 bg-background/40 backdrop-blur-md rounded-xl border transition-all hover:scale-[1.02] active:scale-95",
                    autoScale ? "border-secondary/50" : "border-border/40 opacity-60"
                )}
             >
                <Zap className={cn("w-4 h-4 sm:w-5 sm:h-5 mb-1 sm:mb-2", autoScale ? "text-secondary" : "text-muted-foreground")} />
                <span className="text-[8px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                    {autoScale ? "Auto_ON" : "Auto_OFF"}
                </span>
                <span className="text-base sm:text-xl font-bold font-mono text-foreground">{fps}</span>
             </button>

             <button 
                onClick={togglePerformance}
                className={cn(
                    "flex flex-col items-center p-3 sm:p-4 bg-background/40 backdrop-blur-md rounded-xl border transition-all hover:scale-[1.02] active:scale-95 col-span-2 sm:col-span-1",
                    performanceMode === 'turbo' ? "border-accent/50 shadow-lg shadow-accent/5" : "border-border/40"
                )}
             >
                <Cpu className={cn("w-4 h-4 sm:w-5 sm:h-5 mb-1 sm:mb-2", performanceMode === 'turbo' ? "text-accent" : "text-muted-foreground")} />
                <span className="text-[8px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-widest whitespace-nowrap">Engine_Mode</span>
                <span className="text-base sm:text-xl font-bold font-mono text-foreground uppercase">{performanceMode}</span>
             </button>
          </div>

          <Button 
            variant="ghost" 
            className="mt-4 font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary h-auto py-2"
            onClick={() => setConsoleOpen(!consoleOpen)}
          >
            {consoleOpen ? "[ Terminate_Console ]" : "[ Access_System_Shell ]"}
          </Button>
        </div>
      </section>
  )
}
