import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const BottomNav = () => {
  const [active, setActive] = useState("Home");

  const tabs = [
    { key: "Home", label: "Home", icon: HomeIcon },
    { key: "Album", label: "Album", icon: AlbumIcon },
    { key: "MyMusic", label: "My Music", icon: MusicIcon },
    { key: "Profile", label: "Profile", icon: ProfileIcon },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const IconComp = tab.icon;
        const isActive = active === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => setActive(tab.key)}
          >
            <IconComp stroke={isActive ? "#ff2d72" : "#fff"} />

            <Text
              style={[
                styles.label,
                { color: isActive ? "#ff2d72" : "#fff" },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNav;

const HomeIcon = ({ stroke }:any) => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 10l9-7 9 7v10a1 1 0 01-1 1h-5V14H9v7H4a1 1 0 01-1-1V10z"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const AlbumIcon = ({ stroke }:any) => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 4a5 5 0 110 10 5 5 0 010-10z"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MusicIcon = ({ stroke }:any) => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm12-2a3 3 0 100 6 3 3 0 000-6z"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ProfileIcon = ({ stroke }:any) => (
  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 0114 0H5z"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 30,
    justifyContent: "space-around",
  
  },

  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    borderRadius: 20,
  },

  activeTab: {
    backgroundColor: "#2b0f20",
  },

  label: {
    fontSize: 12,
    marginTop: 4,
  },
});
