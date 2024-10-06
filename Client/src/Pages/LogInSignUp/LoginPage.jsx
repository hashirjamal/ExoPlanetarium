import { Typography } from "@mui/material";
import LoginCanvas from "../Quiz/components/LoginCanvas.jsx";
import Card from "./Card.jsx";
import styles from "./LoginPage.module.css";

function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <Typography
        variant="h6"
        sx={{ color: "white", fontFamily: "'Orbitron', sans-serif", fontSize: "3.5rem"}}
      >
        Ex
        <img className={styles.spinAnimation} src="../../public/saturn.png" />
        Planetarium
      </Typography>
      <div className={styles.loginCard}>
        <div className="w-[50%]">
          <div className="h-full w-full">
            <LoginCanvas />
          </div>
        </div>
        <Card isLogin={true} params="params" />
      </div>
    </div>
  );
}

export default LoginPage;

// function LoginPage() {
//   return (
//     <div>
//       <ChatbotCanvas />
//       <Card isLogin={true} params="params" />
//     </div>
//   )
// }

// export default LoginPage;
