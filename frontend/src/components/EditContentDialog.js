import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import API_BASE_URL from '../config';
import axios from 'axios';
import { useUser } from '../context/userContext';

const EditContentDialog = ({ open, item, onClose, onSaveSuccess }) => {
  const [editedStatus, setEditedStatus] = useState('');
  const [editedRating, setEditedRating] = useState(0);
  const token = localStorage.getItem('token');
  const { getUserInfo } = useUser();

  useEffect(() => {
    if (item && item.user_status) {
      // Capitalize the first letter of the status to match MenuItem values
      const capitalizedStatus = item.user_status.charAt(0).toUpperCase() + item.user_status.slice(1);
      setEditedStatus(capitalizedStatus);
      // Ensure rating is a number, default to 0 if null or undefined
      setEditedRating(Number(item.user_rating) || 0);
    } else if (item) {
        setEditedStatus('');
        setEditedRating(Number(item.user_rating) || 0);
    } else {
        setEditedStatus('');
        setEditedRating(0);
    }
  }, [item]);

  const handleSave = async () => {
    if (!item) return;

    try {
      const endpoint = item.type === 'game' ? 'userGames' : 'userAnimes';
      const userInfo = getUserInfo();
      const userId = userInfo?.userId;
      const username = userInfo?.username; // Get username from context

      if (!userId || !username) {
        console.error('User ID or username not available. Cannot save.');
        // TODO: Show an error message to the user
        return;
      }

      // Determine the ID field name based on content type and the content ID
      const contentIdKey = item.type === 'game' ? 'gameId' : 'animeId';
      const contentId = item.id;

      // Construct the request body for the POST /ratings endpoint
      const requestBody = {
        username: username,
        [contentIdKey]: contentId, // Use computed property name for gameId or animeId
        rating: editedRating,
        status: editedStatus
      };

      // Use POST method and the correct /ratings endpoint
      const response = await axios.post(`${API_BASE_URL}/api/${endpoint}/ratings`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status !== 200) {
        throw new Error('Failed to update item');
      }

      // Update the item with new values before passing to success handler
      const updatedItem = {
        ...item,
        user_rating: editedRating,
        user_status: editedStatus
      };
      onSaveSuccess(updatedItem, editedRating);
      onClose(); // Close dialog on success
    } catch (error) {
      console.error('Error updating item:', error);
      // TODO: Handle error display to user
    }
  };

  // Define status options based on content type
  const getStatusOptions = (type) => {
    if (type === 'game') {
      return [
        { value: 'Planned', label: 'Plan to Play' },
        { value: 'Playing', label: 'Currently Playing' },
        { value: 'Completed', label: 'Completed' },
        { value: 'Dropped', label: 'Dropped' },
      ];
    } else if (type === 'anime') {
      return [
        { value: 'Planned', label: 'Plan to Watch' },
        { value: 'Watching', label: 'Watching' },
        { value: 'Completed', label: 'Completed' },
        { value: 'Dropped', label: 'Dropped' },
        { value: 'Re-watching', label: 'Re-watching' },
        { value: 'Paused', label: 'Paused' },
      ];
    }
    return [];
  };

  const statusOptions = getStatusOptions(item?.type);


  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        sx: {
          bgcolor: '#051426',
          color: '#FFFFFF',
          borderRadius: 2,
          minWidth: 400,
          border: '1px solid rgba(218, 165, 32, 0.3)',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'
        }
      }}
    >
      <DialogTitle sx={{ 
        borderBottom: '1px solid rgba(218, 165, 32, 0.2)',
        background: 'linear-gradient(to bottom, #FFFFFF 0%, goldenrod 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        Edit {item?.type === 'game' ? 'Game' : 'Anime'}
      </DialogTitle>
      <DialogContent sx={{ bgcolor: '#051426' }}>
        <FormControl fullWidth margin="normal" sx={{
          '.MuiInputLabel-root': { 
            color: 'rgba(255, 255, 255, 0.7)',
            '&.Mui-focused': {
              color: 'goldenrod'
            }
          },
          '.MuiOutlinedInput-root': {
            bgcolor: '#051426',
            '& fieldset': { 
              borderColor: 'rgba(218, 165, 32, 0.5)' 
            },
            '&:hover fieldset': { 
              borderColor: 'goldenrod' 
            },
            '&.Mui-focused fieldset': { 
              borderColor: 'goldenrod' 
            },
            '.MuiSelect-select': { 
              color: '#FFFFFF'
            },
            '.MuiSvgIcon-root': { 
              color: 'rgba(218, 165, 32, 0.7)' 
            },
          },
        }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={editedStatus}
            onChange={(e) => {
              const newStatus = e.target.value;
              setEditedStatus(newStatus);
              if (editedStatus.toLowerCase() === 'planned' && newStatus.toLowerCase() !== 'planned') {
                setEditedRating(0);
              }
            }}
            label="Status"
          >
            {statusOptions.map((option) => (
              <MenuItem 
                key={option.value} 
                value={option.value}
                sx={{
                  color: '#FFFFFF',
                  bgcolor: '#051426',
                  '&:hover': {
                    bgcolor: 'rgba(218, 165, 32, 0.1)'
                  },
                  '&.Mui-selected': {
                    bgcolor: '#051426',
                    border: '1px solid rgba(218, 165, 32, 0.3)',
                    '&:hover': {
                      bgcolor: 'rgba(218, 165, 32, 0.1)'
                    }
                  }
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {editedStatus.toLowerCase() !== 'planned' && (
           <Box margin="normal" sx={{ 
             mt: 2, 
             width: '100%', 
             display: 'flex', 
             flexDirection: 'column', 
             alignItems: 'center',
             bgcolor: '#051426'
           }}>
             <Typography 
               component="legend" 
               sx={{ 
                 color: '#FFFFFF',
                 mb: 0.5 
               }}
             >
               Rating
             </Typography>
             <Rating
               name="simple-controlled"
               value={editedRating}
               precision={0.5}
               onChange={(event, newValue) => {
                 setEditedRating(newValue);
               }}
               sx={{
                  mb: 3,
                  '& .MuiRating-iconFilled': {
                    color: 'goldenrod'
                  },
                  '& .MuiRating-iconHover': {
                    color: 'goldenrod'
                  },
                  '& .MuiRating-iconEmpty': { 
                    color: 'rgba(218, 165, 32, 0.3)'
                  },
                  '& .MuiRating-icon': { 
                    fontSize: '2rem'
                  },
               }}
             />
           </Box>
        )}
      </DialogContent>
      <DialogActions sx={{
        borderTop: '1px solid rgba(218, 165, 32, 0.2)',
        padding: 2,
        bgcolor: '#051426'
      }}>
        <Button 
          onClick={onClose} 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              color: '#FFFFFF',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
          sx={{
            bgcolor: '#051426',
            border: '1px solid rgba(218, 165, 32, 0.5)',
            color: '#FFFFFF',
            '&:hover': {
              bgcolor: '#051426',
              border: '1px solid goldenrod',
              boxShadow: '0 0 5px rgba(218, 165, 32, 0.3)'
            }
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditContentDialog;
