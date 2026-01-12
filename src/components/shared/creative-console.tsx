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
    blueprintMode
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
      case 'help':
        addLog('NAVIGATION: cd [path], ls', 'sys')
        addLog('SYSTEM: clear, theme [light|dark], quality [low|med|high], blueprint [on|off]', 'sys')
        addLog('INFO: about, status, whoami', 'sys')
        break

      case 'ls':
        addLog('DIRECTORY: /projects', 'info')
        addLog('  - neon-horizon', 'info')
        addLog('  - quantum-analytics', 'info')
        addLog('  - aerolab-identity', 'info')
        addLog('  - cyber-runner', 'info')
        break

      case 'cd':
        const path = args[0]
        if (!path || path === '~' || path === '/') {
          router.push('/')
          addLog('Navigating to root...', 'sys')
        } else if (path === 'projects') {
          router.push('/projects')
          addLog('Navigating to /projects...', 'sys')
        } else if (path.startsWith('projects/')) {
          const slug = path.split('/')[1]
          router.push(`/projects/${slug}`)
          addLog(`Initializing workspace: ${slug}`, 'sys')
        } else if (path === 'about') {
          router.push('/about')
          addLog('Accessing engineer profile...', 'sys')
        } else if (path === 'contact') {
          router.push('/contact')
          addLog('Establishing communication link...', 'sys')
        } else {
          addLog(`Directory not found: ${path}`, 'error')
        }
        break

      case 'clear':
        clearLogs()
        break

      case 'theme':
        if (args[0] === 'light' || args[0] === 'dark') {
          setTheme(args[0])
          addLog(`Theme set to: ${args[0]}`, 'sys')
        } else {
          addLog('Usage: theme [light|dark]', 'warn')
        }
        break

      case 'quality':
        const q = args[0]?.toLowerCase()
        if (q === 'low' || q === 'medium' || q === 'high') {
          setQuality(q as any)
          addLog(`Rendering quality set to: ${q}`, 'sys')
        } else {
          addLog('Usage: quality [low|medium|high]', 'warn')
        }
        break

      case 'blueprint':
        if (args[0] === 'on' || args[0] === 'off') {
          setBlueprintMode(args[0] === 'on')
          addLog(`Blueprint mode: ${args[0].toUpperCase()}`, 'sys')
        } else {
          addLog('Usage: blueprint [on|off]', 'warn')
        }
        break

      case 'status':
        addLog('CORE_V1.0.2: ONLINE', 'sys')
        addLog('3D_ENGINE: R3F_RAPIDER_POST', 'sys')
        addLog('AI_LAYER: GPT-4o_CONNECTED', 'sys')
        break

      case 'whoami':
        addLog('GUEST_USER@PIXEL_PLAY', 'info')
        break

      case 'about':
        addLog('Pixel Play: A High-Performance Creative Engine built by a Senior Engineer.', 'sys')
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