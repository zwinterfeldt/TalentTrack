import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './TalentTrack.module.css';

function TalentTrack() {
  localStorage.clear();
  
  const navigate = useNavigate();  // Initialize navigate

  // Navigation functions
  const goToLogin = () => {
    navigate('/login');  // Navigate to login route
  };

  const goToSignup = () => {
    console.log('Navigating to signup...');
    navigate('/signup'); //NAvigate to signup
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo}>Talent Track</h1>
        <button className={styles.signInButton} onClick={goToLogin}>Sign In</button>
      </header>
      <main className={styles.mainContent}>
        <h2 className={styles.title}>Track your Talent</h2>
        <p className={styles.subtitle}>
          Simplifying sports recruitment through automated data extraction and analysis.
        </p>
        <button className={styles.ctaButton} onClick={goToSignup}>Start free trial</button>
      </main>
    </div>
  );
}

export default TalentTrack;

