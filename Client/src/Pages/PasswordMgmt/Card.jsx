import { useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from "./Card.module.css";
import { toast } from "react-toastify";

const Card = () => {
  const [forgetEmail, setForgetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pShow, setPShow] = useState(false);
  const [cpShow, setCpShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
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
        setStep(2);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
        showToast(
        "This email is not registered. Please enter your registered Email",
          "error"
        );
    }
  };

  const onVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/verifyOtp",
        { email: forgetEmail, otp }
      );
      setLoading(false);
      if (response.data.status === "success") {
        showToast("OTP verified successfully!", "success");
        setStep(3);
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
        nav("/");
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
        className={styles.logincontainer}
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
          {step === 1 ? "Forgot Password" : step === 2 ? "Enter OTP" : step === 3 ? "Reset Password" : null}
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
            <Link className={styles.anchor} to="/">
          <Typography
            variant="body2"
            styles={{ color: "#08457e", marginRight: "1rem" }}
          >
            Back to Login
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
              <label htmlFor="password">New Password</label>
              <div id={styles.passBox}>
                <input
                  type={pShow ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  placeholder="Type your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={pShow ? faEyeSlash : faEye}
                  onClick={() => setPShow((prev) => !prev)}
                  id={styles.toggle}
                />
              </div>
            </div>

            <div className={styles.inpBox}>
              <label htmlFor="password">Confirm Password</label>
              <div id={styles.passBox}>
                <input
                  type={cpShow ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={cpShow ? faEyeSlash : faEye}
                  onClick={() => setCpShow((prev) => !prev)}
                  id={styles.toggle}
                />
              </div>
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
