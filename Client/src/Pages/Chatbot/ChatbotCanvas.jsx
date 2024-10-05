
import { OrbitControls, Stars, Html } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { TextureLoader } from "three";


function RotatingMesh({ rotationSpeed, lightIntensity }) {
    const mesh = useRef();
    const texture = useLoader(TextureLoader, './planetsTextures/ceres.jpg');

    useFrame((state) => {
  
        if (mesh.current) {
            // mesh.current.rotation.x += 0.001;
            mesh.current.rotation.y += 0.001;
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

function    ChatbotCanvas({isSignUp}) {
    const gui = useRef();
    const [rotationSpeed, setRotationSpeed] = useState(0.01);
    const [lightIntensity, setLightIntensity] = useState(1);

    // useEffect(() => {
    //     gui.current = new GUI();
    //     gui.current.add({ rotationSpeed }, 'rotationSpeed', 0, 0.1).name('Rotation Speed').onChange(value => {
    //         setRotationSpeed(value);
    //     });
    //     gui.current.add({ lightIntensity }, 'lightIntensity', 0, 2).name('Light Intensity').onChange(value => {
    //         setLightIntensity(value);
    //     });

    //     return () => {
    //         gui.current.destroy();
    //     };
    // }, []);

    return (
        <Canvas style={{ width: "100%", height: "120vh" }} camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 5] }}>
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

export default ChatbotCanvas;
