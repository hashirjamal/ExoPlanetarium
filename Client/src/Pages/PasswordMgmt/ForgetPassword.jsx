import { Typography } from "@mui/material";
import LoginCanvas from "../Quiz/components/LoginCanvas.jsx";
import Card from "./Card.jsx";
import styles from "./ForgetPassword.module.css";
import { ToastContainer } from "react-toastify";

function ForgetPassword() {
    return (
        <div className={styles.loginPage}>
            <ToastContainer theme="dark" />
            <Typography
                variant="h6"
                sx={{
                    color: "white",
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: {
                        lg: "3.5rem",
                        md: "3rem",
                        sm: "2.5rem",
                        xs: "2rem",
                    },
                }}
            >
                Ex
                <img
                    className={styles.spinAnimation}
                    src="/saturn.png"
                    alt="spinning planet"
                />
                Planetarium
            </Typography>
            <div className={styles.loginCard}>
                <div className={styles.leftContainer}>
                    <LoginCanvas />
                </div>
                <Card />
            </div>
        </div>
    );
}

export default ForgetPassword;
