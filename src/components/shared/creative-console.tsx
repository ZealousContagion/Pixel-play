"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, X, ChevronRight, Hash } from "lucide-react"
import { useAppStore } from "@/store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function CreativeConsole() {
  const { 
    consoleOpen, 
    setConsoleOpen, 
    logs, 
    addLog, 
    clearLogs,
    setTheme,
    setQuality,
    setBlueprintMode,
    blueprintMode,
    setChatOpen
  } = useAppStore()
  const router = useRouter()
  const [command, setCommand] = React.useState("")
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs, consoleOpen])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    if (!command.trim()) return

    const fullCommand = command.trim()
    const parts = fullCommand.split(' ')
    const cmd = parts[0].toLowerCase()
    const args = parts.slice(1)

    addLog(`$ ${fullCommand}`, 'info')

    switch (cmd) {
      case 'chat':
        setChatOpen(true)
        addLog('AI_SUBSYSTEM: Initializing interface...', 'sys')
        break

      case 'logs':
        addLog(`LOG_TOTAL: ${logs.length}`, 'info')
        addLog(`SYSTEM_UPTIME: ${Math.floor(performance.now() / 1000)}s`, 'info')
        break

      case 'clear':
        clearLogs()
        addLog('LOG_BUFFER_PURGED', 'sys')
        break

      case 'theme':
        if (args[0]) {
          setTheme(args[0])
          addLog(`THEME_UPDATED: ${args[0]}`, 'sys')
        } else {
          addLog('Usage: theme [theme-id]. See Command Menu (Cmd+K) for list.', 'warn')
        }
        break

      case 'status':
        addLog('CORE_V1.0.2: ONLINE', 'sys')
        addLog(`RESOLUTION: ${window.innerWidth}x${window.innerHeight}`, 'info')
        addLog('3D_ENGINE: R3F_RAPIDER_POST', 'sys')
        addLog('AI_LAYER: GPT-4o_CONNECTED', 'sys')
        break

      case 'whoami':
        addLog('GUEST_USER@PIXEL_PLAY', 'info')
        addLog('PERMISSIONS: READ_ONLY', 'warn')
        break

      case 'help':
        addLog('NAVIGATION: cd [projects|about|contact|~]', 'sys')
        addLog('SYSTEM: clear, logs, chat, theme [id], status', 'sys')
        addLog('RENDER: quality [low|med|high], blueprint [on|off]', 'sys')
        break

      default:
        addLog(`Command not recognized: ${cmd}. Type "help" for a list of commands.`, 'error')
    }

    setCommand("")
  }

  if (!consoleOpen) return null

  return (
    <div className="fixed top-16 sm:top-20 left-4 right-4 sm:left-6 sm:right-auto z-[100] sm:w-[450px]">
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
              PixelPlay_Shell v1.0.2
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
              placeholder='Type "help" for commands...'
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