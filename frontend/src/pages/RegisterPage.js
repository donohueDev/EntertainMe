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
            bgcolor: '#051426',
            borderRadius: 2,
            border: '1px solid rgba(218, 165, 32, 0.3)',
            boxShadow: '0 0 15px rgba(218, 165, 32, 0.1)'
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ 
            mb: 4, 
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
            Join the Adventure
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(218, 165, 32, 0.5)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'goldenrod',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'goldenrod',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': {
                    color: 'goldenrod',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
                '& .MuiFormHelperText-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(218, 165, 32, 0.5)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'goldenrod',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'goldenrod',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': {
                    color: 'goldenrod',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
                '& .MuiFormHelperText-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(218, 165, 32, 0.5)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'goldenrod',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'goldenrod',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': {
                    color: 'goldenrod',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
                '& .MuiFormHelperText-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
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
              sx={{ 
                mt: 2, 
                borderRadius: 2, 
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
