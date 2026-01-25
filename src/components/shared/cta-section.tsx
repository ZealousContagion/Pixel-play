"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function CallToAction() {
  return (
    <section className="container py-24 md:py-32">
      <div className="relative rounded-3xl overflow-hidden border border-border/40 bg-muted/5 p-8 md:p-16 text-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-primary/20 blur-[100px] rounded-full opacity-30 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-mono uppercase tracking-widest border border-primary/20">
            <Sparkles className="w-3 h-3" />
            <span>Ready for Deployment</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase italic leading-[0.9]">
            Let&apos;s Engineer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Your Next Big Idea
            </span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
            Whether you need a high-performance web application, a stunning 3D experience, or a complete digital overhaul, my engine is ready to scale.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="w-full sm:w-auto rounded-full font-bold h-12 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
              <Link href="/contact">
                Initialize Project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-full font-bold h-12 px-8 text-base bg-background/50 backdrop-blur-sm">
              <Link href="/projects">
                Explore Archive
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
