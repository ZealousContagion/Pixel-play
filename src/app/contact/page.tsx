"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Loader2, CheckCircle2, Clock, ShieldCheck, HelpCircle, ArrowRight } from "lucide-react"
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
    toast.success("Request Received", {
        description: "Thanks for reaching out! I'll review your project details and respond within 24 hours."
    })
    
    // Reset form
    const form = event.target as HTMLFormElement
    form.reset()
  }

  return (
    <div className="container max-w-5xl py-20 px-4 space-y-24">
      {/* 1. Goal & Above-the-Fold Message */}
      <div className="grid gap-12 lg:grid-cols-[1fr_450px] items-start">
        <div className="space-y-8">
            <div className="space-y-6">
                <Badge variant="outline" className="text-primary border-primary/20 uppercase tracking-[0.2em] text-[10px]">
                    Project_Inquiry
                </Badge>
                <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase italic leading-[0.9]">
                    Let&apos;s Scale <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                        Your Vision.
                    </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                    I help forward-thinking businesses build high-performance web applications and immersive 3D experiences. 
                </p>
                
                {/* 6. Trust Signals (List) */}
                <ul className="space-y-3 pt-4">
                    <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>High-fidelity 3D & Frontend Architecture</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>Performance-first Engineering</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>Direct collaboration, no middlemen</span>
                    </li>
                </ul>
            </div>

            {/* 7. Alternative Contact Options (De-emphasized) */}
            <div className="pt-8 border-t border-border/40">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
                    Alternative Channels
                </p>
                <div className="flex flex-wrap gap-6 text-sm">
                    <a href={`mailto:${SOCIAL_LINKS.EMAIL}`} className="hover:text-primary transition-colors flex items-center gap-2">
                        Email Me <ArrowRight className="w-3 h-3" />
                    </a>
                    <a href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                        LinkedIn <ArrowRight className="w-3 h-3" />
                    </a>
                    <a href={SOCIAL_LINKS.WHATSAPP} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                        WhatsApp <ArrowRight className="w-3 h-3" />
                    </a>
                </div>
            </div>
        </div>

        {/* 3. High-Converting Contact Form */}
        <Card className="border-primary/20 bg-background/50 backdrop-blur-sm shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
            <CardHeader>
                <CardTitle className="text-xl font-bold uppercase italic">Start a Project</CardTitle>
                <CardDescription>
                    Tell me about your goals. I&apos;ll advise on the best technical approach.
                </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="firstName" className="text-[10px] uppercase tracking-widest after:content-['*'] after:ml-0.5 after:text-primary">Name</Label>
                    <Input id="firstName" placeholder="Jane Doe" required className="bg-muted/10 border-border/40" />
                </div>
                
                <div className="grid gap-2">
                    <Label htmlFor="email" className="text-[10px] uppercase tracking-widest after:content-['*'] after:ml-0.5 after:text-primary">Email</Label>
                    <Input id="email" type="email" placeholder="jane@company.com" required className="bg-muted/10 border-border/40" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="type" className="text-[10px] uppercase tracking-widest">Type</Label>
                        <Select>
                            <SelectTrigger className="bg-muted/10 border-border/40">
                                <SelectValue placeholder="Web App" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="web">Web App</SelectItem>
                                <SelectItem value="ecommerce">E-Commerce</SelectItem>
                                <SelectItem value="3d">3D Experience</SelectItem>
                                <SelectItem value="consulting">Consulting</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    
                    {/* 2. Added Budget Field */}
                    <div className="grid gap-2">
                        <Label htmlFor="budget" className="text-[10px] uppercase tracking-widest">Budget</Label>
                        <Select>
                            <SelectTrigger className="bg-muted/10 border-border/40">
                                <SelectValue placeholder="Range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5k">&lt; $5k</SelectItem>
                                <SelectItem value="5k-10k">$5k - $10k</SelectItem>
                                <SelectItem value="10k-25k">$10k - $25k</SelectItem>
                                <SelectItem value="25k+">$25k+</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* 4. Better Question Prompt */}
                <div className="grid gap-2">
                    <Label htmlFor="message" className="text-[10px] uppercase tracking-widest after:content-['*'] after:ml-0.5 after:text-primary">Project Details</Label>
                    <Textarea 
                        id="message" 
                        required 
                        placeholder="What problem are you trying to solve? What is your desired timeline?" 
                        className="min-h-[100px] bg-muted/10 border-border/40 resize-none" 
                    />
                </div>

                {/* 5. Strong CTA */}
                <Button type="submit" className="w-full rounded-full h-12 font-bold group text-base mt-2" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            Request Project Quote
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </Button>

                {/* 6. Trust Signal */}
                <div className="flex items-center justify-center gap-4 pt-2 text-[10px] text-muted-foreground font-mono uppercase tracking-tight">
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Replies in 24h</span>
                    <span className="w-px h-3 bg-border" />
                    <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" /> NDA Available</span>
                </div>
            </form>
            </CardContent>
        </Card>
      </div>

      {/* 11. Conversion Boosters: FAQ Section */}
      <section className="max-w-3xl mx-auto space-y-8 pt-12 border-t border-border/40">
        <div className="text-center space-y-2">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter flex items-center justify-center gap-2">
                <HelpCircle className="w-6 h-6 text-primary" />
                Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted-foreground">Common questions about my process and availability.</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
            {[
                { q: "What is your typical timeline?", a: "Most standard web projects take 4-6 weeks. Complex 3D integrations may take 8+ weeks depending on asset readiness." },
                { q: "Do you work with startups?", a: "Yes, I specialize in helping Seed and Series A startups launch their MVPs and marketing sites." },
                { q: "What is your payment structure?", a: "Typically 50% upfront to reserve the schedule, and 50% upon final delivery and approval." },
                { q: "Do you offer post-launch support?", a: "Absolutely. I offer a 30-day warranty period for bug fixes, and optional retainer packages for ongoing maintenance." }
            ].map((faq, i) => (
                <div key={i} className="p-6 rounded-2xl bg-muted/5 border border-border/20 space-y-2">
                    <h3 className="font-bold text-sm uppercase tracking-wide text-foreground/90">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
            ))}
        </div>
      </section>
    </div>
  )
}
