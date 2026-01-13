"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useChat } from "@ai-sdk/react"
import { 
    Terminal, 
    X, 
    ChevronRight, 
    Sparkles, 
    Send, 
    Bot, 
    Cpu, 
    Command as CommandIcon,
    Maximize2,
    Minimize2
} from "lucide-react"
import { useAppStore } from "@/store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"
import { useSound } from "@/hooks/use-sound"

export function UnifiedTerminal() {
  const { 
    terminalOpen, 
    setTerminalOpen, 
    terminalMode, 
    setTerminalMode,
    logs, 
    addLog, 
    clearLogs,
    setTheme,
    theme,
    blueprintMode,
    setBlueprintMode,
    debugMode,
    setDebugMode
  } = useAppStore()
  
  const { playSound } = useSound()
  const router = useRouter()
  const pathname = usePathname()
  const [input, setInput] = React.useState("")
  const [isExpanded, setIsExpanded] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  // AI SDK Hook
  const { messages, append, isLoading } = useChat({
    onFinish: ({ message }: { message: any }) => {
        addLog(`AI_SIGNAL_RECEIVED: ${message.content.substring(0, 20)}...`, "info")
        playSound('success', 0.1)
    }
  }) as any

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs, messages, terminalOpen])

  const handleCommand = (cmdStr: string) => {
    const parts = cmdStr.trim().split(' ')
    const cmd = parts[0].toLowerCase()
    const args = parts.slice(1)

    addLog(`$ ${cmdStr}`, 'info')
    playSound('terminal', 0.2)

    switch (cmd) {
      case 'help':
        addLog('NAV: cd [projects|studio|lab|about|~]', 'sys')
        addLog('SYS: clear, theme [light|dark], debug [on|off]', 'sys')
        addLog('RENDER: blueprint [on|off], status', 'sys')
        break
      case 'debug':
        if (args[0] === 'on' || args[0] === 'off') {
            setDebugMode(args[0] === 'on')
            addLog(`ENGINEERING_MODE: ${args[0].toUpperCase()}`, 'sys')
            playSound('success', 0.2)
        }
        break
      case 'ai':
        setTerminalMode('ai')
        addLog('MODE_SWITCH: AI_ASSISTANT_ACTIVE', 'sys')
        playSound('boot', 0.3)
        break
      case 'sys':
        setTerminalMode('sys')
        addLog('MODE_SWITCH: SYSTEM_LOGS_ACTIVE', 'sys')
        playSound('boot', 0.3)
        break
      case 'cd':
        const path = args[0]
        if (!path || path === '~') { router.push('/'); addLog('NAV: ROOT', 'sys') }
        else { router.push(`/${path}`); addLog(`NAV: ${path.toUpperCase()}`, 'sys') }
        playSound('click', 0.2)
        break
      case 'theme':
        if (args[0] === 'light' || args[0] === 'dark') {
            setTheme(args[0])
            addLog(`THEME: ${args[0].toUpperCase()}`, 'sys')
            playSound('success', 0.2)
        }
        break
      case 'blueprint':
        setBlueprintMode(args[0] === 'on')
        addLog(`BLUEPRINT: ${args[0].toUpperCase()}`, 'sys')
        playSound('success', 0.2)
        break
      case 'clear':
        clearLogs()
        break
      case 'test-audio':
        addLog('AUDIO_DIAGNOSTIC: Initializing...', 'sys')
        try {
            playSound('click', 0.5)
            addLog('AUDIO_SIGNAL: Click_Pulse dispatched.', 'sys')
        } catch (e) {
            addLog('AUDIO_ERROR: Hardware interface failed.', 'error')
        }
        break
      default:
        addLog(`UNKNOWN_CMD: ${cmd}. Type "help"`, 'error')
        playSound('error', 0.2)
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const val = input.trim()
    setInput("")

    const isCommand = val.startsWith('/') || ['help', 'clear', 'cd', 'theme', 'status', 'ls', 'ai', 'sys', 'blueprint', 'debug'].includes(val.split(' ')[0].toLowerCase())

    if (isCommand) {
        setTerminalMode('sys')
        handleCommand(val.startsWith('/') ? val.substring(1) : val)
    } else {
        setTerminalMode('ai')
        addLog(`USER_PROMPT: ${val.substring(0, 20)}...`, 'info')
        playSound('terminal', 0.1)
        await append({ role: 'user', content: val }, { data: { context: pathname } })
    }
  }

  if (!terminalOpen) return null

  return (
    <div className={cn(
        "fixed z-[100] transition-all duration-500 ease-in-out",
        isExpanded 
            ? "inset-4 sm:inset-10" 
            : "bottom-4 right-4 left-4 sm:left-auto sm:w-[450px] sm:h-[550px]"
    )}>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="w-full h-full glass rounded-none border border-primary/20 shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-primary/10 bg-primary/5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className={cn(
                "p-1.5 border border-primary/20 bg-background/50",
                terminalMode === 'ai' ? "text-primary" : "text-secondary"
            )}>
                {terminalMode === 'ai' ? <Sparkles className="w-3.5 h-3.5" /> : <Terminal className="w-3.5 h-3.5" />}
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-mono font-black uppercase tracking-widest leading-none">Engine_Terminal</span>
                <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-tighter">v2.0.4 // {terminalMode === 'ai' ? 'Neural_Link' : 'System_Kernel'}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-accent" onClick={() => setTerminalOpen(false)}>
                <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 font-mono text-[11px] space-y-4 custom-scrollbar bg-background/20 relative">
          <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]" />
          
          <div className="relative z-0">
            {terminalMode === 'sys' ? (
                <div className="space-y-1.5">
                    {logs.map((log) => (
                        <div key={log.id} className="flex gap-2 leading-relaxed animate-in fade-in slide-in-from-left-1 duration-300">
                            <span className="text-primary/30 shrink-0 select-none">[{log.timestamp}]</span>
                            <span className={cn(
                                "break-all",
                                log.type === 'sys' && "text-secondary font-bold",
                                log.type === 'error' && "text-accent",
                                log.type === 'warn' && "text-yellow-500",
                                log.type === 'info' && "text-foreground/80"
                            )}>{log.message}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-6">
                    {messages.length === 0 && (
                        <div className="text-center py-12 space-y-4 opacity-40">
                            <Bot className="w-8 h-8 mx-auto" />
                            <p className="uppercase tracking-widest text-[9px]">Neural connection established. Awaiting user parameters.</p>
                        </div>
                    )}
                    {messages.map((m: any) => (
                        <div key={m.id} className={cn("flex flex-col gap-2", m.role === 'user' ? "items-end" : "items-start")}>
                            <span className="text-[8px] uppercase tracking-widest text-muted-foreground font-black">{m.role === 'user' ? 'USER_ID_01' : 'AI_ENTITY_CORE'}</span>
                            <div className={cn("px-3 py-2 border max-w-[90%] transition-colors duration-500", m.role === 'user' ? "bg-primary/10 border-primary/20 text-primary italic" : "bg-muted/30 border-border/40 text-foreground")}>{m.content}</div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-2 items-center text-primary animate-pulse">
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-[9px] uppercase tracking-widest font-black">Synthesizing_Response...</span>
                        </div>
                    )}
                </div>
            )}
          </div>
        </div>

        <div className="p-3 border-t border-primary/10 bg-primary/5 backdrop-blur-md">
          <form onSubmit={onSubmit} className="flex items-center gap-3 px-2">
            <div className="text-primary animate-pulse shrink-0">
                {terminalMode === 'ai' ? <Sparkles className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </div>
            <input 
              autoFocus
              className="flex-1 bg-transparent border-none outline-none font-mono text-[11px] text-foreground placeholder:text-muted-foreground/30"
              placeholder={terminalMode === 'ai' ? "Talk to the engine..." : "Enter system command (e.g. /help)..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit" size="icon" className="h-7 w-7 rounded-none bg-primary text-primary-foreground">
                <Send className="w-3 h-3" />
            </Button>
          </form>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[{ label: 'STATUS', cmd: '/status' }, { label: 'PROJECTS', cmd: '/cd projects' }, { label: 'LAB', cmd: '/cd lab' }, { label: 'HELP', cmd: '/help' }].map(act => (
                <button key={act.label} type="button" onClick={() => { setInput(act.cmd) }} className="shrink-0 px-2 py-1 border border-border/40 bg-background/40 text-[8px] font-mono uppercase tracking-widest hover:border-primary/60 hover:text-primary transition-all">{act.label}</button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}