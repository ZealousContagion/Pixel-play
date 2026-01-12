"use client"

import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"

interface SplitPaneProps {
  children: [React.ReactNode, React.ReactNode]
  direction?: "horizontal" | "vertical"
}

export function SplitPane({ children, direction = "horizontal" }: SplitPaneProps) {
  return (
    <ResizablePanelGroup orientation={direction} className="min-h-[calc(100vh-3.5rem)] rounded-lg border">
      <ResizablePanel defaultSize={40} minSize={20} className="bg-background">
        <div className="h-full w-full overflow-y-auto">
             {children[0]}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60} minSize={30}>
        <div className="h-full w-full bg-muted/20 relative">
             {children[1]}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
