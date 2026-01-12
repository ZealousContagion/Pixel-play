"use client"

import dynamic from "next/dynamic"
import React from "react"

const View = dynamic(() => import("@react-three/drei").then((mod) => mod.View), {
  ssr: false,
})

const TechOrbit = dynamic(() => import("@/components/canvas/tech-orbit").then((mod) => mod.TechOrbit), {
  ssr: false,
})

const EngineCore = dynamic(() => import("@/components/shared/engine-loader").then((mod) => mod.EngineCore), {
  ssr: false,
})

export function TechStackSection() {
  return (
    <section className="grid gap-8 md:grid-cols-2 items-center">
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Interactive Tech Stack</h2>
            <p className="text-muted-foreground leading-relaxed">
                The engine is built on a foundation of modern web technologies, 3D mathematics, and high-performance engineering. 
                <br /><br />
                Interact with the orbit to explore the core modules used in my production pipeline. Each node represents a verified capability in the Creative Engine environment.
            </p>
            <div className="pt-4 border-t border-border/40">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    SYNC_STATUS: CONNECTED
                </p>
            </div>
        </div>

        <div className="h-[400px] w-full rounded-xl bg-muted/5 border border-border/40 relative overflow-hidden">
            <View className="h-full w-full">
                <React.Suspense fallback={<EngineCore />}>
                    <TechOrbit />
                </React.Suspense>
            </View>
        </div>
    </section>
  )
}
