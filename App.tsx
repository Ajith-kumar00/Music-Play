import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
     <GestureHandlerRootView style={{ flex: 1 }}>
     <NavigationContainer>
         <AppNavigation />
       </NavigationContainer>
     </GestureHandlerRootView>
    
  );
};

export default App;
