import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { TextureLoader } from "three";

function LoginCanvas() {
    const texture = useLoader(TextureLoader, './planetsTextures/ceres.jpg');

    return (
        <Canvas style={{ width: "100%", height: "100%" }} camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 5] }}>
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Stars />
            <Suspense fallback={<span>Loading...</span>}>
                <mesh>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial map={texture} />
                </mesh>
            </Suspense>
            <color attach="background" args={['black']} />
        </Canvas>
    );
}

export default LoginCanvas;