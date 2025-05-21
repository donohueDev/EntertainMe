// util file to support jwt implementation
// not using in current build
// import jwt from 'jsonwebtoken';


// // Decode token to extract username
// export const getUsernameFromToken = (token) => {
//   try {
//     const decoded = jwt.decode(token); // Decode the token
//     return decoded?.username || 'guest';    // Default to 'guest' if no username found
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return 'guest';
//   }
// };

// // Function to retrieve the token from AsyncStorage
// export const getToken = async () => {
//   try {
//     const token = await AsyncStorage.getItem('userToken');
//     return token;
//   } catch (error) {
//     console.error('Failed to fetch token from storage:', error);
//     return null;
//   }
// };
