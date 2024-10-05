  import LoginCanvas from "../Quiz/components/LoginCanvas.jsx";
  import Card from "./Card.jsx";
  import styles from "./LoginPage.module.css";

// import ChatbotCanvas from "../Chatbot/ChatbotCanvas";
// import Card from "./Card";

function SignUp() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className="w-[50%] ">
          <Card isSignUp={true}   params="params" />
          <div className="h-full w-full translate-x-full">
            <LoginCanvas isSignUp={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

// function SignUp(){
//   <div>
//      <ChatbotCanvas />
//      <Card isSignUp={true} params="params" />
//   </div>
// };

// export default SignUp;