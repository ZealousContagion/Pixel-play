"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Github, Linkedin, Activity, Clock, Moon, Sun, Youtube, Instagram, MessageCircle } from "lucide-react"
import { useAppStore } from "@/store"
import { SOCIAL_LINKS } from "@/lib/constants"

export function Footer() {
  const { fps, performanceMode, theme, setTheme } = useAppStore()
  const [time, setTime] = useState<string>("")
  const [latency, setLatency] = useState<number>(24)

  useEffect(() => {
    // Update clock
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    }, 1000)

    // Simulate latency fluctuations
    const latencyTimer = setInterval(() => {
      setLatency(Math.floor(Math.random() * 15) + 15)
    }, 3000)

    return () => {
      clearInterval(timer)
      clearInterval(latencyTimer)
    }
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-12 pb-6">
      <div className="container flex flex-col gap-8 md:flex-row md:justify-between mb-12">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center space-x-2 group">
             <div className="w-6 h-6 relative">
                <Image 
                  src={theme === 'light' ? "/logo.svg" : "/logo-white.svg"} 
                  alt="Logo" 
                  fill
                  className="object-contain" 
                />
            </div>
            <span className="font-black text-lg tracking-tighter uppercase italic">Pixel Play</span>
          </Link>
          <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground max-w-xs leading-relaxed opacity-60">
            High-Performance Creative Engine.
            <br />
            Architecting the intersection of visual design and technical excellence.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-[10px] uppercase tracking-widest text-primary mb-2 italic">Navigation</h3>
            <Link href="/projects" className="text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors uppercase tracking-tight">
              Projects.src
            </Link>
            <Link href="/about" className="text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors uppercase tracking-tight">
              About.sys
            </Link>
            <Link href="/resume" className="text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors uppercase tracking-tight">
              Resume.pdf
            </Link>
            <Link href="/contact" className="text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors uppercase tracking-tight">
              Contact.init
            </Link>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-[10px] uppercase tracking-widest text-primary mb-2 italic">Social</h3>
            <a href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors uppercase tracking-tight">
              <Linkedin className="w-3 h-3" /> LinkedIn
            </a>
            <a href={SOCIAL_LINKS.YOUTUBE} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors uppercase tracking-tight">
              <Youtube className="w-3 h-3" /> YouTube
            </a>
            <a href={SOCIAL_LINKS.INSTAGRAM} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors uppercase tracking-tight">
              <Instagram className="w-3 h-3" /> Instagram
            </a>
            <a href={SOCIAL_LINKS.GITHUB} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors uppercase tracking-tight">
              <Github className="w-3 h-3" /> GitHub
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-[10px] uppercase tracking-widest text-primary mb-2 italic">System</h3>
            <Link href="/" className="text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors uppercase tracking-tight">
              Privacy.key
            </Link>
            <Link href="/" className="text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors uppercase tracking-tight">
              Terms.log
            </Link>
          </div>
        </div>
      </div>

      {/* System Status Dashboard */}
      <div className="container border-t border-border/20 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-4 bg-muted/5 border border-border/20">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </div>
              <span className="text-[9px] font-mono font-black tracking-widest uppercase">
                Status: Operational
              </span>
            </div>
            
            <div className="h-3 w-px bg-border/40" />
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span className="text-[9px] font-mono">{time || "00:00:00"}</span>
            </div>

            <div className="hidden md:flex items-center gap-2 text-muted-foreground">
              <Activity className="w-3 h-3" />
              <span className="text-[9px] font-mono uppercase">
                LATENCY: {latency}ms | FPS: {fps} | MODE: {performanceMode}
              </span>
            </div>

            <button 
                onClick={toggleTheme}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            >
              {theme === 'dark' ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
              <span className="text-[9px] font-mono uppercase tracking-widest">
                Mode: {theme.toUpperCase()}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest opacity-40">
              © {new Date().getFullYear()} PIXEL_PLAY_CORE
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}