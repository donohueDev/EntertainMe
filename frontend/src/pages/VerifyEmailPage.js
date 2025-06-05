import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Box, Typography, Paper, Button, CircularProgress, Alert, Grid } from '@mui/material';
import { Email as EmailIcon, Home as HomeIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import axiosInstance from '../utils/axiosConfig';

const VerifyEmailPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const verificationToken = searchParams.get('token');
  const { state } = location;
  const email = state?.email;
  const message = state?.message;
  const showResend = state?.showResend;

  useEffect(() => {
    const verifyEmail = async () => {
      if (!verificationToken) return;
      
      setIsLoading(true);
      try {
        const response = await axiosInstance.post('/api/auth/verify-email', {
          token: verificationToken
        });

        if (response.status === 200) {
          // After successful verification, redirect to success page
          navigate('/auth/verify-email-success', { replace: true });
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || '';
        if (errorMsg.includes('expired')) {
          setError('This verification link has expired. Please request a new one.');
        } else if (errorMsg.includes('already verified')) {
          navigate('/auth/login', {
            replace: true,
            state: { message: 'Email already verified. You can log in.' }
          });
        } else {
          setError('Failed to verify email. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (verificationToken) {
      verifyEmail();
    }
  }, [verificationToken, navigate]);

  const handleResendVerification = async () => {
    if (!email || !email.includes('@')) {
      setError('Valid email address is missing. Please try again.');
      return;
    }

    setIsLoading(true);
    try {
      await axiosInstance.post('/api/auth/resend-verification', {
        email: email.trim() // Clean up email and ensure it's the actual email address
      });

      // Even if the email doesn't exist, we show success to prevent email enumeration
      setError('');
      // Update the message to show that a new verification email was sent
      navigate('/auth/verify-email-sent', {
        replace: true,
        state: {
          email,
          message: 'A new verification email has been sent. Please check your inbox.',
          showResend: true
        }
      });
    } catch (error) {
      setError(error.message || 'Failed to resend verification email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckVerification = async () => {
    if (!email) {
      setError('Email address is missing. Please try again.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/api/auth/verification-status?email=${encodeURIComponent(email)}`);
      
      if (response.data.isVerified) {
        // After successful verification check, redirect to success page
        navigate('/auth/verify-email-success', { replace: true });
      } else {
        setError('Email is not verified yet. Please check your inbox for the verification link.');
      }
    } catch (error) {
      setError(error.message || 'Failed to check verification status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CircularProgress sx={{ color: 'goldenrod' }} />
          <Typography sx={{ mt: 2, color: '#fff' }}>
            {verificationToken ? 'Verifying your email...' : 'Sending verification email...'}
          </Typography>
        </Box>
      </Container>
    );
  }

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
            <EmailIcon
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
            {verificationToken ? 'Verifying Email' : 'Check Your Email'}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Typography
            variant="body1"
            sx={{
              color: '#fff',
              mb: 4
            }}
          >
            {message || (email 
              ? `We've sent a verification email to ${email}. The link will expire in 24 hours.`
              : 'Please check your email for a verification link. The link will expire in 24 hours.'
            )}
          </Typography>

          <Grid container spacing={2}>
            {email && showResend && (
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleResendVerification}
                  disabled={isLoading}
                  startIcon={<EmailIcon />}
                  sx={{
                    borderColor: 'goldenrod',
                    color: 'goldenrod',
                    '&:hover': {
                      borderColor: 'darkgoldenrod',
                      backgroundColor: 'rgba(218, 165, 32, 0.1)'
                    }
                  }}
                >
                  Resend Verification Email
                </Button>
              </Grid>
            )}

            {email && (
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleCheckVerification}
                  disabled={isLoading}
                  startIcon={<RefreshIcon />}
                  sx={{
                    borderColor: 'goldenrod',
                    color: 'goldenrod',
                    '&:hover': {
                      borderColor: 'darkgoldenrod',
                      backgroundColor: 'rgba(218, 165, 32, 0.1)'
                    }
                  }}
                >
                  Check Verification Status
                </Button>
              </Grid>
            )}

            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate('/auth/login', { replace: true })}
                sx={{
                  backgroundColor: 'goldenrod',
                  color: '#051426',
                  '&:hover': {
                    backgroundColor: 'darkgoldenrod'
                  }
                }}
              >
                Back to Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate('/', { replace: true })}
                startIcon={<HomeIcon />}
                sx={{
                  backgroundColor: 'goldenrod',
                  color: '#051426',
                  '&:hover': {
                    backgroundColor: 'darkgoldenrod'
                  }
                }}
              >
                Go to Home
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default VerifyEmailPage;
