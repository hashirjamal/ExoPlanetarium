import { Suspense, useRef, useState } from 'react';
import styles from './QuizPage.module.css';
import Questions from '../Quiz/components/Questions';
import AfterQuiz from '../../components/AfterQuiz';
import BackgroundQuiz from '../../components/BackgroundQuiz';
import Stats from './components/Stats';
import { Canvas } from '@react-three/fiber';
import Three from '../../components/Three';

const QuizPage = () => {
    const [counter, setCounter] = useState(0);
    const [move, setMove] = useState(false);
    const modalRef = useRef(true);
    const [score, setScore] = useState(0);
    const [showAfterQuiz, setShowAfterQuiz] = useState(false);
    const [val,setVal] = useState(undefined);
    // const modal = useRef(null);


    const handleAnswerSelected = () => {
        // setShowAfterQuiz(true);
        setTimeout(() => {
            // setShowAfterQuiz(false);
            setCounter(prev => prev + 1);
        }, 1000);
    };

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
          <div ref={modalRef} className={styles.background}>
              <div className={styles.modalBox} >
                <h1 className={styles.heading}>Question No. {counter+1}</h1>
                <Questions counter={counter} setCounter={handleAnswerSelected} setMove={setMove} setScore={setScore} setVal={setVal} modalRef={modalRef}/>
                <Stats val={val} score={score}></Stats>
              </div>
            </div>
      </>
    );
}

export default QuizPage;
