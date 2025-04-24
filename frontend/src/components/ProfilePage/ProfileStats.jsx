import React from "react";
import styles from "./ProfileStats.module.css";

const ProfileStats = ({profile}) => {
  if (!profile) return <div>Loading profile...</div>;

  const postCount = Array.isArray(profile.posts) ? profile.posts.length : 0;
  return (
    <div className={styles.statsContainer}>
      <p><strong>Followers:</strong> {profile.followerCount ?? 0} &nbsp; </p>
      <p><strong>Following:</strong> {profile.followingCount ?? 0} &nbsp; </p>
      <p><strong>Posts:</strong> {postCount} &nbsp;</p>
    </div>
  );
};

export default ProfileStats;
