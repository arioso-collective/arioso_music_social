import React from "react";
import styles from "./ProfileStats.module.css";

const ProfileStats = () => {
  return (
    <div className={styles.statsContainer}>
      <p><strong>Followers:</strong> 100</p>
      <p><strong>Following:</strong> 50</p>
      <p><strong>Posts:</strong> 25</p>
    </div>
  );
};

export default ProfileStats;
