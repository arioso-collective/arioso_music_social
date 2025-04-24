import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import LogOutButton from '../LogOutButton';
import logo from '../../assets/Arioso_Logo-03.png';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Site Logo" className={styles.logoImage} />
      </div>
      <div className={styles.navLinks}>
        <Link to="/home" className={styles.navLink}>Home</Link>
        <Link to="/profile" className={styles.navLink}>Profile</Link>
        <Link to="/search" className={styles.navLink}>Search Music</Link>
        <Link to="/suggestions" className={styles.navLink}>Discover </Link>
        <LogOutButton />
      </div>
    </nav>
  );
};

export default Navbar; 