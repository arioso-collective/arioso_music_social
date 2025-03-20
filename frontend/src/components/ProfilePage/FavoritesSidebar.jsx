import React from 'react';
import styles from './FavoritesSidebar.module.css';
import { useProfile } from "../../context/ProfileContext";

const FavoritesSidebar = () => {
  const { profile } = useProfile();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Favorite Genres</h3>
        <div className={styles.itemsContainer}>
          {profile.favoriteGenres.map((genre, index) => (
            <div key={index} className={styles.item}>
              {genre}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Favorite Artists</h3>
        <div className={styles.itemsContainer}>
          {profile.favoriteArtists.map((artist, index) => (
            <div key={index} className={styles.item}>
              {artist}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FavoritesSidebar; 