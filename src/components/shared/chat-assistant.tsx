"use client"

import * as React from "react"
import { useChat } from "@ai-sdk/react"
import { X, Send, Sparkles, User, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppStore } from "@/store"
import { cn } from "@/lib/utils"

export function ChatAssistant() {
  const { chatOpen, setChatOpen, addLog } = useAppStore()
  
  // Using any to bypass current SDK type definition issues during transition
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    onFinish: ({ message }: { message: any }) => {
        addLog(`AI_RESPONSE_COMPLETED: ${message.content.substring(0, 30)}...`, "info")
    }
  }) as any

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    addLog(`USER_QUERY_DISPATCHED: ${input.substring(0, 30)}...`, "info")
    handleSubmit(e)
  }
  
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  if (!chatOpen) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 z-[100] sm:w-[400px]">
      <Card className="border-border/40 shadow-2xl backdrop-blur-xl bg-background/95 rounded-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 border-b border-border/20">
          <CardTitle className="text-[10px] font-mono font-black uppercase tracking-[0.2em] flex items-center gap-2">
            <Sparkles className="h-3 w-3 text-primary animate-pulse" />
            AI_Assistant_v4.2
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-primary/10" onClick={() => setChatOpen(false)}>
            <X className="h-3 w-3" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div 
            ref={scrollRef}
            className="h-[350px] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/20"
          >
            {messages.length === 0 && (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 rounded-none border border-dashed border-primary/40 mx-auto flex items-center justify-center">
                    <Bot className="w-6 h-6 text-primary/40" />
                </div>
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest leading-relaxed px-8">
                    Waiting for user input. Initialize conversation to access project data.
                </p>
              </div>
            )}
            {messages.map((m: any) => (
              <div
                key={m.id}
                className={cn(
                  "flex gap-3 text-xs animate-in fade-in slide-in-from-bottom-2 duration-300",
                  m.role === "user" ? "flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "rounded-none px-3 py-2 max-w-[85%] border",
                  m.role === "user" 
                    ? "bg-primary text-primary-foreground border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]" 
                    : "bg-muted/50 text-foreground border-border/40"
                )}>
                  <div className="text-[11px] leading-relaxed whitespace-pre-wrap">
                    {m.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 text-xs animate-pulse">
                <div className="rounded-none px-3 py-2 bg-muted/30 border border-border/20 text-[10px] font-mono uppercase tracking-widest">
                  Processing_Logic...
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-3 border-t border-border/20">
          <form onSubmit={onSubmit} className="flex w-full items-center space-x-2">
            <input
              className="flex-1 bg-transparent border-none outline-none font-mono text-[11px] text-foreground placeholder:text-muted-foreground/30"
              placeholder="ENTER_QUERY..."
              value={input}
              onChange={handleInputChange}
            />
            <Button type="submit" size="icon" disabled={isLoading} className="h-8 w-8 rounded-none bg-primary hover:bg-primary/90">
              <Send className="h-3 w-3" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}