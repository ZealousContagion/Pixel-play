"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Moon, Sun, Command as CommandIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { useAppStore } from "@/store"
import { cn } from "@/lib/utils"
import { MobileNav } from "./mobile-nav"

export function Header() {
  const pathname = usePathname()
  const { setCommandPaletteOpen, theme, setTheme } = useAppStore()

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <MobileNav />
          <Link href="/" className="mr-6 hidden items-center space-x-2 md:flex">
            <span className="font-bold sm:inline-block">
              Pixel Play
            </span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <Link
              href="/projects"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname?.startsWith("/projects")
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              Projects
            </Link>
            <Link
              href="/about"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/about"
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/contact"
                  ? "text-foreground"
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
              className="relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
              onClick={() => setCommandPaletteOpen(true)}
            >
              <span className="hidden lg:inline-flex">Search projects...</span>
              <span className="inline-flex lg:hidden">Search...</span>
              <Kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </Kbd>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8 px-0"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
