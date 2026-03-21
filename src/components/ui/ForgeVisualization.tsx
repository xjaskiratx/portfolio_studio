"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";

function createParticlePositions() {
  const pos = new Float32Array(1000 * 3);

  for (let i = 0; i < 1000; i++) {
    const seed = i + 1;
    const theta = Math.sin(seed * 12.9898) * Math.PI * 2;
    const phi = Math.acos(Math.max(-1, Math.min(1, Math.sin(seed * 78.233))));
    const r = 3 + ((Math.sin(seed * 37.719) + 1) / 2) * 2;

    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);
  }

  return pos;
}

const PARTICLE_POSITIONS = createParticlePositions();

function ForgeCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.1;
    }
  });

  return (
    <group>
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.8, 1]} />
          <MeshDistortMaterial
            color="#c8ff00"
            speed={4}
            distort={0.4}
            radius={1}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>

      <Sphere args={[0.4, 32, 32]}>
        <meshBasicMaterial color="#c8ff00" />
        <pointLight intensity={2} distance={10} color="#c8ff00" />
      </Sphere>

      <Points ref={pointsRef} positions={PARTICLE_POSITIONS} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#c8ff00"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>

      <gridHelper args={[20, 20, 0xc8ff00, 0x333333]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -5]} />
    </group>
  );
}

export function ForgeVisualization() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#c8ff00" />
        <ForgeCore />
      </Canvas>
    </div>
  );
}
