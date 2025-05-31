import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

/**
 * useFetchUserContentData - Custom hook for fetching user-specific content data (rating, status, etc.)
 * @param {Object} params
 * @param {boolean} params.isAuthenticated - Whether the user is authenticated
 * @param {function} params.getUserInfo - Function to get user info (should return a user object with userId)
 * @param {string|number} params.contentId - The ID of the content (gameId, animeId, etc.)
 * @param {string} params.contentType - The type of content ('games', 'anime', 'movies', etc.)
 * @returns {object} { userContentData, loading, error, refetch }
 */
const useFetchUserContentData = ({ isAuthenticated, getUserInfo, contentId, contentType }) => {
  const [userContentData, setUserContentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUserContentData = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError('');
    try {
      const userInfo = await getUserInfo();
      if (!userInfo?.userId) throw new Error('User information not found');
      let url;
      if (contentId) {
        // Fetch a specific content item for the user
        const routeMap = {
          games: `/api/userGames/${userInfo.userId}/games/${contentId}`,
          anime: `/api/userAnime/${userInfo.userId}/anime/${contentId}`,
          movies: `/api/userMovies/${userInfo.userId}/movies/${contentId}`,
        };
        url = routeMap[contentType];
        if (!url) throw new Error('Unsupported content type');
      } else {
        // Fetch all content of this type for the user
        const routeMap = {
          games: `/api/userGames/${userInfo.userId}/games`,
          anime: `/api/userAnime/${userInfo.userId}/anime`,
          movies: `/api/userMovies/${userInfo.userId}/movies`,
        };
        url = routeMap[contentType];
        if (!url) throw new Error('Unsupported content type');
      }
      const response = await axios.get(url);
      setUserContentData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch user content data.');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, getUserInfo, contentId, contentType]);

  useEffect(() => {
    fetchUserContentData();
  }, [fetchUserContentData]);

  return { userContentData, loading, error, refetch: fetchUserContentData, setUserContentData };
};

export default useFetchUserContentData;
