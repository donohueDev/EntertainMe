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
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
            {isNewUser ? 'Complete Your Profile' : 'Edit Profile'}
          </Typography>

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Avatar
                src={profile.avatar_url}
                alt={profile.display_name || 'User avatar'}
                sx={{ width: 100, height: 100 }}
              />
            </Box>

            <TextField
              label="Display Name"
              value={profile.display_name || ''}
              onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
              fullWidth
              variant="outlined"
            />

            <TextField
              label="Avatar URL"
              value={profile.avatar_url || ''}
              onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
              fullWidth
              variant="outlined"
              placeholder="https://example.com/avatar.jpg"
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
            />

            <TextField
              label="Location"
              value={profile.location || ''}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              fullWidth
              variant="outlined"
              placeholder="City, Country"
            />

            <TextField
              label="Website"
              value={profile.website || ''}
              onChange={(e) => setProfile({ ...profile, website: e.target.value })}
              fullWidth
              variant="outlined"
              placeholder="https://your-website.com"
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSaving}
              sx={{ mt: 2 }}
            >
              {isSaving ? (
                <CircularProgress size={24} color="inherit" />
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
                sx={{ mt: 1 }}
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
