// src/context/SelfProfileContext.js
import React, { createContext, useContext } from 'react';
import useProfileLoader from '../context/useProfileLoader';

const SelfProfileContext = createContext();

export const SelfProfileProvider = ({ children }) => {
  const { profile, loading, error } = useProfileLoader(); // no username = self

  return (
    <SelfProfileContext.Provider value={{ profile, loading, error }}>
      {children}
    </SelfProfileContext.Provider>
  );
};

export const useSelfProfile = () => {
  const context = useContext(SelfProfileContext);
  if (!context) {
    throw new Error('useSelfProfile must be used within a SelfProfileProvider');
  }
  return context;
};
