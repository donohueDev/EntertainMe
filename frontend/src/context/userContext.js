// context/userContext.js used to establish a global context for the user upon app loading
// allows for user context to be accessed across files and pages
import React, { createContext, useContext, useState, useEffect } from 'react';

// create context using react library
const UserContext = createContext();

// export userprovider to establish link between all pages
// initialize data to be empty
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ isLoggedIn: 'false', username: '', userId: '' });
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const fetchUserData = () => {
      try {
        // Fetch individual values from localStorage
        const username = localStorage.getItem('username');
        const userId = localStorage.getItem('userId');
        const isLoggedIn = localStorage.getItem('loggedIn');

        // If all values exist, set them in the user state
        if (username && userId && isLoggedIn === 'true') {
          setUser({
            username,
            userId,
            isLoggedIn: 'true'
          });
        } else {
          setUser({
            isLoggedIn: 'false',
            username: '',
            userId: ''
          });
        }
      } catch (error) {
        console.error('Error loading user data from localStorage', error);
      } finally {
        setIsInitializing(false);
      }
    };

    fetchUserData();
  }, []);

  // Function to update user data and localStorage
  const updateUser = (newUser) => {
    try {
      // Ensure isLoggedIn is always a string 'true' or 'false'
      const updatedUser = {
        ...newUser,
        isLoggedIn: newUser.isLoggedIn ? 'true' : 'false'
      };
      
      setUser(updatedUser);
      
      // Save to localStorage
      localStorage.setItem('username', updatedUser.username || '');
      localStorage.setItem('userId', updatedUser.userId || '');
      localStorage.setItem('loggedIn', updatedUser.isLoggedIn);
    } catch (error) {
      console.error("Error updating user data in localStorage", error);
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