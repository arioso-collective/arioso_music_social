// src/hooks/useIsCurrentUser.js
import { useSelfProfile } from "../context/SelfProfileContext";

/**
 * Checks whether the given username matches the currently logged-in user.
 * Returns `true` if it's the self profile, `false` if not, and `null` if still loading.
 */
const useIsCurrentUser = (username) => {
  const { profile: selfProfile, loading } = useSelfProfile();

  if (loading || !selfProfile) return false;
  
  if (!username) return true;

  return selfProfile.username === username;
};

export default useIsCurrentUser;
