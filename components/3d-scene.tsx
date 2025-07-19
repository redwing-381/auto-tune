"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment } from "@react-three/drei"
import React, { Suspense } from "react"

function StreetModel() {
  const gltf = useGLTF("/street.glb")
  return <primitive object={gltf.scene} scale={6} position={[0, -1, 0]} />
}

export function Scene3D() {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 0,
      pointerEvents: "auto", // Allow interaction with the 3D scene
    }}>
      <Canvas camera={{ position: [0, 2, 4], fov: 50 }} shadows style={{ width: "100vw", height: "100vh" }}>
        <ambientLight intensity={1.2} />
        <hemisphereLight color={0xffffff} groundColor={0x444444} intensity={1.2} position={[0, 20, 0]} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} castShadow />
        <Suspense fallback={null}>
          <StreetModel />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  )
}

// Required for GLTF loading
useGLTF.preload("/street.glb")
