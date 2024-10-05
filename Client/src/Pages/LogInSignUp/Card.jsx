import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from "react-loader-spinner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; /* added this for the password visibility icon */
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from "./Card.module.css";

const Card = ({ isLogin, setPass, params, isSignUp }) => {

    let [loginInfo, setLogInfo] = useState({
        email: "",
        password: "",
        user: ""
    });
    let [forgetEmail, setForgetEmail] = useState("");
    let [forgetPass, setForgetPass] = useState("");
    let [confirmPass, setConfirmPass] = useState("");
    let [loading, setLoading] = useState(false);
    let [pShow, setPShow] = useState(false);
    let [alert, setAlert] = useState({ show: false, message: '', type: '' }); 
    let nav = useNavigate();

    const showAlert = (message, type) => {
        setAlert({ show: true, message, type });
        setTimeout(() => {
            setAlert({ show: false, message: '', type: '' });
        }, 2000); 
    };
    let onLogin = (e) => {
        e.preventDefault();
        // setAuth({});
        // sessionStorage.removeItem("authObj")
        setLoading(true); 
        let { email, password } = loginInfo;
        let obj = { email, password };

        axios.post()
    };
    let onSetPass = (e) => {
        e.preventDefault();
        setLoading(true);
        if (forgetPass === confirmPass) {
            axios.patch(`http://localhost:2000/users/resetPassword/${params}`, {
                updatedPassword: forgetPass
            })
                .then((res) => {
                    setLoading(false);
                    showAlert("Password Successfully updated", 'success');
                })
                .catch((err) => {
                    setLoading(false);
                    showAlert(err.response.data.message, 'error');
                });
        } else {
            setLoading(false);
            showAlert("Passwords do not match", 'error');
        }
    };
    let onSendEmail = (e) => {
        e.preventDefault();
        setLoading(true);
        let email = forgetEmail;
        axios.post("http://localhost:2000/users/forgetPassword", { email })
            .then((res) => {
                setLoading(false);
                if (res.data.status === "success") {
                    showAlert(res.data.message, 'success');
                }
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.data.status === "fail") {
                    showAlert("This email is not registered. Please enter your registered Email", 'error');
                }
            });
    };
    let handleChange = (e, key) => {
        let val = e.target.value;
        setLogInfo(prev => {
            let obj = { ...prev };
            obj[key] = val;
            return obj;
        });
    };
    return (
        <div>
            <div className={isSignUp? styles.signupcontainer : styles.logincontainer}>
                <Typography variant='h4' style={{ fontSize: '1.5rem', textAlign: 'center', margin: '4px 0', color: '#00315e', marginBottom: '20px' }}>
                    {isLogin ? 'Log In': isSignUp ? 'Sign Up' : !setPass && 'Reset Password'}
                </Typography>
                {alert.show && (
                    <div className={`${styles.alert} ${styles[alert.type]}`}>
                        {alert.message}
                        <span className={styles.closebtn} onClick={() => setAlert({ show: false, message: '', type: '' })}>&times;</span>
                    </div>
                )}
                {isLogin && !setPass && (
                    <form className={styles.form} onSubmit={(e) => onLogin(e)}>
                        <div className={styles.inpBox}>
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id='email' name='email' placeholder='Type your e-mail address' value={loginInfo.email} onChange={(e) => handleChange(e, "email")} />
                        </div>
                        <div className={styles.inpBox}>
                            <label htmlFor="password">Password</label>
                            <div id={styles.passBox}>
                                <input type={pShow ? "text" : "password"} id='password' name='password' placeholder='Type your password' value={loginInfo.password} onChange={(e) => handleChange(e, "password")} />
                                
                            </div>
                        </div>
                        <a className={styles.anchor} href="/forget-pass"><Typography variant='body2' styles={{ color: "#08457e", marginRight: '1rem' }}>Forgot Password?</Typography></a>
                        <div className={styles.loaderContainer}>
                            {loading && <ThreeDots type="ThreeDots" color="#00315e" height={30} width={30} />}
                        </div>
                        <button className={styles.btn} disabled={loading}>Log In</button>
                    </form>
                )}
                {isSignUp && !setPass && (
                    <form className={styles.form} onSubmit={(e) => onLogin(e)}>
                        <div className={styles.inpBox}>
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id='email' name='email' placeholder='Type your e-mail address' value={loginInfo.email} onChange={(e) => handleChange(e, "email")} />
                        </div>
                        <div className={styles.inpBox}>
                            <label htmlFor="text">User Name</label>
                            <input type="text" id='user' name='user' placeholder='Type your user name' value={loginInfo.user} onChange={(e) => handleChange(e, "user")} />
                        </div>
                        <div className={styles.inpBox}>
                            <label htmlFor="password">Password</label>
                            <div id={styles.passBox}>
                                <input type={pShow ? "text" : "password"} id='password' name='password' placeholder='Type your password' value={loginInfo.password} onChange={(e) => handleChange(e, "password")} />
                                
                            </div>
                        </div> 
                        <a className={styles.anchor} href="/forget-pass"><Typography variant='body2' styles={{ color: "#08457e", marginRight: '1rem' }}> Log In</Typography></a>
                        <button style={{textAlign:"center"}} className={styles.btn} disabled={loading}>Sign Up</button>
                    </form>
                )}
                {!setPass && !isLogin && !isSignUp && (
                    <form className={styles.form} onSubmit={(e) => onSendEmail(e)}>
                        <div className={styles.inpBox} style={{ borderBottom: 'none', margin: "1rem 0", textAlign: 'center', backgroundColor: '#e4e4fd', padding: '1rem', borderRadius: '8px' }}>
                            <Typography variant='body1'>
                                Please enter your registered email address. You will receive a password reset link at that
                            </Typography>
                        </div>
                        <div className={styles.inpBox}>
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id='email' name='email' placeholder='Type your e-mail address' value={forgetEmail} onChange={(e) => setForgetEmail(e.target.value)} />
                        </div>
                        <a className={styles.anchor} href="/"><Typography variant='body2' styles={{ color: "#08457e", marginRight: '1rem' }}>Back to Log In</Typography></a>
                        <div className={styles.loaderContainer}>
                            {loading && <ThreeDots type="ThreeDots" color="#00315e" height={30} width={30} />}
                        </div>
                        <button className={styles.btn} disabled={loading}>Send Email</button>
                    </form>
                )}
                {setPass && (
                    <form className={styles.form} onSubmit={(e) => onSetPass(e)}>
                        <div className={styles.inpBox} style={{ borderBottom: 'none', margin: "1rem 0", textAlign: 'center', backgroundColor: '#e4e4fd', padding: '1rem', borderRadius: '8px' }}>
                            <Typography variant='body1'>
                                Enter New Password Here
                            </Typography>
                        </div>
                        <div className={styles.inpBox}>
                            <label htmlFor="pass">Password</label>
                            <div id={styles.passBox}>
                                <input type={pShow ? "text" : "password"} id='password' name='password' placeholder='Type your password' value={forgetPass} onChange={(e) => setForgetPass(e.target.value)} />
                                <FontAwesomeIcon icon={pShow ? faEyeSlash : faEye} onClick={() => setPShow(prev => !prev)} id={styles.toggle} />
                            </div>
                        </div>
                        <div className={styles.inpBox}>
                            <label htmlFor="re-pass">Confirm Password</label>
                            <div id={styles.passBox}>
                                <input type={pShow ? "text" : "password"} id='re-pass' name='re-pass' placeholder='Confirm password' value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
                                <FontAwesomeIcon icon={pShow ? faEyeSlash : faEye} onClick={() => setPShow(prev => !prev)} id={styles.toggle} />
                            </div>
                        </div>
                        <div className={styles.loaderContainer}>
                            {loading && <ThreeDots type="ThreeDots" color="#00315e" height={30} width={30} />}
                        </div>
                        <button className={styles.btn} disabled={loading}>Submit</button>
                    </form>
                )}
            </div>
        </div>
    );
}
export default Card;
