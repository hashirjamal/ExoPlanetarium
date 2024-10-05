import React, { useState } from "react";
import styles from "./SignIn.module.css";
import Card from "./Card.jsx";
import { useParams } from "react-router-dom";
import LoginCanvas from "../Quiz/components/LoginCanvas.jsx";

export default function LoginPage(props) {
  //  console.log(props,"hello");
  let use = useParams();
  let [params, setParams] = useState(use.token);
  // setParams(use.token);
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div>
          <div className="canvas">
            <LoginCanvas />
            </div>
        </div>
          <Card isLogin={true} params={params} />
      </div>
    </div>
  );
}
