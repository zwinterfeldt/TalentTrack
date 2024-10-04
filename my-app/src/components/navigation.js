import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navigation.module.css'; 

const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <h1 className={styles.logo}>Talent Track</h1>
      <ul className={styles.navList}>
        <li><Link to="/" className={styles.navItem}>Dashboard</Link></li>
        <li><Link to="/settings" className={styles.navItem}>Settings</Link></li>
        <li><Link to="/logout" className={styles.navItem}>Log out</Link></li>
      </ul>
    </div>
  );
};

export default Navigation;



