// src/services/authService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://10.0.2.2:3000';

// Register user
export const register = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  return data; // Return the full response for further handling
};

// Function to send login 
// export const loginUser = async (username, password) => {
//   try {
//     const response = await fetch('http://10.0.2.2:3000/login', {
//       method: 'POST',
//       body: JSON.stringify({ username, password }),  // Sending username and password
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const data = await response.json();

//     if (response.ok) {
//       // If login is successful, store the token and username in AsyncStorage
//       console.log('Login successful, data stored in AsyncStorage');
//       return data; // Returning the data might be useful for other purposes
//     } else {
//       throw new Error(data.message || 'Login failed');
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     throw error; // You can throw or return error based on how you want to handle it
//   }
// };


// Store the JWT token in AsyncStorage
const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token); // Store the token for future use
  } catch (error) {
    console.error('Error storing token', error);
  }
};

// logout function used with jwt and async storage, no longer needed for now
export const logout = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    console.log('Token being used for logout:', token);

    const response = await fetch('http://10.0.2.2:3000/api/accounts/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    console.log('Logout Response Status:', response.status);
    console.log('Logout Response Headers:', response.headers);

    if (response.ok) {
      console.log('Logged out successfully');
      await AsyncStorage.removeItem('userToken'); // Remove token from storage
      await AsyncStorage.clear();
      // Navigate to login screen or update state
      console.log("Token removed from storage.");
      console.log("Remaining token: ", AsyncStorage.getItem('userToken'));
    } else {
      const errorData = await response.json();
      console.error('Logout failed:', errorData.message || response.statusText);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};


// // Get current user (optional helper function)
// export const getCurrentUser = async () => {
//   try {
//     const token = await AsyncStorage.getItem('userToken');
//     if (!token) return null;

//     // Decode the token (here using base64 decoding, could be improved using a library like jwt-decode)
//     const payload = JSON.parse(atob(token.split('.')[1])); // Base64 decode payload
//     return payload.user; // Assuming the token payload contains user info
//   } catch (error) {
//     console.error('Failed to parse token:', error);
//     return null;
//   }
// };

export const fetchUserData = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken'); // Retrieve the token from AsyncStorage
    console.log('Token:', token); // Log token for debugging

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch('http://10.0.2.2:3000/api/accounts/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, // Use the Bearer token for authorization
        'Content-Type': 'application/json',
      },
    });

    console.log('Response Status:', response.status); // Log response status
    console.log('Response Headers:', response.headers); // Log response headers
    if (!response.ok) {
      const errorData = await response.json(); // Attempt to parse the error response as JSON
      const errorMessage = errorData.message || 'Unknown error'; // Use the error message if available
      throw new Error(`Failed to fetch user data: ${response.statusText || errorMessage}`);
    }

    const data = await response.json(); // Parse the response as JSON
    console.log('Fetched data:', data); // Log the fetched data for inspection

    return data; // Return the fetched user data
  } catch (error) {
    console.error('Failed to fetch user data:', error); // Log the error for debugging
    throw new Error('Unauthorized or failed to fetch user data'); // Throw a generic error
  }
};

