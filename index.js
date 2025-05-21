/**
 * @format
 */


import React from 'react';

import App from './App.js';

import { name as appName } from './app.json';

const RootApp = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <App />
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => RootApp);
