import { useState } from 'react';
import styles from './QuizPage.module.css';
import Questions from '../Quiz/components/Questions';
import AfterQuiz from '../../components/AfterQuiz';
import BackgroundQuiz from '../../components/BackgroundQuiz';

const QuizPage = () => {
    const [counter, setCounter] = useState(0);
    const [showAfterQuiz, setShowAfterQuiz] = useState(false);

    const handleAnswerSelected = () => {
        setShowAfterQuiz(true);
        setTimeout(() => {
            setShowAfterQuiz(false);
            setCounter(prev => prev + 1);
        }, 19000);
    };

    return (
      <>
          {/* <div className={styles.background}> */}
          <BackgroundQuiz>
          <div className={styles.background}> 
              <div className={styles.modalBox}>
                <Questions counter={counter} setCounter={handleAnswerSelected} />
              </div>
            </div>
          </BackgroundQuiz>
          {/* </div> */}
          {showAfterQuiz && <AfterQuiz />}
      </>
    );
}

export default QuizPage;
