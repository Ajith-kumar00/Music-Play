import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Song } from '../types/song';
import Svg, { Path } from "react-native-svg";
import { useDownload } from '../context/DownloadContext';

interface Props {
  song: Song;
  onPress: () => void;
}

const SongItem: React.FC<Props> = ({ song, onPress }) => {
  const { downloadSong, checkDownloadStatus, getDownloadStatus } = useDownload();

  useEffect(() => {
    checkDownloadStatus(song);
  }, [song.trackId, checkDownloadStatus]);

  const handleDownloadPress = async (e: any) => {
    e.stopPropagation();
    const status = getDownloadStatus(song.trackId);
    
    if (status?.status === 'completed' || status?.status === 'downloading') {
      return;
    }

    await downloadSong(song);
  };

  const downloadState = getDownloadStatus(song.trackId);
  const currentStatus = downloadState?.status || 'idle';
  const progress = downloadState?.progress ?? 0;
  const isDownloading = currentStatus === 'downloading';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: song.artworkUrl60 }} style={styles.image} />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{song.trackName}</Text>
        <Text style={styles.artist}>{song.artistName}</Text>
      </View>

      <TouchableOpacity 
        style={[
          styles.downloadButton,
          currentStatus === 'completed' && styles.downloadButtonCompleted,
          currentStatus === 'downloading' && styles.downloadButtonDownloading
        ]}
        onPress={handleDownloadPress}
        disabled={currentStatus === 'downloading'}
      >
        {isDownloading ? (
          <View style={styles.progressWrapper}>
            <ActivityIndicator size="small" color="#ff2d72" />
            <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
          </View>
        ) : currentStatus === 'completed' ? (
          <Svg width={30} height={30} viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm-1 15-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"
              fill="#4CAF50"
            />
          </Svg>
        ) : (
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
        )}
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
  downloadButtonCompleted: {
    backgroundColor: "#1a3a1a",
  },
  downloadButtonDownloading: {
    backgroundColor: "#2a1a3a",
  },
  progressWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressText: {
    color: "#ff2d72",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
  },

  image: { width: 60, height: 60, borderRadius: 6, marginRight: 10 },
  title: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  artist: { color: "#aaa", fontSize: 14 },
  download: { color: "#ff2d55", fontSize: 26, fontWeight: "bold" },
});
