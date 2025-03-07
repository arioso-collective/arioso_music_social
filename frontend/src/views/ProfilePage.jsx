import React from "react";
import ProfileHeader from "../components/ProfilePage/ProfileHeader";
import ProfileStats from "../components/ProfilePage/ProfileStats";
import MusicPostFeed from "../components/ProfilePage/MusicPostFeed";
import styles from "./ProfilePage.module.css";
import FollowButton from "../components/ProfilePage/FollowButton";
const ProfilePage = () => {
  return (
    <div className={styles.profileContainer}>
      <ProfileHeader />
      <div>
    <FollowButton />
      <ProfileStats />
      </div>
      
      <MusicPostFeed />
    </div>
  );
};

export default ProfilePage;
