"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAppStore } from "@/store"

interface Pixel {
    color: string
    message: string
    author: string
}

export function PixelGrid() {
  const [grid, setPixelGrid] = useState<Record<string, Pixel>>({})
  const [selectedPixel, setSelectedPixel] = useState<string | null>(null)
  const { addLog } = useAppStore()

  useEffect(() => {
    const saved = localStorage.getItem('pixel-play-grid')
    if (saved) setPixelGrid(JSON.parse(saved))
  }, [])

  const claimPixel = (id: string) => {
    setSelectedPixel(id)
    addLog(`PIXEL_GRID: Accessing sector ${id}...`, 'info')
  }

  const savePixel = (color: string, message: string) => {
    if (!selectedPixel) return
    const newGrid = {
        ...grid,
        [selectedPixel]: { color, message, author: "GUEST_USER" }
    }
    setPixelGrid(newGrid)
    localStorage.setItem('pixel-play-grid', JSON.stringify(newGrid))
    setSelectedPixel(null)
    addLog(`PIXEL_GRID: Sector ${selectedPixel} updated successfully.`, 'sys')
  }

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h3 className="text-xs font-black uppercase italic tracking-widest text-primary">Collaborative_Grid</h3>
            <span className="text-[9px] font-mono text-muted-foreground uppercase">Local_Node_Storage: ACTIVE</span>
        </div>

        <div className="grid grid-cols-10 gap-1 aspect-square w-full max-w-[300px] mx-auto bg-muted/5 p-2 border border-border/40">
            {Array.from({ length: 100 }).map((_, i) => {
                const id = `p-${i}`
                const pixel = grid[id]
                return (
                    <button
                        key={id}
                        onClick={() => claimPixel(id)}
                        className="w-full aspect-square border border-border/10 transition-all hover:scale-110 hover:z-10"
                        style={{ backgroundColor: pixel?.color || 'transparent' }}
                        title={pixel?.message || 'Empty Sector'}
                    />
                )
            })}
        </div>

        {selectedPixel && (
            <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border border-primary/20 bg-primary/5 space-y-3"
            >
                <p className="text-[10px] font-mono uppercase tracking-widest text-primary">Modifying_Sector: {selectedPixel}</p>
                <div className="flex gap-2">
                    {['#3cb4e7', '#ffc423', '#b54d50', '#ffffff'].map(c => (
                        <button 
                            key={c} 
                            onClick={() => savePixel(c, "System established")}
                            className="w-6 h-6 border border-border/40"
                            style={{ backgroundColor: c }}
                        />
                    ))}
                </div>
            </motion.div>
        )}
    </div>
  )
}
