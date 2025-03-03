// accountDashboard.js is used to display reviewed games to user
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { useUser } from '../context/userContext'; // Only import useUser
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const AccountDashboard = () => {
  // useState used to declare and manage state variables which change with user interaction
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigation = useNavigation();
  const { updateUser } = useUser(); // Destructure updateUser correctly

  // we use useEffect to perform side effects like data fetching/logging
  useEffect(() => {
    // getUserData runs once when component is mounted with an empty dependency array
    const getUserDataFromStorage = async () => {
      try {
        // we store necessary login information with values obtained from async storage
        const storedUserId = await AsyncStorage.getItem('userId');
        const storedUsername = await AsyncStorage.getItem('username');
        const storeLogin = await AsyncStorage.getItem('loggedIn');

        // if the login variable is set to true then we update the user context
        if (storeLogin === 'true' && storedUserId) {
          setUser({ id: storedUserId, username: storedUsername });
        } else {
          // if not logged in we set user context to null and show popup
          setUser(null);
          setGames([]);
          showLoginPopup();  // Show the login popup if the user is not logged in
        }
      } catch (err) {
        console.error('Failed to load user data:', err);
        setError('Failed to load user data.');
      } finally {
        // once processed set loading state to false
        setLoading(false);
      }
    };

    getUserDataFromStorage();
  }, []);

  // we use focus effect so that the page refetches games ever time we navigate to the page
  // is called when page is loaded or user changes
  useFocusEffect(
    React.useCallback(() => {
      if (user?.id) {
        fetchUserGames(user.id);  // allows page to update list of reviewed games
      }
    }, [user])
  );

  // this function fetches all games reviewed by the user using backend route 
  const fetchUserGames = async (userId) => {
    try {
      setGames([]); // Clear previous games
      const response = await axios.get(`http://10.0.2.2:3000/api/userGames/${userId}/games`);
      
      // If response data exists and is an array, update the games state
      if (Array.isArray(response.data)) {
        setGames(response.data); // If there are no games, response.data will be an empty array
      } else {
        setGames([]); // If the response is not an array, set to an empty array
      }
    } catch (error) {
      console.error('Failed to fetch user games:', error);
      setError('Failed to load user games. Please try again.');
    }
  };

  // function used to logout user - clears async storage and updates user context
  const logoutUser = async () => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.clear();
      await AsyncStorage.setItem('loggedIn', 'false');

      // Update user context to reflect logout
      updateUser({ id: null, username: null, isLoggedIn: 'false' });

      // Clear games and other related states
      setGames([]);
      setFilteredGames([]);
      setStatusFilter('all');

      // Navigate to Home screen or Login screen
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // effect runs when user changes 
  useEffect(() => {
    console.log("User information after logout:", user);
  }, [user]);

  // use effect to run when status filter is changed or games list changes
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredGames(games); // Show all games when filter is "all"
    } else {
      setFilteredGames(games.filter((game) => game.user_status === statusFilter)); // Filter based on user status
    }
  }, [games, statusFilter]);

  // alert used when user tries to review game without being logged in or gets to dashboard without being signed in through a bug
  const showLoginPopup = () => {
    Alert.alert(
      'Login Required',
      'You need to log in to access this page.',
      [
        { text: 'Cancel', onPress: () => navigation.goBack() },
        { text: 'Login', onPress: () => navigation.navigate('Account') },
      ]
    );
  };

  // loading text to display 
  if (loading) return <Text>Loading...</Text>;

  // if theres an erorr display error message with option to navigate to account page to try again 
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>{error}</Text>
        <Button title="Login?" onPress={() => navigation.navigate('Account')} />
      </View>
    );
  }

  // main content for dashboard view
  return (
    <View style={styles.dashboardContainer}>
      {/* Display a personalized welcome message using the user's username */}
      <Text style={styles.welcomeText}>Welcome, {user?.username}!</Text>
      
      {/* Dropdown filter to select the status of games to display */}
      <DropDownPicker
        open={dropdownOpen} // Tracks if the dropdown is open
        value={statusFilter} // Currently selected filter value
        items={[
          { label: 'All Games', value: 'all' },
          { label: 'Played', value: 'played' },
          { label: 'Currently Playing', value: 'playing' },
        ]}
        setOpen={setDropdownOpen} // Updates dropdown open state
        setValue={setStatusFilter} // Updates the selected filter value
        placeholder="Filter by status" // Placeholder text for the dropdown
        style={styles.dropdown} 
        dropDownContainerStyle={styles.dropdownContainer}
      />
      
      {/* Display a message if no games match the filter or display games using flatlist */}
      {filteredGames.length === 0 ? (
        <Text style={styles.welcomeText}>
          No games found. Please submit a review and come back here to view.
        </Text>
      ) : (
        <FlatList
          data={filteredGames} // Array of games to display
          keyExtractor={(item) => item.id.toString()} // Unique key for each list item
          renderItem={({ item }) => (
            // Display each game as a card with its details
            <View style={styles.gameCard}>
              <Text style={styles.gameTitle}>{item.name}</Text>
              <Image source={{ uri: item.background_image || 'https://eagle-sensors.com/hbc-power-control-solutions/unavailable-image/'  }} style={styles.gameImage} />
              <Text>Status: {item.user_status || 'N/A'}</Text>
              <Text>Rating: {item.user_rating || 'N/A'}</Text>
            </View>
          )}
        />
      )}
  
      {/* Logout button to log out the user */}
      <Button title="Logout" onPress={logoutUser} />
    </View>
  );
          };

// style sheet for account page
const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  dropdown: {
    width: '80%',
    marginBottom: 15,
    alignSelf: 'center',
    backgroundColor: '#fff', 
    borderColor: '#ccc',
  },
  dropdownContainer: {
    width: '80%',
    alignSelf: 'center', 
    borderColor: '#ccc',
    backgroundColor: '#fff', 
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  gameCard: {
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: '100%',
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  gameImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default AccountDashboard;
