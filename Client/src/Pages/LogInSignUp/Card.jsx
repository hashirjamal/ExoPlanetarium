import React, { useContext, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from "./Card.module.css";
import { UserContext } from "../../store/userContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Card = ({ isLogin, setPass, params, isSignUp }) => {
  const [loginInfo, setLogInfo] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [forgetEmail, setForgetEmail] = useState("");
  const [forgetPass, setForgetPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [pShow, setPShow] = useState(false);
  const { setUser } = useContext(UserContext);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const nav = useNavigate();

  const showToast = (message, type) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "" });
    }, 2000);
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = loginInfo;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signIn",
        { email, password },
        { withCredentials: true }
      );
      setLoading(false);

      if (response.data.status === "success") {
        setUser(response?.data?.data?.user);
        nav("/home");
        showToast("Logged in successfully!", "success");
      }
    } catch (err) {
      setLoading(false);
      showToast(err.response.data.message || "Login failed", "error");
    }
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, username, password } = loginInfo;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signUp",
        { email, username, password },
        { withCredentials: true }
      );
      setLoading(false);

      if (response.data.status === "success") {
        nav("/");
        showToast("Sign-up successful! Please log in.", "success");
      }
    } catch (err) {
      if(err?.response?.data?.message?.includes("E11000")){
        showToast("Email already registered!", "error");
      } else{
        showToast(err.response.data.message || "Signup failed", "error");
      }
      setLoading(false);
    }
  };

  const onSetPass = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (forgetPass === confirmPass) {
      try {
        const response = await axios.patch(
          `http://localhost:2000/users/resetPassword/${params}`,
          {
            updatedPassword: forgetPass,
          }
        );
        setLoading(false);
        showAlert("Password Successfully updated", "success");
      } catch (err) {
        setLoading(false);
        showAlert(err.response.data.message, "error");
      }
    } else {
      setLoading(false);
      showAlert("Passwords do not match", "error");
    }
  };

  const onSendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = forgetEmail;

    try {
      const response = await axios.post(
        "http://localhost:2000/users/forgetPassword",
        { email }
      );
      setLoading(false);
      if (response.data.status === "success") {
        showAlert(response.data.message, "success");
      }
    } catch (err) {
      setLoading(false);
      if (err.response.data.status === "fail") {
        showAlert(
          "This email is not registered. Please enter your registered Email",
          "error"
        );
      }
    }
  };

  const handleChange = (e, key) => {
    const val = e.target.value;
    setLogInfo((prev) => {
      const obj = { ...prev };
      obj[key] = val;
      console.log(`${key}: ${val}`);
      return obj;
    });
  };

  return (
    <div>
      <div
        className={`${
          isSignUp ? styles.signupcontainer : styles.logincontainer
        }`}
      >
        <Typography
          variant="h4"
          style={{
            fontSize: "1.5rem",
            textAlign: "center",
            margin: "4px 0",
            color: "#00315e",
            marginBottom: "20px",
          }}
        >
          {isLogin
            ? "Log In"
            : isSignUp
            ? "Sign Up"
            : !setPass && "Reset Password"}
        </Typography>
        {alert.show && (
          <div className={`${styles.alert} ${styles[alert.type]}`}>
            {alert.message}
            <span
              className={styles.closebtn}
              onClick={() => setAlert({ show: false, message: "", type: "" })}
            >
              &times;
            </span>
          </div>
        )}
        {isLogin && !setPass && (
          <form className={styles.form} onSubmit={onLogin}>
            <div className={styles.inpBox}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Type your e-mail address"
                value={loginInfo.email}
                onChange={(e) => handleChange(e, "email")}
              />
            </div>
            <div className={styles.inpBox}>
              <label htmlFor="password">Password</label>
              <div id={styles.passBox}>
                <input
                  type={pShow ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Type your password"
                  value={loginInfo.password}
                  onChange={(e) => handleChange(e, "password")}
                />
                <FontAwesomeIcon
                  icon={pShow ? faEyeSlash : faEye}
                  onClick={() => setPShow((prev) => !prev)}
                  id={styles.toggle}
                />
              </div>
            </div>
            <Link className={styles.anchor} to="/signup">
              <Typography
                variant="body2"
                styles={{ color: "#08457e", marginRight: "1rem" }}
              >
                Create an account
              </Typography>
            </Link>
            <Link className={styles.anchor} to="/forgetPassword">
              <Typography
                variant="body2"
                styles={{ color: "#08457e", marginRight: "1rem" }}
              >
                Forgot Password?
              </Typography>
            </Link>
            {/* <a className={styles.anchor} href="/forget-pass">
                            <Typography variant='body2' styles={{ color: "#08457e", marginRight: '1rem' }}>Forgot Password?</Typography>
                        </a> */}
            <div className={styles.loaderContainer}>
              {loading && (
                <ThreeDots
                  type="ThreeDots"
                  color="#00315e"
                  height={30}
                  width={30}
                />
              )}
            </div>
            <button className={styles.btn} disabled={loading}>
              Log In
            </button>
          </form>
        )}
        {isSignUp && !setPass && (
          <form className={styles.form} onSubmit={onSignUp}>
            <div className={styles.inpBox}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Type your e-mail address"
                value={loginInfo.email}
                onChange={(e) => handleChange(e, "email")}
              />
            </div>
            <div className={styles.inpBox}>
              <label htmlFor="text">User Name</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Type your user name"
                value={loginInfo.username}
                onChange={(e) => handleChange(e, "username")}
              />
            </div>
            <div className={styles.inpBox}>
              <label htmlFor="password">Password</label>
              <div id={styles.passBox}>
                <input
                  type={pShow ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Type your password"
                  value={loginInfo.password}
                  onChange={(e) => handleChange(e, "password")}
                />
                <FontAwesomeIcon
                  icon={pShow ? faEyeSlash : faEye}
                  onClick={() => setPShow((prev) => !prev)}
                  id={styles.toggle}
                />
              </div>
            </div>
            <Link className={styles.anchor} to="/">
              <Typography
                variant="body2"
                styles={{ color: "#08457e", marginRight: "1rem" }}
              >
                Log In
              </Typography>
            </Link>
            {loading && (
                <ThreeDots
                  type="ThreeDots"
                  color="#00315e"
                  height={30}
                  width={30}
                />
              )}
            <button
              style={{ textAlign: "center" }}
              className={styles.btn}
              disabled={loading}
            >
              Sign Up
            </button>
          </form>
        )}
        {!setPass && !isLogin && !isSignUp && (
          <form className={styles.form} onSubmit={onSendEmail}>
            <div
              className={styles.inpBox}
              style={{
                borderBottom: "none",
                margin: "1rem 0",
                textAlign: "center",
                backgroundColor: "#e4e4fd",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <Typography variant="body1">
                Please enter your registered email address. You will receive a
                password reset link at that
              </Typography>
            </div>
            <div className={styles.inpBox}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Type your e-mail address"
                value={forgetEmail}
                onChange={(e) => setForgetEmail(e.target.value)}
              />
            </div>
            <Link className={styles.anchor} to="/">
              <Typography
                variant="body2"
                styles={{ color: "#08457e", marginRight: "1rem" }}
              >
                Back to Log In
              </Typography>
            </Link>
            <div className={styles.loaderContainer}>
              {loading && (
                <ThreeDots
                  type="ThreeDots"
                  color="#00315e"
                  height={30}
                  width={30}
                />
              )}
            </div>
            <button className={styles.btn} disabled={loading}>
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Card;
