import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LogOutButton.module.css';

const LogOutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Check for existing token
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found in localStorage");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/logout", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        console.log("Logout Successful")
        localStorage.removeItem("token");
        navigate("/login");

      } else {
        const data = await response.json();
        console.error('Logout failed:', data.error || "Unknown error");
        navigate("/login");
      }
    } catch (err) {
      console.error('Error logging out:', err);
      navigate("/login")
    }
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