"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Points, PointMaterial } from "@react-three/drei";

function Constellation() {
  const pointsRef = useRef<THREE.Points>(null);
  const shapesRef = useRef<THREE.Group>(null);

  // Stars data
  const starsCount = 80;
  const starsPositions = useMemo(() => {
    const pos = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 48; // eslint-disable-line react-hooks/purity
      pos[i * 3 + 1] = (Math.random() - 0.5) * 48; // eslint-disable-line react-hooks/purity
      pos[i * 3 + 2] = (Math.random() - 0.5) * 22; // eslint-disable-line react-hooks/purity
    }
    return pos;
  }, []);

  // Lime particles data
  const particlesCount = 40;
  const particlesPositions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 38; // eslint-disable-line react-hooks/purity
      pos[i * 3 + 1] = (Math.random() - 0.5) * 38; // eslint-disable-line react-hooks/purity
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16; // eslint-disable-line react-hooks/purity
    }
    return pos;
  }, []);

  // Line segments data
  const lines = useMemo(() => {
    const points = [];
    for (let i = 0; i < 8; i++) {
      points.push(new THREE.Vector3((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 26, (Math.random() - 0.5) * 13)); // eslint-disable-line react-hooks/purity
      points.push(new THREE.Vector3((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 26, (Math.random() - 0.5) * 13)); // eslint-disable-line react-hooks/purity
    }
    return points;
  }, []);

  const shapes = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const size = Math.random() * 0.72 + 0.22; // eslint-disable-line react-hooks/purity
      const type = i % 4;
      let geometry;
      if (type === 0) geometry = new THREE.IcosahedronGeometry(size, 0);
      else if (type === 1) geometry = new THREE.OctahedronGeometry(size, 0);
      else if (type === 2) geometry = new THREE.TetrahedronGeometry(size, 0);
      else geometry = new THREE.BoxGeometry(size * 0.9, size * 0.9, size * 0.9);

      return {
        geometry,
        position: [
          (Math.random() - 0.5) * 26, // eslint-disable-line react-hooks/purity
          (Math.random() - 0.5) * 22, // eslint-disable-line react-hooks/purity
          (Math.random() - 0.5) * 10  // eslint-disable-line react-hooks/purity
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI * 2, // eslint-disable-line react-hooks/purity
          Math.random() * Math.PI * 2, // eslint-disable-line react-hooks/purity
          Math.random() * Math.PI * 2  // eslint-disable-line react-hooks/purity
        ] as [number, number, number],
        userData: {
          rx: (Math.random() - 0.5) * 0.009, // eslint-disable-line react-hooks/purity
          ry: (Math.random() - 0.5) * 0.008, // eslint-disable-line react-hooks/purity
          rz: (Math.random() - 0.5) * 0.007, // eslint-disable-line react-hooks/purity
          oy: (Math.random() - 0.5) * 22, // eslint-disable-line react-hooks/purity
          ox: (Math.random() - 0.5) * 26, // eslint-disable-line react-hooks/purity
          fs: Math.random() * 0.0005 + 0.0002, // eslint-disable-line react-hooks/purity
          fo: Math.random() * Math.PI * 2, // eslint-disable-line react-hooks/purity
          opacity: Math.random() * 0.12 + 0.025 // eslint-disable-line react-hooks/purity
        }
      };
    });
  }, []);

  useFrame((state) => {
    const { mouse } = state;
    const t = performance.now() / 1000;

    if (pointsRef.current) {
      pointsRef.current.rotation.x = mouse.y * 0.15;
      pointsRef.current.rotation.y = mouse.x * 0.15;
    }

    if (shapesRef.current) {
      shapesRef.current.children.forEach((child, i) => {
        const ud = shapes[i].userData;
        child.rotation.x += ud.rx;
        child.rotation.y += ud.ry;
        child.rotation.z += ud.rz;
        child.position.y = ud.oy + Math.sin(t * ud.fs * 80 + ud.fo) * 0.42;
        child.position.x = ud.ox + Math.cos(t * ud.fs * 60 + ud.fo) * 0.22;
        child.rotation.x += mouse.y * 0.01;
        child.rotation.y += mouse.x * 0.01;
      });
    }
  });

  return (
    <>
      <Points positions={starsPositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.65}
        />
      </Points>

      <Points ref={pointsRef} positions={particlesPositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#c8ff00"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.85}
        />
      </Points>

      <lineSegments>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(lines.flatMap(v => [v.x, v.y, v.z])), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color="#c8ff00" transparent opacity={0.12} />
      </lineSegments>

      <group ref={shapesRef}>
        {shapes.map((s, i) => (
          <mesh
            key={i}
            geometry={s.geometry}
            position={s.position}
            rotation={s.rotation}
          >
            <meshBasicMaterial
              color={i % 5 === 0 ? "#c8ff00" : "#ffffff"}
              wireframe
              transparent
              opacity={Math.max(s.userData.opacity * 2.5, 0.25)}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 60 }} 
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#c8ff00" />
        <Constellation />
      </Canvas>
    </div>
  );
}
