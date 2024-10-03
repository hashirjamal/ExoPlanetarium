import { useState } from 'react';
import styles from './QuizPage.module.css';
import Questions from './components/Questions';

const QuizPage = () => {
    const [counter, setCounter] = useState(0);
    return (
        <div className={styles.background}>
            <div className={styles.modalBox}>
                <Questions counter={counter} setCounter={setCounter}></Questions> 
            </div>
        </div>
    );
}
export default QuizPage;