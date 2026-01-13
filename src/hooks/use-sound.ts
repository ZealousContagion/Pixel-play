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

  const playSyntheticBeep = useCallback((type: SoundType) => {
    if (typeof window === 'undefined') return
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContext) return

    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    // Different frequencies for different events
    const freq = type === 'error' ? 150 : type === 'success' ? 880 : 440
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    osc.type = 'square' 

    gain.gain.setValueAtTime(0.05, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1)

    osc.start()
    osc.stop(ctx.currentTime + 0.1)
  }, [])

  const playSound = useCallback((type: SoundType, volume = 0.5, loop = false) => {
    if (!soundEnabled || typeof window === 'undefined') return

    // If we've already determined this file is missing, just use synth
    if (audioRefs.current[type] === null) {
        playSyntheticBeep(type)
        return
    }

    if (!audioRefs.current[type]) {
      const audio = new Audio(SOUND_PATHS[type])
      audioRefs.current[type] = audio
      
      // If load fails (file missing), mark as null so we use synth next time
      audio.onerror = () => {
        audioRefs.current[type] = null as any
        playSyntheticBeep(type)
      }
    }

    const audio = audioRefs.current[type]!
    audio.volume = volume
    audio.loop = loop

    if (!loop) audio.currentTime = 0
    
    audio.play().catch(() => {
        // Most likely file missing or interaction required
        playSyntheticBeep(type)
    })
  }, [soundEnabled, playSyntheticBeep])

  const stopSound = useCallback((type: SoundType) => {
    const audio = audioRefs.current[type]
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  return { playSound, stopSound }
}