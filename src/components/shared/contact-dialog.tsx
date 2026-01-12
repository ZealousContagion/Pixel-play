"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send } from "lucide-react"

export function ContactDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-xl border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Initialize Communication
          </DialogTitle>
          <DialogDescription>
            Send a transmission to the Creative Engine. I&apos;ll respond within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="name@example.com" className="bg-secondary/20 border-primary/10" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea 
                id="message" 
                placeholder="Tell me about your project..." 
                className="bg-secondary/20 border-primary/10 min-h-[100px]" 
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full">
            <Send className="w-4 h-4 mr-2" />
            Transmit Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
