import React, { useState } from 'react';
import styles from './FollowButton.module.css';

const FollowButton = ({ initialIsFollowing = false, onFollowChange }) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const handleClick = () => {
    setIsFollowing(!isFollowing);
    if (onFollowChange) {
      onFollowChange(!isFollowing);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.followButton} ${isFollowing ? styles.following : styles.notFollowing}`}
      style={{ backgroundColor: isFollowing ? 'purple' : 'gray', color: 'white' }}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  );
};

export default FollowButton;
