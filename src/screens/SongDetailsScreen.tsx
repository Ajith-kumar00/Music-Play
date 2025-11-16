import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigation';
// import downloadFile from '../utils/download';

type SongDetailsRouteProp = RouteProp<RootStackParamList, "SongDetails">;

interface Props {
  route: SongDetailsRouteProp;
  navigation: any;
}

const SongDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { song } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Image source={{ uri: song.artworkUrl100 }} style={styles.image} />

      <Text style={styles.title}>{song.trackName}</Text>
      <Text style={styles.artist}>{song.artistName}</Text>

      <TouchableOpacity
        style={styles.downloadBtn}
        // onPress={() => downloadFile(song.previewUrl)}
      >
        <Text style={styles.downloadText}>Download</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SongDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", alignItems: "center", padding: 20 },
  back: { color: "#fff", fontSize: 18, marginBottom: 20 },
  image: { width: 250, height: 250, borderRadius: 10, marginBottom: 20 },
  title: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  artist: { color: "#ccc", fontSize: 18, marginBottom: 20 },
  downloadBtn: {
    backgroundColor: "#ff2d55",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  downloadText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
