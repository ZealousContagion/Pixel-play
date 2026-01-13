"use client"

import { useRef, Suspense, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { PerspectiveCamera, Environment, ContactShadows, useGLTF, Float, Center } from "@react-three/drei"
import * as THREE from "three"
import { useAppStore } from "@/store"

function Model({ url, blueprint }: { url: string, blueprint: boolean }) {
  const { scene } = useGLTF(url)
  
  // Apply theme-aware materials if in blueprint mode
  useMemo(() => {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        if (blueprint) {
          obj.material = new THREE.MeshStandardMaterial({
            color: "#3cb4e7",
            wireframe: true,
            transparent: true,
            opacity: 0.6
          })
        }
      }
    })
  }, [scene, blueprint])

  return <primitive object={scene} />
}

export function ProjectViewer({ model }: { model?: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const { blueprintMode } = useAppStore()

  useFrame((state, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.2
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 5]} />
      <ambientLight intensity={blueprintMode ? 1.5 : 0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      
      <group position={[0, -0.5, 0]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Center top>
                <group ref={groupRef}>
                    {model ? (
                        <Suspense fallback={<PlaceholderMesh blueprint={blueprintMode} />}>
                            <Model url={model} blueprint={blueprintMode} />
                        </Suspense>
                    ) : (
                        <PlaceholderMesh blueprint={blueprintMode} />
                    )}
                </group>
            </Center>
        </Float>
        
        {!blueprintMode && <ContactShadows resolution={1024} scale={10} blur={2.5} opacity={0.5} far={1} />}
        {blueprintMode && <gridHelper args={[10, 10, "#3cb4e7", "#0f1b4c"]} position={[0, -1, 0]} />}
      </group>
      
      {!blueprintMode && <Environment preset="city" />}
    </>
  )
}

function PlaceholderMesh({ blueprint }: { blueprint: boolean }) {
    return (
        <group>
            <mesh>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshStandardMaterial 
                    color={blueprint ? "#3cb4e7" : "hotpink"} 
                    roughness={0.1} 
                    metalness={0.5} 
                    wireframe
                />
            </mesh>
            <points>
                <sphereGeometry args={[1.5, 32, 32]} />
                <pointsMaterial 
                    color={blueprint ? "#3cb4e7" : "#f5f5f5"} 
                    size={0.05} 
                    sizeAttenuation 
                />
            </points>
        </group>
    )
}
