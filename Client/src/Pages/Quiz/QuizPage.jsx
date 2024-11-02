import { Suspense, useRef, useState, useEffect } from "react";
import styles from "./QuizPage.module.css";
import Questions from "../Quiz/components/Questions";
import axios from "axios";
import Stats from "./components/Stats";
import { Canvas } from "@react-three/fiber";
import Three from "../../components/Three";
import TransitionPage from "./TransitionPage";

function getRandomElements(arr, num) {
    let shuffled = arr.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, num);
}

const QuizPage = () => {
    const [counter, setCounter] = useState(0);
    const [move, setMove] = useState(false);
    const modalRef = useRef(true);
    const [score, setScore] = useState(0);
    const [data, setData] = useState([]);
    const [val, setVal] = useState(undefined);

    const [page, setPage] = useState(false);
    const [canvasKey, setCanvasKey] = useState(0);
    const [fetching, setFetching] = useState(false);
    const [highScore, setHighScore] = useState(0);
    const handleCanvasKey = () => {
        setCanvasKey((prev) => prev + 1);
    };
    console.log("canvasKey", canvasKey);

    useEffect(() => {
        const fetchData = async () => {
            setFetching(true);
            try {
                const response = await axios.get(
                    "http://localhost:3000/quiz/getQuestions",
                    { withCredentials: true }
                );
                setData(getRandomElements(response.data.data.questions, 10));
                const highScoreRes = await axios.get(
                    "http://localhost:3000/quiz/getHighScore",
                    { withCredentials: true }
                );
                setHighScore(highScoreRes.data.data.highScore);
            } catch (err) {
                console.log(err);
            }
            setFetching(false);
        };
        fetchData();
    }, []);

    const handlePage = () => {
        setPage(true);
    };
    const handleAnswerSelected = () => {
        setTimeout(() => {
            setCounter((prev) => prev + 1);
        }, 1000);
    };
    if (counter > 9 && score > highScore) {
        axios.patch(
            "http://localhost:3000/quiz/saveHighScore",
            { hiScore: score },
            { withCredentials: true }
        );
    }

    return (
        <>
            <Canvas
                key={canvasKey}
                id="cn"
                style={{
                    width: "100%",
                    height: "100vh",
                    overflow: "hidden",
                }}
                camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 5] }}
            >
                <Suspense fallback={null}>
                    <Three move={move} canvasKey={canvasKey} />
                </Suspense>
            </Canvas>
            {page && <TransitionPage />}

            <div
                ref={modalRef}
                className={styles.background}
                style={{ zIndex: "1000", position: "absolute" }}
            >
                <div className={styles.modalBox}>
                    {counter > 9 ? (
                        <div className={styles.overBox}>
                            <h1
                                className={styles.heading}
                                style={{ fontSize: "2rem", fontWeight: "bold" }}
                            >
                                Quiz Over
                            </h1>
                            <h1
                                className={styles.heading}
                                style={{ fontSize: "1.2rem" }}
                            >
                                Your Score: {score}
                            </h1>
                            <h1
                                className={styles.heading}
                                style={{ fontSize: "1.2rem" }}
                            >
                                High Score:{" "}
                                {score > highScore ? score : highScore}
                            </h1>
                            <h1
                                className={styles.heading}
                                style={{ fontSize: "1.2rem" }}
                            >
                                Incorrect Answer: {10 - score}
                            </h1>
                            {score > highScore && (
                                <h1
                                    className={styles.heading}
                                    style={{
                                        fontSize: "2.5rem",
                                        fontWeight: "bold",
                                    }}
                                >
                                    New High Score
                                </h1>
                            )}
                        </div>
                    ) : (
                        <>
                            <h1 className={styles.heading}>
                                Question No. {counter + 1}
                            </h1>
                            <Questions
                                counter={counter}
                                setCounter={handleAnswerSelected}
                                setMove={setMove}
                                setScore={setScore}
                                setVal={setVal}
                                modalRef={modalRef}
                                handlePage={handlePage}
                                handleCanvasKey={handleCanvasKey}
                                data={data}
                                fetching={fetching}
                            />
                            <Stats
                                val={val}
                                score={score}
                                highScore={highScore}
                            ></Stats>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default QuizPage;
