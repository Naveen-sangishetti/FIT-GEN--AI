import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function FloatingShape({ position, size, color, speed }: { position: [number, number, number], size: number, color: string, speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    }
  });

  return (
    <Float
      speed={speed}
      rotationIntensity={1.5}
      floatIntensity={2}
      floatingRange={[-1, 1]}
    >
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.6}
          speed={speed}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlesCount = 200;
  const positions = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 30;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#00ff88"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GymEquipmentShape({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Dumbbell representation */}
      <mesh position={[-0.4, 0, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#ff0088" metalness={0.9} roughness={0.1} emissive="#ff0088" emissiveIntensity={0.3} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 32]} />
        <meshStandardMaterial color="#00ff88" metalness={0.9} roughness={0.1} emissive="#00ff88" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.4, 0, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#ff0088" metalness={0.9} roughness={0.1} emissive="#ff0088" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full opacity-30 pointer-events-none -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#00ff88" />
        <pointLight position={[10, -10, 5]} intensity={0.8} color="#0088ff" />
        <pointLight position={[0, 10, 0]} intensity={0.6} color="#ff0088" />
        
        {/* Floating distorted spheres */}
        <FloatingShape position={[-4, 2, -3]} size={1.2} color="#00ff88" speed={1.5} />
        <FloatingShape position={[4, -2, -4]} size={0.9} color="#0088ff" speed={2} />
        <FloatingShape position={[0, 0, -5]} size={1.5} color="#ff0088" speed={1} />
        <FloatingShape position={[-3, -2, -2]} size={0.7} color="#ffaa00" speed={2.5} />
        <FloatingShape position={[3, 2, -3]} size={1} color="#aa00ff" speed={1.8} />
        <FloatingShape position={[-2, 3, -4]} size={0.8} color="#00ffff" speed={2.2} />
        
        {/* Gym equipment shapes */}
        <GymEquipmentShape position={[-2, 0, -2]} />
        <GymEquipmentShape position={[2, 1, -3]} />
        
        {/* Particle field */}
        <Particles />
        
        {/* Auto-rotating camera */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
};
