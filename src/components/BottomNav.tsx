import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BottomNav: React.FC = () => {
  return (
    <View style={styles.nav}>
      <Text style={styles.item}>🏠</Text>
      <Text style={styles.item}>🎵</Text>
      <Text style={styles.item}>📁</Text>
      <Text style={styles.item}>👤</Text>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    backgroundColor: "#111",
    justifyContent: "space-around",
    padding: 15,
    borderRadius: 20,
  },
  item: { color: "#fff", fontSize: 24 },
});
