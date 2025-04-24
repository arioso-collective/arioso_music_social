import { useState, useEffect } from 'react';

const useProfileLoader = (username = null) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Missing authentication token');
        setLoading(false);
        return;
      }

      const profileEndpoint = username
  ? `http://localhost:5001/api/get_user/${encodeURIComponent(username)}`
  : `http://localhost:5001/api/profile/self`;

try {
  const profileRes = await fetch(profileEndpoint, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const profileData = await profileRes.json();

  if (!profileRes.ok) {
    setError(profileData?.error || "Failed to fetch profile");
    setProfile(null);
    setLoading(false);
    return;
  }

  // Now use the profile's username to get their posts
  const postsRes = await fetch(
    `http://localhost:5001/api/profile/${encodeURIComponent(profileData.username)}/posts`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  const postsData = await postsRes.json();

  if (!postsRes.ok) {
    setError(postsData?.error || "Failed to fetch posts");
    setProfile(null);
  } else {
    setProfile({ ...profileData, posts: postsData });
  }
} catch (err) {
  console.error(err);
  setError("Network error");
} finally {
  setLoading(false);
}

};

    fetchProfile();
  }, [username]);

  return { profile, loading, error };
};

export default useProfileLoader;
