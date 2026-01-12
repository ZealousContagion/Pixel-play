"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Physics, RigidBody, CuboidCollider, RapierRigidBody } from "@react-three/rapier"
import { useRef, useMemo, useState, useEffect } from "react"
import * as THREE from "three"
import { View } from "@react-three/drei"

function MouseCollider() {
  const { viewport } = useThree()
  const mouseRef = useRef<RapierRigidBody>(null)
  
  useFrame(({ pointer }) => {
    if (mouseRef.current) {
        // Map pointer coordinates (normalized -1 to 1) to viewport world coordinates
        const x = (pointer.x * viewport.width) / 2
        const y = (pointer.y * viewport.height) / 2
        
        mouseRef.current.setNextKinematicTranslation({ x, y, z: 0 })
    }
  })

  return (
    <RigidBody ref={mouseRef} type="kinematicPosition" colliders={false}>
      <CuboidCollider args={[0.5, 0.5, 0.5]} />
    </RigidBody>
  )
}

function Shape({ color, position, ...props }: { color: string; position: [number, number, number] }) {
    const api = useRef<RapierRigidBody>(null)
    const [hovered, setHover] = useState(false)

    return (
        <RigidBody 
            ref={api} 
            position={position} 
            restitution={0.8} 
            colliders="hull" 
            onSleep={() => api.current?.wakeUp()}
            {...props}
        >
            <mesh 
                onPointerOver={() => setHover(true)} 
                onPointerOut={() => setHover(false)}
                onClick={() => api.current?.applyImpulse({ x: 0, y: 10, z: 0 }, true)}
            >
                <icosahedronGeometry args={[0.8, 0]} />
                <meshStandardMaterial 
                    color={hovered ? "#ffc423" : color} 
                    roughness={0.1} 
                    metalness={0.1} 
                />
            </mesh>
        </RigidBody>
    )
}

export function PhysicsShapes() {
  const count = 10
  
  return (
    <group>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <Physics gravity={[0, -2, 0]}>
            <MouseCollider />
            
            {/* Walls to keep shapes in view */}
            <RigidBody type="fixed">
                 <CuboidCollider args={[10, 1, 10]} position={[0, -5, 0]} /> {/* Floor */}
                 <CuboidCollider args={[1, 10, 10]} position={[-7, 0, 0]} /> {/* Left */}
                 <CuboidCollider args={[1, 10, 10]} position={[7, 0, 0]} />  {/* Right */}
            </RigidBody>

            {Array.from({ length: count }).map((_, i) => (
                <Shape 
                    key={i} 
                    position={[
                        (Math.random() - 0.5) * 5, 
                        5 + Math.random() * 5, 
                        0
                    ]} 
                    color={i % 2 === 0 ? "#3cb4e7" : "#b54d50"} 
                />
            ))}
        </Physics>
    </group>
  )
}
