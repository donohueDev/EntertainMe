// Import necessary libraries and modules
import React, { useEffect, useState } from 'react';
import { Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios'; // For making API requests
import AsyncStorage from '@react-native-async-storage/async-storage'; // To manage persistent local storage

const HomePage = ({ navigation }) => {
  // State to store the list of games fetched from the API
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      // Retrieve login status and username from AsyncStorage
      const status = await AsyncStorage.getItem('loggedIn');
      const user = await AsyncStorage.getItem('username');
      console.log("Login status at home page:", status);
      console.log("User in storage on home page:", user);
      try {
        // Fetch the most recently updated games from the server
        const response = await axios.get('http://10.0.2.2:3000/api/games/recent');
        setGames(response.data.games); // Update the state with the retrieved games
      } catch (error) {
        console.error("Failed to fetch games:", error); // Log any errors
      }
    };

    fetchGames(); // Call the function to fetch games when the component mounts
  }, []);

  // Render each game item in the FlatList
  const renderGameItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.gameItem} 
        onPress={() => navigation.navigate('GameDetail', { game: item })} // Navigate to GameDetail page with the game data
      >
        {/* Display the game's thumbnail image */}
        <Image
          source={{ uri: item.background_image }}
          style={styles.thumbnail}
        />
        {/* Display the game's title */}
        <Text style={styles.gameTitle}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    // FlatList to display the games in a grid format
    <FlatList
      data={games} // Provide the list of games as data
      keyExtractor={(item) => item.id.toString()} // Use game ID as the unique key
      renderItem={renderGameItem} // Render each game item using renderGameItem function
      contentContainerStyle={styles.container} // Apply styles to the FlatList container
      numColumns={3} // Display items in 3 columns
    />
  );
};

// Styles for the HomePage component
const styles = StyleSheet.create({
  container: {
    padding: 8, // Padding around the FlatList container
  },
  gameItem: {
    flex: 1,
    alignItems: 'center', // Center items horizontally
    margin: 8, // Space around each game item
  },
  thumbnail: {
    width: 125, // Width of the game thumbnail
    height: 150, // Height of the game thumbnail
    borderRadius: 8, // Rounded corners for the thumbnail
    resizeMode: 'cover', // Scale the image to cover its container
  },
  gameTitle: {
    fontSize: 14, // Font size for the game title
    marginTop: 8, // Space above the game title
    fontWeight: 'bold', // Bold text for the title
    textAlign: 'center', // Center align the title
    color: '#ffffff', // White text color
  },
});

export default HomePage;