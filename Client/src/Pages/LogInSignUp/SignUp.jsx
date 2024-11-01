import { Typography } from "@mui/material";
import LoginCanvas from "../Quiz/components/LoginCanvas.jsx";
import Card from "./Card.jsx";
import styles from "./LoginPage.module.css";
import { ToastContainer } from "react-toastify";

function SignUp() {
  return (
    <div className={styles.loginPage}>
      <ToastContainer theme="dark" />
      <Typography
        variant="h6"
        sx={{
          color: "white",
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "3.5rem",
        }}
      >
        Ex
        <img className={styles.spinAnimation} src="./saturn.png" />
        Planetarium
      </Typography>
      <div className={styles.loginCard}>
        <Card isSignUp={true} params="params" />
        <div className={styles.rightContainer}>
          <LoginCanvas isSignUp={true} />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
