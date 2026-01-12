import * as THREE from 'three'

export const damp = (target: number, current: number, speed: number, delta: number) => {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-speed * delta))
}

export const cleanScene = (scene: THREE.Scene) => {
  scene.traverse((object) => {
    if (!object) return

    // Dispose of geometries
    if ((object as THREE.Mesh).geometry) {
      (object as THREE.Mesh).geometry.dispose()
    }

    // Dispose of materials
    if ((object as THREE.Mesh).material) {
      const material = (object as THREE.Mesh).material as THREE.Material | THREE.Material[]
      if (Array.isArray(material)) {
        material.forEach((mat) => mat.dispose())
      } else {
        material.dispose()
      }
    }
  })
}
