// context/userContext.js used to establish a global context for the user upon app loading 
// allows for user context to be accessed across files and pages 
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create cotext using react library
const UserContext = createContext();

// export userprovider to establish link between all pages 
// initialize data to be empty 
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ isLoggedIn: 'false', username: '', userId: '' });
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch individual values from AsyncStorage
        const username = await AsyncStorage.getItem('username');
        const userId = await AsyncStorage.getItem('userId');
        const isLoggedIn = await AsyncStorage.getItem('loggedIn');

        // If all values exist, set them in the user state
        if (username && userId && isLoggedIn) {
          setUser({
            username,
            userId,
            isLoggedIn: isLoggedIn === 'true' 
          });
        } else {
          setUser({
            isLoggedIn: 'false',
            username: '',
            userId: ''
          });
        }
      } catch (error) {
        console.error("Error loading user data from AsyncStorage", error);
      } finally {
        setIsInitializing(false);
      }
    };

    fetchUserData();
  }, []);

  // Function to update user data and AsyncStorage
  const updateUser = async (newUser) => {
    try {
      setUser(newUser);
      // Save to AsyncStorage
      await AsyncStorage.setItem('username', newUser.username);
      await AsyncStorage.setItem('userId', newUser.userId);
      await AsyncStorage.setItem('loggedIn', newUser.isLoggedIn ? 'true' : 'false');
    } catch (error) {
      // was getting this error and program was functioning as intended so i removed the log
      //console.error("Error updating user data in AsyncStorage", error);
    }
  };

  // setup formatting for user context provider to be used in app.js
  return (
    <UserContext.Provider value={{ user, setUser, updateUser, isInitializing }}>
      {children}
    </UserContext.Provider>
  );
};

// set user context on export
export const useUser = () => useContext(UserContext);
