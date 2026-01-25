"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAppStore } from "@/store"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const { theme } = useAppStore()

  const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/lab", label: "The Lab" },
    { href: "/studio", label: "Brand Studio" },
    { href: "/about", label: "About" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-background/95 backdrop-blur-xl border-r border-border/40 p-0 w-[300px]">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>
            Access all pages and modules of the Pixel Play Engine.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border/20">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-none border border-primary/20 flex items-center justify-center bg-primary/5">
                <Image 
                  src={theme === 'light' ? "/logo.svg" : "/logo-white.svg"} 
                  alt="Logo" 
                  width={20}
                  height={20}
                  className="object-contain" 
                />
              </div>
              <span className="font-black tracking-tighter uppercase italic text-lg">Pixel Play</span>
            </Link>
          </div>
          
          <div className="flex-1 overflow-y-auto py-6">
            <nav className="flex flex-col px-6 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center h-12 px-4 text-[11px] font-mono uppercase tracking-[0.2em] transition-all border border-transparent",
                    pathname === link.href 
                      ? "bg-primary/10 border-primary/20 text-primary font-bold" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-6 border-t border-border/20 bg-muted/5">
            <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest leading-relaxed">
              Engine_Mobile_Terminal <br />
              Authorized_Access_Only
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
