import React, { useRef, useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import styles from './SignupForm1.module.css';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[1@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SIGNUP_URL = '/api/v1/users';

const SignupForm1 = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, email, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validName || !validPwd || !validMatch || !validEmail) {
            setErrMsg('Invalid entry');
            return;
        }
        try {
            const response = await axios.post(
                SIGNUP_URL,
                JSON.stringify({ username: user, user_password: pwd, email: email }),
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            );
            setSuccess(true);
            const accessToken = response?.data?.accessToken;
            localStorage.setItem("jwtToken", accessToken);
            navigate('/dashboard');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response.');
            } else if (err.response?.status === 409) {
                setErrMsg('Username or Email already exists.');
            } else {
                setErrMsg('Registration failed.');
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            {success ? (
                <section className={styles.formContent}>
                    <h1>Success!</h1>
                    <p><a href="/login">Sign in</a></p>
                </section>
            ) : (
                <section className={styles.signUpContainer}>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <div className={styles.formContent}>
                        <h1 className={styles.title}>Sign Up</h1>
                        <form onSubmit={handleSubmit} className={styles.formWrapper}>
                            {/* Username Input */}
                            <div className={styles.inputGroup}>
                                <label htmlFor="username" className={styles.inputLabel}>Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                    className={styles.inputField}
                                    aria-invalid={validName ? "false" : "true"}
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                />
                                {userFocus && user && !validName && (
                                    <p className={styles.instructions}>
                                        Username must be 4-24 characters, start with a letter, and contain letters, numbers, underscores, or hyphens.
                                    </p>
                                )}
                            </div>
                            {/* Email Input */}
                            <div className={styles.inputGroup}>
                                <label htmlFor="email" className={styles.inputLabel}>Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    className={styles.inputField}
                                    aria-invalid={validEmail ? "false" : "true"}
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                />
                                {emailFocus && email && !validEmail && (
                                    <p className={styles.instructions}>
                                        Enter a valid email address.
                                    </p>
                                )}
                            </div>
                            {/* Password Input */}
                            <div className={styles.passwordInputGroup}>
                                <label htmlFor="password" className={styles.inputLabel}>Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    className={styles.inputField}
                                    aria-invalid={validPwd ? "false" : "true"}
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                                {pwdFocus && !validPwd && (
                                    <p className={styles.instructions}>
                                        Password must be 8-24 characters and include a mix of letters, numbers, and symbols.
                                    </p>
                                )}
                            </div>
                            {/* Confirm Password Input */}
                            <div className={styles.passwordInputGroup}>
                                <label htmlFor="confirm_pwd" className={styles.inputLabel}>Confirm Password:</label>
                                <input
                                    type="password"
                                    id="confirm_pwd"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    required
                                    className={styles.inputField}
                                    aria-invalid={validMatch ? "false" : "true"}
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                {matchFocus && !validMatch && (
                                    <p className={styles.instructions}>
                                        Must match the password entered above.
                                    </p>
                                )}
                            </div>
                                <button disabled={!validName || !validPwd || !validMatch} className={styles.signInButton}>
                            <span className={styles.signInButtonText}>Sign Up</span>
                        </button>
                        </form>
                        <p>Already have an account?<br />
                            <span className={styles.signInLink}><a href="/login">Sign in</a></span>
                        </p>
                    </div>
                </section>
            )}
        </>
    );
};

export default SignupForm1;
