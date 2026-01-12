"use client"

import { Bloom, ChromaticAberration, EffectComposer, Vignette } from "@react-three/postprocessing"
import { useAppStore } from "@/store"
import { useThree } from "@react-three/fiber"

export function PostProcessing() {
  const { performanceMode } = useAppStore()
  const { size } = useThree()

  // Disable heavy effects in Eco mode
  const isTurbo = performanceMode === 'turbo'

  return (
    <EffectComposer>
      <Bloom 
        intensity={isTurbo ? 1.0 : 0} 
        luminanceThreshold={0.9} 
        luminanceSmoothing={0.025} 
        mipmapBlur 
      />
      
      <ChromaticAberration
        offset={[0.001, 0.001]} // Subtle technical fringing
      />
      
      <Vignette
        offset={0.5}
        darkness={0.5}
        eskil={false}
      />
    </EffectComposer>
  )
}
