import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for routing
import styles from './SideBar.module.css';

const NavItem = ({ icon, text, link }) => {
  return (
    <Link to={link} className={styles.navItem}>
      <div className={styles.navItemContent}>
        <img loading="lazy" src={icon} alt={text} className={styles.navIcon} />
        <div className={styles.navText}>{text}</div>
      </div>
    </Link>
  );
};

export default NavItem;

