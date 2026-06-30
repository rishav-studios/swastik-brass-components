'use client';
import { shaderMaterial, useTexture } from '@react-three/drei';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

// 1. Define the custom shader material using drei's shaderMaterial helper
const FlagMaterial = shaderMaterial(
    {
        uTime: 0,
        uTexture: new THREE.Texture(),
    },
    // --- VERTEX SHADER ---
    `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Create sine wave displacement for Z-axis.
    // - Subtracting uTime makes the wave travel to the right (wind blowing).
    // - Multiplying by uv.x ensures the left side (x=0) stays pinned to the pole.
    float elevation = sin(pos.x * 2.0 - uTime * 5.0) * 0.4 * uv.x;
    pos.z += elevation;

    // Pass elevation to fragment shader for fake lighting/shadows
    vElevation = elevation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
    // --- FRAGMENT SHADER ---
    `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);

    // Use the original colors from the texture
    vec3 baseColor = texColor.rgb;

    // Add fake shading based on the wave elevation to give it a 3D cloth effect
    // We darken the valleys and lighten the peaks slightly
    float shadowMultiplier = vElevation;
    vec3 finalColor = baseColor + shadowMultiplier * 0.15;

    gl_FragColor = vec4(finalColor, texColor.a);

    // Standard Three.js color space handling
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
  `
);

// Register the custom material as a JSX element so R3F can use it
extend({ FlagMaterial });

// 2. Component for the Waving Flag
type WavingFlagProps = {
    imgSrc: string;
};
const WavingFlag = ({ imgSrc }: WavingFlagProps) => {
    const materialRef = useRef<any>(null);

    // Load the texture. Make sure this file is available in your public/ directory in Next.js
    const texture = useTexture(imgSrc);

    // useFrame hook updates the time uniform every frame for constant animation
    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uTime = state.clock.elapsedTime;
        }
    });

    return (
        <group>
            {/* The Flag Pole */}
            <mesh position={[-3.05, 0, 0]}>
                <cylinderGeometry args={[0.06, 0.06, 4.5, 32]} />
                <meshStandardMaterial color="gray" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Finial (Ball on top of the pole) */}
            {/* <mesh position={[-3.05, 2.3, 0]}>
                <sphereGeometry args={[0.1, 32, 32]} />
                <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.1} />
            </mesh> */}

            {/* The Flag */}
            <mesh position={[0, 0, 0]}>
                {/* PlaneGeometry with high segments (128x128) for smooth waving motion */}
                <planeGeometry args={[6, 4, 128, 128]} />
                {/* @ts-ignore - ignore custom intrinsic element TS warning */}
                <flagMaterial ref={materialRef} uTexture={texture} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
};

// 3. Loading Fallback
const Loader = () => (
    <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="white" wireframe />
    </mesh>
);

// 4. Main App Component
export default function Flag({ imgSrc }: WavingFlagProps) {
    return (
        <div className="w-full h-full flex flex-col relative">

            {/* 3D Canvas */}
            <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                <color attach="background" args={['#fff']} />

                {/* Lighting specifically for the pole */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} />
                <directionalLight position={[-5, 5, -5]} intensity={0.5} />

                <Suspense fallback={<Loader />}>
                    <WavingFlag imgSrc={imgSrc} />
                </Suspense>

                {/* Orbit controls allow the user to look around */}
                {/* <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 4}
                /> */}
            </Canvas>
        </div>
    );
}