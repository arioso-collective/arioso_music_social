import React from "react";
import ProfileHeader from "../components/ProfilePage/ProfileHeader";
import ProfileStats from "../components/ProfilePage/ProfileStats";
import MusicPostFeed from "../components/ProfilePage/MusicPostFeed";
import FavoritesSidebar from "../components/ProfilePage/FavoritesSidebar";
import styles from "./ProfilePage.module.css";
import FollowButton from "../components/ProfilePage/FollowButton";

const ProfilePage = () => {
  return (
    <div className={styles.profileContainer}>
      <ProfileHeader />
      <div className={styles.contentLayout}>
        <div className={styles.mainSection}>
          <FollowButton />
          <ProfileStats />
          <MusicPostFeed />
        </div>
        <FavoritesSidebar />
      </div>
    </div>
  );
};

export default ProfilePage;
