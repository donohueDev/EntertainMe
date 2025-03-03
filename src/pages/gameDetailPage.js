import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Alert, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native'; 
import { useUser } from '../context/userContext'; // Use the updated user context hook

// need to add logic to reset starRating and dropdown item list on navigation to page

// Component for displaying detailed information about a game
const GameDetailPage = ({ route }) => {
  const { game } = route.params; // Retrieve the game object passed as a parameter
  const [rating, setRating] = useState(0); // State to store the user's rating
  const [status, setStatus] = useState('not played'); // State to store the game status
  const [open, setOpen] = useState(false); // State to control the dropdown visibility
  const [items, setItems] = useState([
    { label: 'Playing', value: 'playing' },
    { label: 'Planned', value: 'planned' },
    { label: 'Played', value: 'played' },
    { label: 'Not Played', value: 'not played' }
  ]); // Dropdown items for game statuses

  const { user } = useUser(); // Access the logged-in user context
  const navigation = useNavigation(); // Hook for navigation between screens

  // Log user context updates for debugging purposes
  useEffect(() => {
    console.log('User context updated:', user);
  }, [user]);

  // Function to handle the submission of the user's rating and status
  const handleRating = async () => {
    console.log('Rating:', rating, 'Status:', status); // Log the current rating and status

    // Validate that the game status is appropriate for submitting a rating
    if (status === 'not played' || status === 'planned') {
      Alert.alert(
        'Incomplete Submission', 
        'Status must be set to played or playing before submitting your rating.'
      );
      return;
    }

    // Check if the user is logged in; prompt login if necessary
    if (user.isLoggedIn === 'false') {
      Alert.alert(
        'Login Required',
        'You need to log in before submitting a rating.',
        [
          { text: 'Exit', onPress: () => navigation.goBack() }, // Navigate back
          { text: 'Login', onPress: () => navigation.navigate('Account') }, // Navigate to login
        ]
      );
      return;
    }

    // Attempt to send the rating and status to the backend
    try {
      const response = await fetch('http://10.0.2.2:3000/api/userGames/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          gameId: game.id,
          rating: Math.round(rating), // Round the rating to the nearest integer
          status,
        }),
      });

      // Handle non-successful server responses
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from server:', errorText);
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json(); // Parse the server response
      Alert.alert('Success', 'Rating submitted successfully!'); // Notify the user
      console.log('Rating submitted successfully:', data.message); // Log the response
    } catch (error) {
      console.error('Error submitting rating:', error.message || error); // Log any errors
    }
  };

  return (
    <View style={styles.container}>
      {/* Display the game title */}
      <Text style={styles.title}>{game.name}</Text>

      {/* Display the game image */}
      <Image 
        source={{ uri: game.background_image }} 
        style={styles.image} 
      />

      {/* Dropdown for selecting game status */}
      <Text style={styles.label}>Set your game status:</Text>
      <DropDownPicker
        open={open} // Dropdown open state
        value={status} // Selected status value
        items={items} // Status options
        setOpen={setOpen} // Update dropdown open state
        setValue={setStatus} // Update selected status value
        setItems={setItems} // Update dropdown items
        containerStyle={styles.dropdownContainer} 
        style={styles.dropdown} 
        dropDownStyle={styles.dropdownMenu}
      />

      {/* Rating widget for submitting a game rating */}
      <Text style={styles.label}>Rate this game:</Text>
      <StarRating
        rating={rating} // Current rating value
        onChange={(newRating) => setRating(Math.round(newRating))} // Update rating state
        starSize={65} // Size of the stars
        style={styles.rating} 
        emptyColor="#888" // Color for empty stars
      />

      {/* Button to submit the rating */}
      <TouchableOpacity onPress={handleRating} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit Rating</Text>
      </TouchableOpacity>

      {/* Display the game description */}
      <Text style={styles.description}>{game.description}</Text>
    </View>
  );

  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212', 
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white',
  },
  label: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  rating: {
    marginBottom: 20,
  },
  dropdownContainer: {
    width: '100%',
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: '#333',
    borderColor: '#555',
    borderWidth: 1,
  },
  dropdownMenu: {
    backgroundColor: '#222',
    borderColor: '#555',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  description: {
    marginTop: 20,
    color: 'white',
    fontSize: 16,
  },
});

export default GameDetailPage;
