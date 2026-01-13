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

export function CommandMenu() {
  const router = useRouter()
  const { 
    commandPaletteOpen, 
    setCommandPaletteOpen, 
    setTheme, 
    setConsoleOpen, 
    consoleOpen,
    chatOpen,
    setChatOpen,
    setPerformanceMode,
    performanceMode
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
      callback: () => setConsoleOpen(!consoleOpen),
    },
    {
      key: "l",
      ctrlKey: true,
      shiftKey: true,
      callback: () => setChatOpen(!chatOpen),
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
          <CommandItem onSelect={() => runCommand(() => setConsoleOpen(!consoleOpen))}>
            <Terminal className="mr-2 h-4 w-4" />
            <span>Toggle Creative Console</span>
            <CommandShortcut>`</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setChatOpen(!chatOpen))}>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Toggle Chat Assistant</span>
            <CommandShortcut>⌃⇧L</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="System">
          <CommandItem onSelect={() => runCommand(() => setPerformanceMode(performanceMode === 'turbo' ? 'eco' : 'turbo'))}>
            <Zap className="mr-2 h-4 w-4" />
            <span>Toggle Turbo Mode</span>
            <CommandShortcut>{performanceMode === 'turbo' ? 'ON' : 'OFF'}</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light Mode</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark Mode</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
