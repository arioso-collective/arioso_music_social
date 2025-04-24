import React from 'react';
import styles from './FavoritesSidebar.module.css';

const FavoritesSidebar = ({profile}) => {
  if (!profile) return <div>Loading profile...</div>;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Favorite Genres</h3>
        <div className={styles.itemsContainer}>
        {Array.isArray(profile.favoriteGenres) && profile.favoriteGenres.length > 0 ? (
  profile.favoriteGenres.map((genre, index) => (
    <div key={index} className={styles.item}>
      {genre || "Unknown Genre"}
    </div>
  ))
) : (
  <div className={styles.item}>No favorite genres yet</div>
)}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Favorite Artists</h3>
        <div className={styles.itemsContainer}>
        {Array.isArray(profile.favoriteArtists) && profile.favoriteArtists.length > 0 ? (
  profile.favoriteArtists.map((artist, index) => (
    <div key={index} className={styles.item}>
      {artist || "Unknown Artist"}
    </div>
  ))
) : (
  <div className={styles.item}>No favorite artists yet</div>
)}
        </div>
      </div>
    </aside>
  );
};

export default FavoritesSidebar; 