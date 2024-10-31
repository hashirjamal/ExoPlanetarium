import styles from "./../AddQuiz.module.css";

const AddQuizQuestions = ({ questionNo, question }) => {
  return (
    <div className={styles.modalBox}>
      <h1 className={styles.heading}>Question No. {questionNo+1}</h1>
      <p className={styles.question}>{question.question}</p>
        <div className={styles.options}>
            {question.options.map((option, index) => 
                {return (option === question.correctOption)?
                    <p style={{color: "#66FF66"}} key={index}>{index+1}. {option}</p>:
                    <p key={index}>{index+1}. {option}</p>
                }
            )}
            </div>
    </div>
  );
};

export default AddQuizQuestions;
