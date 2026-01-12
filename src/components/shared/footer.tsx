"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Github, Twitter, Linkedin, Activity, Clock, Globe } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function Footer() {
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

  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-12 pb-6">
      <div className="container flex flex-col gap-8 md:flex-row md:justify-between mb-12">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-lg tracking-tighter uppercase">Pixel Play</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            High-Performance Creative Engine.
            <br />
            Architecting the intersection of visual design and technical excellence.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-xs uppercase tracking-widest text-primary mb-2">Navigation</h3>
            <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Projects Archive
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About Engine
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Initialize Contact
            </Link>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-xs uppercase tracking-widest text-primary mb-2">Social Connection</h3>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              GitHub.src
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Twitter.feed
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              LinkedIn.net
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-xs uppercase tracking-widest text-primary mb-2">Security</h3>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy.protocols
            </Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms.conditions
            </Link>
          </div>
        </div>
      </div>

      {/* System Status Dashboard */}
      <div className="container border-t border-border/40 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-6 py-4 px-6 bg-muted/20 rounded-lg border border-border/20">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </div>
              <span className="text-[10px] font-mono font-bold tracking-tighter uppercase">
                System Operational
              </span>
            </div>
            
            <div className="h-4 w-px bg-border/40" />
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span className="text-[10px] font-mono">{time || "00:00:00"}</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
              <Globe className="w-3 h-3" />
              <span className="text-[10px] font-mono">LOC_NODE: WIN-32</span>
            </div>

            <div className="hidden md:flex items-center gap-2 text-muted-foreground">
              <Activity className="w-3 h-3" />
              <span className="text-[10px] font-mono">LATENCY: {latency}ms</span>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              © {new Date().getFullYear()} PIXEL_PLAY_CORE
            </p>
            <div className="flex gap-3">
                <Github className="w-3 h-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                <Twitter className="w-3 h-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                <Linkedin className="w-3 h-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}