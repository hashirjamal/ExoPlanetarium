import styles from "./SignIn.module.css";
import LoginCanvas from "../Quiz/components/LoginCanvas.jsx";

function LoginPage(props) {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div>
          <div className="canvas">
            <LoginCanvas />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;