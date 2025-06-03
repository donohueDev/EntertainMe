import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import axios from 'axios';
import API_BASE_URL from '../config';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Avatar,
} from '@mui/material';

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getUserInfo } = useUser();
  const isNewUser = location.state?.isNewUser;

  const [profile, setProfile] = useState({
    display_name: '',
    avatar_url: '',
    bio: '',
    location: '',
    website: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userInfo = getUserInfo();
        if (!userInfo) {
          navigate('/auth/login');
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/api/profile`, {
          headers: {
            'Authorization': `Bearer ${userInfo.token}`
          }
        });

        setProfile(response.data);
      } catch (error) {
        setErrorMessage('Failed to load profile data');
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [getUserInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const userInfo = getUserInfo();
      await axios.patch(
        `${API_BASE_URL}/api/profile`,
        profile,
        {
          headers: {
            'Authorization': `Bearer ${userInfo.token}`
          }
        }
      );

      setSuccessMessage('Profile updated successfully');
      
      // If this is a new user, redirect to dashboard after profile setup
      if (isNewUser) {
        setTimeout(() => {
          navigate(`/user/${userInfo.username}/dashboard`, { replace: true });
        }, 1500);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to update profile');
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress sx={{ color: 'goldenrod' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ 
          p: 4, 
          bgcolor: '#051426',
          border: '1px solid rgba(218, 165, 32, 0.3)',
          boxShadow: '0 0 15px rgba(218, 165, 32, 0.1)',
          borderRadius: 2 
        }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            align="center" 
            sx={{ 
              mb: 4,
              background: 'linear-gradient(to bottom, #FFFFFF 0%, goldenrod 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {isNewUser ? 'Complete Your Profile' : 'Edit Profile'}
          </Typography>

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2, backgroundColor: 'rgba(211, 47, 47, 0.1)', color: '#ff5252' }}>
              {errorMessage}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ mb: 2, backgroundColor: 'rgba(46, 125, 50, 0.1)', color: '#69f0ae' }}>
              {successMessage}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Avatar
                src={profile.avatar_url}
                alt={profile.display_name || 'User avatar'}
                sx={{ 
                  width: 100, 
                  height: 100,
                  border: '2px solid goldenrod',
                  boxShadow: '0 0 10px rgba(218, 165, 32, 0.3)'
                }}
              />
            </Box>

            <TextField
              label="Display Name"
              value={profile.display_name || ''}
              onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(218, 165, 32, 0.5)' },
                  '&:hover fieldset': { borderColor: 'goldenrod' },
                  '&.Mui-focused fieldset': { borderColor: 'goldenrod' }
                },
                '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                '& .MuiOutlinedInput-input': { color: '#FFFFFF' }
              }}
            />

            <TextField
              label="Avatar URL"
              value={profile.avatar_url || ''}
              onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
              fullWidth
              variant="outlined"
              placeholder="https://example.com/avatar.jpg"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(218, 165, 32, 0.5)' },
                  '&:hover fieldset': { borderColor: 'goldenrod' },
                  '&.Mui-focused fieldset': { borderColor: 'goldenrod' }
                },
                '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                '& .MuiOutlinedInput-input': { color: '#FFFFFF' }
              }}
            />

            <TextField
              label="Bio"
              value={profile.bio || ''}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              placeholder="Tell us about yourself..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(218, 165, 32, 0.5)' },
                  '&:hover fieldset': { borderColor: 'goldenrod' },
                  '&.Mui-focused fieldset': { borderColor: 'goldenrod' }
                },
                '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                '& .MuiOutlinedInput-input': { color: '#FFFFFF' }
              }}
            />

            <TextField
              label="Location"
              value={profile.location || ''}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              fullWidth
              variant="outlined"
              placeholder="City, Country"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(218, 165, 32, 0.5)' },
                  '&:hover fieldset': { borderColor: 'goldenrod' },
                  '&.Mui-focused fieldset': { borderColor: 'goldenrod' }
                },
                '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                '& .MuiOutlinedInput-input': { color: '#FFFFFF' }
              }}
            />

            <TextField
              label="Website"
              value={profile.website || ''}
              onChange={(e) => setProfile({ ...profile, website: e.target.value })}
              fullWidth
              variant="outlined"
              placeholder="https://your-website.com"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(218, 165, 32, 0.5)' },
                  '&:hover fieldset': { borderColor: 'goldenrod' },
                  '&.Mui-focused fieldset': { borderColor: 'goldenrod' }
                },
                '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                '& .MuiOutlinedInput-input': { color: '#FFFFFF' }
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSaving}
              sx={{ 
                mt: 2,
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
              {isSaving ? (
                <CircularProgress size={24} sx={{ color: 'goldenrod' }} />
              ) : isNewUser ? (
                'Complete Profile'
              ) : (
                'Save Changes'
              )}
            </Button>

            {isNewUser && (
              <Button
                variant="text"
                onClick={() => navigate(`/user/${getUserInfo().username}/dashboard`)}
                sx={{ 
                  mt: 1,
                  color: 'rgba(218, 165, 32, 0.8)',
                  '&:hover': {
                    color: 'goldenrod',
                    backgroundColor: 'rgba(218, 165, 32, 0.1)'
                  }
                }}
              >
                Skip for now
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfilePage;
