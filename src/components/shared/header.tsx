"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Moon, Sun, Command as CommandIcon, Palette } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { useAppStore } from "@/store"
import { cn } from "@/lib/utils"
import { MobileNav } from "./mobile-nav"

import { ThemeSelector } from "./theme-selector"

export function Header() {
  const pathname = usePathname()
  const { setCommandPaletteOpen, theme } = useAppStore()

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-12 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <MobileNav />
          <Link href="/" className="mr-6 hidden items-center space-x-2 md:flex group">
            <div className="relative w-7 h-7 transition-transform duration-300 group-hover:scale-110">
                <img 
                  src={theme === 'light' ? "/logo.svg" : "/logo-white.svg"} 
                  alt="Pixel Play Logo" 
                  className="w-full h-full object-contain" 
                />
            </div>
            <span className="font-black sm:inline-block tracking-tighter uppercase text-base italic">
              Pixel Play
            </span>
          </Link>
          <nav className="hidden items-center space-x-4 text-[11px] font-mono uppercase tracking-widest md:flex">
            <Link
              href="/projects"
              className={cn(
                "transition-colors hover:text-primary",
                pathname?.startsWith("/projects")
                  ? "text-primary"
                  : "text-foreground/60"
              )}
            >
              Projects
            </Link>
            <Link
              href="/lab"
              className={cn(
                "transition-colors hover:text-primary",
                pathname === "/lab"
                  ? "text-primary"
                  : "text-foreground/60"
              )}
            >
              Lab
            </Link>
            <Link
              href="/studio"
              className={cn(
                "transition-colors hover:text-primary",
                pathname === "/studio"
                  ? "text-primary"
                  : "text-foreground/60"
              )}
            >
              Studio
            </Link>
            <Link
              href="/about"
              className={cn(
                "transition-colors hover:text-primary",
                pathname === "/about"
                  ? "text-primary"
                  : "text-foreground/60"
              )}
            >
              About
            </Link>
            <Link
              href="/resume"
              className={cn(
                "transition-colors hover:text-primary",
                pathname === "/resume"
                  ? "text-primary"
                  : "text-foreground/60"
              )}
            >
              Resume
            </Link>
            <Link
              href="/contact"
              className={cn(
                "transition-colors hover:text-primary",
                pathname === "/contact"
                  ? "text-primary"
                  : "text-foreground/60"
              )}
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button
              variant="outline"
              className="relative h-8 w-full justify-start rounded-none bg-background/50 text-[10px] font-mono uppercase text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
              onClick={() => setCommandPaletteOpen(true)}
            >
              <span className="hidden lg:inline-flex">Search_Archive...</span>
              <span className="inline-flex lg:hidden">Search...</span>
              <Kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </Kbd>
            </Button>
          </div>
          <ThemeSelector />
        </div>
      </div>
    </header>
  )
}
