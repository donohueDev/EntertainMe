// context/userContext.js used to establish a global context for the user upon app loading
// allows for user context to be accessed across files and pages
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// create context using react library
const UserContext = createContext();

// export userprovider to establish link between all pages
// initialize data to be empty
export const UserProvider = ({ children }) => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Verify token is valid by attempting to decode it
          const decoded = jwtDecode(token);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const getUserInfo = () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      return jwtDecode(token);
    } catch (error) {
      console.error('Error getting user info:', error);
      return null;
    }
  };

  // setup formatting for user context provider to be used in app.js
  return (
    <UserContext.Provider value={{ 
      isAuthenticated, 
      isInitializing,
      login,
      logout,
      getUserInfo
    }}>
      {children}
    </UserContext.Provider>
  );
};

// set user context on export
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};