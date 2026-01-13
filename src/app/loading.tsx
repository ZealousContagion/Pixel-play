"use client"

import { Bot } from "lucide-react"
import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center">
      <div className="relative">
        {/* Animated Rings */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 rounded-none border-2 border-primary/20 border-t-primary"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 rounded-none border-2 border-secondary/20 border-b-secondary"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Bot className="w-8 h-8 text-primary animate-pulse" />
        </div>
      </div>

      <div className="mt-8 space-y-2 text-center">
        <p className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] animate-pulse">
          Initializing_Core_Engine
        </p>
        <div className="flex gap-1 justify-center">
            {[1,2,3].map(i => (
                <motion.div 
                    key={i}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1 h-1 bg-primary"
                />
            ))}
        </div>
      </div>

      {/* Decorative background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[size:32px_32px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]" />
    </div>
  )
}
