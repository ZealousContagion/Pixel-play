"use client"

import React, { useRef, useMemo } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { PerspectiveCamera, Environment, Center, Float, Text } from "@react-three/drei"
import * as THREE from "three"
import { useAppStore } from "@/store"

export function LogoRoom() {
  const { brand } = useAppStore()
  const meshRef = useRef<THREE.Mesh>(null)

  const texture = useMemo(() => {
    if (!brand.logo) return null
    return new THREE.TextureLoader().load(brand.logo)
  }, [brand.logo])

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} intensity={1} />
      
      <Center top>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef}>
                <boxGeometry args={[2, 2, 0.2]} />
                <meshStandardMaterial 
                    color={brand.colors.background} 
                    metalness={0.8} 
                    roughness={0.2} 
                />
                
                {/* Front Face with Logo */}
                {texture && (
                    <mesh position={[0, 0, 0.11]}>
                        <planeGeometry args={[1.5, 1.5]} />
                        <meshBasicMaterial map={texture} transparent={true} />
                    </mesh>
                )}
            </mesh>
        </Float>
      </Center>

      <mesh rotation-x={-Math.PI / 2} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={brand.colors.background} opacity={0.5} transparent />
      </mesh>

      <Environment preset="city" />
    </>
  )
}
