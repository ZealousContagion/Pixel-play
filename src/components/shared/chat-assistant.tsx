"use client"

import * as React from "react"
import { useChat } from "@ai-sdk/react"
import { X, Send, Sparkles, User, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppStore } from "@/store"
import { cn } from "@/lib/utils"

export function ChatAssistant() {
  const { chatOpen, setChatOpen } = useAppStore()
  
  // Using any to bypass current SDK type definition issues during transition
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat() as any
  
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  if (!chatOpen) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 z-[100] sm:w-[400px]">
      <Card className="border-border/40 shadow-2xl backdrop-blur-xl bg-background/95">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Creative Assistant
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setChatOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div 
            ref={scrollRef}
            className="h-[400px] overflow-y-auto space-y-4 pr-4 scrollbar-thin scrollbar-thumb-muted"
          >
            {messages.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                Hello! I&apos;m your Creative Assistant. Ask me anything about this portfolio or the technology used.
              </div>
            )}
            {messages.map((m: any) => (
              <div
                key={m.id}
                className={cn(
                  "flex gap-3 text-sm",
                  m.role === "user" ? "flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                    m.role === "user" ? "bg-secondary" : "bg-primary"
                )}>
                    {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-primary-foreground" />}
                </div>
                <div className={cn(
                  "rounded-lg px-3 py-2 max-w-[80%]",
                  m.role === "user" ? "bg-secondary text-secondary-foreground" : "bg-muted"
                )}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 text-sm animate-pulse">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="rounded-lg px-3 py-2 bg-muted">
                  Thinking...
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Ask a question..."
              value={input}
              onChange={handleInputChange}
            />
            <Button type="submit" size="icon" disabled={isLoading} className="h-9 w-9 shrink-0">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}