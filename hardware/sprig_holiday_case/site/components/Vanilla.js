"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function MeshComponent() {
  const fileUrl = "/Case_Vanilla.glb";
  const mesh = useRef(null);
  const gltf = useLoader(GLTFLoader, fileUrl);

  useFrame(() => {
    mesh.current.rotation.y = Math.sin(Date.now() * 0.001) * Math.PI * 0.05;
  });

  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}

export function Vanilla() {
  return (
    <div className="flex h-[42vh] items-center justify-center overflow-visible pt-32">
      <Canvas>
        <MeshComponent />
        <ambientLight intensity={3} />
        <pointLight position={[0, 20, 10]} intensity={3} />
      </Canvas>
    </div>
  );
}
