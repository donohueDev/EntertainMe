import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Paper, Button } from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';

const VerificationSuccessPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/auth/login', { replace: true });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            bgcolor: '#051426',
            borderRadius: 2,
            border: '1px solid rgba(218, 165, 32, 0.3)',
            textAlign: 'center'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 3
            }}
          >
            <CheckIcon
              sx={{
                fontSize: 60,
                color: 'goldenrod',
                backgroundColor: 'rgba(218, 165, 32, 0.1)',
                borderRadius: '50%',
                p: 1
              }}
            />
          </Box>

          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              color: 'goldenrod',
              fontWeight: 'bold'
            }}
          >
            Email Verified!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#fff',
              mb: 4
            }}
          >
            Your email has been successfully verified. You can now log in to your account and start exploring EntertainMe.
          </Typography>

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              backgroundColor: 'goldenrod',
              color: '#051426',
              '&:hover': {
                backgroundColor: 'darkgoldenrod'
              }
            }}
          >
            Log In to Your Account
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default VerificationSuccessPage;
