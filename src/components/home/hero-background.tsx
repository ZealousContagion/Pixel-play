"use client"

import React from "react"

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-muted/5">
      {/* Abstract Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, transparent, black 40%, black 70%, transparent)'
        }} 
      />
      
      {/* Gradient Orbs for depth */}
      <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full animate-pulse opacity-50" />
      <div className="absolute bottom-[-20%] right-[20%] w-[600px] h-[600px] bg-secondary/10 blur-[120px] rounded-full opacity-30" />
      
      {/* Scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
    </div>
  )
}
