import { Html, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { useRef, useState } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

const Model = () => {
  const obj = useLoader(OBJLoader, "./object.obj");
  const mat = useLoader(MTLLoader, "./material.mtl", {});
};

export default function Three() {
  const [x, setX] = useState(-4); // Track x position
  const sphereRef = useRef(); // Reference to the sphere (rocket)
  const { camera } = useThree(); // Get camera from context
  const originalCameraPosition = useRef([0, 2, 5]); // Store original camera position

  const onMove = () => {
    if (x >= 4) return setX(4);
    const newX = x + 2; // Increment the x position

    const timeline = gsap.timeline();

    // Move the sphere
    timeline.to(sphereRef.current.position, {
      duration: 1,
      x: newX,
    });

    // Move up
    timeline.to(
      sphereRef.current.position,
      {
        duration: 1,
        y: 3,
      },
      "<" // Start this animation at the same time as the previous one
    );

    // Camera follows the sphere
    timeline.to(
      camera.position,
      {
        duration: 1,
        x: newX, // Match camera's x position to the sphere
        y: 3, // Move camera up
        z: 5, // Move camera away from the sphere
        onUpdate: () => {
          camera.lookAt(sphereRef.current.position); // Keep looking at the sphere
        },
      },
      "<"
    );

    // Move down
    timeline.to(
      sphereRef.current.position,
      {
        duration: 1,
        y: 1,
      },
      "+=0.1" // Delay slightly before moving down
    );

    // Return camera to original position after sphere movement
    // timeline.to(
    //   camera.position,
    //   {
    //     duration: 1,
    //     x: originalCameraPosition.current[0],
    //     y: originalCameraPosition.current[1],
    //     z: originalCameraPosition.current[2],
    //     onUpdate: () => {
    //       camera.lookAt(sphereRef.current.position); // Look at sphere while returning
    //     },
    //   },
    //   "+=0.5" // Delay before returning the camera
    // );

    setX(newX); // Update the state
  };

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 1, 5]} intensity={2} />
      {/* Other boxes */}
      <mesh position={[-4, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color="hotpink" />
      </mesh>
      <mesh position={[-2, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color="skyblue" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color="skyblue" />
      </mesh>
      <mesh position={[2, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color="green" />
      </mesh>
      <mesh position={[4, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color="skyblue" />
      </mesh>
      {/* Rocket (Sphere) */}
      <mesh position={[-4, 1, 0]} ref={sphereRef} onClick={onMove}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial attach="material" color="orange" />
      </mesh>
    </>
  );
}
