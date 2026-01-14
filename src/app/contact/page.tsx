"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Loader2, Mail, Linkedin, Youtube, Instagram, MessageCircle, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { SOCIAL_LINKS } from "@/lib/constants"

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsLoading(false)
    toast.success("Message Transmitted", {
        description: "Your inquiry has been logged in the system. I'll get back to you shortly."
    })
    
    // Reset form
    const form = event.target as HTMLFormElement
    form.reset()
  }

  return (
    <div className="container max-w-4xl py-20 px-4">
      <div className="grid gap-12 md:grid-cols-[1fr_350px]">
        <div className="space-y-8">
            <div className="space-y-4">
                <Badge variant="outline" className="text-primary border-primary/20 uppercase tracking-[0.2em] text-[10px]">
                    Communication_Link
                </Badge>
                <h1 className="text-5xl sm:text-6xl font-black tracking-tighter uppercase italic leading-none">
                    Let's Build <br /><span className="text-primary">Something Great.</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
                    Ready to initialize a project? Whether it's a high-performance web app or a unique 3D experience, my engine is ready to scale.
                </p>
            </div>

            <div className="space-y-6 pt-8 border-t border-border/40">
                <a href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noreferrer" className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Professional_Network</p>
                        <p className="font-bold text-lg group-hover:text-primary transition-colors">LinkedIn</p>
                    </div>
                </a>

                <a href={SOCIAL_LINKS.YOUTUBE} target="_blank" rel="noreferrer" className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Youtube className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Video_Content</p>
                        <p className="font-bold text-lg group-hover:text-primary transition-colors">YouTube Channel</p>
                    </div>
                </a>

                <a href={SOCIAL_LINKS.INSTAGRAM} target="_blank" rel="noreferrer" className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Visual_Feed</p>
                        <p className="font-bold text-lg group-hover:text-primary transition-colors">Instagram</p>
                    </div>
                </a>

                {/* WhatsApp - Only show if link is valid (e.g. not just base url) or just show as available channel */}
                <a href={SOCIAL_LINKS.WHATSAPP} target="_blank" rel="noreferrer" className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Direct_Chat</p>
                        <p className="font-bold text-lg group-hover:text-primary transition-colors">WhatsApp</p>
                    </div>
                </a>
            </div>
        </div>

        <Card className="border-primary/20 bg-background/50 backdrop-blur-sm shadow-2xl">
            <CardHeader>
            <CardTitle className="text-xl font-bold uppercase italic">Quick_Inquiry</CardTitle>
            <CardDescription>
                Fill out the form to establish a secure connection.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="firstName" className="text-[10px] uppercase tracking-widest">Name</Label>
                    <Input id="firstName" placeholder="Your name" required className="bg-muted/10 border-border/40" />
                </div>
                
                <div className="grid gap-2">
                    <Label htmlFor="email" className="text-[10px] uppercase tracking-widest">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" required className="bg-muted/10 border-border/40" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="type" className="text-[10px] uppercase tracking-widest">Project Type</Label>
                    <Select>
                        <SelectTrigger className="bg-muted/10 border-border/40">
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="web">Web Application</SelectItem>
                            <SelectItem value="design">Brand & Design</SelectItem>
                            <SelectItem value="3d">3D Experience</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="message" className="text-[10px] uppercase tracking-widest">Message</Label>
                    <Textarea 
                        id="message" 
                        required 
                        placeholder="Transmission details..." 
                        className="min-h-[100px] bg-muted/10 border-border/40" 
                    />
                </div>

                <Button type="submit" className="w-full rounded-full h-12 font-bold group" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Transmitting...
                        </>
                    ) : (
                        <>
                            <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            Initialize Message
                        </>
                    )}
                </Button>
            </form>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
