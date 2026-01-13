"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

const variants = {
  hidden: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative"
      >
        {children}
        
        {/* Subtle Syncing Overlay on Exit */}
        <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/50 backdrop-blur-[2px] z-40 pointer-events-none flex items-center justify-center"
        >
            <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-[1px] bg-primary animate-pulse" />
                <span className="text-[8px] font-mono text-primary uppercase tracking-[0.4em]">Syncing_Data</span>
            </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
