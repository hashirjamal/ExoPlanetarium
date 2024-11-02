import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./AddQuiz.module.css";
import AddQuizQuestions from "./components/AddQuizQuestions";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

const DUMMY = [
  {
    _id: "1",
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
    correctOption: "Delhi",
  },
  {
    _id: "2",
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
    correctOption: "Delhi",
  },
];
const AddQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const [updatePage,setUpdatePage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const questionsData = await axios.get(
        "http://localhost:3000/quiz/getQuestions",
        { withCredentials: true }
      );
      setQuestions(questionsData.data.data.questions);
    };
    fetchData();
    // console.log(questions);
  }, [updatePage]);

  return (
    <div className={styles.bg}>
       <ToastContainer theme="dark" />
      {questions.map((question, index) => (
        <AddQuizQuestions
          questionNo={index}
          question={question}
          key={question._id}
          setUpdatePage = {setUpdatePage}
        />
      ))}
      <div className={styles.addIcon}  onClick={()=>navigate('/add-qna')}>
        <IoAdd />
      </div>
      
    </div>
  );
};

export default AddQuiz;
