import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileHeader from "../components/ProfilePage/ProfileHeader";
import ProfileStats from "../components/ProfilePage/ProfileStats";
import MusicPostFeed from "../components/ProfilePage/MusicPostFeed";
import FavoritesSidebar from "../components/ProfilePage/FavoritesSidebar";
import styles from "./ProfilePage.module.css";
import FollowButton from "../components/ProfilePage/FollowButton";

import useProfileLoader from "../context/useProfileLoader";
import useIsCurrentUser from "../context/useIsCurrentUser";
import { useSelfProfile } from "../context/SelfProfileContext";

const ProfilePage = () => {
  const { username } = useParams();
  const { profile, loading, error } = useProfileLoader(username);
  const navigate = useNavigate();
  const isCurrentUser = useIsCurrentUser(username);
  

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error loading profile: {error}</div>;
  if (!profile) return <div>Profile not found</div>;
  // TODO: Replace with actual auth check
  

  return (
    <div className={styles.profileContainer}>
      <ProfileHeader profile={profile} />
      <div className={styles.contentLayout}>
        <div className={styles.mainSection}>
          <div className={styles.buttonContainer}>
            {isCurrentUser ? (
              <>
              <button 
                className={styles.editButton}
                onClick={() => navigate('/profile/edit')}
              >
                Edit Profile
              </button>
              <button 
                className={styles.editButton}
                onClick={() => navigate('/settings')}
              >
                Settings
              </button>
            </>
            ) : (
              <FollowButton />
            )}
          </div>
          <ProfileStats profile={profile} />
          <MusicPostFeed profile={profile} />
        </div>
        <FavoritesSidebar profile={profile} />
      </div>
    </div>
  );
};

export default ProfilePage;
