import React from 'react';
import styles from './NewPostButton.module.css';

const NewPostButton = ({ onClick }) => {
  return (
    <button className={styles.floatingButton} onClick={onClick}>
      ➕
    </button>
  );
};

export default NewPostButton;
