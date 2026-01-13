"use client"

import { useEffect } from "react"
import { useAppStore } from "@/store"

export function ThemeSync() {
  const { theme, availableThemes } = useAppStore()

  useEffect(() => {
    const doc = document.documentElement
    
    // Remove all theme classes
    doc.classList.forEach(className => {
        if (className.startsWith('theme-')) doc.classList.remove(className)
    })
    
    // Add current theme class
    doc.classList.add(`theme-${theme}`)
    
    // Handle dark/light mode class
    const currentTheme = availableThemes.find(t => t.id === theme)
    const isLight = currentTheme?.type === 'light' || theme.includes('light')
    doc.classList.toggle('dark', !isLight)
    
  }, [theme, availableThemes])

  return null
}
