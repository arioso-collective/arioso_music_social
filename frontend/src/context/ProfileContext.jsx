import React, { createContext, useState, useContext, useEffect } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    username: '@johndoe',
    bio: '🎵 Music lover & playlist curator',
    followers: 100,
    following: 50,
    posts: 25,
    favoriteGenres: [
      'Alternative Rock',
      'Indie Pop',
      'Jazz Fusion',
      'Electronic',
      'Classical'
    ],
    favoriteArtists: [
      'The National',
      'Radiohead',
      'Bon Iver',
      'Arcade Fire',
      'Florence + The Machine'
    ],
    posts: [
      { id: 1, text: "Loving this song!", song: "Song 1" },
      { id: 2, text: "Throwback to this classic!", song: "Song 2" },
      { id: 3, text: "This is my favorite song!", song: "Song 3" }
    ]
  });

  // Simulate fetching profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      // TODO: Replace with actual API call
      console.log('Fetching profile data...');
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    fetchProfileData();
  }, []);

  const updateProfile = (newData) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      ...newData
    }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}; 