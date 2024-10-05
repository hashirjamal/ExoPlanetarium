import { Html, OrbitControls, Stars } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { TextureLoader } from "three";
import React from "react";
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
    obj.traverse((child) => {
      if (child.isMesh) {
        child.material.map = baseMap;
        child.material.normalMap = normalMap;
        child.material.roughnessMap = roughnessMap;
        child.material.metalnessMap = metallicMap;
        child.material.needsUpdate = true;
      }
    });
  }, [obj, baseMap, normalMap, roughnessMap, metallicMap]);

  return (
    <primitive
      object={obj}
      scale={0.35}
      position={[-3.7, -0.75, 0]}
      onClick={onMove}
      ref={ref}
      rotation={[0, 0.5, 0]}
    />
  );
});

export default function Three({ move }) {
  const rocketRef = useRef();

  const makemake = useLoader(TextureLoader, "./planetsTextures/makemake.jpg");
  const miranda = useLoader(TextureLoader, "./planetsTextures/miranda.webp");

  useGSAP(() => {
    if (rocketRef.current && move) {
        const t1 = gsap.timeline();
        t1.to(rocketRef.current.position, {
          x: 3.8,
          duration: 4,
          ease: "power1.inOut",
        })
        .to(rocketRef.current.position, {
          y: 1.5,
          duration: 4,
          ease: "power1.inOut",
        }, "<")
        .to(rocketRef.current.rotation, {
          z: -Math.PI / 2,
          duration: 4,
          ease: "power1.inOut",
        }, "<")
        .to(rocketRef.current.rotation, {
          z: 0,
          duration: 2,
          ease: "power1.inOut",
        }, "-=2")
        .to(rocketRef.current.position, {
          y: -0.72,
          duration: 2,
          ease: "power1.inOut",
        }, "+=0.001")
        .to(rocketRef.current.rotation, {
          y: -0.5,
          duration: 2,
          ease: "power1.inOut",
        }, "<");
    }
  }, [rocketRef, move]);

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 1, 5]} intensity={2} />
      <Stars />
      <mesh position={[-4, -3, 0]}>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshStandardMaterial map={makemake} />
      </mesh>
      <mesh position={[4, -3, 0]}>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshStandardMaterial map={miranda} />
      </mesh>
      <Model ref={rocketRef} onMove={() => {}} />
    </>
  );
}
