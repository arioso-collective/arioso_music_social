import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../components/ProfilePage/ProfileHeader";
import ProfileStats from "../components/ProfilePage/ProfileStats";
import MusicPostFeed from "../components/ProfilePage/MusicPostFeed";
import FavoritesSidebar from "../components/ProfilePage/FavoritesSidebar";
import styles from "./ProfilePage.module.css";
import FollowButton from "../components/ProfilePage/FollowButton";

const ProfilePage = () => {
  const navigate = useNavigate();
  // TODO: Replace with actual auth check
  const isCurrentUser = true;

  return (
    <div className={styles.profileContainer}>
      <ProfileHeader />
      <div className={styles.contentLayout}>
        <div className={styles.mainSection}>
          <div className={styles.buttonContainer}>
            {isCurrentUser ? (
              <button 
                className={styles.editButton}
                onClick={() => navigate('/profile/edit')}
              >
                Edit Profile
              </button>
            ) : (
              <FollowButton />
            )}
          </div>
          <ProfileStats />
          <MusicPostFeed />
        </div>
        <FavoritesSidebar />
      </div>
    </div>
  );
};

export default ProfilePage;
