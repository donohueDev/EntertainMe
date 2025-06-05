import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Box, Typography, Paper, Button, CircularProgress, Alert } from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';
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
        const response = await axiosInstance.post('/api/accounts/verify-email', {
          token: verificationToken
        });

        if (response.status === 200) {
          // Redirect to success page
          navigate('/auth/verify-email-success', { replace: true });
        }
      } catch (error) {
        setError(error.message || 'Failed to verify email. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (verificationToken) {
      verifyEmail();
    }
  }, [verificationToken, navigate]);

  const handleResendVerification = async () => {
    if (!email) {
      setError('Email address is missing. Please try again.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/api/accounts/resend-verification', {
        email
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
            {message || 'Please check your email for a verification link. The link will expire in 24 hours.'}
          </Typography>

          {email && showResend && (
            <Button
              fullWidth
              variant="outlined"
              onClick={handleResendVerification}
              disabled={isLoading}
              sx={{
                mt: 2,
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
          )}

          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate('/account')}
            sx={{
              mt: 2,
              backgroundColor: 'goldenrod',
              color: '#051426',
              '&:hover': {
                backgroundColor: 'darkgoldenrod'
              }
            }}
          >
            Back to Login
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default VerifyEmailPage;
