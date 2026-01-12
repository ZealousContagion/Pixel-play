"use client"

import { useRef, useMemo, useLayoutEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

export function HeroScene() {
  const count = 1500
  const mesh = useRef<THREE.Points>(null)
  const { viewport } = useThree()
  
  // Helper to generate random particles in a sphere/cloud
  const createParticles = (scale: number) => {
    const temp = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
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

  const particlesSky = useMemo(() => createParticles(1), [])
  const particlesYellow = useMemo(() => createParticles(0.8), [])
  const particlesRed = useMemo(() => createParticles(0.6), [])
  const particlesNavy = useMemo(() => createParticles(1.2), [])

  const mouse = useRef([0, 0])

  useFrame((state) => {
    mouse.current = [state.pointer.x * viewport.width / 2, state.pointer.y * viewport.height / 2]
    
    if (mesh.current) {
      mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, mouse.current[1] / 15, 0.05)
      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, mouse.current[0] / 15, 0.05)
    }
  })

  return (
    <group ref={mesh as any}>
      <Points positions={particlesSky} color="#3cb4e7" size={0.08} opacity={0.6} />
      <Points positions={particlesYellow} color="#ffc423" size={0.06} opacity={0.5} />
      <Points positions={particlesRed} color="#b54d50" size={0.07} opacity={0.4} />
      <Points positions={particlesNavy} color="#0f1b4c" size={0.1} opacity={0.3} />
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
