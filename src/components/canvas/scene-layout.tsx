"use client"

import dynamic from "next/dynamic"

const CanvasWrapper = dynamic(() => import("@/components/canvas/canvas-wrapper"), {
  ssr: false,
})

export function SceneLayout({ children }: { children?: React.ReactNode }) {
  return (
    <CanvasWrapper>
      {children}
    </CanvasWrapper>
  )
}
