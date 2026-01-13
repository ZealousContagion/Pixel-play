"use client"

import * as React from "react"
import { Palette } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAppStore } from "@/store"
import { cn } from "@/lib/utils"

export function ThemeSelector() {
  const { theme, setTheme, availableThemes } = useAppStore()

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-[140px] h-8 text-[10px] font-mono uppercase tracking-widest bg-background/50 border-border/40 rounded-none focus:ring-0">
        <div className="flex items-center gap-2">
            <Palette className="w-3.5 h-3.5 text-primary" />
            <SelectValue placeholder="Theme" />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-background/95 backdrop-blur-xl border-border/40 rounded-none">
        {availableThemes.map((t) => (
          <SelectItem 
            key={t.id} 
            value={t.id}
            className="text-[10px] font-mono uppercase tracking-widest focus:bg-primary/10 focus:text-primary rounded-none"
          >
            <div className="flex items-center gap-2">
                <div className={cn(
                    "w-2 h-2",
                    t.type === 'dark' ? "bg-zinc-800" : "bg-zinc-200"
                )} />
                {t.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
