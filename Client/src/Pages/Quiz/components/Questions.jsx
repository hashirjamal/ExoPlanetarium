import styles from "./Questions.module.css";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255,255,255,0.4)",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",

  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const Questions = ({
  counter,
  setCounter,
  setScore,
  setVal,
  setMove,
  modalRef,
  handlePage,
  handleCanvasKey,
  data,
  fetching,
}) => {
  const [clicked, setClicked] = useState(false);
  const optionsRef = useRef([]);

  const checkAnswer = (event) => {
    setClicked(true);
    const selectedOption = event.target.getAttribute("value");
    if (selectedOption === data[counter].correctOption) {
      event.target.style.backgroundColor = "rgba(0,255,0,0.5)";
      setTimeout(() => {
        modalRef.current.style.visibility = "hidden";
        setMove(true);
      }, 2000);
      setTimeout(() => {
        modalRef.current.style.visibility = "visible";
      }, 9500);
      setTimeout(() => {
        handleCanvasKey();
        setMove(false);
      }, 9000);
      setScore((prevScore) => prevScore + 1);
      setVal("Correct Answer!");
    } else {
      event.target.style.backgroundColor = "rgba(255,0,0,0.7)";
      event.target.style.color = "rgb(255,250,255)";
      setVal("Wrong Answer!");
    }
    const correctOptionValue = optionsRef.current.find(
      (item) => item.getAttribute("value") === data[counter].correctOption
    );
    correctOptionValue.style.backgroundColor = "rgba(0,128,0,0.7)";
    correctOptionValue.style.color = "rgb(255,250,255)";
    setTimeout(() => {
      setClicked(false);
      optionsRef.current.forEach((item) => {
        item.style.backgroundColor = "rgba(255,255,255,0.4)";
        item.style.color = "rgb(55, 55, 60)";
      });
      setVal(undefined);
      setCounter((prevCounter) => prevCounter + 1);
    }, 2000);
  };
  const optionsStyle = {
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "65px",
    padding: "10px",
    fontFamily: "'Lato', sans-serif",
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: "5px",
    fontSize: "1.2rem",
    pointerEvents: clicked ? "none" : "auto",
    transition: "all 0.3s",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.6)",
      color: "rgb(55, 55, 60)",
      transform: "scale(1.05)",
    }, /* Update the path as necessary */
    backgroundImage: `url(/rocket.png)`,
    backgroundPosition: "-45px 0px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100px",
  };

  return (
    <>
      {fetching ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <p className={styles.question}>{data[counter]?.question}</p>
          <div className={styles.optionsContainer}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {data[counter]?.options.map((option, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 6 }}>
                  <Item
                    ref={(el) => (optionsRef.current[index] = el)}
                    value={option}
                    sx={optionsStyle}
                    onClick={checkAnswer}
                  >
                    {option}
                  </Item>
                </Grid>
              ))}
            </Grid>
          </div>
        </>
      )}
    </>
  );
};

export default Questions;

