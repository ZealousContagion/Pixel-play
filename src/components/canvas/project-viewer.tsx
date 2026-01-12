"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Box, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei"
import * as THREE from "three"

export function ProjectViewer({ model }: { model?: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.5
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 5]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      
      <group position={[0, -0.5, 0]}>
        {/* Placeholder Box if no model provided */}
        <Box ref={meshRef} args={[2, 2, 2]}>
             <meshStandardMaterial color="hotpink" roughness={0.1} metalness={0.5} />
        </Box>
        <ContactShadows resolution={1024} scale={10} blur={2.5} opacity={0.5} far={1} />
      </group>
      
      <Environment preset="city" />
    </>
  )
}
