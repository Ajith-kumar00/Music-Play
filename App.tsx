import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DownloadProvider } from './src/context/DownloadContext';

const App = () => {
  return (
     <GestureHandlerRootView style={{ flex: 1 }}>
       <DownloadProvider>
         <NavigationContainer>
           <AppNavigation />
         </NavigationContainer>
       </DownloadProvider>
     </GestureHandlerRootView>
    
  );
};

export default App;
