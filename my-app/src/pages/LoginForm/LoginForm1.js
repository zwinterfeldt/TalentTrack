import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/authProvider';
import axios from '../../api/axios';
import styles from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';

const LOGIN_URL = '/api/v1/login';

const LoginForm1 = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({username: user, user_password: pwd}), 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
                console.log(JSON.stringify(response?.data));
                const accessToken = response?.data?.accessToken;
                const roles = response?.data?.roles;
                setAuth({ user, pwd, roles, accessToken });
                setUser('');
                setPwd('');
                setSuccess(true);
                navigate('/dashboard');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Network error. Please try again later.');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing username or password. Please try again.');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized.');
            } else {
                setErrMsg('Login failed.');
            }
            console.log(err);
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to home</a>
                    </p>
                </section>
            ) : (
                <section className={styles.loginContainer}>
                    <p ref={errRef} className={errMsg ? styles.errmsg : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 className={styles.title}>Sign In</h1>
                    <form onSubmit={handleSubmit} className={styles.formWrapper}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="username" className={styles.inputLabel}>Username:</label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                className={styles.inputField}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password" className={styles.inputLabel}>Password:</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                className={styles.inputField}
                            />
                        </div>

                        <button className={styles.signInButton}>
                            <span className={styles.signInText}>Sign In</span>
                        </button>
                    </form>
                    <p>Need an account?<br />
                        <span className={styles.signUpButton}>
                            <a href="#">Sign up</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default LoginForm1;