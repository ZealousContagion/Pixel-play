"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ContactDialog } from "@/components/shared/contact-dialog"

const View = dynamic(() => import("@react-three/drei").then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-muted/5">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

const HeroScene = dynamic(() => import("@/components/canvas/hero-scene").then((mod) => mod.HeroScene), {
  ssr: false,
})

const EngineCore = dynamic(() => import("@/components/shared/engine-loader").then((mod) => mod.EngineCore), {
  ssr: false,
})

export function HomeHero() {
  const scrollToProjects = () => {
    const grid = document.getElementById('projects-grid')
    grid?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <View className="h-full w-full">
            <React.Suspense fallback={<EngineCore />}>
                <HeroScene />
            </React.Suspense>
          </View>
        </div>
        
        <div className="container relative z-10 flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
            Creative Engine
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            A high-performance portfolio showcasing the intersection of code, design, and 3D.
          </p>
          <div className="flex gap-4">
            <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={scrollToProjects}
            >
              Explore Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <ContactDialog>
                <Button variant="outline" size="lg">
                Contact Me
                </Button>
            </ContactDialog>
          </div>
        </div>
      </section>
  )
}
