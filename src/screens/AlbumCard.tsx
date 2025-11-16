import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface AlbumCardProps {
  title: string;
  artist: string;
  color: string;
  showDownload?: boolean;
  imageSource?: any;
}

export default function AlbumCard({ title, artist, color, showDownload = false, imageSource }: AlbumCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      {imageSource ? (
        <ImageBackground
          source={imageSource}
          style={styles.image}
          imageStyle={{ borderRadius: 16 }}
        >
          {/* <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            style={styles.gradient}
          /> */}
          {showDownload && (
            <View style={styles.downloadButton}>
              <Text style={styles.downloadEmoji}>⬇️</Text>
            </View>
          )}
        </ImageBackground>
      ) : (
        <View style={[styles.image, { backgroundColor: color }]}>
          <Text style={styles.placeholderIcon}>🎵</Text>
          {showDownload && (
            <View style={styles.downloadButton}>
              <Text style={styles.downloadEmoji}>⬇️</Text>
            </View>
          )}
        </View>
      )}

      {/* Album Info */}
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.artist}>{artist}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    marginRight: 15,
    backgroundColor: "#111",
    borderRadius: 16,
    paddingBottom: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    position: "relative",
  },
  placeholderIcon: {
    fontSize: 60,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
  },
  downloadButton: {
    position: "absolute",
    right: 12,
    bottom: 12,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ff4d82",
    justifyContent: "center",
    alignItems: "center",
  },
  downloadEmoji: {
    fontSize: 24,
    color: "#fff",
  },
  info: {
    backgroundColor: "#111",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#333",
    marginTop: 10,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  artist: {
    color: "#aaa",
    fontSize: 14,
  },
});
