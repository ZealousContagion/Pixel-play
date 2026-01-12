"use client"

import { Canvas } from "@react-three/fiber"
import { Preload, View } from "@react-three/drei"
import { Suspense } from "react"
import { useAppStore } from "@/store"
import { QUALITY_PRESETS } from "@/lib/constants"
import { PerformanceMonitor } from "./performance-monitor"

export default function CanvasWrapper({ children }: { children: React.ReactNode }) {
  const { quality } = useAppStore()
  const preset = QUALITY_PRESETS[quality.toUpperCase() as keyof typeof QUALITY_PRESETS]

  return (
    <div className="fixed inset-0 -z-10 h-full w-full pointer-events-none">
      <Canvas
        shadows={preset.shadows}
        dpr={preset.pixelRatio}
        gl={{ antialias: preset.antialias }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ pointerEvents: 'none' }} // Let events pass through to DOM overlay
        eventSource={typeof window !== 'undefined' ? document.getElementById('root') ?? document.body : undefined}
        eventPrefix="client"
      >
        <Suspense fallback={null}>
            <PerformanceMonitor />
            {/* 
               We use 'View' components from drei to render content into DOM elements 
               while keeping a single Canvas context.
               The 'children' passed here would be global scene elements (lights, environment)
            */}
             <View.Port />
            {children}
            <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
