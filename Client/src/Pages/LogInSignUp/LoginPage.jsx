import { Typography } from "@mui/material";
import LoginCanvas from "../Quiz/components/LoginCanvas.jsx";
import Card from "./Card.jsx";
import styles from "./LoginPage.module.css";
import { ToastContainer } from "react-toastify";

function LoginPage() {
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
                <Card isLogin={true} params="params" />
            </div>
        </div>
    );
}

export default LoginPage;
