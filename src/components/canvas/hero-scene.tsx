"use client"

import { useRef, useMemo, useLayoutEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useAppStore } from "@/store"

export function HeroScene() {
  const { performanceMode, theme, debugMode } = useAppStore()
  const count = performanceMode === 'turbo' ? 1500 : 500
  const groupRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()
  
  const themeColors = useMemo(() => {
    // ... (logic remains same)
    if (typeof window === 'undefined') return { primary: '#3cb4e7', secondary: '#ffc423', accent: '#b54d50', muted: '#808080' }
    
    const getHex = (varName: string) => {
        const style = getComputedStyle(document.documentElement)
        const hsl = style.getPropertyValue(varName).trim()
        if (!hsl) return '#ffffff'
        const parts = hsl.split(' ')
        if (parts.length === 3) {
            return `hsl(${parts[0]}, ${parts[1]}, ${parts[2]})`
        }
        return `hsl(${hsl})`
    }

    return {
        primary: getHex('--primary'),
        secondary: getHex('--secondary'),
        accent: getHex('--accent'),
        muted: getHex('--muted-foreground')
    }
  }, [theme])

  // ... (particle generation logic)
  const createParticles = (scale: number, pCount: number) => {
    const temp = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      const t = Math.random() * 100
      const factor = (10 + Math.random() * 50) * scale
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      temp[i * 3] = (Math.cos(t) + Math.sin(t * 1) / 10) * xFactor + Math.cos(t * 2) * factor
      temp[i * 3 + 1] = (Math.sin(t) + Math.cos(t * 2) / 10) * yFactor + Math.sin(t * 1.5) * factor
      temp[i * 3 + 2] = (Math.cos(t) + Math.sin(t * 3) / 10) * zFactor + Math.cos(t * 2) * factor
    }
    return temp
  }

  const particlesSky = useMemo(() => createParticles(1, count), [count])
  const particlesYellow = useMemo(() => createParticles(0.8, count), [count])
  const particlesRed = useMemo(() => createParticles(0.6, count), [count])
  const particlesNavy = useMemo(() => createParticles(1.2, count), [count])

  const mouse = useRef([0, 0])

  useFrame((state) => {
    mouse.current = [state.pointer.x * viewport.width / 2, state.pointer.y * viewport.height / 2]
    
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.current[1] / 15, 0.05)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.current[0] / 15, 0.05)
    }
  })

  return (
    <group ref={groupRef}>
      <Points positions={particlesSky} color={themeColors.primary} size={0.08} opacity={0.6} />
      <Points positions={particlesYellow} color={themeColors.secondary} size={0.06} opacity={0.5} />
      <Points positions={particlesRed} color={themeColors.accent} size={0.07} opacity={0.4} />
      <Points positions={particlesNavy} color={themeColors.muted} size={0.1} opacity={0.3} />
      
      {debugMode && (
        <mesh>
            <sphereGeometry args={[15, 32, 32]} />
            <meshBasicMaterial color={themeColors.primary} wireframe transparent opacity={0.1} />
        </mesh>
      )}
    </group>
  )
}

function Points({ positions, color, size, opacity }: any) {
    const bufferRef = useRef<THREE.BufferAttribute>(null)
    
    useLayoutEffect(() => {
        if (bufferRef.current) {
            bufferRef.current.needsUpdate = true
        }
    }, [positions])

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    ref={bufferRef}
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                transparent
                color={color}
                size={size}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={opacity}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}