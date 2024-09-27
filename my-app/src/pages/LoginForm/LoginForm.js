import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const navigate = useNavigate(); // Initialize the navigate hook

  // Function to navigate to the Signup form
  const goToSignup = () => {
    navigate('/signup'); // Navigate to the /signup route
  };

  return (
    <main className={styles.loginContainer}>
      <div className={styles.formWrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>Get started.</h1>
          <p className={styles.signUpLink}>
            <span style={{fontFamily: 'DM Sans, sans-serif', fontWeight: 400, lineHeight: '23px', color: '#7c7c8d'}}>
              Don't have an account?
            </span>{' '}
            <button 
              onClick={goToSignup}  // Add onClick to navigate to Signup form
              className={styles.signUpButton} 
            >
              Sign up
            </button>
          </p>
        </header>
        <section className={styles.formContent}>
          <form className={styles.formFields}>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <label htmlFor="email" className={styles.inputLabel}>Email</label>
                <input
                  id="email"
                  type="email"
                  className={styles.inputField}
                  placeholder="uistore@gmail.com"
                  aria-label="Email"
                />
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="password" className={styles.inputLabel}>Password</label>
                <input
                  id="password"
                  type="password"
                  className={styles.inputField}
                  placeholder="**********"
                  aria-label="Password"
                />
              </div>
            </div>
            <a href="#" className={styles.forgotPassword}>Forgot your password?</a>
            <button type="submit" className={styles.signInButton}>
              <span className={styles.signInText}>Sign in</span>
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default LoginForm;
