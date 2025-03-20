import React from "react";
import styles from "./ProfileStats.module.css";
import { useProfile } from "../../context/ProfileContext";

const ProfileStats = () => {
  const { profile } = useProfile();

  return (
    <div className={styles.statsContainer}>
      <p><strong>Followers:</strong> {profile.followers} &nbsp; </p>
      <p><strong>Following:</strong> {profile.following} &nbsp; </p>
      <p><strong>Posts:</strong> {profile.posts.length} &nbsp;</p>
    </div>
  );
};

export default ProfileStats;
