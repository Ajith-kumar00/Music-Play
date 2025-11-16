import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { fetchSongs } from '../api/songs';
import { Song } from '../types/song';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import SongItem from '../components/SongItem';
import BottomNav from '../components/BottomNav';
import AlbumCard from './AlbumCard';

type SongListNavProp = StackNavigationProp<RootStackParamList, 'SongList'>;

interface Props {
  navigation: SongListNavProp;
}

const SongListScreen: React.FC<Props> = ({ navigation }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [recentlyPlayed] = useState<Song[]>([]);

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    const data = await fetchSongs("romance");
    setSongs(data);
  };

  // Generate colors for album cards
  const colors = ["#1E3A8A", "#8B0000", "#4A4A4A", "#2D5016", "#5A1E5A", "#8B4513"];

  // Create album cards dynamically from songs data
  const albumCards = useMemo(() => {
    return songs.slice(0, 6).map((song, index) => ({
      id: song.trackId,
      title: song.trackName,
      artist: song.artistName,
      color: colors[index % colors.length],
      showDownload: true,
      artworkUrl: song.artworkUrl100 || song.artworkUrl60,
    }));
  }, [songs]);

  const renderHeader = () => (
    <View>
          {/* Promotional Banner */}
      <View style={styles.promoBanner}>
        <View style={styles.promoContent}>
          <View style={styles.promoLeft}>
            <Text style={styles.promoPercent}>40%</Text>
            <Text style={styles.promoOff}>OFF</Text>
            <Text style={styles.promoText}>Get Unlimited{'\n'}Download</Text>
            <TouchableOpacity style={styles.premiumButton}>
              <Text style={styles.premiumButtonText}>PREMIUM NOW</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.promoRight}>
            <View style={styles.promoImagePlaceholder}>
              <Text style={styles.promoImageIcon}>🎤</Text>
            </View>
          </View>
        </View>
      </View>
      {/* Horizontal Album Cards Section */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.albumScroll}
        contentContainerStyle={styles.albumScrollContent}
      >
        
        {albumCards.length > 0 ? (
          albumCards.map((album) => (
            <AlbumCard
              key={album.id}
              title={album.title}
              artist={album.artist}
              color={album.color}
              showDownload={album.showDownload}
              imageSource={album.artworkUrl ? { uri: album.artworkUrl } : undefined}
            />
          ))
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading albums...</Text>
          </View>
        )}
      </ScrollView>

    

      {/* Recently Played Section */}
      <Text style={styles.sectionTitle}>Recently Played</Text>
      {recentlyPlayed.length > 0 ? (
        recentlyPlayed.map((item) => (
          <TouchableOpacity
            key={item.trackId}
            style={styles.recentItem}
            onPress={() => navigation.navigate("SongDetails", { song: item })}
          >
            <Image source={{ uri: item.artworkUrl60 }} style={styles.recentImage} />
            <View style={styles.recentTextContainer}>
              <Text style={styles.recentTitle}>{item.trackName}</Text>
              <Text style={styles.recentArtist}>{item.artistName}</Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <>
          <TouchableOpacity style={styles.recentItem}>
            <View style={[styles.recentImage, styles.recentImagePlaceholder]}>
              <Text style={styles.placeholderIcon}>🎵</Text>
            </View>
            <View style={styles.recentTextContainer}>
              <Text style={styles.recentTitle}>The Other Side</Text>
              <Text style={styles.recentArtist}>Nova</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.recentItem}>
            <View style={[styles.recentImage, styles.recentImagePlaceholder, { backgroundColor: '#8B0000' }]}>
              <Text style={styles.placeholderIcon}>🌀</Text>
            </View>
            <View style={styles.recentTextContainer}>
              <Text style={styles.recentTitle}>Future Bound</Text>
              <Text style={styles.recentArtist}>Pulse Rate</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.recentItem}>
            <View style={[styles.recentImage, styles.recentImagePlaceholder, { backgroundColor: '#4A4A4A' }]}>
              <Text style={styles.placeholderIcon}>💿</Text>
            </View>
            <View style={styles.recentTextContainer}>
              <Text style={styles.recentTitle}>Rainy Day Groove</Text>
              <Text style={styles.recentArtist}>Lofi Collective</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );


  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.helloText}>Hello</Text>
          <Text style={styles.userName}>John Johnson</Text>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.profileImage}>
            <Text style={styles.profileIcon}>👤</Text>
          </View>
        </View>
      </View>

      {/* Search Bar Section */}
      <View style={styles.searchContainer}>

  {/* Search Bar */}
  <View style={styles.searchBar}>
    <Text style={styles.searchIcon}>🔍</Text>

    <TextInput
      placeholder="Search album, song..."
      placeholderTextColor="#888"
      style={styles.searchInput}
    />
  </View>

  {/* Filter Button */}
  <TouchableOpacity style={styles.filterButton}>
    <Text style={styles.filterIcon}>⚙️</Text>
  </TouchableOpacity>

</View>


      <FlatList
        data={songs}
        keyExtractor={(item) => item.trackId.toString()}
        renderItem={({ item }) => (
          <SongItem
            song={item}
            onPress={() => navigation.navigate("SongDetails", { song: item })}
          />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
      />

      <BottomNav />
    </SafeAreaView>
  );
};

export default SongListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  listContent: { paddingBottom: 20 },
  // Header Styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  helloText: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 4,
  },
  userName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  profileContainer: {
    alignItems: "flex-end",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1E3A8A",
    justifyContent: "center",
    alignItems: "center",
  },
  profileIcon: {
    fontSize: 30,
  },
  // Search Bar Styles
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 30,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flex: 1,
  },
  searchIcon: {
    fontSize: 18,
    color: "#bbb",
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  filterButton: {
    marginLeft: 12,
    width: 42,
    height: 42,
    backgroundColor: "#1a1a1a",
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  filterIcon: {
    fontSize: 18,
    color: "#fff",
  },
  // Album Cards Styles
  albumScroll: {
    marginBottom: 20,
  },
  albumScrollContent: {
    paddingRight: 20,
  },
  albumCard: {
    width: 180,
    marginRight: 15,
  },
  albumImage: {
    width: 180,
    height: 180,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  albumIcon: {
    fontSize: 60,
  },
  albumInfo: {
    backgroundColor: "#111",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  albumTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  albumArtist: {
    color: "#aaa",
    fontSize: 14,
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  loadingText: {
    color: "#aaa",
    fontSize: 14,
  },
  // Promotional Banner Styles
  promoBanner: {
    backgroundColor: "#FF1493",
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
  promoContent: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  promoLeft: {
    flex: 1,
  },
  promoPercent: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "bold",
    lineHeight: 50,
  },
  promoOff: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: -5,
  },
  promoText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 10,
    lineHeight: 20,
  },
  premiumButton: {
    backgroundColor: "#FF69B4",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    alignSelf: "flex-start",
  },
  premiumButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  promoRight: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  promoImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  promoImageIcon: {
    fontSize: 50,
  },
  // Recently Played Styles
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  recentItem: {
    flexDirection: "row",
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  recentImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  recentImagePlaceholder: {
    backgroundColor: "#1E3A8A",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderIcon: {
    fontSize: 30,
  },
  recentTextContainer: {
    flex: 1,
  },
  recentTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  recentArtist: {
    color: "#aaa",
    fontSize: 14,
  },
});
