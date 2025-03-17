import React from 'react';
import styles from './FavoritesSidebar.module.css';

const FavoritesSidebar = () => {
  // Hardcoded data for now
  const favoriteGenres = [
    'Alternative Rock',
    'Indie Pop',
    'Jazz Fusion',
    'Electronic',
    'Classical'
  ];

  const favoriteArtists = [
    'The National',
    'Radiohead',
    'Bon Iver',
    'Arcade Fire',
    'Florence + The Machine'
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Favorite Genres</h3>
        <div className={styles.itemsContainer}>
          {favoriteGenres.map((genre, index) => (
            <div key={index} className={styles.item}>
              {genre}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Favorite Artists</h3>
        <div className={styles.itemsContainer}>
          {favoriteArtists.map((artist, index) => (
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