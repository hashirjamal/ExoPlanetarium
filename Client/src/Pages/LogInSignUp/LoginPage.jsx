import ChatbotCanvas from "../Quiz/Chatbot/ChatbotCanvas.jsx";
import LoginCanvas from "../Quiz/components/LoginCanvas.jsx";
import Card from "./Card.jsx";
import styles from "./LoginPage.module.css";

// import ChatbotCanvas from "../Chatbot/ChatbotCanvas"
// import Card from "./Card"



function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <div className={`${styles.loginCard}`}>
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