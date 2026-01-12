"use client"

import { useEffect, useState } from "react"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"

interface SplitPaneProps {
  children: [React.ReactNode, React.ReactNode]
  direction?: "horizontal" | "vertical"
}

export function SplitPane({ children, direction = "horizontal" }: SplitPaneProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const orientation = isMobile ? "vertical" : direction

  return (
    <ResizablePanelGroup orientation={orientation} className="min-h-[calc(100vh-3.5rem)] border-none">
      <ResizablePanel defaultSize={isMobile ? 100 : 40} minSize={20} className="bg-background">
        <div className="h-full w-full overflow-y-auto">
             {children[0]}
        </div>
      </ResizablePanel>
      
      {!isMobile && <ResizableHandle withHandle />}
      
      <ResizablePanel defaultSize={isMobile ? 100 : 60} minSize={30}>
        <div className="h-full w-full bg-muted/20 relative">
             {children[1]}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
