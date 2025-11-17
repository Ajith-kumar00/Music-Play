import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Song } from '../types/song';
// import downloadFile from '../utils/download';
import Svg, { Path } from "react-native-svg";

interface Props {
  song: Song;
  onPress: () => void;
}

const SongItem: React.FC<Props> = ({ song, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: song.artworkUrl60 }} style={styles.image} />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{song.trackName}</Text>
        <Text style={styles.artist}>{song.artistName}</Text>
      </View>

      <TouchableOpacity style={styles.downloadButton}>
        <Svg width={30} height={30} viewBox="0 0 24 24" fill="none">

          <Path
            d="M12 4v8"
            stroke="#ff2d72"
            strokeWidth={2.8}
            strokeLinecap="round"
          />
          <Path
            d="M8 10l4 4 4-4"
            stroke="#ff2d72"
            strokeWidth={2.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <Path
            d="M6 16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2"
            stroke="#ff2d72"
            strokeWidth={2.8}
            strokeLinecap="round"
          />
        </Svg>
      </TouchableOpacity>

    </TouchableOpacity>
  );
};

export default SongItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  downloadButton: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#220814",
    justifyContent: "center",
    alignItems: "center",
  },

  image: { width: 60, height: 60, borderRadius: 6, marginRight: 10 },
  title: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  artist: { color: "#aaa", fontSize: 14 },
  download: { color: "#ff2d55", fontSize: 26, fontWeight: "bold" },
});
