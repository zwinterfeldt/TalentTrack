import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './SignupForm.module.css';
import InputField from './InputField';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}}$/;
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[1@#$%]).{8,24}$/;

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <main className={styles.signUpContainer}>
      <div className={styles.formContent}>
        <header className={styles.formHeader}>
          <h1 className={styles.title}>Get started.</h1>
          <p className={styles.signInLink}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 400, lineHeight: '23px', color: '#7c7c8d' }}>
              Already have an account?
            </span>{' '}
            <Link to="/login" style={{ fontFamily: 'DM Sans, sans-serif', lineHeight: '23px', color: '#a162f7' }}>
              Sign in
            </Link>
          </p>
        </header>
        <div className={styles.formWrapper}>
          <form className={styles.formMain} onSubmit={handleSubmit}>
            <section className={styles.userDetailsSection}>
              <InputField label="First Name" name="firstName" placeholder="Delowar" />
              <InputField label="Last Name" name="lastName" placeholder="Hossen" />
              <InputField label="Email" name="email" type="email" placeholder="uistore@gmail.com" />
              <InputField 
                label="Password" 
                name="password" 
                type={showPassword ? "text" : "password"} 
                placeholder="********" 
              />
              <div className={styles.togglePassword}>
                <input 
                  type="checkbox" 
                  checked={showPassword} 
                  onChange={togglePasswordVisibility} 
                /> Show Password
              </div>
            </section>
            <a href="/forgot-password" className={styles.forgotPasswordLink}>Forgot your password?</a>
            <div className={styles.signInButton}>
              <button type="submit" className={styles.signInButtonText}>Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignupForm;

