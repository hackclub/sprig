"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function MeshComponent() {
  const fileUrl = "/Case_RedVelvet.glb";
  const mesh = useRef(null);
  const gltf = useLoader(GLTFLoader, fileUrl);

  useFrame(() => {
    mesh.current.rotation.y = -Math.sin(Date.now() * 0.001) * Math.PI * 0.05;
  });

  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}

export function RedVelvet() {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <Canvas>
        <MeshComponent />
        <ambientLight intensity={2} />
        <pointLight position={[0, 20, 10]} intensity={1.5} />
      </Canvas>
    </div>
  );
}
