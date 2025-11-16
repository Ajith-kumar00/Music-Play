import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search songs..."
        placeholderTextColor="#888"
        style={styles.input}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: { color: "#fff", fontSize: 16 },
});
