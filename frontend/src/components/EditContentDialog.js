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

      // Call the success handler passed from parent
      onSaveSuccess(item.type, item.id, editedStatus, editedRating);
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
          bgcolor: '#1e222c', // Darker background
          color: '#ccc', // Light text
          borderRadius: 2,
          minWidth: 400, // Set a minimum width to make the box larger
        }
      }}
    >
      <DialogTitle sx={{ color: '#fff' }}>
        Edit {item?.type === 'game' ? 'Game' : 'Anime'}
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal" sx={{
          '.MuiInputLabel-root': { color: '#ccc' },
          '.MuiOutlinedInput-root': {
            fieldset: { borderColor: '#444' },
            '&:hover fieldset': { borderColor: '#666' },
            '&.Mui-focused fieldset': { borderColor: '#888' },
            '.MuiSelect-select': { color: '#ccc' },
            '.MuiSvgIcon-root': { color: '#ccc' },
          },
        }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={editedStatus}
            onChange={(e) => setEditedStatus(e.target.value)}
            label="Status"
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Only show rating if not planned status */}
        {editedStatus.toLowerCase() !== 'planned' && (
           <Box margin="normal" sx={{ mt: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             <Typography component="legend" sx={{ color: '#ccc', mb: 0.5 }}>Rating</Typography>
             <Rating
               name="simple-controlled"
               value={editedRating}
               precision={0.5}
               onChange={(event, newValue) => {
                 setEditedRating(newValue);
               }}
               sx={{
                 // Style for empty stars with outline
                 '& .MuiRating-iconEmpty': { color: 'transparent', stroke: '#ccc', strokeWidth: 1 },
                 '& .MuiRating-iconFilled': { color: '#ffb400' }, // Style for filled stars (e.g., gold)
                 '& .MuiRating-icon': { fontSize: '2rem' }, // Make stars bigger
               }}
             />
           </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: '#ccc' }}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditContentDialog;
