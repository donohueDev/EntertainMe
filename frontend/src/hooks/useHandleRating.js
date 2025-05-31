import { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';

/**
 * useHandleRating - Custom hook for handling rating/status submission for any content type.
 * @param {Object} options
 * @param {string} options.contentType - e.g. 'game', 'anime', 'movie'
 * @param {string|number} options.contentId - The ID of the content (gameId, animeId, etc.)
 * @param {function} [options.getUserContentData] - Optional callback to refresh user content data after rating
 * @param {string} [options.usernameField='username'] - Field name for username in payload
 * @param {string} [options.idField='gameId'] - Field name for content ID in payload
 */
const useHandleRating = ({ contentType, contentId, getUserContentData, usernameField = 'username', idField = 'gameId' }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { isAuthenticated, getUserInfo } = useUser();
  const navigate = useNavigate();

  const handleRating = async ({ rating, status, setUserContentData }) => {
    if (!isAuthenticated) {
      navigate('/account');
      return;
    }

    setLoading(true);
    try {
      const userInfo = await getUserInfo();
      if (!userInfo?.userId) {
        throw new Error('User information not found');
      }

      const payload = {
        [usernameField]: userInfo.username,
        [idField]: contentId,
        rating,
        status,
      };

      // Determine correct route based on contentType
      let route = '';
      if (contentType === 'game' || contentType === 'games') {
        route = `${API_BASE_URL}/api/userGames/ratings`;
      } else if (contentType === 'anime') {
        route = `${API_BASE_URL}/api/userAnime/ratings`;
      } else if (contentType === 'movie' || contentType === 'movies') {
        route = `${API_BASE_URL}/api/userMovies/ratings`;
      } else {
        throw new Error('Unsupported content type');
      }

      const response = await axios.post(route, payload);
        if (response.status !== 200) {
            throw new Error('Failed to submit rating. Please try again.');
        }

      if (setUserContentData) {
        setUserContentData(prev => ({
          ...prev,
          user_rating: rating,
          user_status: status,
        }));
      }
      setSuccess(true);
      if (getUserContentData) getUserContentData();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit rating. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { handleRating, loading, error, setError, success, setSuccess };
};

export default useHandleRating;
