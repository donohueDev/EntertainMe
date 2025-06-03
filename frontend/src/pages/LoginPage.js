// LoginPage component for user authentication
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/userContext';
import API_BASE_URL from '../config';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress
} from '@mui/material';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/accounts/login`, {
        username,
        password,
      });

      if (response.data.token) {
        // First store the token and update auth state
        login(response.data.token);
        
        // Clear the input fields
        setUsername('');
        setPassword('');

        // Add a small delay to ensure state is updated
        setTimeout(() => {
          // Navigate to the Account Dashboard with username
          const userInfo = JSON.parse(atob(response.data.token.split('.')[1]));
          navigate(`/user/${userInfo.username}/dashboard`, { replace: true });
        }, 100);
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
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
            boxShadow: '0 0 15px rgba(218, 165, 32, 0.1)'
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ 
            mb: 4, 
            color: 'white',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 'bold',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            background: 'linear-gradient(to bottom, #FFFFFF 0%, goldenrod 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 20px rgba(218, 165, 32, 0.5)',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, goldenrod, transparent)'
            }
          }}>
            Welcome Back!
          </Typography>

          <Box 
            component="form" 
            onSubmit={handleLogin}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(218, 165, 32, 0.5)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'goldenrod',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'goldenrod',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': {
                    color: 'goldenrod',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
              }}
            />

            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(218, 165, 32, 0.5)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'goldenrod',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'goldenrod',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': {
                    color: 'goldenrod',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
              }}
            />

            {errorMessage && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errorMessage}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ 
                mt: 2, 
                borderRadius: 2, 
                color: '#FFFFFF',
                border: '1px solid rgba(218, 165, 32, 0.5)',
                backgroundColor: '#051426',
                '&:hover': { 
                  backgroundColor: '#051426',
                  border: '1px solid goldenrod',
                  boxShadow: '0 0 5px rgba(218, 165, 32, 0.5)'
                } 
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Login'
              )}
            </Button>

            <Button
              variant="text"
              size="large"
              onClick={() => navigate('/auth/register')}
              sx={{ mt: 1 }}
            >
              Don't have an account? Register here
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;