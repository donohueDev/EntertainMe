// API configuration
const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5001'
    : 'https://entertainment-reviews-api.onrender.com';

export default API_BASE_URL; 