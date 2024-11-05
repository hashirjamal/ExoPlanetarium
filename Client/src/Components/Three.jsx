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

export default function Three({ move, canvasKey }) {
  const rocketRef = useRef(); // Ref to control the rocket's position
  const starsRef = useRef(); // Ref for the stars component

  const makemake = useLoader(TextureLoader, "./planetsTextures/makemake.jpg");
  const miranda = useLoader(TextureLoader, "./planetsTextures/miranda.webp");
  // const ceres = useLoader(TextureLoader, "./planetsTextures/ceres.jpg");
  // const haumea = useLoader(TextureLoader, "./planetsTextures/haumea.jpg");
  // const eris = useLoader(TextureLoader, "./planetsTextures/eris.jpg");
  const planetTextures = [
    useLoader(TextureLoader, "./planetsTextures/makemake.jpg"),
    useLoader(TextureLoader, "./planetsTextures/miranda.webp"),
    useLoader(TextureLoader, "./planetsTextures/newplanet1.jpg"),
    useLoader(TextureLoader, "./planetsTextures/newplanet2.jpg"),
    useLoader(TextureLoader, "./planetsTextures/ceres.jpg"),
    useLoader(TextureLoader, "./planetsTextures/newplanet3.jpg"),
    useLoader(TextureLoader, "./planetsTextures/haumea.jpg"),
    useLoader(TextureLoader, "./planetsTextures/eris.jpg"),
  ];
  console.log(planetTextures);

  useGSAP(() => {
    if (rocketRef.current && move) {
      const t1 = gsap.timeline();

      t1.to(rocketRef.current.position, {
        x: 3.8,
        duration: 4,
        ease: "power1.inOut",
      });

      t1.to(
        rocketRef.current.position,
        {
          y: 1.5,
          duration: 4,
          ease: "power1.inOut",
        },
        "<"
      );

      t1.to(
        rocketRef.current.rotation,
        {
          z: -Math.PI / 2,
          duration: 4,
          ease: "power1.inOut",
        },
        "<"
      );

      t1.to(
        rocketRef.current.rotation,
        {
          z: 0,
          duration: 2,
          ease: "power1.inOut",
        },
        "-=2"
      );

      t1.to(
        rocketRef.current.position,
        {
          y: -0.72,
          duration: 2,
          ease: "power1.inOut",
        },
        "+=0.001"
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
  }, [rocketRef, move]);
  const texture1 = planetTextures[canvasKey % planetTextures.length];
  const texture2 = planetTextures[(canvasKey + 1) % planetTextures.length];
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 1, 5]} intensity={2} />

      <Stars ref={starsRef} />

      <mesh position={[-4, -3, 0]}>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshStandardMaterial map={texture1} />
      </mesh>

      <mesh position={[4, -3, 0]}>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshStandardMaterial map={texture2} />
      </mesh>

      <Model ref={rocketRef} onMove={() => {}} />
    </>
  );
}
