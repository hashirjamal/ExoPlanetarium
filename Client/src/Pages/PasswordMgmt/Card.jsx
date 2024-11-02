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
  const [otp, setOtp] = useState(""); // State for OTP
  const [newPassword, setNewPassword] = useState(""); // New password
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm new password
  const [loading, setLoading] = useState(false);
  const [pShow, setPShow] = useState(false);
  const { setUser } = useContext(UserContext);
  const [step, setStep] = useState(1); // Track the current step of the process
  const nav = useNavigate();

  const showToast = (message, type) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };

  const onSendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/forgetPassword",
        { email: forgetEmail }
      );
      setLoading(false);
      if (response.data.status === "success") {
        showToast(response.data.message, "success");
        setStep(2); // Move to the next step for OTP
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
        showToast(
        "This email is not registered. Please enter your registered Email",
          "error"
        );
      // }
    }
  };

  const onVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Assuming you have a backend API to verify the OTP
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/verifyOtp",
        { email: forgetEmail, otp }
      );
      setLoading(false);
      if (response.data.status === "success") {
        showToast("OTP verified successfully!", "success");
        setStep(3); // Move to the next step for new password
      } else {
        showToast("Invalid OTP. Please try again.", "error");
      }
    } catch (err) {
      setLoading(false);
      showToast(err.response.data.message || "OTP verification failed", "error");
    }
  };

  const onResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (newPassword === confirmPassword) {
      try {
        const response = await axios.patch(
          `http://localhost:3000/api/auth/resetPassword/`,
          { email: forgetEmail, password: newPassword }
        );
        setLoading(false);
        nav("/"); // Redirect to login after successful reset
        showToast("Password Successfully updated", "success");
      } catch (err) {
        setLoading(false);
        showToast(err.response.data.message, "error");
      }
    } else {
      setLoading(false);
      showToast("Passwords do not match", "error");
    }
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
        {step === 1 && (
          <form className={styles.form} onSubmit={onSendEmail}>
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
        
        {step === 2 && (
          <form className={styles.form} onSubmit={onVerifyOtp}>
            <div className={styles.inpBox}>
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter the OTP sent to your email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
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
              Verify OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form className={styles.form} onSubmit={onResetPassword}>
            <div className={styles.inpBox}>
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className={styles.inpBox}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
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
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Card;
