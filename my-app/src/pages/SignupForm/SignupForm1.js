import React, { useRef, useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
// import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[1@#$%]).{8,24}$/;
const SIGNUP_URL = 'http://127.0.0.1:5000/api/v1/users';


const SignupForm1 = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    // Focus on the username input field
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // Check if the username is valid
    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])
    
    // Check if the password is valid
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd; // Return a boolean for a password match
        setValidMatch(match);
    }, [pwd, matchPwd])

    // Check if the passwords match
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // If button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        
        if (!v1 || !v2) {
            setErrMsg('Invalid entry');
            return;
        }
        try {
            const response = await axios.post(SIGNUP_URL,
                JSON.stringify({ username: user, user_password: pwd }),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            }
            );
            console.log(response.data);
            setSuccess(true);
            navigate('/dashboard');
            // Clear the input fields from the registration field
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response.');
            } else if (err.response?.status === 409) {
                setErrMsg('Username already exists.');
            } else {
                setErrMsg('Registration failed.');
            }
            errRef.current.focus();
        }
    };

    return (
        <>
        {success ? (
            <section>
                <h1>Success!</h1>
                <p>
                    {/*PUT ROUTER LINK IN HERE*/}
                    <a href="#">Sign in</a>
                </p>
            </section>
        ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username:
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    Username must be 4-24 characters long and start with a letter.
                </p>

                <label htmlFor="password">
                    Password:
                    <span className={validPwd ? "valid" : "hide"}>
                    </span>
                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                    </span>
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />


                <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
                    Password must be 8-24 characters long and contain at least one letter, one number, and one special character.
                </p>

                <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                    </span>
                    <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                    </span>
                </label>
                <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="matchnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>Passwords must match.</p>

                <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
            </form>
            <p>
                Already have an account?<br />
                <span className="line">
                    {/*PUT ROUTER LINK IN HERE*/}
                    <a href="/login">Sign in</a>
                </span>
            </p>
        </section>
        )}
        </>
    )
}

export default SignupForm1;