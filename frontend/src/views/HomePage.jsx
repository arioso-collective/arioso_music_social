import React from 'react';
import styles from './HomePage.module.css';
import MusicFooter from '../components/FooterBar/MusicFooter';
import MusicPostFeed from '../components/ProfilePage/MusicPostFeed';

const HomePage = () => {
  return (
    <div className={styles.homeContainer}>
      <h1>Welcome to Arioso</h1>
      <p>Your music community awaits</p>
      <MusicPostFeed />
      <MusicFooter />
    </div>
  );
};

export default HomePage; 