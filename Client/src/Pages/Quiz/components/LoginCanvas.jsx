import { OrbitControls, Stars, Html } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { TextureLoader } from "three";

function RotatingMesh({ rotationSpeed, lightIntensity }) {
    const mesh = useRef();
    const texture = useLoader(TextureLoader, './planetsTextures/ceres.jpg');

    useFrame(() => {
        if (mesh.current) {
            mesh.current.rotation.y += rotationSpeed*0.3
        }
    });

    return (
        <>
            <mesh ref={mesh}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial map={texture} />
            </mesh>
            <directionalLight position={[10, 10, 5]} intensity={lightIntensity} />
        </>
    );
}

function LoginCanvas({isSignUp}) {
    const [rotationSpeed, setRotationSpeed] = useState(0.01);
    const [lightIntensity, setLightIntensity] = useState(1);


    return (
        <Canvas style={{ width: "100%", height: "100%", borderRadius: isSignUp? "0 15px 15px 0": "15px 0 0 15px" }} camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 5] }}>
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <Stars />
            <Suspense fallback={<Html center>Loading...</Html>}>
                <RotatingMesh rotationSpeed={rotationSpeed} lightIntensity={lightIntensity} />
            </Suspense>
            <color attach="background" args={['black']} />
        </Canvas>
    );
}

export default LoginCanvas;