import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/userContext';
import { Container, Box, CircularProgress, Typography } from '@mui/material';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUser();

  useEffect(() => {
    const processOAuthToken = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');

      if (!token) {
        console.error('No token found in URL');
        navigate('/auth/login', { replace: true });
        return;
      }

      try {
        // Process the token
        login(token, {});
        
        // Get user info from token
        const userInfo = JSON.parse(atob(token.split('.')[1]));
        
        if (!userInfo.userId || !userInfo.username) {
          throw new Error('Invalid user information in token');
        }
        
        // Navigate to dashboard
        navigate(`/user/${userInfo.username}/dashboard`, { replace: true });
      } catch (error) {
        console.error('Error processing OAuth token:', error);
        navigate('/auth/login', { replace: true });
      }
    };

    processOAuthToken();
  }, [location, login, navigate]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3
        }}
      >
        <CircularProgress size={60} sx={{ color: 'goldenrod' }} />
        <Typography variant="h6" sx={{ color: 'white' }}>
          Completing your login...
        </Typography>
      </Box>
    </Container>
  );
};

export default OAuthCallback; 