import LoginCanvas from "../Quiz/components/LoginCanvas.jsx";
import Card from "./Card.jsx";
import styles from "./LoginPage.module.css";



function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className="w-[50%]">
          <div className="h-full w-full">
            <LoginCanvas />
            </div>
        </div>
          <Card isLogin={true} params="params" />
      </div>
    </div>
  )
}

export default LoginPage