"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ContactDialog } from "@/components/shared/contact-dialog"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/store"
import { Activity, Zap, Cpu } from "lucide-react"
import { HeroBackground } from "@/components/home/hero-background"

export function HomeHero() {
  const { 
    terminalOpen, 
    setTerminalOpen,
    addLog 
  } = useAppStore()
  
  const scrollToProjects = () => {
    const grid = document.getElementById('projects-grid')
    grid?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
      <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden border-b border-border/40 bg-muted/5">
        <HeroBackground />

        {/* Decorative Scanner Line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
             <div className="scanner-line opacity-20" />
        </div>
        
        <div className="container relative z-10 flex flex-col items-center gap-4 sm:gap-6 text-center px-4">
          <div className="space-y-2 sm:space-y-3">
            <Badge variant="outline" className="px-3 py-0.5 border-primary/30 text-primary bg-primary/5 animate-pulse text-[10px] sm:text-[11px] rounded-none font-mono">
                SYSTEM_ONLINE_2.0
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 leading-[0.9] uppercase italic">
                Pixel Play
            </h1>
            <p className="max-w-[650px] mx-auto text-muted-foreground text-sm sm:text-lg font-medium px-2 leading-relaxed">
                High-performance digital architecture bridging the gap between <span className="text-primary">code</span> and <span className="text-secondary">motion</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 w-full sm:w-auto px-4 sm:px-0">
            <Button 
                size="lg" 
                className="h-10 px-8 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none text-xs font-bold shadow-lg shadow-primary/20 w-full sm:w-auto uppercase tracking-widest"
                onClick={scrollToProjects}
            >
              Initialize <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <ContactDialog>
                <Button variant="outline" size="lg" className="h-10 px-8 rounded-none border-border/60 backdrop-blur-md w-full sm:w-auto text-xs uppercase tracking-widest">
                Establish Link
                </Button>
            </ContactDialog>
          </div>

          {/* New Engine Dashboard Component - Simplified for 2D */}
          <div className="grid grid-cols-3 gap-2 w-full max-w-xl mt-4 pt-4 border-t border-border/20">
             <div 
                className="flex flex-col items-center p-3 sm:p-4 bg-background/40 backdrop-blur-md rounded-xl border border-border/40 transition-all"
             >
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-1 sm:mb-2 animate-pulse" />
                <span className="text-[8px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Status</span>
                <span className="text-base sm:text-xl font-bold font-mono text-foreground">OPTIMIZED</span>
             </div>

             <div 
                className="flex flex-col items-center p-3 sm:p-4 bg-background/40 backdrop-blur-md rounded-xl border border-border/40 transition-all opacity-80"
             >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-secondary mb-1 sm:mb-2" />
                <span className="text-[8px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                    Load_Time
                </span>
                <span className="text-base sm:text-xl font-bold font-mono text-foreground">~50ms</span>
             </div>

             <div 
                className="flex flex-col items-center p-3 sm:p-4 bg-background/40 backdrop-blur-md rounded-xl border border-border/40 transition-all col-span-2 sm:col-span-1 opacity-80"
             >
                <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-accent mb-1 sm:mb-2" />
                <span className="text-[8px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-widest whitespace-nowrap">Mode</span>
                <span className="text-base sm:text-xl font-bold font-mono text-foreground uppercase">LIGHT</span>
             </div>
          </div>

          <Button 
            variant="ghost" 
            className="mt-4 font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary h-auto py-2"
            onClick={() => setTerminalOpen(!terminalOpen)}
          >
            {terminalOpen ? "[ Terminate_Terminal ]" : "[ Access_Engine_Terminal ]"}
          </Button>
        </div>
      </section>
  )
}
