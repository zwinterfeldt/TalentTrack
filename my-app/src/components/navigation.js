import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './navigation.module.css'; // Importing your CSS module

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">TalentTrack</Link>
      </div>
      <div className={styles.hamburger} onClick={toggleMenu}>
        ☰ {/* Simple hamburger icon for mobile */}
      </div>
      <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
        <li><Link to="/" className={styles.navLink}>Home</Link></li>
        <li><Link to="/dashboard" className={styles.navLink}>Dashboard</Link></li>
        <li><Link to="/settings" className={styles.navLink}>Settings</Link></li>
        <li><Link to="/profile" className={styles.navLink}>Profile</Link></li>
        <li><Link to="/login" className={styles.navLink}>Login</Link></li> {/* Conditionally show Logout if user is logged in */}
      </ul>
    </nav>
  );
};

export default Navigation;

