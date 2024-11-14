import React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { CSVLink } from "react-csv";
import styles from './SideBar.module.css';
import players from './players.json'; 

const navItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/325d912196d992f44106e0fb9ee07782792d24e6971ac4f867ee2bb44991eb85?placeholderIfAbsent=true&apiKey=b909987053dc4de7843d490048c18705",
    text: "Dashboard",
    link: "/dashboard"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/43cb507986427ee86d4b44deb49d220cef11e0d49d7b7df650bee3323385e3e6?placeholderIfAbsent=true&apiKey=b909987053dc4de7843d490048c18705",
    text: "Settings",
    link: "/profile"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0e9ec30859c0924e0a7a9488cb8181966d9330fc3fdf3b7d0fb18f76d6e889f8?placeholderIfAbsent=true&apiKey=b909987053dc4de7843d490048c18705",
    text: "Logout",
    link: "/"
  }
];

const SideBar = () => {
  const location = useLocation();

  // CSV Headers
  const headers = [
    { label: "Name", key: "name" },
    { label: "High School", key: "highSchool" },
    { label: "GPA", key: "gpa" },
    { label: "Club Team", key: "clubTeam" },
    { label: "Position", key: "position" }
  ];

  return (
    <nav className={styles.sideBar}>
      <div className={styles.contents}>
        <header className={styles.top}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <div className={styles.logoInner} />
            </div>
            <h1 className={styles.brandName}>Talent Track</h1>
          </div>
        </header>
        <div className={styles.navItems}>
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.link}
              className={styles.navItem}
              activeClassName={styles.activeNavItem}
            >
              <img src={item.icon} alt={`${item.text} icon`} className={styles.navIcon} />
              <span>{item.text}</span>
            </NavLink>
          ))}
        </div>

        {/* Conditional CSV Export Button */}
        {location.pathname === "/dashboard" && (
          <div className={styles.csvButtonContainer}>
            <CSVLink
              headers={headers}
              data={players}
              filename="players.csv"
              className={styles.csvButton}
              target="_blank"
            >
              Export to CSV
            </CSVLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default SideBar;


