import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">Arioso</Link>
      </div>
      <div className={styles.navLinks}>
        <Link to="/home" className={styles.navLink}>Home</Link>
        <Link to="/profile" className={styles.navLink}>Profile</Link>
        <Link to="/search" className={styles.navLink}>Search Music</Link>
        <Link to="/suggestions" className={styles.navLink}>Discover </Link>
      </div>
    </nav>
  );
};

export default Navbar; 