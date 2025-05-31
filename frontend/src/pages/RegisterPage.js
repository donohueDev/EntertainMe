// RegisterPage component for user registration
import React, { useState } from 'react';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/userContext';
import API_BASE_URL from '../config';
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

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const handleRegister = async () => {
    console.log("Register button pressed, making API call...");

    if (!email || !username || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if(!validator.isEmail(email)){
      setErrorMessage("Please enter a valid email.");
      return;
    }

    if(!validator.isAlphanumeric(username) || username.length < 3){
      setErrorMessage("Please enter a valid username.");
      return;
    }

    if(password.length < 6){
      setErrorMessage("Please enter a valid password.");
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/accounts/register`, {
        email,
        username,
        password,
      });

      console.log('Registration response:', response.data);

      if (response.data && response.data.token) {
        // Store the token and update auth state
        login(response.data.token);
        
        // Clear the input fields
        setEmail('');
        setUsername('');
        setPassword('');

        // Add a small delay to ensure state is updated
        setTimeout(() => {
          // Navigate to the Profile page to complete setup
          const userInfo = JSON.parse(atob(response.data.token.split('.')[1]));
          navigate(`/user/${userInfo.username}/profile`, { 
            replace: true,
            state: { isNewUser: true }
          });
        }, 100);
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    } catch (err) {
      console.log("Error during registration:", err);
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data.message || 'Registration failed');
      } else {
        setErrorMessage('Server error, please try again.');
      }
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
            bgcolor: 'background.paper',
            borderRadius: 2
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
            Register
          </Typography>

          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              helperText="Enter a valid email address"
            />

            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              helperText="3+ characters, letters and numbers only"
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
              helperText="Minimum 6 characters"
            />

            {errorMessage && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errorMessage}
              </Alert>
            )}

            <Button
              variant="contained"
              size="large"
              onClick={handleRegister}
              disabled={isLoading}
              sx={{ mt: 2 }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Register'
              )}
            </Button>

            <Button
              variant="text"
              size="large"
              onClick={() => navigate('/auth/login')}
              sx={{ mt: 1 }}
            >
              Already have an account? Log in.
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;
