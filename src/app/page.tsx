"use client"

import dynamic from "next/dynamic"
import { BentoGrid } from "@/components/home/bento-grid"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const View = dynamic(() => import("@react-three/drei").then((mod) => mod.View), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-muted/10" />,
})

const HeroScene = dynamic(() => import("@/components/canvas/hero-scene").then((mod) => mod.HeroScene), {
  ssr: false,
})

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <View className="h-full w-full">
            <HeroScene />
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
            <Button size="lg">
              Explore Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Contact Me
            </Button>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Featured Projects</h2>
        <BentoGrid />
      </section>
    </div>
  )
}