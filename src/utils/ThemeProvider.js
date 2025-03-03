// // components/themeProvider.js provdes theme for app to use
// // wanted to implement a theme switcher but didnt get around to it

// import React, { createContext, useState } from 'react';

// export const ThemeContext = createContext();

// const lightTheme = {
//   backgroundColor: '#ffffff',
//   textColor: '#000000',
//   headerColor: '#f0f0f0',
// };

// const darkTheme = {
//   backgroundColor: '#000000',
//   textColor: '#ffffff',
//   headerColor: '#333333',
// };

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(lightTheme);

//   const toggleTheme = () => {
//     setTheme((prevTheme) =>
//       prevTheme === lightTheme ? darkTheme : lightTheme
//     );
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
