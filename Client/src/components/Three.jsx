import { Html, OrbitControls, Stars } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { TextureLoader, Vector3 } from "three";
import React from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Model = React.forwardRef(({ onMove }, ref) => {
  const obj = useLoader(OBJLoader, "./object.obj");

  const [baseMap, normalMap, roughnessMap, metallicMap] = useLoader(
    TextureLoader,
    [
      "./textures/baseMap.png",
      "./textures/normalMap.png",
      "./textures/roughnessMap.png",
      "./textures/metallicMap.png",
    ]
  );

  useEffect(() => {
    // Apply the textures to the model's meshes
    obj.traverse((child) => {
      if (child.isMesh) {
        child.material.map = baseMap; // Base color (diffuse)
        child.material.normalMap = normalMap; // Normal map for surface detail
        child.material.roughnessMap = roughnessMap; // Roughness map for material shininess
        child.material.metalnessMap = metallicMap; // Metalness map for metallic reflection
        child.material.needsUpdate = true; // Ensure the material updates after setting the textures
      }
    });
  }, [obj, baseMap, normalMap, roughnessMap, metallicMap]);

  return (
    <primitive
      object={obj}
      scale={0.35}
      position={[-3.7, -0.75, 0]}
      onClick={onMove} // Attach the click event
      ref={ref} // Forward the ref to the primitive object
      rotation={[0, 0.5, 0]}
    />
  );
});

export default function Three() {
  const rocketRef = useRef(); // Ref to control the rocket's position
  const starsRef = useRef(); // Ref for the stars component

  const makemake = useLoader(TextureLoader, "./planetsTextures/makemake.jpg");
  const miranda = useLoader(TextureLoader, "./planetsTextures/miranda.webp");

  useGSAP(() => {
    if (rocketRef.current) {
      const t1 = gsap.timeline();

      t1.to(rocketRef.current.position, {
        x: 3.8,
        duration: 10,
        ease: "power1.inOut",
      });

      t1.to(
        rocketRef.current.position,
        {
          y: 1.5, // Move upwards
          duration: 10,
          ease: "power1.inOut",
        },
        "<"
      );

      t1.to(
        rocketRef.current.rotation,
        {
          z: -Math.PI / 2,
          duration: 10,
          ease: "power1.inOut",
        },
        "<"
      );

      t1.to(
        rocketRef.current.rotation,
        {
          z: 0,
          duration: 5,
          ease: "power1.inOut",
        },
        "-=5"
      );

      t1.to(
        rocketRef.current.position,
        {
          y: -0.72,
          duration: 2,
          ease: "power1.inOut",
        },
        "+=0.01"
      );
      t1.to(
        rocketRef.current.rotation,
        {
          y: -0.5,
          duration: 2,
          ease: "power1.inOut",
        },
        "<"
      );
    }
  }, [rocketRef]);
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 1, 5]} intensity={2} />

      {/* Stars background */}
      <Stars ref={starsRef} />
      {/* Left bottom planet */}
      <mesh position={[-4, -3, 0]}>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshStandardMaterial map={makemake} />
      </mesh>

      {/* Right bottom planet */}
      <mesh position={[4, -3, 0]}>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshStandardMaterial map={miranda} />
      </mesh>

      {/* Rocket (Model) */}
      <Model ref={rocketRef} onMove={() => {}} />
    </>
  );
}
