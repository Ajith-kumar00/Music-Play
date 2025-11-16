import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Song } from '../types/song';
// import downloadFile from '../utils/download';

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

      <TouchableOpacity>
        <Text style={styles.download}>⬇</Text>
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
  image: { width: 60, height: 60, borderRadius: 6, marginRight: 10 },
  title: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  artist: { color: "#aaa", fontSize: 14 },
  download: { color: "#ff2d55", fontSize: 26, fontWeight: "bold" },
});
