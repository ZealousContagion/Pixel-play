"use client"

import { useRef, useMemo, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Text, Float, OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { useAppStore } from "@/store"

const TECHNOLOGIES = [
  "TypeScript", "React", "Next.js", "Three.js",
  "Node.js", "Python", "Rust", "Tailwind",
  "GLSL", "Blender", "Framer Motion", "GSAP",
  "Docker", "PostgreSQL", "Git", "AWS"
]

function TechLabel({ label, position, index }: { label: string, position: THREE.Vector3, index: number }) {
  const { addLog } = useAppStore()
  const [hovered, setHovered] = useState(false)
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    // Always look at camera
    ref.current.lookAt(state.camera.position)
  })

  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={0.4}
        color={hovered ? "#ffc423" : (index % 2 === 0 ? "#3cb4e7" : "#f5f5f5")}
        font="/fonts/inter-bold.json" // Placeholder, Text component has default
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => {
            addLog(`TECH_CORE_INTERROGATED: ${label.toUpperCase()}`, 'sys')
        }}
      >
        {label}
      </Text>
    </group>
  )
}

export function TechOrbit() {
  const group = useRef<THREE.Group>(null)
  
  const positions = useMemo(() => {
    const pos = []
    const radius = 5
    for (let i = 0; i < TECHNOLOGIES.length; i++) {
      const phi = Math.acos(-1 + (2 * i) / TECHNOLOGIES.length)
      const theta = Math.sqrt(TECHNOLOGIES.length * Math.PI) * phi
      
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      
      pos.push(new THREE.Vector3(x, y, z))
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y += 0.002
    group.current.rotation.x += 0.001
  })

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <group ref={group}>
        {TECHNOLOGIES.map((tech, i) => (
          <TechLabel 
            key={tech} 
            label={tech} 
            position={positions[i]} 
            index={i}
          />
        ))}
      </group>
      
      {/* Subtle geometric core */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial 
            color="#0f1b4c" 
            transparent 
            opacity={0.1} 
            wireframe
        />
      </mesh>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate rotateSpeed={0.5} />
    </group>
  )
}
