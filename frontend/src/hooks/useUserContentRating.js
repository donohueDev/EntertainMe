import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';
import { useUser } from '../context/userContext';
import useFetchUserContentData, { invalidateUserDataCache } from './useFetchUserContentData';

/**
 * Custom hook for managing user content ratings and cache
 * @param {Object} params
 * @param {string} params.contentType - The type of content ('games', 'anime', etc.)
 * @param {string|number} params.contentId - The ID of the content
 * @returns {Object} Rating management methods and state
 */
const useUserContentRating = ({ contentType, contentId }) => {
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, getUserInfo } = useUser();

  // Fetch user-specific content data
  const {
    userContentData,
    setUserContentData,
    loading: contentLoading,
    error: contentError
  } = useFetchUserContentData({
    isAuthenticated,
    getUserInfo,
    contentId,
    contentType
  });

  // Update local state when user data changes
  const updateUserContentState = useCallback(() => {
    if (userContentData) {
      setRating(userContentData.user_rating || 0);
      setStatus(userContentData.user_status || '');
    }
  }, [userContentData]);

  // Handle rating submission
  const submitRating = useCallback(async () => {
    if (!isAuthenticated) {
      navigate('/account');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const userInfo = await getUserInfo();
      if (!userInfo?.userId) {
        throw new Error('User information not found');
      }

      // Determine correct route and payload fields based on contentType
      let route = '';
      let idField = 'gameId';
      if (contentType === 'game' || contentType === 'games') {
        route = `${API_BASE_URL}/api/userGames/ratings`;
        idField = 'gameId';
      } else if (contentType === 'anime') {
        route = `${API_BASE_URL}/api/userAnimes/ratings`;
        idField = 'animeId';
      } else if (contentType === 'movie' || contentType === 'movies') {
        route = `${API_BASE_URL}/api/userMovies/ratings`;
        idField = 'movieId';
      } else {
        throw new Error('Unsupported content type');
      }

      const payload = {
        username: userInfo.username,
        [idField]: contentId,
        rating,
        status,
      };

      const response = await axios.post(route, payload);
      if (response.status !== 200) {
        throw new Error('Failed to submit rating. Please try again.');
      }

      // Update local state
      const newData = {
        ...userContentData,
        user_rating: rating,
        user_status: status,
      };
      setUserContentData(newData);

      // Invalidate cache
      invalidateUserDataCache(userInfo.userId, contentType, contentId);
      
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit rating. Please try again.');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }, [contentType, contentId, rating, status, isAuthenticated, getUserInfo, navigate, userContentData, setUserContentData]);

  return {
    // State
    rating,
    setRating,
    status,
    setStatus,
    userContentData,
    
    // Loading states
    loading: contentLoading || loading,
    
    // Errors
    error: contentError || error,
    setError,
    
    // Success state
    success,
    setSuccess,
    
    // Methods
    submitRating,
    updateUserContentState
  };
};

export default useUserContentRating;
