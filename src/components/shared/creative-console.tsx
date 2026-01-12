"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, X, ChevronRight, Hash } from "lucide-react"
import { useAppStore } from "@/store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function CreativeConsole() {
  const { consoleOpen, setConsoleOpen, logs, addLog } = useAppStore()
  const [command, setCommand] = React.useState("")
  const scrollRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new logs
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs, consoleOpen])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    if (!command.trim()) return

    const cmd = command.toLowerCase().trim()
    addLog(`> ${command}`, 'info')

    // Basic Command Engine
    if (cmd === '/help') {
      addLog('Available commands: /clear, /about, /projects, /theme, /status', 'sys')
    } else if (cmd === '/clear') {
      // In a real app we'd have a clear function in store, for now just log
      addLog('Console cleared (simulated)', 'sys')
    } else if (cmd === '/status') {
      addLog('CORE_LOAD: OPTIMAL | 3D_ENGINE: ACTIVE | AI_SYNC: READY', 'sys')
    } else {
      addLog(`Command not recognized: ${cmd}. Type /help for assistance.`, 'error')
    }

    setCommand("")
  }

  if (!consoleOpen) return null

  return (
    <div className="fixed top-20 left-6 z-[100] w-[450px] max-w-[calc(100vw-3rem)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="bg-zinc-950 border border-primary/20 rounded-lg shadow-2xl overflow-hidden backdrop-blur-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-mono font-bold tracking-tighter uppercase text-muted-foreground">
              Creative_Engine_Terminal v1.0
            </span>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-white/10" onClick={() => setConsoleOpen(false)}>
            <X className="h-3 w-3" />
          </Button>
        </div>

        {/* Log Area */}
        <div 
          ref={scrollRef}
          className="h-[300px] overflow-y-auto p-4 font-mono text-[11px] space-y-1.5 scrollbar-thin scrollbar-thumb-white/10"
        >
          {logs.map((log) => (
            <div key={log.id} className="flex gap-3 leading-relaxed group">
              <span className="text-white/20 shrink-0 select-none">[{log.timestamp}]</span>
              <span className={cn(
                "break-all",
                log.type === 'sys' && "text-secondary font-bold",
                log.type === 'error' && "text-accent",
                log.type === 'warn' && "text-yellow-500",
                log.type === 'info' && "text-white/80"
              )}>
                {log.message}
              </span>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-2 border-t border-white/5 bg-white/5">
          <form onSubmit={handleCommand} className="flex items-center gap-2 px-2">
            <ChevronRight className="w-3 h-3 text-primary animate-pulse" />
            <input 
              autoFocus
              className="flex-1 bg-transparent border-none outline-none font-mono text-[11px] text-primary placeholder:text-white/10"
              placeholder="Execute command..."
              value={command}
              onChange={(e) => setCommand(e.target.value)}
            />
            <Hash className="w-3 h-3 text-white/10" />
          </form>
        </div>
      </motion.div>
    </div>
  )
}
