import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SongListScreen from '../screens/SongListScreen';
import SongDetailsScreen from '../screens/SongDetailsScreen';
import { Song } from '../types/song';

export type RootStackParamList = {
  SongList: undefined;
  SongDetails: { song: Song };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SongList" component={SongListScreen} />
      <Stack.Screen name="SongDetails" component={SongDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
