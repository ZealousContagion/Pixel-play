"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Laptop,
  Moon,
  Sun,
  Terminal,
  MessageSquare,
  Zap,
  Cpu,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useAppStore } from "@/store"
import { useKeyboard } from "@/hooks/use-keyboard"
import { cn } from "@/lib/utils"

export function CommandMenu() {
  const router = useRouter()
  const { 
    commandPaletteOpen, 
    setCommandPaletteOpen, 
    setTheme, 
    theme,
    terminalOpen,
    setTerminalOpen,
    setPerformanceMode,
    performanceMode,
    setDebugMode,
    debugMode
  } = useAppStore()

  useKeyboard([
    {
      key: "k",
      metaKey: true,
      callback: () => setCommandPaletteOpen(!commandPaletteOpen),
    },
    {
        key: "k",
        ctrlKey: true,
        callback: () => setCommandPaletteOpen(!commandPaletteOpen),
    },
    {
      key: "`",
      callback: () => setTerminalOpen(!terminalOpen),
    },
    {
      key: "l",
      ctrlKey: true,
      shiftKey: true,
      callback: () => setTerminalOpen(!terminalOpen),
    },
    {
      key: "d",
      ctrlKey: true,
      shiftKey: true,
      callback: () => setDebugMode(!debugMode),
    }
  ])

  const runCommand = React.useCallback((command: () => unknown) => {
    setCommandPaletteOpen(false)
    command()
  }, [setCommandPaletteOpen])

  return (
    <CommandDialog open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push("/projects"))}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Projects</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
            <Smile className="mr-2 h-4 w-4" />
            <span>Home</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/about"))}>
            <User className="mr-2 h-4 w-4" />
            <span>About Engineer</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Tools">
          <CommandItem onSelect={() => runCommand(() => setTerminalOpen(!terminalOpen))}>
            <Terminal className="mr-2 h-4 w-4" />
            <span>Toggle Engine Terminal</span>
            <CommandShortcut>`</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setDebugMode(!debugMode))}>
            <Cpu className="mr-2 h-4 w-4" />
            <span>Toggle Engineering Mode</span>
            <CommandShortcut>⌃⇧D</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="System">
          <CommandItem onSelect={() => runCommand(() => setTheme(theme === 'dark' ? 'light' : 'dark'))}>
            {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
            <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setPerformanceMode(performanceMode === 'turbo' ? 'eco' : 'turbo'))}>
            <Zap className="mr-2 h-4 w-4" />
            <span>Toggle Turbo Mode</span>
            <CommandShortcut>{performanceMode === 'turbo' ? 'ON' : 'OFF'}</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
