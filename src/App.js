// import necessary libraries/modules for react native
import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler'; // Required for navigation gestures in React Native
import { NavigationContainer, DarkTheme } from '@react-navigation/native'; // Navigation container for app navigation and dark theme
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Bottom tab navigator for app tabs
import { ActivityIndicator, View } from 'react-native'; // Components for loading indicator and view layout
import Icon from 'react-native-vector-icons/FontAwesome'; // Icon library for tab icons
import { UserProvider, useUser } from './context/userContext'; // Custom context provider for user authentication

// import pages to use in app 
import HomePage from './pages/HomePage'; // Home page component
import GameDetailPage from './pages/gameDetailPage'; // Game details page component
import SearchPage from './pages/searchPage'; // Search page component
import SignIn from './pages/LoginPage'; // Sign-in page component
import Register from './pages/RegisterPage'; // Register page component
import Dashboard from './pages/AccountDashboard'; // Account dashboard page component

// create tab navigator 
const Tab = createBottomTabNavigator();

// Main App Navigator (Tab Navigation)
const AppNavigator = () => {
  // initialize user to null for testing purposes, user should maintain after app closing in normal circumstances
  const { user, isInitializing } = useUser(null);  // Get user context and initialization state
  const [isReady, setIsReady] = useState(false); // State to track when app is ready to render

  useEffect(() => {
    // Wait for the user context to initialize before displaying the app UI
    if (!isInitializing) {
      setIsReady(true); // Set the app as ready once the initialization is done
    }
  }, [isInitializing]); // Re-run when isInitializing changes

  /* Display loading spinner */
  if (isInitializing || !isReady) {
    // Show a loading screen while the user context is being initialized
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
        <ActivityIndicator size="large" color="#ffffff" /> 
      </View>
    );
  }

  // decide what screens to use screens based on the login state
  const AccountScreen = user.isLoggedIn === 'true' ? Dashboard : SignIn; // If user is logged in, show Dashboard, else show SignIn page

  return (
    <NavigationContainer theme={DarkTheme}> 
      <Tab.Navigator
        initialRouteName="Home" // Set default screen to Home
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#121212', 
            paddingBottom: 10, 
            height: 70, 
          },
          tabBarActiveTintColor: '#fff', 
          tabBarInactiveTintColor: '#d3d3d3', 
          tabBarIconStyle: { paddingBottom: 5 }, 
        }}
      >
        {/* Tab for HomePage */}
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />, // Icon for the Home tab
          }}
        />
        {/* Tab for GameDetailPage, no tab button and header is shown */}
        <Tab.Screen
          name="GameDetail"
          component={GameDetailPage}
          options={{ tabBarButton: () => null, headerShown: true }} // Hide tab button and show header for this screen
        />
        {/* Tab for SearchPage */}
        <Tab.Screen
          name="Search"
          component={SearchPage}
          options={{
            tabBarLabel: 'Search', 
            tabBarIcon: ({ color, size }) => <Icon name="search" color={color} size={size} />, // Icon for the Search tab
          }}
        />
        {/* Tab for Register, no tab button and header is shown */}
        <Tab.Screen
          name="Register"
          component={Register}
          options={{ tabBarButton: () => null, headerShown: true }} 
        />
        {/* Tab for Account page (conditional based on user login) */}
        <Tab.Screen
          name="Account"
          component={AccountScreen}  // Account tab redirects based on user login state
          options={{
            tabBarLabel: 'Account', 
            tabBarIcon: ({ color, size }) => <Icon name="user" color={color} size={size} />, 
          }}
          key={user?.id ? `account-${user.id}` : 'account-logged-out'} // Force re-mount on login/logout
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// Wrap AppNavigator in UserProvider to manage user state across the app
const App = () => (
  <UserProvider>
    <AppNavigator />
  </UserProvider>
);

export default App; // Export the app component as the default export
