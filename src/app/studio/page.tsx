"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
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
    Globe,
    Monitor,
    Box,
    CheckCircle2,
    ShieldAlert,
    Zap,
    ScrollText
} from "lucide-react"
import { ImageUploader } from "@/components/studio/image-uploader"
import { ComponentWorkbench } from "@/components/studio/component-workbench"
import { cn, getContrastRatio, getContrastScore } from "@/lib/utils"

const View = dynamic(() => import("@react-three/drei").then((mod) => mod.View), { ssr: false })
const LogoRoom = dynamic(() => import("@/components/canvas/logo-room").then((mod) => mod.LogoRoom), { ssr: false })
const EngineCore = dynamic(() => import("@/components/shared/engine-loader").then((mod) => mod.EngineCore), { ssr: false })

export default function StudioPage() {
  const { brand, updateBrand, addLog } = useAppStore()
  const [activeTab, setActiveTab] = useState<'visuals' | 'voice' | 'preview'>('visuals')
  const [previewMode, setPreviewMode] = useState<'site' | 'components' | '3d'>('site')

  const contrastRatio = useMemo(() => {
    return getContrastRatio(brand.colors.primary, brand.colors.background)
  }, [brand.colors.primary, brand.colors.background])

  const contrastScore = getContrastScore(contrastRatio)

  const handleColorChange = (key: keyof typeof brand.colors, value: string) => {
    updateBrand({ colors: { ...brand.colors, [key]: value } })
  }

  const FONT_PRESETS = [
    { name: 'Modern Sans', value: 'font-sans' },
    { name: 'Technical Mono', value: 'font-mono' },
    { name: 'Elegant Serif', value: 'font-serif' },
  ]

  return (
    <div className="flex h-[calc(100vh-3rem)] overflow-hidden">
      {/* Tool Sidebar */}
      <aside className="w-[350px] border-r border-border/40 bg-muted/5 overflow-y-auto custom-scrollbar">
        <div className="p-6 space-y-8">
            <header className="space-y-2">
                <Badge variant="outline" className="text-primary border-primary/20 uppercase tracking-[0.2em] text-[9px] rounded-none">
                    Identity_Architect_v2.0
                </Badge>
                <h1 className="text-3xl font-black uppercase italic tracking-tighter">Studio</h1>
            </header>

            <nav className="flex gap-1 p-1 bg-background border border-border/40 rounded-none">
                {[
                    { id: 'visuals', icon: Palette, label: 'Visuals' },
                    { id: 'voice', icon: Type, label: 'Intel' },
                    { id: 'preview', icon: ScrollText, label: 'Docs' }
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
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                        <div className="space-y-4">
                            <Label className="text-[10px] uppercase font-mono tracking-widest text-primary italic">Identity_Core</Label>
                            <ImageUploader 
                                currentImage={brand.logo} 
                                onImageLoad={(url) => updateBrand({ logo: url })} 
                            />
                        </div>

                        <div className="space-y-4 pt-6 border-t border-border/20">
                            <Label className="text-[10px] uppercase font-mono tracking-widest text-primary italic flex justify-between">
                                Color_Matrix
                                <span className={cn(
                                    "text-[8px] font-bold px-1.5 py-0.5 border",
                                    contrastScore === 'FAIL' ? "text-accent border-accent/20 bg-accent/5" : "text-secondary border-secondary/20 bg-secondary/5"
                                )}>
                                    ACCESSIBILITY: {contrastScore} ({contrastRatio.toFixed(2)})
                                </span>
                            </Label>
                            <div className="grid grid-cols-2 gap-3">
                                {Object.entries(brand.colors).map(([key, color]) => (
                                    <div key={key} className="space-y-2">
                                        <span className="text-[9px] font-mono uppercase text-muted-foreground">{key}</span>
                                        <div className="flex gap-2">
                                            <input 
                                                type="color" 
                                                value={color} 
                                                onChange={(e) => handleColorChange(key as any, e.target.value)}
                                                className="w-8 h-8 shrink-0 border border-border/40 bg-transparent cursor-pointer p-0"
                                            />
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
                            <Label className="text-[10px] uppercase font-mono tracking-widest text-primary italic">Typography_Selection</Label>
                            <div className="grid gap-2">
                                {FONT_PRESETS.map((font) => (
                                    <button 
                                        key={font.name}
                                        onClick={() => addLog(`FONT_UPDATED: ${font.name}`, 'info')}
                                        className="flex items-center justify-between p-3 border border-border/40 hover:border-primary/40 bg-background/50 text-[10px] font-mono uppercase transition-colors"
                                    >
                                        <span>{font.name}</span>
                                        <div className="w-2 h-2 rounded-full border border-border/60" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'voice' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <div className="space-y-4">
                            <Label className="text-[10px] uppercase font-mono tracking-widest text-primary italic">System_Name</Label>
                            <Input 
                                value={brand.name}
                                onChange={(e) => updateBrand({ name: e.target.value })}
                                className="h-10 text-xs font-bold rounded-none bg-background uppercase italic"
                            />
                        </div>
                        <div className="space-y-4">
                            <Label className="text-[10px] uppercase font-mono tracking-widest text-primary italic">Intelligence_Brief</Label>
                            <Textarea 
                                value={brand.voice}
                                onChange={(e) => updateBrand({ voice: e.target.value })}
                                placeholder="Describe the personality..."
                                className="min-h-[120px] text-xs font-medium bg-background border-border/40 rounded-none italic"
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <Button 
                                    variant="outline" 
                                    className="h-10 rounded-none text-[9px] font-mono uppercase gap-2 border-primary/20 hover:bg-primary/5"
                                    onClick={() => addLog('AI_GENERATE: Suggesting brand names...', 'sys')}
                                >
                                    <Zap className="w-3 h-3 text-secondary" />
                                    Gen_Name
                                </Button>
                                <Button 
                                    variant="outline" 
                                    className="h-10 rounded-none text-[9px] font-mono uppercase gap-2 border-primary/20 hover:bg-primary/5"
                                    onClick={() => addLog('AI_GENERATE: Suggesting taglines...', 'sys')}
                                >
                                    <Sparkles className="w-3 h-3 text-primary" />
                                    Gen_Tagline
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'preview' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 text-center py-8">
                        <div className="w-16 h-16 rounded-none border border-dashed border-border/60 mx-auto flex items-center justify-center">
                            <Layers className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest leading-relaxed">
                            Full Documentation and Style Guide generation available.
                        </p>
                        <div className="space-y-2">
                            <Button 
                                onClick={() => addLog('DOC_GEN: Compiling Style Guide PDF...', 'sys')}
                                className="w-full h-12 rounded-none text-xs font-bold uppercase tracking-widest gap-2 shadow-[4px_4px_0px_0px_hsl(var(--primary))]"
                            >
                                <Download className="w-4 h-4" />
                                Generate style_guide.pdf
                            </Button>
                            <Button 
                                variant="outline"
                                className="w-full h-12 rounded-none text-xs font-bold uppercase tracking-widest border-primary/20"
                                onClick={() => {
                                    const blob = new Blob([JSON.stringify(brand, null, 2)], { type: 'application/json' })
                                    const url = URL.createObjectURL(blob)
                                    const a = document.createElement('a')
                                    a.href = url
                                    a.download = `brand-config.json`
                                    a.click()
                                }}
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Export JSON.src
                            </Button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
      </aside>

      {/* Workspace Area */}
      <main className="flex-1 bg-background relative overflow-hidden flex flex-col">
        {/* Workspace Switcher */}
        <div className="absolute top-6 left-6 z-20 flex gap-1 p-1 bg-muted/20 backdrop-blur-md border border-border/40 rounded-none">
            {[
                { id: 'site', icon: Layout, label: 'Website' },
                { id: 'components', icon: Layers, label: 'UI_Kit' },
                { id: '3d', icon: Box, label: '3D_Monolith' }
            ].map((mode) => (
                <Button 
                    key={mode.id}
                    variant={previewMode === mode.id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setPreviewMode(mode.id as any)}
                    className={cn(
                        "rounded-none h-8 text-[9px] font-mono uppercase tracking-tighter gap-2",
                        previewMode === mode.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"
                    )}
                >
                    <mode.icon className="w-3 h-3" />
                    {mode.label}
                </Button>
            ))}
        </div>

        {/* Live Workspace Render */}
        <div className="flex-1 flex items-center justify-center p-8 mt-12 overflow-y-auto">
            <AnimatePresence mode="wait">
                {previewMode === 'site' && (
                    <motion.div 
                        key="site"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="w-full max-w-4xl aspect-[16/10] border border-border/20 shadow-2xl relative overflow-hidden"
                        style={{ backgroundColor: brand.colors.background }}
                    >
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[size:24px_24px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]" />
                        
                        <header className="p-6 flex justify-between items-center border-b border-border/10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: brand.colors.primary }}>
                                    {brand.logo ? <img src={brand.logo} className="w-full h-full object-contain p-1" /> : <div className="w-4 h-4 bg-white/20" />}
                                </div>
                                <span className="font-bold text-lg tracking-tighter" style={{ color: brand.colors.primary }}>{brand.name}</span>
                            </div>
                            <div className="flex gap-4">
                                {[1,2,3].map(i => <div key={i} className="w-8 h-1" style={{ backgroundColor: brand.colors.primary + '40' }} />)}
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
                                <Button style={{ backgroundColor: brand.colors.primary, color: brand.colors.background }} className="rounded-none px-8 font-bold uppercase text-[10px] tracking-widest border-none">Initialize</Button>
                                <Button variant="outline" style={{ borderColor: brand.colors.secondary, color: brand.colors.secondary }} className="rounded-none px-8 font-bold uppercase text-[10px] tracking-widest bg-transparent">Learn_More</Button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {previewMode === 'components' && (
                    <motion.div 
                        key="components"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="w-full max-w-4xl h-[500px] border border-border/20 shadow-2xl overflow-hidden"
                    >
                        <ComponentWorkbench />
                    </motion.div>
                )}

                {previewMode === '3d' && (
                    <motion.div 
                        key="3d"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full max-w-4xl aspect-video border border-border/20 shadow-2xl relative bg-muted/5"
                    >
                        <View className="h-full w-full">
                            <React.Suspense fallback={<EngineCore />}>
                                <LogoRoom />
                            </React.Suspense>
                        </View>
                        <div className="absolute bottom-4 left-4 p-2 bg-background/80 backdrop-blur-md border border-border/40 text-[9px] font-mono uppercase">
                            Rendering_Core: R3F_Logo_Monolith
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </main>
    </div>
  )
}