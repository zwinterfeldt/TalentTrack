//loginform.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulate authentication (bypassing validation) temporary for midterm presentation demo
    localStorage.setItem('isAuthenticated', 'true');
    // Navigate to the dashboard after login
    navigate('/dashboard');
  };

  return (
    <main className={styles.loginContainer}>
      <div className={styles.formWrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>Log in</h1>
        </header>
        <section className={styles.formContent}>
          <form onSubmit={handleLogin} className={styles.formFields}>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <label htmlFor="email" className={styles.inputLabel}>Email</label>
                <input
                  id="email"
                  type="email"
                  className={styles.inputField}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="password" className={styles.inputLabel}>Password</label>
                <input
                  id="password"
                  type="password"
                  className={styles.inputField}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
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


