import React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { CSVLink } from "react-csv";
import styles from './SideBar.module.css';

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

const SideBar = ({ players }) => {
  const location = useLocation();

  // CSV Headers
  const headers = [
    {label: "Player ID", key: "player_id"},
    { label: "First Name", key: "first_name" },
    { label: "Last Name", key: "last_name" },
    { label: "Address", key: "address" },
    { label: "Grad year", key: "grad_year" },
    { label: "GPA", key: "gpa" },
    { label: "Position", key: "player_position" },
    { label: "High School", key: "high_school" },
    { label: "High School Coach Name", key: "high_school_coach_name" },
    { label: "High School Coach Email", key: "high_school_coach_email" },
    { label: "Club Team", key: "clubTeam" },
    { label: "Club Team Coach Name", key: "club_team_coach_name" },
    { label: "Club Team Coach Email", key: "club_team_coach_email" },
    { label: "Parents Names", key: "parents_names" },
    { label: "Parents Contacts", key: "parents_contacts" },
    { label: "Stars", key: "stars" },
    { label: "Jersey Number", key: "jersey_number" },
    { label: "Last updated", key: "last_updated" }
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


