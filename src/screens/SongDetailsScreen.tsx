import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useDownload } from "../context/DownloadContext";

export default function SongDetailsScreen({ route, navigation }: any) {
  const { song } = route.params;
  const insets = useSafeAreaInsets();
  const { downloadSong, checkDownloadStatus, getDownloadStatus } = useDownload();

  useEffect(() => {
    checkDownloadStatus(song);
  }, [song.trackId, checkDownloadStatus]);

  const handleDownloadPress = async () => {
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
  const isDownloadedState = currentStatus === 'completed';

  return (
    <LinearGradient
      colors={["#000", "#0a0a0a"]}
      style={{ flex: 1, paddingTop: insets.top }}
    >
      <SafeAreaView style={styles.safe}>

        <View style={styles.topBar}>
          <TouchableOpacity style={styles.topBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.topTitle}>Now Playing</Text>

          <TouchableOpacity style={styles.topBtn}>
            <Ionicons name="heart-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.albumWrapper}>
          <Image
            source={{ uri: song.artworkUrl100 }}
            style={styles.album}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.title}>{song.trackName}</Text>
        <Text style={styles.artist}>{song.artistName}</Text>

        <View style={styles.tagsRow}>
          <Text style={styles.tag}>Cosmic Flow</Text>
          <Text style={styles.tagDot}>•</Text>
          <Text style={styles.tag}>Synth Pop</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>

          <View style={styles.timeRow}>
            <Text style={styles.time}>0:52</Text>
            <Text style={styles.time}>3:08</Text>
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity 
            style={[
              styles.controlBtn,
              isDownloadedState && styles.controlBtnCompleted,
              isDownloading && styles.controlBtnDownloading
            ]}
            onPress={handleDownloadPress}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <View style={styles.progressWrapper}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
              </View>
            ) : isDownloadedState ? (
              <Ionicons name="checkmark-circle" size={22} color="#4CAF50" />
            ) : (
              <Ionicons name="cloud-download-outline" size={22} color="#fff" />
            )}
          </TouchableOpacity>

          <View style={styles.playBtn}>
            <Ionicons name="play" size={26} color="#fff" />
          </View>
        </View>

        <View style={[styles.bottomNav, { paddingBottom: insets.bottom + 5 }]}>
          <TouchableOpacity style={styles.navBtn}>
            <Ionicons name="stats-chart-outline" size={22} color="#aaa" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navBtn}>
            <Ionicons name="list-outline" size={22} color="#aaa" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navBtn}>
            <Ionicons name="share-social-outline" size={22} color="#aaa" />
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },

  topBar: {
    width: "100%",
    height: 60,
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  topBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  topTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  albumWrapper: {
    marginTop: 18,
    alignSelf: "center",
    padding: 3,
    borderRadius: 14,
    borderWidth: 1.3,
    borderColor: "#ff2d55",
  },
  album: {
    width: 260,
    height: 260,
    borderRadius: 14,
  },

  title: {
    marginTop: 22,
    fontSize: 26,
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },
  artist: {
    color: "#c4c4c4",
    fontSize: 15,
    textAlign: "center",
    marginTop: 4,
  },

  tagsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  tag: {
    color: "#d1d1d1",
    fontSize: 13,
  },
  tagDot: {
    marginHorizontal: 8,
    color: "#d1d1d1",
  },

  progressContainer: {
    marginTop: 25,
    paddingHorizontal: 25,
  },
  progressTrack: {
    height: 5,
    backgroundColor: "#333",
    borderRadius: 3,
  },
  progressFill: {
    width: "22%",
    height: 5,
    backgroundColor: "#ff2d55",
    borderRadius: 3,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  time: {
    color: "#aaa",
    fontSize: 12,
  },

  controls: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 28,
    marginRight:50
  },
  controlBtn: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: "#ff2d55",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#ff2d55",
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },
  controlBtnCompleted: {
    backgroundColor: "#2a5a2a",
    shadowColor: "#2a5a2a",
  },
  controlBtnDownloading: {
    backgroundColor: "#4a2a5a",
    shadowColor: "#4a2a5a",
  },
  progressWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  playBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ff2d55",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#ff2d55",
    shadowOpacity: 0.9,
    shadowRadius: 20,
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    backgroundColor: "#0d0d0d",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderWidth:1,
    borderColor:"rgb(54, 53, 53)",
  },
  navBtn: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
});
