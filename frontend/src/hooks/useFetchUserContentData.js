import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Cache configuration
const CACHE_TTL = 60 * 1000; // 1 minute in milliseconds
const userDataCache = new Map();

const getCacheKey = (userId, contentType, contentId) => 
  `user_${userId}_${contentType}${contentId ? `_${contentId}` : ''}`;

const getCachedData = (cacheKey) => {
  const cached = userDataCache.get(cacheKey);
  if (!cached) return null;

  const isExpired = Date.now() - cached.timestamp > CACHE_TTL;
  if (isExpired) {
    userDataCache.delete(cacheKey);
    return null;
  }

  return cached.data;
};

const setCachedData = (cacheKey, data) => {
  userDataCache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });
};

// Export cache invalidation function to be used when updates occur
export const invalidateUserDataCache = (userId, contentType, contentId) => {
  const cacheKey = getCacheKey(userId, contentType, contentId);
  userDataCache.delete(cacheKey);
  
  // If a specific content was updated, also invalidate the "all content" cache
  if (contentId) {
    const allContentCacheKey = getCacheKey(userId, contentType, null);
    userDataCache.delete(allContentCacheKey);
  }
};

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
    
    try {
      const userInfo = await getUserInfo();
      if (!userInfo?.userId) throw new Error('User information not found');

      // Check cache first
      const cacheKey = getCacheKey(userInfo.userId, contentType, contentId);
      const cachedData = getCachedData(cacheKey);
      
      if (cachedData) {
        setUserContentData(cachedData);
        return;
      }

      setLoading(true);
      setError('');

      let url;
      if (contentId) {
        // Fetch a specific content item for the user
        const routeMap = {
          games: `/api/userGames/${userInfo.userId}/games/${contentId}`,
          anime: `/api/userAnimes/${userInfo.userId}/anime/${contentId}`,
          movies: `/api/userMovies/${userInfo.userId}/movies/${contentId}`,
        };
        url = routeMap[contentType];
        if (!url) throw new Error('Unsupported content type');
      } else {
        // Fetch all content of this type for the user
        const routeMap = {
          games: `/api/userGames/${userInfo.userId}/games`,
          anime: `/api/userAnimes/${userInfo.userId}/anime`,
          movies: `/api/userMovies/${userInfo.userId}/movies`,
        };
        url = routeMap[contentType];
        if (!url) throw new Error('Unsupported content type');
      }

      const response = await axios.get(url);
      setCachedData(cacheKey, response.data);
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

  // Include invalidateCache in the return object
  const invalidateCache = useCallback(() => {
    const userInfo = getUserInfo();
    if (userInfo?.userId) {
      invalidateUserDataCache(userInfo.userId, contentType, contentId);
    }
  }, [getUserInfo, contentType, contentId]);

  return { 
    userContentData, 
    loading, 
    error, 
    refetch: fetchUserContentData, 
    setUserContentData,
    invalidateCache 
  };
};

export default useFetchUserContentData;
