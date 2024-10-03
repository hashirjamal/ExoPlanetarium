import React, { Suspense } from "react";
import Three from "./components/Three";
import { Canvas } from "@react-three/fiber";

const AfterQuiz = () => {
  return (
    <div>
      <Canvas
        id="cn"
        style={{ width: "100%", height: "100vh" }}
        camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 5] }}
      >
        <Suspense fallback={null}>
          <Three />
        </Suspense>
      </Canvas>
      {/* <BackgroundQuiz /> */}
    </div>
  );
};

export default AfterQuiz;