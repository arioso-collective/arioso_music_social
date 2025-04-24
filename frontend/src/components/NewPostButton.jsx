import React from 'react';
import styles from './NewPostButton.module.css';
import { FaPen } from "react-icons/fa"; // FontAwesome pen icon

const NewPostButton = ({ onClick }) => {
  return (
    <button className={styles.floatingButton} onClick={onClick}>
      <FaPen size={24} />
    </button>
  );
};

export default NewPostButton;
