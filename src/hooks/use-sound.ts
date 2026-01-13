"use client"

import { useCallback, useRef } from "react"
import { useAppStore } from "@/store"

type SoundType = 'click' | 'hover' | 'boot' | 'terminal' | 'success' | 'error' | 'hum'

const SOUND_PATHS: Record<SoundType, string> = {
  click: '/sounds/click.mp3',
  hover: '/sounds/hover.mp3',
  boot: '/sounds/boot.mp3',
  terminal: '/sounds/terminal.mp3',
  success: '/sounds/success.mp3',
  error: '/sounds/error.mp3',
  hum: '/sounds/engine-hum.mp3'
}

export function useSound() {
  const { soundEnabled } = useAppStore()
  const audioRefs = useRef<Partial<Record<SoundType, HTMLAudioElement>>>({})

  const playSound = useCallback((type: SoundType, volume = 0.5, loop = false) => {
    if (!soundEnabled || typeof window === 'undefined') return

    // Initialize audio element if not already created
    if (!audioRefs.current[type]) {
      const audio = new Audio(SOUND_PATHS[type])
      audioRefs.current[type] = audio
    }

    const audio = audioRefs.current[type]!
    audio.volume = volume
    audio.loop = loop

    // Reset and play
    if (!loop) audio.currentTime = 0
    
    audio.play().catch(() => {
        // Handle cases where browser blocks auto-play
        console.warn(`Audio playback blocked for ${type}. Requires user interaction first.`)
    })
  }, [soundEnabled])

  const stopSound = useCallback((type: SoundType) => {
    const audio = audioRefs.current[type]
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  return { playSound, stopSound }
}
