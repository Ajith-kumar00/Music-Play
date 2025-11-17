import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'music_app_user_name';

export const setStoredUserName = async (name: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_KEY, name.trim());
  } catch (error) {
    console.error('Error saving username', error);
    throw error;
  }
};

export const getStoredUserName = async (): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(USER_KEY);
    return value;
  } catch (error) {
    console.error('Error reading username', error);
    return null;
  }
};

export const clearStoredUserName = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Error clearing username', error);
  }
};

