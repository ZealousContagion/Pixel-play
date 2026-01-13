"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Box, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei"
import * as THREE from "three"
import { useAppStore } from "@/store"

export function ProjectViewer({ model }: { model?: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { blueprintMode } = useAppStore()

  useFrame((state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.5
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 5]} />
      <ambientLight intensity={blueprintMode ? 1.5 : 0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      
      <group position={[0, -0.5, 0]}>
        {/* Placeholder if no model provided */}
        {!model && (
            <group ref={meshRef}>
                <mesh>
                    <sphereGeometry args={[2, 32, 32]} />
                    <meshStandardMaterial 
                        color={blueprintMode ? "#3cb4e7" : "hotpink"} 
                        roughness={0.1} 
                        metalness={0.5} 
                        wireframe
                    />
                </mesh>
                <points>
                    <sphereGeometry args={[2, 32, 32]} />
                    <pointsMaterial 
                        color={blueprintMode ? "#3cb4e7" : "#f5f5f5"} 
                        size={0.05} 
                        sizeAttenuation 
                    />
                </points>
            </group>
        )}
        
        {/* TODO: Implement actual model loading if model prop is provided */}
        
        {!blueprintMode && <ContactShadows resolution={1024} scale={10} blur={2.5} opacity={0.5} far={1} />}
        {blueprintMode && <gridHelper args={[10, 10, "#3cb4e7", "#0f1b4c"]} position={[0, -1, 0]} />}
      </group>
      
      {!blueprintMode && <Environment preset="city" />}
    </>
  )
}
