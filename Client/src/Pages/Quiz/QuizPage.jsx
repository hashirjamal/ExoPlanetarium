import { Suspense, useState } from 'react';
import styles from './QuizPage.module.css';
import Questions from '../Quiz/components/Questions';
// import AfterQuiz from '../../components/AfterQuiz';
// import BackgroundQuiz from '../../components/BackgroundQuiz';
import Three from '../../components/Three';
import { Canvas } from '@react-three/fiber';

const QuizPage = () => {
    const [counter, setCounter] = useState(0);
    // const [showAfterQuiz, setShowAfterQuiz] = useState(false);
    const [move, setMove] = useState(false);

    return (
      <>
        <Canvas
        id="cn"
        style={{ width: "100%", height: "100vh" }} // Ensure canvas takes full width and height
        camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 5] }}
      >
        <Suspense fallback={null}>
          <Three move={move} />
        </Suspense>
      </Canvas>
          <div className={styles.background}> 
              <div className={styles.modalBox}>
                <Questions counter={counter} setMove={setMove} setCounter={setCounter} />
              </div>
            </div>
      </>
    );
}

export default QuizPage;
