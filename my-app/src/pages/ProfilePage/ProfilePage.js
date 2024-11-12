import React, { useState } from "react";
import styles from './ProfilePage.module.css';
import SideBar from '../../components/SideBar';

const ProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileInfo, setProfileInfo] = useState({
    name: "Peter Griffin",
    email: "peter.griffin@example.com",
    sport: "Soccer",
    username: "peterG123",
  });

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfileInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  return (
    <div className={styles.pageContainer}>
      <SideBar />
      <main className={styles.profileContainer}>
        <header className={styles.profileHeader}>
          <div className={styles.avatarWrapper}>
            <label htmlFor="avatarInput" className={styles.avatarLabel}>
              <img
                src={profilePicture || "https://via.placeholder.com/100"}
                alt="Profile Avatar"
                className={styles.avatarImage}
              />
              <input
                type="file"
                id="avatarInput"
                accept="image/*"
                className={styles.visuallyHidden}
                onChange={handleProfilePictureChange}
              />
            </label>
          </div>
        </header>
        <form className={styles.formContainer}>
          <div>
            <label htmlFor="name" className={styles.inputLabel}>Name</label>
            <input
              type="text"
              id="name"
              className={styles.inputField}
              value={profileInfo.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email" className={styles.inputLabel}>Email</label>
            <input
              type="email"
              id="email"
              className={styles.inputField}
              value={profileInfo.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="sport" className={styles.inputLabel}>Sport</label>
            <input
              type="text"
              id="sport"
              className={styles.inputField}
              value={profileInfo.sport}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="username" className={styles.inputLabel}>Username</label>
            <input
              type="text"
              id="username"
              className={styles.inputField}
              value={profileInfo.username}
              onChange={handleInputChange}
            />
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProfilePage;
