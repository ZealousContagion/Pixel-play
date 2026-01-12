"use client"

import React, { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface HolographicCardProps {
  children: React.ReactNode
  className?: string
}

export function HolographicCard({ children, className }: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Mouse position relative to card
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring animations for smoothness
  const springConfig = { damping: 20, stiffness: 150 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig)
  
  // Opacity of the sheen based on mouse position
  const sheenOpacity = useSpring(useTransform(x, [-0.5, 0.5], [0.1, 0.4]), springConfig)
  const sheenX = useTransform(x, [-0.5, 0.5], ["-50%", "150%"])

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    
    // Normalize to -0.5 to 0.5
    x.set(mouseX / width - 0.5)
    y.set(mouseY / height - 0.5)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <div 
      className="perspective-1000 w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative w-full h-full rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden transition-colors duration-500",
          className
        )}
      >
        {/* Holographic Sheen Layer */}
        <motion.div 
          style={{
            background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.2) 45%, rgba(60,180,231,0.2) 50%, rgba(255,196,35,0.2) 55%, transparent 80%)",
            left: sheenX,
            opacity: sheenOpacity,
          }}
          className="absolute inset-0 pointer-events-none z-20 w-[200%] h-full mix-blend-overlay"
        />

        {/* Content with its own 3D lift */}
        <div className="relative z-10 translate-z-10 h-full">
          {children}
        </div>
        
        {/* Glow effect at corners */}
        <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
      </motion.div>
    </div>
  )
}
