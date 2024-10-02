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
      scale={1}
      position={[-7, 0.5, 0]}
      onClick={onMove} // Attach the click event
      ref={ref} // Forward the ref to the primitive object
      rotation={[0, 0, -Math.PI / 2]} // Rotate the model to face the camera
    />
  );
});

export default function Three() {
  const rocketRef = useRef(); // Ref to control the rocket's position
  const starsRef = useRef(); // Ref for the stars component
  const { camera } = useThree();
  const scrollSpeed = 0.07;
  // Handle mouse move to get cursor position
  const handleMouseMove = (event) => {
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    const mouse = new Vector3(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
      0 // Z position (not used here)
    );

    // Create a raycaster
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(camera.children);

    if (intersects.length > 0) {
      // Move the rocket to just behind the cursor
      const offset = 0.5; // Adjust this value to control how far behind the cursor the rocket should be
      const targetPosition = intersects[0].point;
      targetPosition.z -= offset; // Move the rocket behind the cursor in the Z direction
      rocketRef.current.position.copy(targetPosition);
    } else {
      // If there's no intersection, keep the rocket in view
      const targetPosition = new Vector3(
        mouse.x * 10, // Scale cursor x to a suitable range
        mouse.y * 10, // Scale cursor y to a suitable range
        -2 // Set Z position behind the camera
      );
      rocketRef.current.position.copy(targetPosition);
    }
  };

  useEffect(() => {
    // Add event listener for mouse move
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      // Clean up the event listener on unmount
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // useEffect(() => {
  //   // Animate stars with gsap
  //   gsap.to(starsRef.current.position, {
  //     x: -200, // Move stars to the left
  //     duration: 20, // Duration of the animation
  //     repeat: -1, // Repeat indefinitely
  //     onRepeat: () => {
  //       starsRef.current.position.x = 100; // Reset position after each repeat
  //     },
  //   });
  // }, []);
  useFrame(() => {
    // Move stars slowly in the negative x direction
    starsRef.current.position.x -= scrollSpeed;

    // Reset stars position for a continuous loop
    if (starsRef.current.position.x < -100) {
      starsRef.current.position.x = 100; // Reset to the right side for an infinite effect
    }
  });

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 1, 5]} intensity={2} />

      {/* Stars background */}
      <Stars ref={starsRef} />

      {/* Rocket (Model) */}
      <Model ref={rocketRef} onMove={() => {}} />
    </>
  );
}
