"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, Sphere } from "@react-three/drei"
import * as THREE from "three"

export function HeroScene() {
  const sphereRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!sphereRef.current) return
    const time = state.clock.getElapsedTime()
    sphereRef.current.rotation.y = time * 0.1
    sphereRef.current.position.y = Math.sin(time * 0.5) * 0.2
  })

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Sphere ref={sphereRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#4f46e5"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </group>
  )
}
