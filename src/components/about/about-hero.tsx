"use client"

import dynamic from "next/dynamic"

const View = dynamic(() => import("@react-three/drei").then((mod) => mod.View), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-muted/10" />,
})

const PhysicsShapes = dynamic(() => import("@/components/canvas/physics-shapes").then((mod) => mod.PhysicsShapes), {
  ssr: false,
})

export function AboutHero() {
  return (
    <div className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden mb-12 rounded-xl bg-muted/5 border border-border/40">
        <div className="absolute inset-0 z-0 pointer-events-none">
             {/* We use pointer-events-none on the container but allow it on the canvas so interactions pass through if configured correctly, 
                 but standard HTML overlay is usually easier. 
                 However, for physics interaction, we want the canvas to receive events.
             */}
             <View className="h-full w-full pointer-events-auto">
                <PhysicsShapes />
             </View>
        </div>
        
        <div className="relative z-10 pointer-events-none text-center">
             <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                The Engineer
            </h1>
            <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
                Obsessed with performance, interactivity, and the perfect pixel.
            </p>
        </div>
    </div>
  )
}
