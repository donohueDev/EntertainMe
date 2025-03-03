// Import necessary libraries and modules
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Navigation between screens
import axios from 'axios'; // For making API requests
import AsyncStorage from '@react-native-async-storage/async-storage'; // Persistent local storage
import { useUser } from '../context/userContext'; // Access UserContext to manage user state

const LoginPage = () => {
  // State to store username and password entered by the user
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // State to store error messages and loading status
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation(); // Navigation object for screen transitions
  const { updateUser } = useUser(); // Function to update user information in UserContext

  // Function to handle the login process
  const handleLogin = async () => {
    setIsLoading(true); // Set loading status to true while processing login
    setErrorMessage(''); // Clear previous error messages

    try {
      // Send login request to the server
      const response = await axios.post('http://10.0.2.2:3000/api/accounts/login', {
        username,
        password,
      });

      // If login is successful, the server returns a userId and username
      if (response.data.userId && response.data.username) {
        // Update UserContext with user data
        updateUser({
          username: response.data.username,
          isLoggedIn: 'true',
          userId: response.data.userId.toString(),
        });
        
        console.log('USER logged in:', response.data.username);

        // Store user information in AsyncStorage for persistence
        await AsyncStorage.setItem('userId', response.data.userId.toString());
        await AsyncStorage.setItem('username', response.data.username);
        await AsyncStorage.setItem('loggedIn', 'true');

        // Clear the input fields
        setUsername('');
        setPassword('');

        // Navigate to the Account page
        navigation.navigate('Account');
      } else {
        // Display an error message if login fails
        setErrorMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      // console.error('Login failed:', error); // Log the error to the console
      setErrorMessage('Login failed. Please check your credentials.'); // Show a user-friendly error message
    } finally {
      setIsLoading(false); // Set loading status to false when the process is complete
    }
  };

  return (
    // SafeAreaView ensures the content is displayed within the safe area of the device
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        {/* Input field for username */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ccc"
          value={username}
          onChangeText={setUsername} // Update username state on text input
        />
        {/* Input field for password */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry // Hides the text input for password
          value={password}
          onChangeText={setPassword} // Update password state on text input
        />
        {/* Display error message if login fails */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        {/* Login button */}
        <Button
          title={isLoading ? 'Logging in...' : 'Login'} // Show loading text when logging in
          onPress={handleLogin} // Call handleLogin function when pressed
          disabled={isLoading} // Disable button while loading
        />
        {/* Link to navigate to the registration page */}
        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerLink}>
          <Text style={styles.registerLinkText}>Register?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles for the LoginPage component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  registerLink: {
    marginTop: 10,
  },
  registerLinkText: {
    color: '#0066cc',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginPage;
