"use client"

import { useEffect } from "react"
import { useAppStore } from "@/store"

export function ThemeSync() {
  const { theme } = useAppStore()

  useEffect(() => {
    const doc = document.documentElement
    doc.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return null
}