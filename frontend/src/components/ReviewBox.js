import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Button,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';

const STATUS_OPTIONS = {
  game: [
    { value: 'playing', label: 'Playing' },
    { value: 'planned', label: 'Planned' },
    { value: 'completed', label: 'Completed' },
    { value: 'dropped', label: 'Dropped' },
  ],
  anime: [
    { value: 'watching', label: 'Watching' },
    { value: 'planned', label: 'Planned' },
    { value: 'completed', label: 'Completed' },
    { value: 'dropped', label: 'Dropped' },
    { value: 're-watching', label: 'Re-Watching' },
    { value: 'paused', label: 'Paused' },
  ],
  movie: [
    { value: 'watched', label: 'Watched' },
    { value: 'planned', label: 'Planned' },
  ],
};

const ReviewBox = ({
  contentType = 'game',
  status, setStatus,
  rating, setRating,
  loading = false,
  onSubmit,
  error = '',
  success = false,
  setError,
  setSuccess,
  showRating = true,
}) => {
  const statusOptions = STATUS_OPTIONS[contentType] || STATUS_OPTIONS['game'];
  return (
    <Box
      sx={{
        my: 4,
        p: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: '1px solid rgba(218, 165, 32, 0.3)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Update your {contentType} status:
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="status-label">{contentType.charAt(0).toUpperCase() + contentType.slice(1)} Status</InputLabel>
        <Select
          labelId="status-label"
          id="status"
          name="status"
          value={status}
          label={`${contentType.charAt(0).toUpperCase() + contentType.slice(1)} Status`}
          onChange={(e) => setStatus(e.target.value)}
        >
          {statusOptions.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {showRating && status !== 'planned' && (
        <>
          <Typography variant="h6" gutterBottom>
            Rate this {contentType}:
          </Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            precision={0.5}
            size="large"
            sx={{ mb: 3 }}
          />
        </>
      )}
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={onSubmit}
        disabled={loading}
        fullWidth
        sx={{ mb: 3 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Update Rating'}
      </Button>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError && setError('')}
      >
        <Alert severity="error" onClose={() => setError && setError('')}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess && setSuccess(false)}
      >
        <Alert severity="success" onClose={() => setSuccess && setSuccess(false)}>
          Rating updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReviewBox;
