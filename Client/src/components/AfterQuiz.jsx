import React, { Suspense } from "react";
import Three from "./Three";
import { Canvas } from "@react-three/fiber";
import styles from "./AfterQuiz.module.css"; // Assuming you have a separate CSS module for styling

const AfterQuiz = () => {
  return (
    <div className={styles.fullscreenContainer}>
      <Canvas
        id="cn"
        style={{ width: "100%", height: "100%" }} // Ensure canvas takes full width and height
        camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 5] }}
      >
        <Suspense fallback={null}>
          <Three />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AfterQuiz;
