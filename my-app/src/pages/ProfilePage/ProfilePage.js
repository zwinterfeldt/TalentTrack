import * as React from "react";
import styles from './ProfilePage.module.css';
import SideBar from '../../components/SideBar'; 

function ProfilePage() {
  return (
    <div className={styles.pageContainer}>
      <SideBar />
      <main className={styles.profileContainer}>
        <header className={styles.profileHeader}>
          <div className={styles.avatarWrapper}>
            <button 
              className={styles.avatarButton}
              aria-label="Add profile photo"
              tabIndex="0"
            >
              Add Photo
            </button>
            <h1 className={styles.profileName}>
              Peter Griffin
            </h1>
          </div>
        </header>
        <form className={styles.formContainer}>
          <label htmlFor="name" className={styles['visually-hidden']}>Name</label>
          <input
            type="text"
            id="name"
            className={styles.inputField}
            placeholder="Name"
            aria-label="Name"
          />
          <label htmlFor="email" className={styles['visually-hidden']}>Email</label>
          <input
            type="email"
            id="email"
            className={styles.inputField}
            placeholder="Email"
            aria-label="Email"
          />
        </form>
      </main>
    </div>
  );
}

export default ProfilePage;
