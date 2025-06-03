import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPromptBox = ({ contentType = 'item', actions = ['rate', 'track'] }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ my: 4, p: 3, bgcolor: 'background.default', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
        Want to track this {contentType}?
      </Typography>
      <Typography variant="body1" sx={{ color: 'white', textAlign: 'center', mb: 1 }}>
        Log in or create an account to:
      </Typography>
      <Box sx={{ mb: 2 }}>
        {actions.map((action, idx) => (
          <Typography key={idx} variant="body2" sx={{ color: 'white', textAlign: 'center' }}>
            • {action.charAt(0).toUpperCase() + action.slice(1)} this {contentType}
          </Typography>
        ))}
        <Typography variant="body2" sx={{ color: 'white', textAlign: 'center' }}>
          • Add this {contentType} to your collection
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/auth/login')}
          sx={{ flex: 1, color: 'white' }}
        >
          Log In
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate('/auth/register')}
          sx={{ flex: 1, color: 'white' }}
        >
          Create Account
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPromptBox;
