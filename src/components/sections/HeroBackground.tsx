"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Vector3, 
  Group, 
  Points as ThreePoints, 
  IcosahedronGeometry, 
  OctahedronGeometry, 
  TetrahedronGeometry, 
  BoxGeometry 
} from "three";
import { Points, PointMaterial } from "@react-three/drei";

function Constellation() {
  const pointsRef = useRef<ThreePoints>(null);
  const shapesRef = useRef<Group>(null);

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
      points.push(new Vector3((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 26, (Math.random() - 0.5) * 13)); // eslint-disable-line react-hooks/purity
      points.push(new Vector3((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 26, (Math.random() - 0.5) * 13)); // eslint-disable-line react-hooks/purity
    }
    return points;
  }, []);

  const shapes = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const size = Math.random() * 0.72 + 0.22; // eslint-disable-line react-hooks/purity
      const type = i % 4;

      return {
        type,
        size,
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
    const { mouse, clock } = state;
    const t = clock.getElapsedTime();

    if (pointsRef.current) {
      pointsRef.current.rotation.x = mouse.y * 0.15;
      pointsRef.current.rotation.y = mouse.x * 0.15;
    }

    if (shapesRef.current) {
      const children = shapesRef.current.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const ud = shapes[i].userData;
        child.rotation.x += ud.rx;
        child.rotation.y += ud.ry;
        child.rotation.z += ud.rz;
        
        // Optimize sin/cos by pre-calculating common factors
        const timeFactor = t * ud.fs;
        child.position.y = ud.oy + Math.sin(timeFactor * 80 + ud.fo) * 0.42;
        child.position.x = ud.ox + Math.cos(timeFactor * 60 + ud.fo) * 0.22;
        
        child.rotation.x += mouse.y * 0.01;
        child.rotation.y += mouse.x * 0.01;
      }
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
            position={s.position}
            rotation={s.rotation}
          >
            {s.type === 0 && <icosahedronGeometry args={[s.size, 0]} />}
            {s.type === 1 && <octahedronGeometry args={[s.size, 0]} />}
            {s.type === 2 && <tetrahedronGeometry args={[s.size, 0]} />}
            {s.type === 3 && <boxGeometry args={[s.size * 0.9, s.size * 0.9, s.size * 0.9]} />}
            
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

import { isIOSSafari } from "@/lib/browser";

export function HeroBackground() {
  const [contextKey, setContextKey] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn('WebGL context lost — Safari refinement');
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored — re-initializing');
      setContextKey((p: number) => p + 1);
    };

    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [contextKey]);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas 
        key={contextKey}
        camera={{ position: [0, 0, 15], fov: 60 }} 
        gl={{ 
          alpha: true, 
          antialias: !isIOSSafari,
          powerPreference: "high-performance"
        }}
        dpr={isIOSSafari ? 1 : [1, 2]}
        onCreated={({ gl }) => {
          const canvas = gl.domElement;
          canvasRef.current = canvas;
        }}
        onPointerMissed={() => {
          // Cleanup listeners if the component unmounts but R3F state is tricky
        }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#c8ff00" />
        <Constellation />
      </Canvas>
    </div>
  );
}
