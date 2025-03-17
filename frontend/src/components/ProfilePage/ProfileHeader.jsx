import React from "react";
import styles from "./ProfileHeader.module.css";

// TODO: Add profile picture and name from the database
// Any other information will need to be fetched from the database
// Name, Followers, Following, Posts, Bio, (Location?), (Playlists?: Sprint 3?)
// Profile picture should be a circular image

const ProfileHeader = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.coverPhoto}></div>
      <div className={styles.profileContent}>
        <img
          src="https://imgs.search.brave.com/KrNPTCyi0vNvCab7O1iSBIMPds2QseiTblY6YAFds3w/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9yZW5k/ZXIuZmluZWFydGFt/ZXJpY2EuY29tL2lt/YWdlcy9pbWFnZXMt/cHJvZmlsZS1mbG93/LzQwMC9pbWFnZXMv/YXJ0d29ya2ltYWdl/cy9tZWRpdW1sYXJn/ZS8yLzEtcm9jay1h/bmQtcm9sbC1tdXNp/Y2lhbi1lbHZpcy1w/cmVzbGV5LW1pY2hh/ZWwtb2Nocy1hcmNo/aXZlcy5qcGc"
          alt="Profile"
          className={styles.profilePic}
        />
        <div className={styles.profileText}>
          <h2>John Doe</h2>
          <p>@johndoe</p>
          <p>🎵 Music lover & playlist curator</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
