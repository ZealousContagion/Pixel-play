"use client"

import dynamic from "next/dynamic"

const View = dynamic(() => import("@react-three/drei").then((mod) => mod.View), {
  ssr: false,
})

const ProjectViewer = dynamic(() => import("@/components/canvas/project-viewer").then((mod) => mod.ProjectViewer), {
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
         <ProjectViewer model={model} />
      </View>
    )
  }

  return (
    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
      Unsupported viewport type
    </div>
  )
}
