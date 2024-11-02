import { useRef, useState } from "react";
import styles from "./../AddQuiz.module.css";
import ModalComponent from "./ModalComponent";


const AddQuizQuestions = ({ questionNo, question ,setUpdatePage}) => {
  const [modalState,setModalState ] = useState(false);
 const [isUpdate,setIsUpdate] = useState(false);
 
  const onDeleteClick = (isConfirmed)=>{
   // if isConfirmed delete the question
   setModalState(true);
   setIsUpdate(false);
   //else openConformtionModal and from there call this function with issFunction = true
  }
  
  const onUpdateClick = ()=>{
    // open the modal with the info of the current question
    console.log("Calling Function");
    
    setIsUpdate(true);
    setModalState(true)

   

  }

  return (
    <div className={styles.modalBox}>
     { <ModalComponent setUpdatePage = {setUpdatePage} isUpdate={isUpdate} opener={modalState} setModalState={setModalState} question = {question} />}
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
            <nav className="mt-3">

            <button className="bg-gray-800 px-3 py-1 rounded-lg float-end ml-3 hover:bg-white hover:text-gray-900" onClick={onUpdateClick}>Update</button>
            <button className="bg-gray-800 px-3 py-1 rounded-lg float-end hover:bg-white hover:text-gray-900" onClick={onDeleteClick}>Delete</button>
            </nav>
    </div>
  );
};

export default AddQuizQuestions;
