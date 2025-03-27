import React, { createContext, useState, useContext, useEffect } from 'react';
import soulSyrup from '../assets/Ketsa - Soul Syrup.mp3';
import happyHearts from '../assets/Dirk Dehler - Happy Hearts.mp3';
import stickToIt from '../assets/Noisy Oyster - Stick To It.mp3.mp3';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    username: '@johndoe',
    bio: '🎵 Music lover & playlist curator',
    followers: 100,
    following: 50,
    postCount: 25,
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
      { id: 1, text: "Loving this song!", song: "Soul Syrup", path: soulSyrup },
      { id: 2, text: "Throwback to this classic!", song: "Happy Hearts", path: happyHearts },
      { id: 3, text: "This is my favorite song!", song: "Stick To It", path: stickToIt }
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