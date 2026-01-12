"use client"

import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { useAppStore } from "@/store"

export function PerformanceMonitor() {
  const { setFps, performanceMode, setPerformanceMode, autoScale, addLog } = useAppStore()
  const [frames, setFrames] = useState(0)
  const lastTime = useRef(performance.now())
  const frameCount = useRef(0)
  
  // Throttle the adaptive logic to run every 5 seconds
  const lastCheck = useRef(performance.now())

  useFrame(() => {
    frameCount.current++
    const now = performance.now()
    
    // Update FPS every second for UI
    if (now - lastTime.current > 1000) {
      const currentFps = Math.round((frameCount.current * 1000) / (now - lastTime.current))
      setFps(currentFps)
      
      // Adaptive Scaling Logic
      if (autoScale && now - lastCheck.current > 5000) {
        if (currentFps < 35 && performanceMode === 'turbo') {
          setPerformanceMode('eco')
          addLog('SYSTEM_STRESS_DETECTED: Switching to ECO_MODE...', 'warn')
        } else if (currentFps > 55 && performanceMode === 'eco') {
          setPerformanceMode('turbo')
          addLog('RESOURCES_AVAILABLE: Switching to TURBO_MODE...', 'sys')
        }
        lastCheck.current = now
      }

      frameCount.current = 0
      lastTime.current = now
    }
  })

  return null
}
