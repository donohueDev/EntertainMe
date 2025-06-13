import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Checkbox, FormControlLabel, Typography, Alert, InputAdornment, IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import axios from 'axios';
import isValidPassword from '../utils/isValidPassword';
import API_BASE_URL from '../config';
import {
  Container,
  Box,
  Paper,
  CircularProgress,
  Avatar,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getUserInfo, updateUserInfo } = useUser();
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

  // State for password dialog
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [logoutOtherDevices, setLogoutOtherDevices] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

      // Only include the editable profile fields
      const editableFields = ['display_name', 'avatar_url', 'bio', 'location', 'website'];
      const filteredProfile = Object.fromEntries(
        Object.entries(profile)
          .filter(([key, value]) => editableFields.includes(key) && value !== undefined)
          .map(([k, v]) => {
            // Convert empty strings to null for URL fields
            if ((k === 'avatar_url' || k === 'website') && v === '') {
              return [k, null];
            }
            return [k, v === '' ? null : v];
          })
      );

      console.log('Raw avatar_url value:', profile.avatar_url);
      console.log('Filtered profile data:', filteredProfile);

      const response = await axios.patch(
        `${API_BASE_URL}/api/profile`,
        filteredProfile,
        { headers: { 'Authorization': `Bearer ${userInfo.token}` } }
      );

      console.log('Profile update response:', response.data);
      setSuccessMessage('Profile updated successfully');
      
      // Update the user context with the new token and user info
      localStorage.setItem('token', response.data.token);
      updateUserInfo({
        display_name: response.data.display_name,
        avatar_url: response.data.avatar_url
      });
      
      // If this is a new user, redirect to dashboard after profile setup
      if (isNewUser) {
        setTimeout(() => {
          navigate(`/user/${userInfo.username}/dashboard`, { replace: true });
        }, 1500);
      }
    } catch (error) {
      console.error('Full error object:', error);
      console.error('Error response data:', error.response?.data);
      
      // Handle validation errors
      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map(err => err.message).join(', ');
        setErrorMessage(errorMessages);
      } else {
        setErrorMessage(
          error.response?.data?.message || 
          'Failed to update profile'
        );
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    setPasswordError('');
    setPasswordSuccess('');
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (!isValidPassword(newPassword)) {
      setPasswordError("New password must be at least 6 characters long and include letters, numbers, and special characters (!@$%).");
      return;
    }
    if (currentPassword === newPassword) {
      setPasswordError("New password cannot be the same as the current password.");
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/api/auth/change-password`, {
        currentPassword,
        newPassword,
        // logoutOtherDevices,
      }, {
        headers: { Authorization: `Bearer ${getUserInfo().token}` }
      });
      setPasswordSuccess("Password changed successfully.");
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordDialogOpen(false), 5000);
    } catch (err) {
      setPasswordError(err.response?.data?.message || "Failed to change password.");
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
              label="Username"
              value={getUserInfo()?.username || ''}
              fullWidth
              disabled
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: 'rgba(218, 165, 32, 0.7)' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(218, 165, 32, 0.5)' },
                  '&:hover fieldset': { borderColor: 'goldenrod' },
                  '&.Mui-focused fieldset': { borderColor: 'goldenrod' },
                  '&.Mui-disabled': {
                    '& fieldset': { borderColor: 'rgba(218, 165, 32, 0.3)' },
                    '& input': { color: 'rgba(255, 255, 255, 0.7)' }
                  }
                },
                '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                '& .MuiOutlinedInput-input': { color: '#FFFFFF' }
              }}
            />

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

          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setPasswordDialogOpen(true)}
              sx={{ 
                borderColor: 'rgba(218, 165, 32, 0.5)',
                color: 'rgba(218, 165, 32, 0.8)',
                '&:hover': {
                  borderColor: 'goldenrod',
                  color: 'goldenrod',
                  backgroundColor: 'rgba(218, 165, 32, 0.1)'
                }
              }}
            >
              Change Password
            </Button>
          </Box>

          <Dialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)} maxWidth="xs" fullWidth>
            <DialogTitle>
              <Typography sx={{ fontWeight: 'bold' }}>
                Change password
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Your password must be at least 6 characters and should include a combination of numbers, letters and special characters (!@$%).
              </Typography>
            </DialogTitle>
            <DialogContent>
              {passwordError && <Alert severity="error" sx={{ mb: 2 }}>{passwordError}</Alert>}
              {passwordSuccess && <Alert severity="success" sx={{ mb: 2 }}>{passwordSuccess}</Alert>}
              <TextField
                label="Current password"
                type={showCurrentPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        edge="end"
                        sx={{ color: 'rgba(218, 165, 32, 0.7)' }}
                      >
                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="New password"
                type={showNewPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        edge="end"
                        sx={{ color: 'rgba(218, 165, 32, 0.7)' }}
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Re-type new password"
                type={showConfirmPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                        sx={{ color: 'rgba(218, 165, 32, 0.7)' }}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={logoutOtherDevices}
                    onChange={e => setLogoutOtherDevices(e.target.checked)}
                  />
                }
                label="Log out of other devices. Choose this if someone else used your account."
                sx={{ mt: 1 }}
              /> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setPasswordDialogOpen(false)} sx={{ color: 'goldenrod' }}>
                Cancel
              </Button>
              <Button
                onClick={handlePasswordChange}
                variant="contained"
                color="primary"
                disabled={!currentPassword || !newPassword || !confirmPassword}
              >
                Change password
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfilePage;
