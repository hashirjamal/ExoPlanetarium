import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { TextureLoader } from "three";

function Rocket({
  paths,
  startTravel,
  isMoving,
  setCurrentPlanet,
  planetPositions,
}) {
  const rocketRef = useRef();
  const cameraOffset = new THREE.Vector3(0, 15, 30);
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [rocketPosition, setRocketPosition] = useState(0);
  // const texture = useLoader(
  //   TextureLoader,
  //   "/textures/Toy Rocket_Toy Ship_BaseColor.png"
  // );

  const texture = useTexture({
    map: "/textures/Toy Rocket_Toy Ship_BaseColor.png",
    roughnessMap: "/textures/Toy Rocket_Toy Ship_Roughness.png",
    normalMap: "/textures/Toy Rocket_Toy Ship_Normal.png",
    metalnessMap: "/textures/Toy Rocket_Toy Ship_Metallic.png",
  });

  // Load materials first
  const materials = useLoader(MTLLoader, "material.mtl"); // Update the path to your MTL file
  console.log(materials);

  // Load the rocket model using the materials
  const rocketModel = useLoader(OBJLoader, "/object.obj", (loader) => {
    loader.setMaterials(materials);
  });
  rocketModel.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({ ...texture });
    }
  });

  useFrame((state, delta) => {
    const { camera } = state;

    if (isMoving.current && currentPathIndex < paths.length) {
      if (rocketPosition < 1) {
        const newPosition = rocketPosition + delta * 0.2;
        setRocketPosition(newPosition);

        const curve = paths[currentPathIndex];
        const point = curve.getPoint(newPosition);
        rocketRef.current.position.copy(point);

        const nextPoint = curve.getPoint(Math.min(newPosition + 0.01, 1));
        rocketRef.current.lookAt(nextPoint);

        const cameraTarget = point.clone().add(cameraOffset);
        camera.position.lerp(cameraTarget, 0.05);
        camera.lookAt(point);
      } else {
        isMoving.current = false;
        setRocketPosition(0);
        setCurrentPathIndex(currentPathIndex + 1);

        if (currentPathIndex < planetPositions.length) {
          const newPlanetPosition = planetPositions[currentPathIndex + 1];
          setCurrentPlanet(newPlanetPosition);

          camera.position.copy(newPlanetPosition.clone().add(cameraOffset));
          camera.lookAt(newPlanetPosition);
        }
      }
    }
  });

  return <primitive ref={rocketRef} object={rocketModel} scale={1.5} />;
}

function Planet({ position, color }) {
  return (
    <Sphere args={[5, 32, 32]} position={position}>
      <meshStandardMaterial color={color} />
    </Sphere>
  );
}

export default function App() {
  const isMoving = useRef(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentPlanet, setCurrentPlanet] = useState(
    new THREE.Vector3(0, -5, 0)
  );

  const planetPositions = [
    new THREE.Vector3(0, -5, 0),
    new THREE.Vector3(30, 10, -20),
    new THREE.Vector3(60, -10, 30),
    new THREE.Vector3(100, 20, 0),
  ];

  const paths = [];
  for (let i = 0; i < planetPositions.length - 1; i++) {
    const curve = new THREE.CatmullRomCurve3([
      planetPositions[i],
      planetPositions[i].clone().add(new THREE.Vector3(10, 15, -10)),
      planetPositions[i + 1],
    ]);
    paths.push(curve);
  }

  const handleClick = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    isMoving.current = true;
  };

  return (
    <div onClick={handleClick} style={{ height: "100vh" }}>
      <Canvas camera={{ position: [0, 15, 50], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} />

        {planetPositions.map((pos, index) => (
          <Planet
            key={index}
            position={pos}
            color={index % 2 === 0 ? "blue" : "green"}
          />
        ))}

        {hasStarted && (
          <Rocket
            paths={paths}
            isMoving={isMoving}
            setCurrentPlanet={setCurrentPlanet}
            planetPositions={planetPositions}
          />
        )}

        <OrbitControls target={currentPlanet} />
      </Canvas>
    </div>
  );
}
