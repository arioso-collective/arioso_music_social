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

      const endpoint = username
        ? `http://localhost:5001/api/get_user/${encodeURIComponent(username)}`
        : `http://localhost:5001/api/profile/self`;

      try {
        const res = await fetch(endpoint, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.warn(`[ProfileLoader] Failed with ${res.status}`);
          setError(errorData?.error || 'Failed to fetch profile');
          setProfile(null);
        } else {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error(err);
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  return { profile, loading, error };
};

export default useProfileLoader;
