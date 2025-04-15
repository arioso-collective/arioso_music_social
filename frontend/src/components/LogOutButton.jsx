import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LogOutButton.module.css';

const LogOutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <button 
      className={styles.logoutButton} 
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
};

export default LogOutButton;