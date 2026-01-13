"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppStore } from "@/store"
import { Search, Send, Bell, Settings, ArrowRight } from "lucide-react"

export function ComponentWorkbench() {
  const { brand } = useAppStore()

  const buttonStyle = {
    backgroundColor: brand.colors.primary,
    color: brand.colors.background,
  }

  const outlineStyle = {
    borderColor: brand.colors.secondary,
    color: brand.colors.secondary,
  }

  return (
    <div className="p-8 space-y-12 bg-white h-full overflow-y-auto" style={{ backgroundColor: brand.colors.background }}>
      <section className="space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-[0.3em] opacity-40" style={{ color: brand.colors.primary }}>01_Action_Modules</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button style={buttonStyle} className="rounded-none font-bold uppercase text-[10px] tracking-widest px-6">Primary Button</Button>
          <Button variant="outline" style={outlineStyle} className="rounded-none font-bold uppercase text-[10px] tracking-widest px-6">Secondary Action</Button>
          <Button variant="ghost" style={{ color: brand.colors.accent }} className="rounded-none text-[10px] font-mono">System_Ghost</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-[0.3em] opacity-40" style={{ color: brand.colors.primary }}>02_Data_Inputs</h3>
        <div className="grid gap-6 max-w-sm">
          <div className="space-y-2">
            <Label className="text-[9px] uppercase font-mono tracking-widest opacity-60" style={{ color: brand.colors.primary }}>Input_Field</Label>
            <div className="relative">
                <Input placeholder="Enter parameters..." className="bg-transparent rounded-none border-border/20 pl-8" style={{ borderColor: brand.colors.primary + '40', color: brand.colors.primary }} />
                <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 opacity-40" style={{ color: brand.colors.primary }} />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-[0.3em] opacity-40" style={{ color: brand.colors.primary }}>03_Status_Indicators</h3>
        <div className="flex flex-wrap gap-3">
          <Badge style={{ backgroundColor: brand.colors.primary, color: brand.colors.background }} className="rounded-none px-3 py-0.5 text-[9px] font-mono">ACTIVE</Badge>
          <Badge variant="outline" style={{ borderColor: brand.colors.secondary, color: brand.colors.secondary }} className="rounded-none px-3 py-0.5 text-[9px] font-mono">STABLE</Badge>
          <Badge style={{ backgroundColor: brand.colors.accent, color: brand.colors.background }} className="rounded-none px-3 py-0.5 text-[9px] font-mono">ALERT</Badge>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-[0.3em] opacity-40" style={{ color: brand.colors.primary }}>04_Navigation_Array</h3>
        <div className="flex gap-8 p-4 border border-border/10" style={{ backgroundColor: brand.colors.primary + '05' }}>
            {['Dashboard', 'Analytics', 'System', 'Logs'].map(item => (
                <span key={item} className="text-[10px] font-mono uppercase tracking-widest cursor-pointer hover:opacity-100 opacity-60 transition-opacity" style={{ color: brand.colors.primary }}>{item}</span>
            ))}
        </div>
      </section>
    </div>
  )
}
