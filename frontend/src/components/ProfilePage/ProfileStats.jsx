import React from "react";
import styles from "./ProfileStats.module.css";

const ProfileStats = () => {
  return (
    <div className={styles.statsContainer}>
      <p><strong>Followers:</strong> 100 &nbsp; </p>
      <p><strong>Following:</strong> 50 &nbsp; </p>
      <p><strong>Posts:</strong> 25 &nbsp;</p>
    </div>
  );
};

export default ProfileStats;
