import React from 'react';
import styles from './HomePage.module.css';
import MusicFooter from '../components/FooterBar/MusicFooter';

const HomePage = () => {
  return (
    <div className={styles.homeContainer}>
      <h1>Welcome to Arioso</h1>
      <p>Your music community awaits</p>
      <MusicFooter />
    </div>
  );
};

export default HomePage; 