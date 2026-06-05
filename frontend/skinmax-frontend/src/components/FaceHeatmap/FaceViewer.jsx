import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { createHeatmapTexture } from "./HeatmapTexture";

function FaceModel() {
  const { scene } = useGLTF("/face.glb");

  const heatmapTexture = useMemo(() => {
    return createHeatmapTexture([
      {
        u: 0.25,
        v: 0.55,
        radius: 100,
      },
      {
        u: 0.50,
        v: 0.55,
        radius: 45,
      },
      {
        u: 0.50,
        v: 0.85,
        radius: 150,
      },
      {
        u: 0.75,
        v: 0.55,
        radius: 120,
      },
    ]);
  }, []);

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: "#444444",

        emissive: "#ff3300",
        emissiveMap: heatmapTexture,
        emissiveIntensity: 3,

        roughness: 0.9,
        metalness: 0,
      });
    }
  });

  return (
    <Center>
      <primitive
        object={scene}
        scale={1}
      />
    </Center>
  );
}

export default function FaceViewer() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 40,
      }}
      style={{
        width: "100%",
        height: "100%",
        background: "#07122b",
      }}
    >
      <ambientLight intensity={2} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={3}
      />

      <directionalLight
        position={[-5, 5, 5]}
        intensity={2}
      />

      <FaceModel />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
      />
    </Canvas>
  );
}