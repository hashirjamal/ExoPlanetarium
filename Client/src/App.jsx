import React, { Suspense } from "react";
import Three from "./components/Three";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";

const App = () => {
  return (
    <div>
      <Canvas id="cn" style={{ width: "100%", height: "100vh" }}>
        <Suspense fallback={null}>
          <Three />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
