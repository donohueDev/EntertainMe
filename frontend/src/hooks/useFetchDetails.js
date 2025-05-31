import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

/**
 * useFetchDetails - Custom hook for fetching details for any content type.
 * @param {string} url - The API endpoint to fetch details from.
 * @param {object} [options] - Optional config (e.g., initialData, skip, dependencies)
 * @returns {object} { data, loading, error, refetch }
 */
const useFetchDetails = (url, options = {}) => {
  const { initialData = null, skip = false, dependencies = [] } = options;
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDetails = useCallback(async () => {
    if (!url || skip) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load details. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [url, skip]);

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line
  }, [fetchDetails, ...dependencies]);

  return { data, loading, error, refetch: fetchDetails };
};

export default useFetchDetails;
