// LoginPage component for user authentication
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import axiosInstance from '../utils/axiosConfig';
import RecaptchaComponent from '../components/Recaptcha';
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
  const [requiresVerification, setRequiresVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [isResendingVerification, setIsResendingVerification] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();
  const recaptchaRef = useRef(null);

  const handleResendVerification = async () => {
    if (!verificationEmail) return;
    
    setIsResendingVerification(true);
    try {
      await axiosInstance.post('/api/accounts/resend-verification', {
        email: verificationEmail
      });
      setVerificationSuccess(true);
      // Clear verification success message after 5 seconds
      setTimeout(() => {
        setVerificationSuccess(false);
      }, 5000);
    } catch (error) {
      setErrorMessage(error?.message || 'Failed to resend verification email');
    } finally {
      setIsResendingVerification(false);
    }
  };

  const handleLogin = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Execute reCAPTCHA and get token
      const recaptchaToken = await recaptchaRef.current?.executeAsync();
      if (!recaptchaToken) {
        throw new Error('Failed to verify you are human. Please try again.');
      }

      const response = await axiosInstance.post('/api/accounts/login', {
        username, // This can be either username or email
        password,
        recaptchaToken
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
      if (error.response?.data?.requiresVerification) {
        setRequiresVerification(true);
        setVerificationEmail(error.response?.data?.user?.email);
        setErrorMessage('Please verify your email before logging in');
        return;
      }
      setErrorMessage(error?.message || 'Login failed. Please check your credentials.');
    } finally {
      recaptchaRef.current?.reset();
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
              label="Username or Email"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              helperText="Enter your username or email address"
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
                '& .MuiFormHelperText-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
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
                {requiresVerification && (
                  <Box sx={{ mt: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleResendVerification}
                      disabled={isResendingVerification}
                      sx={{
                        color: 'white',
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        '&:hover': {
                          borderColor: 'white'
                        }
                      }}
                    >
                      {isResendingVerification ? 'Sending...' : 'Resend Verification Email'}
                    </Button>
                  </Box>
                )}
              </Alert>
            )}

            {verificationSuccess && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Verification email sent! Please check your inbox.
              </Alert>
            )}

            <RecaptchaComponent ref={recaptchaRef} />

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