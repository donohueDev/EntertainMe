import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import axiosInstance from '../utils/axiosConfig';
import TurnstileComponent from '../components/Recaptcha';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress, 
  IconButton,
  InputAdornment
} from '@mui/material';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [needsEmailVerification, setNeedsEmailVerification] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();
  const recaptchaRef = useRef(null);
  const hasRestoredState = useRef(false);

  // Restore username and error message after page reload
  useEffect(() => {
    // Prevent double restoration in React Strict Mode
    if (hasRestoredState.current) return;
    
    const savedUsername = sessionStorage.getItem('loginUsername');
    const savedError = sessionStorage.getItem('loginError');
    const savedVerificationNeeded = sessionStorage.getItem('loginNeedsVerification');
    const savedVerificationEmail = sessionStorage.getItem('loginVerificationEmail');
    
    console.log('LoginPage restored state:', {
      savedUsername,
      savedError,
      savedVerificationNeeded,
      savedVerificationEmail
    });
    
    // Only process if we have values to restore
    if (savedUsername || savedError || savedVerificationNeeded || savedVerificationEmail) {
      hasRestoredState.current = true;
      
      if (savedUsername) {
        setUsername(savedUsername);
      }
      
      if (savedError) {
        setErrorMessage(savedError);
      }
      
      if (savedError === 'Please verify your email before logging in') {
        console.log('Setting needsEmailVerification to true');
        setNeedsEmailVerification(true);
      }
      
      // Clean up sessionStorage after successfully restoring state
      sessionStorage.removeItem('loginUsername');
      sessionStorage.removeItem('loginError');
      sessionStorage.removeItem('loginNeedsVerification');
      sessionStorage.removeItem('loginVerificationEmail');
    }
  }, []);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();

    if (!username || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      // Await the Turnstile token
      const recaptchaToken = await recaptchaRef.current?.executeAsync();
      if (!recaptchaToken) {
        setErrorMessage('Failed to verify you are human. Please try again.');
        setIsLoading(false);
        return;
      }

      const response = await axiosInstance.post('/api/auth/login', {
        username,
        password,
        recaptchaToken
      });

      if (response.data.token) {
        login(response.data.token, response.data.user);
        setUsername('');
        setPassword('');
        const userInfo = JSON.parse(atob(response.data.token.split('.')[1]));
        navigate(`/user/${userInfo.username}/dashboard`, { replace: true });
      }
    } catch (error) {
      console.error('Login failed:', error);
      
      const isEmailVerificationError = error.response?.status === 403 &&
        (
          error.response?.data?.requiresVerification === true ||
          (typeof error.response?.data?.message === 'string' &&
            (error.response.data.message.toLowerCase().includes('verify your email') ||
             error.response.data.message.toLowerCase().includes('verify email')))
        );
      
      console.log('Error details:', {
        status: error.response?.status,
        requiresVerification: error.response?.data?.requiresVerification,
        message: error.response?.data?.message,
        isEmailVerificationError
      });
      
      console.log('Setting loginNeedsVerification:', isEmailVerificationError, error.response?.data);
      if (isEmailVerificationError) {
        // For email verification errors, store state and reload page
        const errorMsg = error?.response?.data?.message || 'Please verify your email before logging in';
        const actualEmail = error?.response?.data?.user?.email || username;
        
        console.log('Storing email verification error, will reload page');
        sessionStorage.setItem('loginUsername', username);
        sessionStorage.setItem('loginError', errorMsg);
        sessionStorage.setItem('loginNeedsVerification', 'true');
        sessionStorage.setItem('loginVerificationEmail', actualEmail);
        
        // Show loading state while refreshing
        setIsRefreshing(true);
        
        // Reload page after a brief delay
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        return;
      }
      
      // For other login failures, store state and reload page for fresh Turnstile
      const errorMsg = error?.response?.data?.message || error.message || 'Login failed. Please check your credentials.';
      
      // Save username and error message for after reload
      sessionStorage.setItem('loginUsername', username);
      sessionStorage.setItem('loginError', errorMsg);
      
      // Show loading state while refreshing
      setIsRefreshing(true);
      
      // Reload page after a brief delay to give user feedback
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
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
            mb: 6,
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
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(218, 165, 32, 0.5)' },
                  '&:hover fieldset': { borderColor: 'goldenrod' },
                  '&.Mui-focused fieldset': { borderColor: 'goldenrod' },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': { color: 'goldenrod' },
                },
                '& .MuiInputBase-input': { color: 'white' },
                '& .MuiFormHelperText-root': { color: 'rgba(255, 255, 255, 0.7)' },
              }}
            />

            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                mb: 0,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(218, 165, 32, 0.5)' },
                  '&:hover fieldset': { borderColor: 'goldenrod' },
                  '&.Mui-focused fieldset': { borderColor: 'goldenrod' },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': { color: 'goldenrod' },
                },
                '& .MuiInputBase-input': { color: 'white' },
                '& .MuiInputAdornment-root': {
                  color: 'rgba(255, 255, 255, 0.7)'
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: 'rgba(218, 165, 32, 0.7)' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {errorMessage && (
              <Alert
                severity="error"
                sx={{
                  mt: 1.5,
                  mb: 1.5,
                  bgcolor: '#051426',
                  border: '1px solid goldenrod',
                  color: 'goldenrod',
                  '.MuiAlert-icon': { display: 'none', color: 'goldenrod' },
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  <Typography sx={{ color: 'goldenrod', textAlign: 'center' }}>{errorMessage}</Typography>

                  {needsEmailVerification && (
                    <Button
                      variant="contained"
                      size="small"
                      disabled={isResending}
                      onClick={async () => {
                        setIsResending(true);
                        try {
                          // Retrieve verification email from sessionStorage or fallback to username
                          const storedVerificationEmail = sessionStorage.getItem('loginVerificationEmail');
                          const emailToSend = storedVerificationEmail || username;
                          const res = await axiosInstance.post('/api/auth/resend-verification', { email: emailToSend });
                          const sentTo = res.data.email || username;
                          navigate('/auth/verify-email-sent', { state: { email: sentTo } });
                        } catch (err) {
                          alert('Failed to resend verification email. Please try again.');
                        } finally {
                          setIsResending(false);
                        }
                      }}
                      sx={{
                        mt: 1,
                        background: 'linear-gradient(90deg, goldenrod, #FFD700)',
                        color: '#051426',
                        fontWeight: 'bold',
                        border: '1px solid goldenrod',
                        boxShadow: '0 0 8px rgba(218, 165, 32, 0.2)',
                        alignSelf: 'center',
                        '&:hover': {
                          background: 'linear-gradient(90deg, #FFD700, goldenrod)',
                          color: '#222',
                          borderColor: '#FFD700',
                          boxShadow: '0 0 12px rgba(218, 165, 32, 0.4)'
                        }
                      }}
                    >
                      {isResending ? (
                        <>
                          <CircularProgress size={18} color="inherit" sx={{ mr: 1 }} />
                          Sending...
                        </>
                      ) : (
                        'Verify Email Now'
                      )}
                    </Button>
                  )}
                </Box>
              </Alert>
            )}

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 0, mb: -2 }}>
              <Box sx={{ width: { xs: '100%', sm: '80%', md: '70%' }, display: 'flex', justifyContent: 'center' }}>
                <TurnstileComponent ref={recaptchaRef} />
              </Box>
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading || isRefreshing}
              sx={{
                mt: 1,
                mb: -2,
                borderRadius: 2,
                color: '#FFFFFF',
                border: '1px solid rgba(218, 165, 32, 0.5)',
                backgroundColor: '#051426',
                width: '100%',
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                letterSpacing: '0.03em',
                '&:hover': {
                  backgroundColor: '#051426',
                  border: '1px solid goldenrod',
                  boxShadow: '0 0 5px rgba(218, 165, 32, 0.5)'
                },
                '&:disabled': {
                  backgroundColor: 'rgba(5, 20, 38, 0.7)',
                  color: 'rgba(255, 255, 255, 0.5)'
                }
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : isRefreshing ? (
                <>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  Refreshing...
                </>
              ) : (
                'Login'
              )}
            </Button>
            <Button
              variant="text"
              size="large"
              onClick={() => navigate('/auth/forgot-password')}
              sx={{ mb: -2, width: '100%', alignSelf: 'center', color: 'goldenrod', fontWeight: 'bold' }}
            >
              Forgot Password?
            </Button>
            <Button
              variant="text"
              size="large"
              onClick={() => navigate('/auth/register')}
              sx={{ width: '100%', alignSelf: 'center', color: 'goldenrod', fontWeight: 'bold' }}
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