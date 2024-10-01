import React from 'react';
import styles from './SignupForm.module.css';

const InputField = ({ label, name, type = 'text', defaultValue }) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={name} className={styles.inputLabel}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        className={styles.inputField}
        aria-label={label}
      />
    </div>
  );
};

export default InputField;