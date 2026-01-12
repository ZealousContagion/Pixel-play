"use client"

import dynamic from "next/dynamic"
import React from "react"

const View = dynamic(() => import("@react-three/drei").then((mod) => mod.View), {
  ssr: false,
})

const ProjectViewer = dynamic(() => import("@/components/canvas/project-viewer").then((mod) => mod.ProjectViewer), {
  ssr: false,
})

const EngineCore = dynamic(() => import("@/components/shared/engine-loader").then((mod) => mod.EngineCore), {
  ssr: false,
})

interface ViewportRendererProps {
  type: 'iframe' | 'canvas' | 'webgl'
  src?: string
  model?: string
}

export function ViewportRenderer({ type, src, model }: ViewportRendererProps) {
  if (type === 'iframe' && src) {
    return (
      <iframe 
        src={src} 
        className="h-full w-full border-0 bg-background"
        title="Project Preview"
        sandbox="allow-scripts allow-same-origin"
      />
    )
  }

  if (type === 'webgl' || type === 'canvas') {
    return (
      <View className="h-full w-full">
         <React.Suspense fallback={<EngineCore />}>
            <ProjectViewer model={model} />
         </React.Suspense>
      </View>
    )
  }

  return (
    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
      Unsupported viewport type
    </div>
  )
}
