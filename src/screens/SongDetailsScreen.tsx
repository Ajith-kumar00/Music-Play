import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function SongDetailsScreen({ route, navigation }:any) {
  const { song } = route.params;

  return (
    <LinearGradient
      colors={["#0d0d0d", "#000"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe}>

        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.topBtn}>
            <Text style={styles.icon}>←</Text>
          </TouchableOpacity>

          <Text style={styles.nowPlaying}>Now Playing</Text>

          <TouchableOpacity style={styles.topBtn}>
            <Text style={styles.icon}>♡</Text>
          </TouchableOpacity>
        </View>

        {/* Album Art */}
        <View style={styles.albumWrapper}>
          <Image
            source={{ uri: song.artworkUrl100 }}
            style={styles.album}
          />
        </View>

        {/* Title + Artist */}
        <Text style={styles.title}>{song.trackName}</Text>
        <Text style={styles.artist}>{song.artistName}</Text>

        {/* Tags */}
        <View style={styles.tags}>
          <Text style={styles.tag}>Cosmic Flow</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.tag}>Synth Pop</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>

          <View style={styles.timeRow}>
            <Text style={styles.time}>0:52</Text>
            <Text style={styles.time}>3:08</Text>
          </View>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.bottomBtn}>
            <Text style={styles.bottomIcon}>📚</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomBtn}>
            <Text style={styles.bottomIcon}>🎶</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomBtn}>
            <Text style={styles.bottomIcon}>🔗</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe: {
    flex: 1,
    paddingHorizontal: 20,
  },

  /* TOP BAR */
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 20,
  },
  topBtn: {
    padding: 10,
  },
  icon: {
    fontSize: 24,
    color: "#fff",
  },
  nowPlaying: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  /* ALBUM */
  albumWrapper: {
    alignSelf: "center",
    borderRadius: 20,
    overflow: "hidden",
    padding: 5,
    backgroundColor: "#120010",
  },
  album: {
    width: 280,
    height: 280,
    borderRadius: 20,
  },

  /* TEXT */
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 25,
  },
  artist: {
    color: "#bbb",
    fontSize: 18,
    textAlign: "center",
    marginTop: 5,
  },

  /* TAGS */
  tags: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
  },
  tag: {
    color: "#ccc",
    fontSize: 14,
  },
  dot: {
    color: "#ccc",
    marginHorizontal: 8,
  },

  /* PROGRESS */
  progressContainer: {
    width: "100%",
    marginTop: 30,
  },
  progressBar: {
    width: "100%",
    height: 5,
    backgroundColor: "#333",
    borderRadius: 3,
  },
  progressFill: {
    width: "25%",
    height: 5,
    backgroundColor: "#ff2d55",
    borderRadius: 3,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  time: {
    color: "#aaa",
    fontSize: 12,
  },

  /* BOTTOM */
  bottomBar: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  bottomBtn: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomIcon: {
    fontSize: 24,
    color: "#fff",
  },
});
