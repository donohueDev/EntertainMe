// registerpage.js almost identical to login page just uses different routing
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useUser } from '../context/userContext'; // Import the context hook
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  // Use the context's updateUser function
  const { updateUser } = useUser();

  const handleRegister = async () => {
    console.log("Register button pressed, making API call...");

    // check for user entry - super basic for now will improve later
    if (!email || !username || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    // post route to register user
    try {
      const response = await axios.post('http://10.0.2.2:3000/api/accounts/register', {
        email,
        username,
        password,
      });

      console.log('Registration response:', response.data);

      // if successful update user context with new data 
      if (response.data && response.data.userId && response.data.username) {
        // Update the user context with the registered user data
        updateUser({
          userId: response.data.userId,
          username: response.data.username,
          isLoggedIn: 'true'
        });

        // store user data in AsyncStorage for persistence
        await AsyncStorage.setItem('userId', response.data.userId.toString());
        await AsyncStorage.setItem('username', response.data.username);
        await AsyncStorage.setItem('loggedIn', 'true');
        // Navigate to home screen after successful registration
        navigation.navigate('Home');
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
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ccc"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <Button
          title={isLoading ? 'Registering...' : 'Register'}
          onPress={handleRegister}
          disabled={isLoading}
        />
      </View>
    </SafeAreaView>
  );
};

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
});

export default RegisterPage;
