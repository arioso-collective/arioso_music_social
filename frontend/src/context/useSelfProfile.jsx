// src/hooks/useIsCurrentUser.js
import { useSelfProfile } from '../context/SelfProfileContext';

const useIsCurrentUser = (username) => {
  const { profile: selfProfile } = useSelfProfile();
  return selfProfile && selfProfile.username === username;
};

export default useIsCurrentUser;
