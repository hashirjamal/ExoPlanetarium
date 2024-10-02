import React, { Suspense } from "react";
import Three from "./components/Three";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import BackgroundQuiz from "./components/BackgroundQuiz";

const App = () => {
  return (
    <div>
      {/* <Canvas id="cn" style={{ width: "100%", height: "100vh" }}>
        <Suspense fallback={null}>
          <Three />
        </Suspense>
      </Canvas> */}
      <BackgroundQuiz />
    </div>
  );
};

export default App;

const skyboxApi =
  "https://skybox.blockadelabs.com/e/1be88f0476b368d70b885f68cb138a84";
