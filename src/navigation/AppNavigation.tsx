import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SongListScreen from '../screens/SongListScreen';
import SongDetailsScreen from '../screens/SongDetailsScreen';
import LoginScreen from '../screens/LoginScreen';
import { Song } from '../types/song';
import { getStoredUserName } from '../storage/userStorage';

export type RootStackParamList = {
  Login: undefined;
  SongList: undefined;
  SongDetails: { song: Song };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  const [isReady, setIsReady] = useState(false);
  const [hasUser, setHasUser] = useState(false);

  useEffect(() => {
    const hydrate = async () => {
      const stored = await getStoredUserName();
      setHasUser(!!stored);
      setIsReady(true);
    };

    hydrate();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const initialRoute = hasUser ? 'SongList' : 'Login';

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SongList" component={SongListScreen} />
      <Stack.Screen name="SongDetails" component={SongDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
