"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAppStore } from "@/store"
import { 
    Palette, 
    Type, 
    Image as ImageIcon, 
    Sparkles, 
    Save, 
    Layout, 
    Smartphone, 
    Layers,
    Download,
    Eye,
    Globe
} from "lucide-react"
import { GLBInspector } from "@/components/lab/glb-inspector"
import { cn } from "@/lib/utils"

export default function StudioPage() {
  const { brand, updateBrand, addLog } = useAppStore()
  const [activeTab, setActiveTab] = useState<'visuals' | 'voice' | 'preview'>('visuals')

  const handleColorChange = (key: keyof typeof brand.colors, value: string) => {
    updateBrand({ colors: { ...brand.colors, [key]: value } })
  }

  return (
    <div className="flex h-[calc(100vh-3rem)] overflow-hidden">
      {/* Tool Sidebar */}
      <aside className="w-[350px] border-r border-border/40 bg-muted/5 overflow-y-auto custom-scrollbar">
        <div className="p-6 space-y-8">
            <header className="space-y-2">
                <Badge variant="outline" className="text-primary border-primary/20 uppercase tracking-[0.2em] text-[9px] rounded-none">
                    Identity_Architect_v1.0
                </Badge>
                <h1 className="text-3xl font-black uppercase italic tracking-tighter">Studio</h1>
            </header>

            <nav className="flex gap-1 p-1 bg-background border border-border/40 rounded-none">
                {[
                    { id: 'visuals', icon: Palette, label: 'Visuals' },
                    { id: 'voice', icon: Type, label: 'Voice' },
                    { id: 'preview', icon: Eye, label: 'Review' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-mono uppercase tracking-widest transition-all",
                            activeTab === tab.id ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-muted text-muted-foreground"
                        )}
                    >
                        <tab.icon className="w-3 h-3" />
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                ))}
            </nav>

            <div className="space-y-6">
                {activeTab === 'visuals' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <div className="space-y-4">
                            <Label className="text-[10px] uppercase font-mono tracking-widest text-primary italic">Color_Palette</Label>
                            <div className="grid grid-cols-2 gap-3">
                                {Object.entries(brand.colors).map(([key, color]) => (
                                    <div key={key} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] font-mono uppercase text-muted-foreground">{key}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="w-8 h-8 shrink-0 border border-border/40" style={{ backgroundColor: color }} />
                                            <Input 
                                                value={color} 
                                                onChange={(e) => handleColorChange(key as any, e.target.value)}
                                                className="h-8 text-[10px] font-mono uppercase rounded-none bg-background"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 pt-6 border-t border-border/20">
                            <Label className="text-[10px] uppercase font-mono tracking-widest text-primary italic">Asset_Injection</Label>
                            <div className="h-32">
                                <GLBInspector onModelLoad={(url) => updateBrand({ logo: url })} />
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'voice' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <div className="space-y-4">
                            <Label className="text-[10px] uppercase font-mono tracking-widest text-primary italic">System_Voice</Label>
                            <Textarea 
                                value={brand.voice}
                                onChange={(e) => updateBrand({ voice: e.target.value })}
                                placeholder="Describe the personality..."
                                className="min-h-[150px] text-xs font-medium bg-background border-border/40 rounded-none italic"
                            />
                            <Button variant="outline" className="w-full h-10 rounded-none text-[10px] font-mono uppercase gap-2 border-primary/20 hover:bg-primary/5">
                                <Sparkles className="w-3 h-3 text-primary" />
                                Sync with AI Assistant
                            </Button>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'preview' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 text-center py-8">
                        <div className="w-16 h-16 rounded-none border border-dashed border-border/60 mx-auto flex items-center justify-center">
                            <Layers className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest leading-relaxed">
                            System identity is ready for deployment. Review the live preview to the right.
                        </p>
                        <Button 
                            onClick={() => {
                                addLog(`IDENTITY_EXPORTED: ${brand.name.toUpperCase()}`, 'sys')
                                const blob = new Blob([JSON.stringify(brand, null, 2)], { type: 'application/json' })
                                const url = URL.createObjectURL(blob)
                                const a = document.createElement('a')
                                a.href = url
                                a.download = `${brand.name.toLowerCase().replace(/\s/g, '-')}-identity.json`
                                a.click()
                            }}
                            className="w-full h-12 rounded-none text-xs font-bold uppercase tracking-widest gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Export Configuration
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
      </aside>

      {/* Live Preview Area */}
      <main className="flex-1 bg-background relative overflow-hidden flex flex-col">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[size:24px_24px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]" />
        
        {/* Device Switcher */}
        <div className="absolute top-6 right-6 z-20 flex gap-2">
            <div className="flex p-1 bg-muted/20 backdrop-blur-md border border-border/40 rounded-none">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none bg-background shadow-sm text-primary"><Monitor className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none opacity-40"><Smartphone className="w-4 h-4" /></Button>
            </div>
        </div>

        {/* The Live Render */}
        <div className="flex-1 flex items-center justify-center p-12">
            <motion.div 
                layout
                className="w-full max-w-4xl aspect-[16/10] bg-white border border-border/20 shadow-2xl relative overflow-hidden"
                style={{ backgroundColor: brand.colors.background }}
            >
                {/* Simulated Header */}
                <header className="p-6 flex justify-between items-center border-b border-border/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary flex items-center justify-center" style={{ backgroundColor: brand.colors.primary }}>
                            {brand.logo ? <img src={brand.logo} className="w-full h-full object-cover" /> : <div className="w-4 h-4 bg-white/20" />}
                        </div>
                        <span className="font-bold text-lg tracking-tighter" style={{ color: brand.colors.primary }}>{brand.name}</span>
                    </div>
                    <div className="flex gap-4">
                        {[1,2,3].map(i => <div key={i} className="w-8 h-1 bg-muted-foreground/20" />)}
                    </div>
                </header>

                <div className="p-12 space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-5xl font-black italic uppercase leading-none" style={{ color: brand.colors.primary }}>
                            The Future of <br /><span style={{ color: brand.colors.secondary }}>Interactive Systems.</span>
                        </h2>
                        <p className="max-w-md text-sm leading-relaxed" style={{ color: brand.colors.accent }}>
                            {brand.voice}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <Button style={{ backgroundColor: brand.colors.primary, color: brand.colors.background }} className="rounded-none px-8 font-bold uppercase text-[10px] tracking-widest">Initialize System</Button>
                        <Button variant="outline" style={{ borderColor: brand.colors.secondary, color: brand.colors.secondary }} className="rounded-none px-8 font-bold uppercase text-[10px] tracking-widest">Documentation</Button>
                    </div>

                    <div className="grid grid-cols-3 gap-6 pt-12">
                        {[1,2,3].map(i => (
                            <div key={i} className="space-y-3 p-4 border border-border/10" style={{ backgroundColor: brand.colors.background + '50' }}>
                                <div className="w-6 h-6 rounded-none bg-muted/20" style={{ backgroundColor: brand.colors.secondary + '20' }} />
                                <div className="h-2 w-full bg-muted/20" />
                                <div className="h-2 w-2/3 bg-muted/20" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 right-0 p-4 opacity-20">
                    <Globe className="w-32 h-32" style={{ color: brand.colors.primary }} />
                </div>
            </motion.div>
        </div>
      </main>
    </div>
  )
}
