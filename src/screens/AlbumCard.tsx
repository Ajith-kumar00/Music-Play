import React, { useEffect } from "react";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Svg, { Path } from "react-native-svg";
import { Song } from "../types/song";
import { useDownload } from "../context/DownloadContext";
import Ionicons from "react-native-vector-icons/Ionicons";

interface AlbumCardProps {
  title: string;
  artist: string;
  color: string;
  showDownload?: boolean;
  imageSource?: any;
  song?: Song;
  onPress?: () => void;
}

export default function AlbumCard({ title, artist, color, showDownload = false, imageSource, song, onPress }: AlbumCardProps) {
  const { downloadSong, checkDownloadStatus, getDownloadStatus } = useDownload();

  useEffect(() => {
    if (song) {
      checkDownloadStatus(song);
    }
  }, [song?.trackId, checkDownloadStatus]);

  const handleDownloadPress = async (e: any) => {
    e.stopPropagation();
    if (!song) return;

    const status = getDownloadStatus(song.trackId);

    if (status?.status === 'completed' || status?.status === 'downloading') {
      return;
    }

    await downloadSong(song);
  };

  const downloadState = song ? getDownloadStatus(song.trackId) : undefined;
  const currentStatus = downloadState?.status || 'idle';
  const progress = downloadState?.progress ?? 0;
  const isDownloading = currentStatus === 'downloading';
  const isDownloadedState = currentStatus === 'completed';
  const renderDownloadButton = () => {
    if (!showDownload || !song) return null;

    return (
      <TouchableOpacity
        style={[
          styles.downloadButton,
          isDownloadedState && styles.downloadButtonCompleted,
          isDownloading && styles.downloadButtonDownloading
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
          <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
        ) : (
          <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 3v9"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <Path
              d="M8 10l4 4 4-4"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M5 17h14"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </Svg>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {imageSource ? (
        <ImageBackground
          source={imageSource}
          style={styles.image}
          imageStyle={{ borderRadius: 16 }}
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            style={styles.gradient}
          />
          {renderDownloadButton()}
        </ImageBackground>
      ) : (
        <View style={[styles.image, { backgroundColor: color }]}>
          <Text style={styles.placeholderIcon}>🎵</Text>
          {renderDownloadButton()}
        </View>
      )}


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
  downloadButtonCompleted: {
    backgroundColor: "#2a5a2a",
  },
  downloadButtonDownloading: {
    backgroundColor: "#4a2a5a",
  },
  progressWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
  },
  downloadEmoji: {
    fontSize: 24,
    color: "#fff",
  },
  info: {
    backgroundColor: "#111",
    borderRadius: 10,
    padding: 12,
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
