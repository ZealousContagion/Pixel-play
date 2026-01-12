"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Loader2 } from "lucide-react"
import { toast } from "sonner"

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
    <div className="container max-w-2xl py-12">
      <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Initialize Contact</CardTitle>
          <CardDescription>
            Ready to start a project? Fill out the form below to establish a connection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required className="bg-muted/20" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required className="bg-muted/20" />
                </div>
            </div>
            
            <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" required className="bg-muted/20" />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="type">Project Type</Label>
                <Select>
                    <SelectTrigger className="bg-muted/20">
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
                <Label htmlFor="message">Message</Label>
                <Textarea 
                    id="message" 
                    required 
                    placeholder="Tell me about your vision..." 
                    className="min-h-[150px] bg-muted/20" 
                />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Transmitting...
                    </>
                ) : (
                    <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                    </>
                )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
